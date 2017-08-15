import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesComponent } from './';
import { ResourcesTableComponent } from './resources-table/resources-table.component';
import { ResourceTypeHeaderComponent } from './resources-table/header-column/resource-type-header/resource-type-header.component';
import { ResourceInfoComponent } from './resources-table/header-column/resource-info/resource-info.component';
import { ResourceItemHeaderComponent } from './resources-table/header-column/resource-item-header/resource-item-header.component';
import { ResourceMonthHeaderComponent } from './resources-table/data-column/resource-month-header/resource-month-header.component';
import { ResourceDaysComponent } from './resources-table/data-column/resource-days/resource-days.component';
import { ResourceItemComponent } from './resources-table/data-column/resource-item/resource-item.component';
import { MoveDaysDirective } from './resources-table/move-items/move-days.directive';
import { MoveDaysFrameService } from './resources-table/move-items/move-days.service';
import { TransformResourcesService } from './resources-table/transform-resources.service';
import { ExpandCollapseItemsService } from './resources-table/move-items/expand-collapse-items.service';

@NgModule({
    imports: [ 
        CommonModule, 
        ResourcesRoutingModule 
    ],
    declarations: [
        ResourcesComponent,
        ResourcesTableComponent,
        MoveDaysDirective,
        ResourceTypeHeaderComponent,
        ResourceInfoComponent,
        ResourceItemHeaderComponent,
        ResourceMonthHeaderComponent,
        ResourceDaysComponent,
        ResourceItemComponent
    ],
    providers: [ 
        MoveDaysFrameService,
        TransformResourcesService,
        ExpandCollapseItemsService
    ]
})
export class ResourcesModule {

}