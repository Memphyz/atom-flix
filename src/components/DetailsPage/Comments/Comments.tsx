import { ReactElement } from 'react';
import './Comments.scss';
import { Reviews } from '../../../core/models/TvShow/TvShowDetails';
import { icons } from '../../../assets/icons/icons';

export function Comments(reviews: Reviews): ReactElement {

  function getProfileImg(path: string): string {
    if (!path) {
      return icons.person;
    }
    if (path.startsWith('/')) {
      if (path.includes('http')) {
        return path.slice(1)
      }
      return `https://www.themoviedb.org/t/p/w64_and_h64_face${ path }`;
    }
    return path;
  }

  function getComment(comment: string): string {
    return comment.replaceAll('\n', '</br>')
  }

  return <div className='reviews-wrapper'>
    {reviews.results?.map((review) => <div className='review' key={review.id}>
      <img src={review.author_details.avatar_path ? getProfileImg(review.author_details.avatar_path) : null} srcSet={review.author_details.avatar_path ? getProfileImg(review.author_details.avatar_path) : null} loading='lazy' decoding='async' alt={review.author_details.name + ' avatar'} />
      <div className="review-data">
        <div className='author-name'>
          <span>{review.author}</span>
        </div>
        <label htmlFor={`${ review.author } review`} dangerouslySetInnerHTML={{ __html: getComment(review.content) }}></label>
      </div>
    </div>)}
  </div>
}