import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  MdCheckboxModule, 
  MdSliderModule, 
  MdCoreModule, 
  MdButtonModule, 
  MdInputModule, 
  MdSelectModule 
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ResourcesRoutingModule } from './resources-routing.module';
import { ResourcesComponent } from './';
import { ResourcesTableComponent } from './resources-table/resources-table.component';
import { ResourcesTypeComponent } from './resources-type/resources-type.component';
import { ResourcesInfoComponent } from './resources-info/resources-info.component';
import { ResourcesMemberComponent } from './resources-member/resources-member.component';
import { ResourcesDaysComponent } from './resources-days/resources-days.component';
import { ResourcesHoursItemComponent } from './resources-hours-item/resources-hours-item.component';
import { ResourcesHoursSubitemComponent } from './resources-hours-subitem/resources-hours-subitem.component';
import { ResourcesDateRangeComponent } from './resources-date-range/resources-date-range.component';
import { MoveDaysDirective } from './move-items/move-days.directive';
import { ResourcesService } from './resources.service';
import { MoveDaysFrameService } from './move-items/move-days.service';
import { TransformResourcesService } from './transform-resources.service';
import { ExpandCollapseItemsService } from './move-items/expand-collapse-items.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdCheckboxModule,
    NoopAnimationsModule,
    ResourcesRoutingModule,
    MdSliderModule,
    MdCheckboxModule,
    MdCoreModule,
    MdButtonModule,
    MdInputModule,
    MdSelectModule
  ],
  declarations: [
    ResourcesComponent,
    ResourcesTableComponent,
    MoveDaysDirective,
    ResourcesTypeComponent,
    ResourcesInfoComponent,
    ResourcesMemberComponent,
    ResourcesDateRangeComponent,
    ResourcesDaysComponent,
    ResourcesHoursItemComponent,
    ResourcesHoursSubitemComponent
  ],
  providers: [
    ResourcesService,
    MoveDaysFrameService,
    TransformResourcesService,
    ExpandCollapseItemsService
  ]
})
export class ResourcesModule {

}