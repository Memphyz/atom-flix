import { ReactElement, SyntheticEvent, useEffect, useMemo, useState } from 'react';
import { finalize } from 'rxjs';
import { ISearch, ISearchFiltered } from '../../core/models/Search';
import { SearchService } from '../../core/services/search.service';
import { className } from '../../shared/utils/classname';
import { DebounceTime } from '../../shared/utils/debounce';
import './Search.scss';
import { SearchItem } from './SearchItem/SeachItem';
import { t } from 'i18next';
import { MultiSearch } from '../../core/models/Search';

export function Search(props: { search: string }): ReactElement {
  const service = new SearchService();
  const [ show, setShow ] = useState(false);
  const [ content, setContent ] = useState<keyof ISearchFiltered>('movies');
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

  function changeContentType(event: SyntheticEvent<HTMLDivElement, PointerEvent>): void {
    const target = event.nativeEvent.target as HTMLSpanElement;
    if (target.attributes.getNamedItem('ignore-click')) {
      return undefined;
    }
    const contents: Record<string, keyof ISearchFiltered> = {
      [ t('MOVIES') ]: 'movies',
      [ t('TV_SHOW') ]: 'tv',
      [ t('PEOPLE') ]: 'people'
    };
    setContent(contents[ target.outerText ])

  }

  return (
    <div className={className({
      'search-wrapper-results': true,
      show: show,
      'no-results': !results || (Object.values(results).every((list: unknown[]) => !list.length))
    })} not-found-msg={`${ t('SEARCH_NOT_FOUND') as string }`}>
      {results && <div className="content-search-selector">
        <div className="results-content">
          <div className="type-result-header">
            <div className="type-results" ignore-click={true.toString()} onClick={changeContentType as any}>
              {Object.values(results.movies).length ? <span className={className({
                active: content === 'movies'
              })}>{t('MOVIES') as string}</span> : null}
              {Object.values(results.tv).length ? <span className={className({
                active: content === 'tv'
              })}>{t('TV_SHOW') as string}</span> : null}
              {Object.values(results.people).length ? <span className={className({
                active: content === 'people'
              })}>{t('PEOPLE') as string}</span> : null}
            </div>
          </div>
        </div>
        <div className="content-search-wrapper">
          <div className="list-search" search-item-type={content} >
            {results[ content ]?.map((data: MultiSearch, index) => (
              <SearchItem backgroundLandscape={data.backdrop_path} overview={content === 'people' ? null : data.overview} title={data[ content === 'movies' ? 'title' : 'name' ]} key={index} backdround={`https://www.themoviedb.org/t/p/w220_and_h330_face${ content === 'people' ? data[ 'profile_path' ] : data.poster_path }`} />
            ))}
          </div>
        </div>
      </div>}
    </div>)
}