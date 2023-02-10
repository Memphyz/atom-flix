import './Filters.scss';
import { getLang } from '../..';
import { LangSupportType, Language } from '../../assets/langs/lang';
import { Countries } from '../../core/models/Countries';
import { Genre } from '../../core/models/MovieDetails';
import { SelectOption } from '../../core/models/SelectOption';
import { FilterService } from '../../core/services/filters';
import { RegionService } from '../../core/services/region';
import { iso3166 } from '../../shared/iso-3166';
import { Switcher } from '../Switcher/Switcher';
import { Select } from 'antd';
import classNames from 'classnames';
import { Component, ReactNode } from 'react';

export class Filters extends Component<{ onFilter?: (filters: unknown) => void }> {

     private readonly regions = iso3166.map(iso => new SelectOption(iso.name, iso['alpha-2']));
     private genres: (Genre & { active?: boolean })[] = [];
     private currentRegion: Countries;
     private backup: { [key in LangSupportType]: { [x: string]: any } } = {
          "pt-BR": {},
          "en-US": {}
     };
     private readonly regionService = new RegionService();
     private readonly filterService = new FilterService();

     public componentDidMount(): void {
          this.init();
          Language.onChange.subscribe(this.init.bind(this))
     }

     private init(): void {
          this.getCurrentRegion();
          this.getAllGenres();
     }

     private getCurrentRegion(): void {
          this.regionService.getCurrentRegion().subscribe((region) => this.setState(() => this.currentRegion = iso3166.find(iso => iso['alpha-3'] === region.country_code_iso3)!))
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

     private findByRegion(search: string, item: SelectOption<string>): boolean {
          return item.label.toLocaleLowerCase().includes(search.toLocaleLowerCase());
     }

     public render(): ReactNode {
          return (
               <div className="filters-container">
                    <div className="title">
                         <h2>{Language.LANG.FILTERS}:</h2>
                    </div>

                    <div className="filters-wrapper">
                         <div className="search">
                              <input type="text" maxLength={80} placeholder={Language.LANG.SEARCH} />
                         </div>
                         <div className="ckeckbox">
                              <Switcher label={Language.LANG.INCLUDE_ADULT} />
                         </div>

                         <div className="region-container">
                              <Select id='region' value={this.currentRegion?.['alpha-2']} filterOption={(this.findByRegion as any).bind(this)} showSearch={true} options={this.regions} ></Select>
                         </div>

                         {this.genres?.length ? <div className="genres">
                              {this.genres.map(genre => (
                                   <span className={classNames({
                                        genre: true,
                                        active: genre.active
                                   })} key={genre.id} onClick={() => this.setState(() => genre.active = !genre.active)}> {genre.name}</span>
                              ))}
                         </div> : null}
                         <button className="success">{Language.LANG.FILTER}</button>
                    </div>
               </div>
          )
     }
}