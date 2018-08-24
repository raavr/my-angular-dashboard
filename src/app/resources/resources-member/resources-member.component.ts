import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewResource } from '../resources-model/view-resource';
import { ProjectName } from '../resources-model/resource';
import { ExpandCollapseItemsService } from '../move-items/expand-collapse-items.service';
import { ResourcesService } from '../resources.service';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export interface SelectedProject {
  value: string;
  position: number;
}

@Component({
  selector: 'res-member',
  templateUrl: './resources-member.component.html',
  styleUrls: [
    './resources-member.component.scss'
  ]
})
export class ResourcesMemberComponent {
  @Input() resItem: ViewResource;
  @Input() position: number;
  @Output() assign = new EventEmitter<SelectedProject>();

  unsub$ = new Subject<any>();

  expanded: boolean = false;
  showAssigningPanel: boolean = false;
  selectedProject: string;
  availableProjects: ProjectName[];

  constructor(
    private expandCollapseItemService: ExpandCollapseItemsService, 
    private resourcesService: ResourcesService
  ) { }

  ngOnInit() {
    this.expandCollapseItemService.expandItem$
      .filter(expandedItem => expandedItem.position === this.position)
      .map(expandedItem => expandedItem.expand)
      .takeUntil(this.unsub$)
      .subscribe(expanded => this.expanded = expanded);
    
    const viewProjects = this.resItem.projectHoursPerDate.map((vProj) => vProj.name);
    this.resourcesService.getProjects()
      .mergeMap(p => Observable.from(p))
      .filter(project => viewProjects.indexOf(project.name) == -1)
      .toArray()
      .takeUntil(this.unsub$)
      .subscribe(availableProjects => this.availableProjects = availableProjects);
  }

  expandCollapseItem() {
    this.expandCollapseItemService.expandItem({ position: this.position, expand: !this.expanded });
  }

  assignItem() {
    if (this.selectedProject) {
      this.assign.emit({ value: this.selectedProject, position: this.position });

      this.makeSelectedProjectUnavailable();
      this.showAssigningPanel = false;
    }
  }

  private makeSelectedProjectUnavailable() {
    const idx = this.availableProjects.findIndex((elem) => elem.name === this.selectedProject);
    this.availableProjects.splice(idx, 1);
    
    this.selectedProject = null;
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}