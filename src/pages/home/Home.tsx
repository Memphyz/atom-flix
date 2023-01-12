import './Home.scss';
import { getLang } from '../..';
import { IMovie } from '../../core/models/Movie';
import { IResponse } from '../../core/models/Response';
import { MovieService } from '../../core/services/movie';
import { handleScroll } from '../../core/utils/infinity-scroll.util';
import React, { Component, ReactNode } from 'react';
import { Observable } from 'rxjs';


export default class Home extends Component {

     private page = 1;
     private readonly movieService = new MovieService();
     public movies: IMovie[] = [];
     public findAll = this.requisitions.topRating;

     private get requisitions() {
          return {
               topRating: (page: number): Observable<IResponse<IMovie>> => this.movieService.getAllTopRating({ page }),
               nowPlaying: (page: number): Observable<IResponse<IMovie>> => this.movieService.getAllPlaying({ page })
          }
     }

     public componentDidMount(): void {
          this.fetch();
     }

     private averageColor(average: number): string {
          if (average < 40) {
               return 'red';
          }

          return average < 80 ? 'orange' : 'green'
     }

     private fetch(): void {
          this.findAll && this.findAll(this.page).subscribe((response) =>
               this.setState(() => this.movies.push(...response.results)));;
     }

     private handlePage(): void {
          this.page++;
          this.fetch();
     }

     public render(): ReactNode {
          return (
               <div className="page-list-content">
                    <div className="filters">

                    </div>
                    <div className="catalog" onScroll={handleScroll.bind(this, this.handlePage.bind(this))}>
                         {this.movies.map(movie => (
                              <div className='card' key={movie.id} id={movie.id + ''}>
                                   <a href={'movie/' + movie.id}>
                                        <img src={'https://www.themoviedb.org/t/p/w220_and_h330_face' + movie.backdrop_path} alt={movie.title.replace(' ', '_').toLocaleLowerCase() + '_backdrop'} />
                                   </a>
                                   <div className="average" average-vote={(movie.vote_average * 10) + '%'} >
                                        <svg>
                                             <circle className="track"></circle>
                                             <circle className="indicator" style={{ strokeDashoffset: 251.2 * ((100 - (movie.vote_average * 10)) / 100) + 'px', stroke: this.averageColor((movie.vote_average * 10)) }}></circle>
                                        </svg>
                                   </div>
                                   <div className="movie-info">
                                        <label htmlFor={movie.title}>{movie.title}</label>
                                        <span>{
                                             new Date(movie.release_date).toLocaleDateString(getLang().toLocaleLowerCase(), { weekday: undefined, year: "numeric", month: "long", day: "numeric" })
                                        }</span>
                                   </div>
                              </div>
                         ))}
                    </div>
               </div>
          ) as any
     }
}