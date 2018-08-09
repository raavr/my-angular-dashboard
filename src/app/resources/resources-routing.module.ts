import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResourcesComponent } from './';
import { ResourcesService } from './resources.service';
import { ResourcesResolver } from './resources.resolver';

@NgModule({
  imports: [
    RouterModule.forChild([
      { 
        path: 'resources', 
        component: ResourcesComponent, 
        resolve: { 
          resources: ResourcesResolver 
        }
      }
    ])
  ],
  exports: [RouterModule],
  providers: [
    ResourcesService, 
    ResourcesResolver
  ]
})
export class ResourcesRoutingModule {

}