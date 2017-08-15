import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Resource } from './resource/resource';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResourcesService {

    constructor(public http: Http) {}

    getResources(): Observable<Resource[]> {
        return this.http.get("/assets/mock-data/resources.json").map(
            response => response.json().resources as Array<Resource>
        );
    }

}
