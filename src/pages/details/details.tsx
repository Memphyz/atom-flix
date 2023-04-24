import { ReactElement, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { MoviesForYou } from "../../components/DetailsPage/DetailsForYou/DetailsForYou";
import { DetailsOverview } from "../../components/DetailsPage/DetailsOverview/DetailsOverview";
import { CommonDetails, Similar } from "../../core/models/CommonDetails";
import { MovieDetail } from "../../core/models/Movie/MovieDetails";
import { TvShowDetails } from "../../core/models/TvShow/TvShowDetails";
import { MovieService } from "../../core/services/movie.service";
import { TvShowService } from "../../core/services/tv-show.service";
import {
  movieDetailsToCommonDetails,
  tvShowDetaillToCommonDetails,
} from "../../shared/assemblers/to-common-details";
import { getUrlPath } from "../../shared/utils/router";
import "./details.scss";

const SERVICE_CONFIG = {
  tv: TvShowService,
  movie: MovieService,
};

const ASSEMBLERS = {
  movie: movieDetailsToCommonDetails,
  tv: tvShowDetaillToCommonDetails,
};

export function Details(): ReactElement {
  const [ commonDetails, setCommonDetails ] = useState<CommonDetails>();
  const [ similar, setSimilar ] = useState<Similar>();
  const [ service, setService ] = useState<MovieService>();
  const location = useLocation();

  useEffect(() => {
    setService(new SERVICE_CONFIG[ getType() ]());
  }, []);

  useEffect(() => {
    document.getElementById("scroll-to-top")?.click();
    new SERVICE_CONFIG[ getType() ]().getById(getId()).subscribe(convert);
  }, []);

  useEffect(() => {
    if (!commonDetails) {
      return undefined;
    }
    setSimilar(commonDetails.similar);
  }, [ commonDetails ]);

  function convert(details: MovieDetail | TvShowDetails): void {
    const common = ASSEMBLERS[ getType() ](
      details as MovieDetail & TvShowDetails
    );
    setCommonDetails(common);
  }

  function getType(): string {
    return getUrlPath().slice(1).shift()! as "tv" | "movie";
  }

  function getId(): string {
    return getUrlPath().slice(1).pop()!;
  }

  return (
    <div className="main-details-wrapper">
      <div className="movie-main-details">
        <DetailsOverview commonDetails={commonDetails!} />
        <MoviesForYou
          similar={similar!}
          getId={getId}
          getType={getType}
          service={service!}
          setSimilar={setSimilar}
        />
      </div>
    </div>
  );
}
