import { Region } from '../models/Region';
import axios from 'axios';
import { from, map, Observable } from 'rxjs';

export class RegionService {

     private readonly http = axios.create();

     public getCurrentRegion(): Observable<Region> {
          return from(this.http.get('https://ipapi.co/json/')).pipe(map(res => res.data))
     }
}