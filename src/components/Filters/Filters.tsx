import './Filters.scss';
import { getLang } from '../..';
import { LangSupportType, Language } from '../../assets/langs/lang';
import { Countries } from '../../core/models/Countries';
import { IMovie } from '../../core/models/Movie';
import { Genre } from '../../core/models/MovieDetails';
import { Search, SearchType } from '../../core/models/Search';
import { SelectOption } from '../../core/models/SelectOption';
import { FilterService } from '../../core/services/filters';
import { iso3166 } from '../../shared/iso-3166';
import { Switcher } from '../Switcher/Switcher';
import { Select } from 'antd';
import classNames from 'classnames';
import { Component, ReactNode } from 'react';
import { noop } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';

export class Filters extends Component<{ onFilter?: (movies: IMovie[]) => void, page?: number }> {

     private readonly regions = [new SelectOption('All', ''), ...iso3166.map(iso => new SelectOption(iso.name, iso['alpha-2']))];
     private types = Search.types;
     private search = '';
     private includeAdult = false;
     private typeSearch = SearchType.MULTI;
     private genres: (Genre & { active?: boolean })[] = [];
     private currentRegion: Countries = { 'alpha-2': '' } as any;
     private backup: { [key in LangSupportType]: { [x: string]: any } } = {
          "pt-BR": {},
          "en-US": {}
     };
     private readonly filterService = new FilterService();

     public componentDidMount(): void {
          this.init();
          Language.onChange.subscribe(this.init.bind(this))
     }

     private init(): void {
          this.setState(() =>
               this.types = Search.getTypes()
          )
          this.getAllGenres();
     }

     private getAllGenres(): void {
          if (!this.backup[getLang()]?.genre) {
               this.filterService.getAllMovieGenres().subscribe((genres) => {
                    this.backup[getLang()]!['genre'] = genres;
                    this.setState(() => this.genres = genres)
               })
               return undefined;
          }
          this.setState(() => this.genres = (this.backup[getLang()]!.genre as (Genre & { active?: boolean })[]).map(genre => {
               return { ...genre, active: false }
          }))
     }

     private findBySearchSelect(search: string, item: SelectOption<string>): boolean {
          return item.label.toLocaleLowerCase().includes(search.toLocaleLowerCase());
     }

     private onSelectType(value: SearchType): void {
          this.setState(() => this.typeSearch = value);
     }

     private btnSearch(): void {
          const params = {
               query: this.search,
               include_adult: this.includeAdult,
               region: this.currentRegion['alpha-2'],
               page: this.props.page || 1,
               keywords: this.genres.filter(genre => genre.active)?.map(genre => genre.name).join(',')
          }
          this.filterService.getAll(`/search/${this.typeSearch}`, params).pipe(map(res => res.results)).subscribe((this.props.onFilter || noop) as any)
     }

     public render(): ReactNode {
          return (
               <div className="filters-container">
                    <div className="title">
                         <h2>{Language.LANG.FILTERS}:</h2>
                    </div>

                    <div className="filters-wrapper">
                         <div className="search">
                              <input type="text" maxLength={80} placeholder={Language.LANG.SEARCH} onChange={(change) => {
                                   this.setState(() => {
                                        this.search = (change.nativeEvent.target as HTMLInputElement).value;
                                   })
                              }} />
                         </div>
                         <div className="ckeckbox">
                              <Switcher label={Language.LANG.INCLUDE_ADULT} onSwitch={(status) => this.setState(() => this.includeAdult = status)} />
                         </div>

                         <div className="select-container">
                              <label htmlFor={Language.LANG.TYPE_SEARCH}>{Language.LANG.TYPE_SEARCH}</label>
                              <Select id='type' value={this.typeSearch} filterOption={(this.findBySearchSelect as any).bind(this)} showSearch={true} options={this.types} onSelect={this.onSelectType.bind(this)} ></Select>
                         </div>

                         <div className="select-container">
                              <label htmlFor={Language.LANG.COUNTRY}>{Language.LANG.COUNTRY}</label>
                              <Select id='region' value={this.currentRegion?.['alpha-2']} filterOption={(this.findBySearchSelect as any).bind(this)} showSearch={true} options={this.regions} ></Select>
                         </div>

                         {this.genres?.length ? <div className="genres">
                              {this.genres.map(genre => (
                                   <span className={classNames({
                                        genre: true,
                                        active: genre.active
                                   })} key={genre.id} onClick={() => this.setState(() => genre.active = !genre.active)}> {genre.name}</span>
                              ))}
                         </div> : null}
                         <button className="success" onClick={this.btnSearch.bind(this)}>{Language.LANG.FILTER}</button>
                    </div>
               </div>
          )
     }
}