import { CSSProperties, ReactElement, useEffect, useMemo, useState } from 'react';
import { ISearch, MultiSearch } from '../../core/models/Search';
import { SearchService } from '../../core/services/search.service';
import { DebounceTime } from '../../shared/utils/debounce';
import './Search.scss';
import { className } from '../../shared/utils/classname';
import { ISearchFiltered } from '../../core/models/Search';
import { finalize } from 'rxjs';
import { PTBR } from '../../shared/lang/pt-br';
import { SearchItem } from './SearchItem/SeachItem';

export function Search(props: { search: string, LANG: typeof PTBR }): ReactElement {
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
    })).subscribe((multi) => setResults(ISearch.filter(multi.results)))
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
      root.style.overflow = '';
      arrow.style.zIndex = '';
      return undefined;
    }
    arrow.style.zIndex = '1';
    pageContent.style.filter = 'blur(10px)'
    root.style.overflow = 'hidden';
  }

  return (
    <div className={className({
      'search-wrapper-results': true,
      show: show,
      'no-results': !results || (Object.values(results).every((list: unknown[]) => !list.length))
    })} not-found-msg={`${ props.LANG.SEARCH_NOT_FOUND }`}>
      <fieldset>
        <legend>{props.LANG.MOVIES}</legend>
        <div className="list-search">
          {
            results?.movies.map((movie, index) => (
              <SearchItem title={movie.title} key={index} backdround={`https://www.themoviedb.org/t/p/w220_and_h330_face${ movie.poster_path }`} />
            ))
          }
        </div>
      </fieldset>
      <fieldset>
        <legend>{props.LANG.TV_SHOW}</legend>
        <div className="list-search">
          {
            results?.tv.map((tv, index) => (
              <SearchItem title={tv.name} key={index} backdround={`https://www.themoviedb.org/t/p/w220_and_h330_face${ tv.poster_path }`} />
            ))
          }
        </div>
      </fieldset>
      <fieldset>
        <legend>{props.LANG.PEOPLE}</legend>
        <div className="list-search">
          {
            results?.people.map((person, index) => (
              <SearchItem title={person.name} key={index} backdround={`https://www.themoviedb.org/t/p/w220_and_h330_face${ person.poster_path }`} />
            ))
          }

        </div>
      </fieldset>
    </div>)
}