import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ResourcesComponent } from './';
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
  providers: [ResourcesResolver]
})
export class ResourcesRoutingModule {

}