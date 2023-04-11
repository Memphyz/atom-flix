import { ReactElement, useEffect, useState } from "react";
import { ICardListProps } from "./CardListProps";
import { Cards } from "../Card/Card";
import { CardDetails } from "../CardDetails/CardDetails";
import { Lang } from "../../shared/lang";
import { PTBR } from "../../shared/lang/pt-br";

export function CardList<
  T extends {
    id: any;
    backdrop_path: string;
    name?: string;
    overview: string;
    title?: string;
  }
>(
  props: Omit<
    ICardListProps<T>,
    "lang" | "totalItems" | "onMouseOver" | "onClickMore" | "items"
  >
): ReactElement {
  const [ details, setDetails ] = useState<T>();
  const [ list, setList ] = useState<T[]>([]);
  const [ LANG, setLang ] = useState<typeof PTBR>(Lang.LANG);
  const [ scrollLeft, setScrollLeft ] = useState(0);
  const [ page, setPage ] = useState<number>(1);
  const [ totalItems, setTotalItems ] = useState<number>();

  useEffect(() => {
    Lang.langListener().subscribe(() => {
      setLang(Lang.LANG);
      setList([]);
      setScrollLeft(0);
      setPage(0);
    });
  }, []);

  useEffect(() => {
    const container = document.getElementById(props.listContainerId);
    container?.scrollTo({ left: scrollLeft });
  }, [ list ]);

  useEffect((): void => {
    fetch(!!page);
  }, [ page ]);

  const fetch = (setScroll = true) => {
    setScroll &&
      setScrollLeft(
        document.getElementById(props.listContainerId)?.scrollLeft!
      );
    props.getAll({ page: page || 1, ...(props.otherRequestParams || {}) }).subscribe((data) => {
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
      {...props}
      items={list}
      lang={LANG}
      totalItems={totalItems}
      onMouseOver={getDetails}
      onClickMore={() => setPage(page ? page + 1 : 2)}
    >
      <CardDetails details={details!} lang={LANG} height={props.height!} />
    </Cards>
  );
}
