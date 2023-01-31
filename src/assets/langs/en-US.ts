import { PT_LANG } from './pt-BR';

export const EN_LANGUAGE: typeof PT_LANG = {
     FAVORITES: 'Favorites',
     LOADING_NEW_ITEMS: 'Loading new items',
     PORTUGUESE: 'Portuguese',
     ENGLISH: 'English',
     ADD_TO_FAVORITES: 'Add to Favorites',
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
     ALREADY_LOGGED: `You're already logged 🫡`,
     ACCESS_DENIED: '❌ You have no permission to access this feature',
     UNLOGGED_MESSAGE: 'You must be logged in to access this feature.',
     ALSO_KNOWN_AS: 'Also known as',
     ORIGINAL_TITLE: 'Original title',
     ERRORS: (error) => {
          return {
               minLength: `The field does not have a minimum amount of ${error?.minLength?.requiredLength} characters`,
               required: 'Required field'
          }
     }
}