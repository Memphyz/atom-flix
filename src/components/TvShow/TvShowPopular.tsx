import { ReactElement, useEffect, useState } from "react";
import { TvShow } from "../../core/models/TvShow";
import { TvShowService } from "../../core/services/tv-show.service";
import { Lang } from "../../shared/lang";
import { PTBR } from "../../shared/lang/pt-br";
import { Cards } from "../Card/Card";
import "./TvShowPopular.scss";
import { CardDetails } from "../CardDetails/CardDetails";
import { isMobile } from "../..";

export function TvShowPopular(): ReactElement {
  const service = new TvShowService();
  const [list, setList] = useState<TvShow[]>([]);
  const [details, setDetails] = useState<TvShow>();
  const [totalItems, setTotalItems] = useState<number>();
  const [page, setPage] = useState<number>(1);
  const [LANG, setLang] = useState<typeof PTBR>(Lang.LANG);

  useEffect(() => {
    fetch();
    Lang.langListener().subscribe(() => {
      setLang(Lang.LANG);
      fetch();
    });
  }, []);

  useEffect((): void => {
    fetch();
  }, [page]);

  const fetch = () => {
    service.getAllPopular({ page }).subscribe((data) => {
      setList([
        ...list,
        ...data.results.filter(
          (detail) => !list.some((item) => item.id === detail.id)
        ),
      ]);
      setTotalItems(data.total_results);
    });
  };

  const getDetails = (id: number) => {
    const cached = list.find((cache) => cache.id === id);
    setDetails(cached);
  };

  return (
    <Cards
      items={list}
      title="name"
      backgroundImageSuffix="poster_path"
      width={220}
      lang={LANG}
      onClickMore={() => setPage(page + 1)}
      height={330}
      onMouseOver={getDetails}
      totalItems={totalItems}
      backgroundImage="https://www.themoviedb.org/t/p/w220_and_h330_face/"
    >
      <CardDetails details={details!} lang={LANG} height={330} />
    </Cards>
  );
}
