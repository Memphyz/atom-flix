import './Movie.scss';
import { getLang } from '../..';
import { icons } from '../../assets/icons/icons';
import { getCurrencyByLang } from '../../assets/langs/currency';
import { LangSupportType, Language } from '../../assets/langs/lang';
import { Average } from '../../components/Average/Average';
import { IntersectionFade } from '../../components/IntersectionFade/IntersectionFade';
import { Modal } from '../../components/Modal/Modal';
import { MovieDetail } from '../../core/models/MovieDetails';
import { MovieService } from '../../core/services/movie';
import {
     convertMinuteToHour,
     decimal,
     formatDate,
     getAverageColor
} from '../../shared/utils';
import { withParams } from '../../shared/withFns';
import classNames from 'classnames';
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
     private openCast = false;
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
               this.props.params && this.movieService.getDetail(this.props.params.id!).pipe(
               ).subscribe(this.onFindMovie.bind(this));
               return undefined;
          }
          this.setState(() => {
               this.movie = Object.values(this.cachedMovies.find(movie => movie[getLang()])!)?.shift()!;
               this.movie && (this.hourMinute = convertMinuteToHour(this.movie.runtime));
          })
     }

     private onFindMovie(movie: MovieDetail): void {
          this.setState(() => {
               console.log(movie)
               const add = {};
               add[getLang()] = movie;
               this.cachedMovies.push(add as any);
               this.movie = movie;
               this.movie && (this.hourMinute = convertMinuteToHour(this.movie.runtime));
          })
     }

     private closeCastModal(): void {
          this.setState(() => this.openCast = false);
     }

     public render(): ReactNode {
          return this.movie && (
               <div className="movie-detail-content" >
                    <div className="backdrop" ref={this.backdropRef} style={{ backgroundImage: 'url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/' + this.movie.backdrop_path + ')' }}>
                         <div className="movie-header">
                              <img loading='lazy' decoding='async' src={'https://www.themoviedb.org/t/p/w220_and_h330_face' + this.movie.poster_path} alt={this.movie.title} />
                              <div className="minimal-details">
                                   <div className="info">
                                        <label htmlFor={Language.LANG.VOTE_COUNT}>{Language.LANG.VOTE_COUNT}: </label>
                                        <span>{decimal(this.movie.vote_count)}</span>
                                   </div>
                                   <div className="info">
                                        <label htmlFor={Language.LANG.REVENUE}>{Language.LANG.REVENUE}: </label>
                                        <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: getCurrencyByLang('en-US')?.code }).format(this.movie.revenue)}</span>
                                   </div>
                                   <div className="info">
                                        <label htmlFor={Language.LANG.BUDGET}>{Language.LANG.BUDGET}: </label>
                                        <span>{new Intl.NumberFormat('en-US', { style: 'currency', currency: getCurrencyByLang('en-US')?.code }).format(this.movie.budget)}</span>
                                   </div>
                                   <div className="info">
                                        <div className={classNames({
                                             pill: true,
                                             success: this.movie.status === 'Released'
                                        })}>{Language.LANG[this.movie.status.toUpperCase()]}</div>
                                   </div>
                              </div>
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
                                        {this.buttons.map((button, i) => (
                                             <div key={i} className="button-wrapper" atom-tooltip={button.tooltip}>

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
                    {this.movie.videos?.results?.length ? <div className="trailers">
                         <h3>{Language.LANG.TRAILERS}</h3>
                         <div className="list-trailers">
                              {this.movie.videos.results.map((video, i) => (
                                   <IntersectionFade key={i}>
                                        <iframe src={`https://www.youtube.com/embed/${video.key}?autoplay=1&origin=https%3A%2F%2Fwww.themoviedb.org&hl=pt&modestbranding=1&fs=1&autohide=1`} loading='lazy' allowFullScreen={true}></iframe>
                                   </IntersectionFade>
                              ))}
                         </div>
                    </div> : null}
                    <div className="company-productions">
                         <h3>{Language.LANG.CAST}</h3>
                         <div className="people-producers">
                              {(this.movie.credits?.cast.length > 10 ? this.movie.credits?.cast.slice(0, 10) : this.movie.credits?.cast)?.map((cast) => (
                                   <IntersectionFade key={cast.id}>
                                        <div className="cast-people">
                                             <figure>
                                                  {cast.profile_path ?
                                                       <img src={"https://www.themoviedb.org/t/p/w138_and_h175_face/" + cast.profile_path} loading='lazy' decoding='async' alt={cast.name + 'photo'} />
                                                       :
                                                       <div className="photo-placeholder">
                                                            <div className="icon" style={{
                                                                 WebkitMaskImage: `url(${icons.person})`
                                                            }}></div>
                                                       </div>
                                                  }
                                             </figure>
                                             <div className="details">
                                                  <strong>{cast.known_for_department}</strong>
                                                  <div className="name">{cast.name}</div>
                                                  <div className="character">
                                                       {cast.character}
                                                  </div>
                                             </div>
                                        </div>
                                   </IntersectionFade>
                              ))}
                              {this.movie.credits?.cast.length > 10 && (
                                   <div className='show-more'><strong onClick={() => this.setState(() => this.openCast = true)}>{Language.LANG.SHOW_MORE} ⇢</strong>
                                        <Modal open={this.openCast} onClose={this.closeCastModal.bind(this)}>
                                             <div className="complete-cast">
                                                  {this.movie.credits?.cast.map((cast) =>
                                                       <IntersectionFade key={cast.id}>
                                                            <div className="cast-people">
                                                                 <figure>
                                                                      {cast.profile_path ?
                                                                           <img src={"https://www.themoviedb.org/t/p/w138_and_h175_face/" + cast.profile_path} loading='lazy' decoding='async' alt={cast.name + 'photo'} />
                                                                           :
                                                                           <div className="photo-placeholder">
                                                                                <div className="icon" style={{
                                                                                     WebkitMaskImage: `url(${icons.person})`
                                                                                }}></div>
                                                                           </div>
                                                                      }
                                                                 </figure>
                                                                 <div className="details">
                                                                      <strong>{cast.known_for_department}</strong>
                                                                      <div className="name">{cast.name}</div>
                                                                      <div className="character">
                                                                           {cast.character}
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </IntersectionFade>
                                                  )}
                                             </div>
                                        </Modal>
                                   </div>
                              )}
                         </div>
                    </div>
                    <IntersectionFade>
                         <div className="keywords">
                              <h3>{Language.LANG.KEYWORDS}</h3>
                              <div className="list-keywords">
                                   {this.movie.keywords?.keywords.map(keyword => (
                                        <IntersectionFade key={keyword.id}>
                                             <span>{keyword.name}</span>
                                        </IntersectionFade>
                                   ))}
                              </div>
                         </div>
                    </IntersectionFade>
               </div>
          )
     }
}

export default withParams(Filme);