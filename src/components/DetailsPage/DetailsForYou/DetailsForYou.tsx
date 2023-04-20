import { Link } from "react-router-dom";
import { IntersectionItem } from "../../IntersectionItem/IntersectionItem";
import { Skeleton } from "../../Skeleton/Skeleton";
import "./DetailsForYou.scss";
import { ReactElement, useEffect, useState } from "react";
import { Similar } from "../../../core/models/CommonDetails";
import { MovieService } from "../../../core/services/movie.service";
import { Observable } from "rxjs";
import { t } from "i18next";

export function MoviesForYou(props: {
  similar: Similar;
  service: MovieService;
  getType: () => string;
  getId: () => string;
  setSimilar: React.Dispatch<React.SetStateAction<Similar | undefined>>;
}): ReactElement {
  const [ similarTop, setSimilarScrollTop ] = useState(0);

  useEffect(() => {
    if (!props.similar) {
      return undefined;
    }
    const container = document.getElementById("similar-container")!;
    container.scrollTo({
      top: similarTop,
    });
  }, [ props.similar ]);

  function fetchSimilar(): void {
    setSimilarScrollTop(
      document.getElementById("similar-container")!.scrollTop
    );
    (
      props.service?.getSimilar(props.getId(), {
        page: props.similar!.page + 1,
      }) as unknown as Observable<Similar>
    ).subscribe((response) =>
      props.setSimilar({
        ...response,
        results: [ ...props.similar!.results, ...response.results ],
      })
    );
  }

  return (
    <div className="movies-for-you-wrapper">
      <Skeleton classElements="title-loading">
        <h4>{t('SIMILAR') as string}</h4>
      </Skeleton>
      <div className="similar-wrapper" id="similar-container">
        <div className="similar-container">
          <Skeleton
            classElements="similar-card"
            quantityMock={props.similar?.results.length || 8}
          >
            {props.similar?.results.map((similar, index) => (
              <IntersectionItem
                key={index}
                animation={window.innerWidth < 1835 ? "to-left" : "to-top"}
              >
                <Link to={`/details/${ props.getType() }/${ similar.id }`}>
                  <div
                    key={similar.id}
                    className="similar-card"
                    card-title={similar.name || similar.title}
                    style={{
                      backgroundImage: `url(https://www.themoviedb.org/t/p/w220_and_h330_face/${ similar.poster_path })`,
                    }}
                  />
                </Link>
              </IntersectionItem>
            ))}
          </Skeleton>
          {props.similar &&
            props.similar.total_pages !== props.similar.page && (
              <div className="see-more" onClick={fetchSimilar}>
                <span>{t('SEE_MORE') as string}</span>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
