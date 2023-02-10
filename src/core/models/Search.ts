import { Language } from './../../assets/langs/lang';
import { SelectOption } from './SelectOption';

export enum SearchType {
     COMPANIE = 'company',
     COLLECTION = 'collection',
     KEYWORD = 'keyword',
     MOVIES = 'movie',
     MULTI = 'multi',
     PEOPLE = 'person',
     TV_SHOW = 'tv'
}

export class Search {
     private static readonly commonUrl = '/search';
     public static types = this.getTypes();

     public static getSearchTypeUrl(type: SearchType): string {
          return `${this.commonUrl}/${type}`
     }

     public static reloadTypes(): void {
          Search.types = this.getTypes();
     }

     public static getTypes() {
          return [
               new SelectOption(Language.LANG.ALL, SearchType.MULTI),
               new SelectOption(Language.LANG.COMPANY, SearchType.COMPANIE),
               new SelectOption(Language.LANG.COLLECTION, SearchType.COLLECTION),
               new SelectOption(Language.LANG.KEYWORD, SearchType.KEYWORD),
               new SelectOption(Language.LANG.MOVIE, SearchType.MOVIES),
               new SelectOption(Language.LANG.PEOPLE, SearchType.PEOPLE),
               new SelectOption(Language.LANG.TV_SERIE, SearchType.TV_SHOW)
          ]
     }
}