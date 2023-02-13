import './Home.scss';
import { getLang } from '../..';
import { Language } from '../../assets/langs/lang';
import { Average } from '../../components/Average/Average';
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { Filters } from '../../components/Filters/Filters';
import { DropdownItem } from '../../core/models/DropdownItem';
import { IMovie } from '../../core/models/Movie';
import { IResponse } from '../../core/models/Response';
import { AccountService } from '../../core/services/account';
import { MovieService } from '../../core/services/movie';
import { handleScroll, scrollToTop } from '../../shared/infinity-scroll';
import { decimal } from '../../shared/utils';
import { Component, ReactNode } from 'react';
import { Observable } from 'rxjs';


export default class Home extends Component {

     private page = 1;
     private readonly movieService = new MovieService();
     private readonly accountService = new AccountService();
     private dropdownItems: DropdownItem[] = [
          new DropdownItem(Language.LANG.ADD_TO_FAVORITES, 'favoriteOutline')
     ]
     public movies: IMovie[] = [];
     public findAll = this.requisitions.topRating;

     private get requisitions() {
          return {
               topRating: (page: number): Observable<IResponse<IMovie>> => this.movieService.getAllTopRating({ page }),
               nowPlaying: (page: number): Observable<IResponse<IMovie>> => this.movieService.getAllPlaying({ page })
          }
     }

     public componentDidMount(): void {
          Language.onChange.subscribe(() => this.fetch(true));
          this.fetch();
     }

     private fetch(reset = false): void {
          if (reset) {
               this.page = 1;
          }
          this.findAll && this.findAll(this.page).subscribe((response) =>
               this.setState(() => {
                    if (reset) {
                         this.movies = [];
                         scrollToTop('div.page-content > div > div.catalog')
                    }
                    return this.movies.push(...response.results)
               }));;
     }

     private handlePage(): void {
          this.page++;
          this.fetch();
     }

     private onSearch(movies: IMovie[]): void {
          this.page = 1;
          this.setState(() => this.movies = movies);
     }

     public render(): ReactNode {
          return (
               <div className="page-list-content">
                    <div className="filters">
                         <Filters onFilter={this.onSearch.bind(this)} />
                    </div>
                    <div className="catalog" onScroll={handleScroll.bind(this, this.handlePage.bind(this))}>
                         {this.movies.filter(movie => movie.media_type === 'movie' || !movie.media_type).map(movie => {
                              return (
                                   <div className='card' key={movie.id} id={movie.id + ''}>
                                        <a href={'movie/' + movie.id}>
                                             <img loading='lazy' decoding='async' src={'	https://www.themoviedb.org/t/p/w220_and_h330_face' + movie.poster_path} alt={movie.title.replace(' ', '_').toLocaleLowerCase() + '_backdrop'} />
                                        </a>
                                        <Dropdown items={this.dropdownItems}></Dropdown>
                                        <Average average={movie.vote_average * 10} />
                                        <div className="movie-info">
                                             <label htmlFor={movie.title}>{movie.title}</label>
                                             <span>{
                                                  new Date(movie.release_date).toLocaleDateString(getLang().toLocaleLowerCase(), { weekday: undefined, year: "numeric", month: "long", day: "numeric" })
                                             }</span>
                                             <div className="pill">{decimal(movie.vote_count)} {movie.vote_count > 1 ? Language.LANG.VOTES : Language.LANG.VOTE}</div>
                                        </div>
                                   </div>
                              )
                         })}
                    </div>
               </div>
          ) as any
     }
}
