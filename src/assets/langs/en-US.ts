import { PT_LANG } from './pt-BR';

export const EN_LANGUAGE: typeof PT_LANG = {
     FAVORITES: 'Favorites',
     LOADING_NEW_ITEMS: 'Loading new items',
     PORTUGUESE: 'Portuguese',
     ENGLISH: 'English',
     ADD_TO_FAVORITES: 'Add to Favorites',
     PRODUCTION_COMPANIES: 'Production companies',
     PRODUCTERS: 'Producters',
     SIGN_IN: 'Sign In',
     SIGN_UP: 'Sign Up',
     LOGOUT: 'Logout',
     USERNAME: 'Username',
     PASSWORD: 'Password',
     GUEST: 'Guest',
     ACCOUNT: 'Account',
     USERNAME_OR_PASSWORD_INVALID: 'Invalid username and/or password',
     FILL_ALL_FIELDS: 'Fill correctly all fields in red to continue',
     WELCOME_BACK: 'Welcome back',
     ADD_TO_BOOKMARKS: 'Add to bookmarks',
     ADD_TO_FAVORITE: 'Add to favorites',
     FILTERS: 'Filters',
     FILTER: 'Filter',
     EVALUATE: 'Evaluate',
     SHOW_MORE: 'Show more',
     CAST: 'Cast',
     INCLUDE_ADULT: 'Include adult content',
     SEARCH: 'Search',
     ALREADY_LOGGED: `You're already logged 🫡`,
     TRAILERS: 'Trailers ',
     ACCESS_DENIED: '❌ You have no permission to access this feature',
     UNLOGGED_MESSAGE: 'You must be logged in to access this feature.',
     ALSO_KNOWN_AS: 'Also known as',
     VOTE_COUNT: 'Vote count',
     BUDGET: 'Budget',
     KEYWORDS: 'Keywords',
     REVENUE: 'Revenue',
     CREW: 'Crew',
     RELEASED: 'Released',
     ORIGINAL_TITLE: 'Original title',
     ERRORS: (error) => {
          return {
               minLength: `The field does not have a minimum amount of ${error?.minLength?.requiredLength} characters`,
               required: 'Required field'
          }
     }
}