import { ReactElement, useEffect } from "react";
import "./details.scss";
import { getUrlPath } from "../../shared/utils/router";
import { MovieService } from "../../core/services/movie.service";

export function Details(): ReactElement {
  const movieService = new MovieService();
  useEffect(() => {
    const id = getUrlPath().pop()!;
    movieService.getById(id).subscribe(console.log);
  }, []);
  return <div className="main-details-wrapper"></div>;
}
