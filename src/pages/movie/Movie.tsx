import './Movie.scss';
import { getLang } from '../..';
import { LangSupportType, Language } from '../../assets/langs/lang';
import { MovieDetail } from '../../core/models/MovieDetails';
import { MovieService } from '../../core/services/movie';
import { convertMinuteToHour, formatDate, getAverageColor } from '../../shared/utils';
import { withParams } from '../../shared/withFns';
import { Component, createRef, ReactNode } from 'react';

class Filme extends Component<{ params?: { id: number } }> {

     private readonly movieService = new MovieService();
     private cachedMovies: { [key in LangSupportType]: MovieDetail }[] = [];
     private movie: MovieDetail;
     private backdropRef = createRef<HTMLDivElement>();
     private hourMinute: { hour: number, minute: number };

     public componentDidMount(): void {
          this.fetch();
          this.langListener();
     }

     public componentDidUpdate(): void {
          if (this.backdropRef.current && this.movie) {
               this.backdropRef.current?.style.setProperty('--average-color', '#000')
               getAverageColor('https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/' + this.movie.backdrop_path, (color) => this.setState(() => this.backdropRef.current?.style.setProperty('--average-color', color.hex)))
          }
          this.movie && (this.hourMinute = convertMinuteToHour(this.movie.runtime));
     }

     private langListener(): void {
          Language.onChange.subscribe(() => this.fetch())
     }

     private fetch(): void {
          const hasCache = this.cachedMovies.some(movie => Object.keys(movie).includes(getLang()))
          if (!this.cachedMovies.length || !hasCache) {
               this.props.params && this.movieService.getDetail(this.props.params.id!).subscribe((movie) => this.setState(() => {
                    const add = {};
                    add[getLang()] = movie;
                    this.cachedMovies.push(add as any);
                    this.movie = movie
               }));
               return undefined;
          }
          this.setState(() => {
               this.movie = Object.values(this.cachedMovies.find(movie => movie[getLang()])!)?.shift()!;
          })
     }

     private averageColor(average: number): string {
          if (average < 40) {
               return 'red';
          }

          return average < 80 ? 'orange' : 'green'
     }

     public render(): ReactNode {
          return this.movie && (
               <div className="movie-detail-content" >
                    <div className="backdrop" ref={this.backdropRef} style={{ backgroundImage: 'url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces/' + this.movie.backdrop_path + ')' }}>
                         <div className="movie-header">
                              <img loading='lazy' decoding='async' src={'https://www.themoviedb.org/t/p/w220_and_h330_face' + this.movie.poster_path} alt={this.movie.title} />

                              <div className="movie-info">
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
                         </div>
                         <div className="header-movie-data"></div>
                    </div>

               </div>
          )
     }
}

export default withParams(Filme);