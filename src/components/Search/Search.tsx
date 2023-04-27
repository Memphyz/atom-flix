import { t } from 'i18next';
import { ReactElement, useEffect, useMemo, useState } from 'react';
import { finalize } from 'rxjs';
import { ISearch, ISearchFiltered, MultiSearch } from '../../core/models/Search';
import { SearchService } from '../../core/services/search.service';
import { className } from '../../shared/utils/classname';
import { DebounceTime } from '../../shared/utils/debounce';
import './Search.scss';
import { router } from '../../App';

export function Search(props: { search: string, onCloseEvent: () => void }): ReactElement {
  const service = new SearchService();
  const [ show, setShow ] = useState(false);
  const [ results, setResults ] = useState<ISearchFiltered>(null)
  const debounce = useMemo(() => new DebounceTime(fetch), [])

  useEffect((): void => {
    debounce.call(props.search);
  }, [ props.search, debounce ]);

  function fetch(query: string): void {
    service.search({ page: 1, query }).pipe(finalize(() => {
      blur(!query);
      setShow(!!query);
    })).subscribe((multi) => {
      const result = ISearch.filter(multi.results)
      setResults(result);
    })
  }

  function blur(remove = false): void {
    const pageContent = document.getElementById('page-content');
    const root = document.getElementById('root');
    const arrow = document.getElementById('scroll-to-top');
    if (!pageContent) {
      return undefined;
    }
    if (remove) {
      pageContent.style.filter = '';
      pageContent.style.pointerEvents = ''
      root.style.overflow = '';
      arrow.style.zIndex = '';
      return undefined;
    }
    arrow.style.zIndex = '1';
    pageContent.style.filter = 'blur(10px)'
    pageContent.style.pointerEvents = 'none'
    root.style.overflow = 'hidden';
  }

  function clickItem(data: MultiSearch): void {
    router.next(`details/${ data.media_type }/${ data.id }`)
    props.onCloseEvent();
  }



  function Section(type: keyof ISearchFiltered): ReactElement {
    const contents: Record<keyof ISearchFiltered, string> = {
      movies: t('MOVIES') as string,
      tv: t('TV_SHOW') as string,
      people: t('PEOPLE') as string,
    };
    const path = (data: MultiSearch) => type === 'people' ? data[ 'profile_path' ] : data.poster_path
    return results && Object.values(results[ type ])?.length ?
      <div className={`section ${ type }`}>
        <h3>{contents[ type ]}</h3>
        <div className="items">
          {results[ type ]?.map((data: MultiSearch) => <div className={`item-search ${ data.media_type }`} key={data.id}>
            <div className="data-search-item" onClick={data.media_type !== 'person' ? () => clickItem(data) : null}>
              <div className={className({
                "img-preview": true,
                placeholder: !path(data)
              })}>
                <img src={`https://www.themoviedb.org/t/p/w220_and_h330_face${ path(data) }`} alt="" />
              </div>
              <div className="overview-search-item">
                <strong>{data[ data.media_type === 'movie' ? 'title' : 'name' ]}</strong>
                <span>{data.media_type === 'person' ? null : data.overview}</span>
              </div>
            </div>
          </div>)}
        </div>
      </div>
      : null
  }

  return (<div className={className({
    'search-results-wrapper': true,
    show
  })}>
    <div className="block-content" />
    <div className="search-results">
      {Section('movies')}
      {Section('tv')}
      {Section('people')}
    </div>
  </div>)
}