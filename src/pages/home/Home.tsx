import './Home.scss';
import { getLang } from '../..';
import { IMovie } from '../../core/models/Movie';
import { MovieService } from '../../core/services/movie';
import { Component, ReactNode } from 'react';

export default class Home extends Component {

     private readonly movieService = new MovieService();
     private movies: IMovie[] = [];

     public componentDidMount(): void {
          this.fetchPlaying();
     }

     private averageColor(average: number): string {
          if (average < 40) {
               return 'red';
          }

          return average < 80 ? 'orange' : 'green'
     }

     private fetchPlaying(): void {
          this.movieService.getAllTopRating().subscribe((response) =>
               this.setState(() => this.movies = response.results));
     }

     public render(): ReactNode {
          return (
               <div className="page-list-content">
                    <div className="filters">

                    </div>
                    <div className="catalog">
                         {this.movies.map(movie => (
                              <div className='card'>
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