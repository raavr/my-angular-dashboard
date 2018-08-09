import { Injectable } from '@angular/core';
import { 
  Router, 
  Resolve, 
  RouterStateSnapshot,
  ActivatedRouteSnapshot 
} from '@angular/router';

import { ResourcesService } from './resources.service';
import { Resource } from './resource/resource';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ResourcesResolver implements Resolve<any> {
  constructor(private resourcingService: ResourcesService, private router: Router) {}
  
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Resource[]> {
    return this.resourcingService.getResources();
  }
}
