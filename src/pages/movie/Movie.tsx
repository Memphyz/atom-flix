import './Movie.scss';
import { getLang } from '../..';
import { icons } from '../../assets/icons/icons';
import { LangSupportType, Language } from '../../assets/langs/lang';
import { Average } from '../../components/Average/Average';
import { MovieDetail } from '../../core/models/MovieDetails';
import { MovieService } from '../../core/services/movie';
import { convertMinuteToHour, formatDate, getAverageColor } from '../../shared/utils';
import { withParams } from '../../shared/withFns';
import { Component, createRef, ReactNode } from 'react';
import { tap } from 'rxjs';

interface IButton {
     icon: keyof typeof icons,
     onClick?: () => void,
     tooltip: string,
}

class Filme extends Component<{ params?: { id: number } }> {

     private readonly movieService = new MovieService();
     private cachedMovies: { [key in LangSupportType]: MovieDetail }[] = [];
     private movie: MovieDetail;
     private backdropRef = createRef<HTMLDivElement>();
     private hourMinute: { hour: number, minute: number };
     private buttons: IButton[] = this.buttonsList;
     private get buttonsList(): IButton[] {
          return [
               {
                    icon: 'bookmarkFilled',
                    tooltip: Language.LANG.ADD_TO_BOOKMARKS
               },
               {
                    icon: 'favorite',
                    tooltip: Language.LANG.ADD_TO_FAVORITE
               },
               {
                    icon: 'rateUp',
                    tooltip: Language.LANG.EVALUATE
               },
          ]
     }

     public componentDidMount(): void {
          this.fetch();
          this.langListener();
     }

     public componentDidUpdate(): void {
          if (this.backdropRef.current && this.movie) {
               this.backdropRef.current?.style.setProperty('--average-color', '#000')
               getAverageColor('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/' + this.movie.backdrop_path, (color) => this.setState(() => this.backdropRef.current?.style.setProperty('--average-color', color.hex)))
          }
     }

     private langListener(): void {
          Language.onChange.pipe(tap(() =>
               this.setState(() => this.buttons = this.buttonsList)))
               .subscribe(() => this.fetch())
     }

     private fetch(): void {
          const hasCache = this.cachedMovies.some(movie => Object.keys(movie).includes(getLang()))
          if (!this.cachedMovies.length || !hasCache) {
               this.props.params && this.movieService.getDetail(this.props.params.id!).subscribe((movie) => this.setState(() => {
                    const add = {};
                    add[getLang()] = movie;
                    this.cachedMovies.push(add as any);
                    this.movie = movie;
                    this.movie && (this.hourMinute = convertMinuteToHour(this.movie.runtime));
               }));
               return undefined;
          }
          this.setState(() => {
               this.movie = Object.values(this.cachedMovies.find(movie => movie[getLang()])!)?.shift()!;
               this.movie && (this.hourMinute = convertMinuteToHour(this.movie.runtime));
          })
     }

     public render(): ReactNode {
          return this.movie && (
               <div className="movie-detail-content" >
                    <div className="backdrop" ref={this.backdropRef} style={{ backgroundImage: 'url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/' + this.movie.backdrop_path + ')' }}>
                         <div className="movie-header">
                              <img loading='lazy' decoding='async' src={'https://www.themoviedb.org/t/p/w220_and_h330_face' + this.movie.poster_path} alt={this.movie.title} />
                         </div>

                         <div className="header-details">
                              {this.movie.title !== this.movie.original_title && <label className="also-known">
                                   {Language.LANG.ORIGINAL_TITLE}: {this.movie.original_title}
                              </label>}
                              <h1>{this.movie.title} <span>({new Date(this.movie.release_date).getFullYear()})</span>
                                   <br />
                                   <div className="infos">
                                        <span>{formatDate(new Date(this.movie.release_date))}</span>
                                        <span className='tags' key="tags">{this.movie.genres.map(genre => genre.name).join(', ')}</span>
                                        <span>{this.hourMinute?.hour}h {this.hourMinute?.minute}m</span>
                                   </div>
                                   {this.movie.tagline && <div className='tagline'>{this.movie.tagline}</div>}
                              </h1>

                              <p>{'\u00A0'}{'\u00A0'}{this.movie.overview}</p>
                              <div className="header-movie-data">
                                   <div className="buttons">
                                        {this.buttons.map(button => (
                                             <div className="button-wrapper" atom-tooltip={button.tooltip}>

                                                  <div className="button"
                                                       style={{ WebkitMaskImage: `url(${icons[button.icon]})` }}
                                                       onClick={button.onClick?.bind(this)}></div>
                                             </div>
                                        ))}
                                   </div>
                              </div>
                              <Average average={this.movie.vote_average * 10} />
                         </div>
                    </div>
                    <div className="company-productions">
                         <h3>{Language.LANG.PRODUCTERS}</h3>
                    </div>
               </div>
          )
     }
}

export default withParams(Filme);