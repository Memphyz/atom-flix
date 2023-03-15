import { ReactElement, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Observable } from "rxjs";
import { IntersectionItem } from "../../components/IntersectionItem/IntersectionItem";
import { PresentationDetails } from "../../components/PresentationDetails/PresentationDetails";
import { Skeleton } from "../../components/Skeleton/Skeleton";
import { CommonDetails, Similar } from "../../core/models/CommonDetails";
import { Video } from "../../core/models/ModelVideo";
import { MovieDetail } from "../../core/models/Movie/MovieDetails";
import { Backdrop } from "../../core/models/ObjectImages";
import { TvShowDetails } from "../../core/models/TvShow/TvShowDetails";
import { MovieService } from "../../core/services/movie.service";
import { TvShowService } from "../../core/services/tv-show.service";
import {
  movieDetailsToCommonDetails,
  tvShowDetaillToCommonDetails,
} from "../../shared/assemblers/to-common-details";
import { Lang } from "../../shared/lang";
import { toHoursAndMinutes } from "../../shared/utils/commons";
import { getUrlPath } from "../../shared/utils/router";
import "./details.scss";
import { DetailsOverview } from "../../components/DetailsPage/DetailsOverview/DetailsOverview";
import { MoviesForYou } from "../../components/DetailsPage/DetailsForYou/DetailsForYou";

const SERVICE_CONFIG = {
  tv: TvShowService,
  movie: MovieService,
};

const ASSEMBLERS = {
  movie: movieDetailsToCommonDetails,
  tv: tvShowDetaillToCommonDetails,
};

export function Details(): ReactElement {
  const [commonDetails, setCommonDetails] = useState<CommonDetails>();
  const [similar, setSimilar] = useState<Similar>();
  const [service, setService] = useState<MovieService>();
  const location = useLocation();
  const [LANG, setLang] = useState(Lang.LANG);

  useEffect(() => {
    Lang.langListener().subscribe(setLang);
    setService(new SERVICE_CONFIG[getType()]());
  }, []);

  useEffect(() => {
    document.getElementById("scroll-to-top")?.click();
    new SERVICE_CONFIG[getType()]().getById(getId()).subscribe(convert);
  }, [location]);

  useEffect(() => {
    if (!commonDetails) {
      return undefined;
    }
    setSimilar(commonDetails.similar);
  }, [commonDetails]);

  function convert(details: MovieDetail | TvShowDetails): void {
    const common = ASSEMBLERS[getType()](
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
        <DetailsOverview commonDetails={commonDetails!} LANG={LANG} />
        <MoviesForYou
          similar={similar!}
          LANG={LANG}
          getId={getId}
          getType={getType}
          service={service!}
          setSimilar={setSimilar}
        />
      </div>
    </div>
  );
}
