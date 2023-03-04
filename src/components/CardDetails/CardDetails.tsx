import { PTBR } from "../../shared/lang/pt-br";
import "./CardDetails.scss";

export function CardDetails<
  T extends { backdrop_path: string; name?: String; overview: string, title?:string }
>(props: { details: T; lang: typeof PTBR; height: number }) {
  return (
    <div className="details" style={{ height: props.height }}>
      <div
        className="backdrop"
        style={{
          backgroundImage: `url(https://www.themoviedb.org/t/p/w533_and_h300_bestv2${props.details?.backdrop_path})`,
        }}
      />
      <h3 className="title">{props.details?.name || props.details.title}</h3>
      {props.details?.overview && (
        <div className="overview">
          <label htmlFor={`${props.details?.name} ${props.lang.SYNOPSIS}`}>
            {props.details?.overview}
          </label>
        </div>
      )}
    </div>
  );
}
