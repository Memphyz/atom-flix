import { ReactElement, useState } from "react";
import { IntersectionItem } from "../../IntersectionItem/IntersectionItem";
import './SearchItem.scss';
import { Modal } from "../../Modal/Modal";
import { t } from "i18next";
import { Link } from "react-router-dom";
import { Router } from "../../..";

const TIMEOUT_WAIT = 1000;

export function SearchItem(props: {
  title: string,
  backdround: string;
  backgroundLandscape: string;
  overview: string;
  vingette?: boolean
}): ReactElement {

  const [ show, setShow ] = useState(false);
  const [ timeoutId, setTimeoutId ] = useState(0);

  function createPreview(): void {
    setTimeoutId(setTimeout((): void => {
      setShow(true);
    }, TIMEOUT_WAIT) as any as number);
  }

  function deletePreview(): void {
    clearTimeout(timeoutId);
    setTimeoutId(0);
    setShow(false);
  }

  return (
    <IntersectionItem onMouseOver={createPreview} onClick={() => setShow(true)} onMouseLeave={deletePreview} animation="default" className="card-search-item" style={{ backgroundImage: `url(${ props.backdround }` }}>
      <label htmlFor={props.title}>{props.title}</label>
      <Modal open={show} onClose={() => setShow(false)} >
        <div className="search-details" style={{ backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h1080_multi_faces${ props.backgroundLandscape || props.backdround })` }}>
          <button>{t('MORE_DETAILS') as string}</button>
          <div className="search-overview">
            <span>
              {props.overview || t('NO_OVERVIEW_AVALIABLE') as string}
            </span>
          </div>
          <div className="title-search">{props.title}</div>
        </div>
      </Modal>
    </IntersectionItem>
  )
}