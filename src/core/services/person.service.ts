import { Observable } from "rxjs";
import { AbstractService } from "../abstracts/service.abstract";
import { Person } from "../models/Person";

export class PersonService extends AbstractService<Person> {
  protected prefixUrl(): string {
    return '/person'
  }

  public getDetails(id: number): Observable<Person> {
    return super.get(this.prefixUrl() + `/${ id }`, {
      append_to_response: 'combined_credits,external_ids,images,tagged_images'
    })
  }

}