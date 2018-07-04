import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ViewResource } from '../../../resource/view-resource';
import { ProjectName } from '../../../resource/resource';
import { ExpandCollapseItemsService } from '../../move-items/expand-collapse-items.service';
import { ResourcesService } from '../../../resources.service';
import { Subject } from 'rxjs/Subject';

export interface SelectedProject {
  value: string;
  position: number;
}

@Component({
  selector: 'res-item-header',
  templateUrl: './resource-item-header.component.html',
  styleUrls: [
    './resource-item-header.component.scss'
  ]
})
export class ResourceItemHeaderComponent {
  @Input() resItem: ViewResource;
  @Input() position: number;
  @Output() assign = new EventEmitter<SelectedProject>();

  unsub$ = new Subject<any>();

  expanded: boolean = false;
  showAssignPanel: boolean = false;
  selectedProject: string;
  projects: ProjectName[];

  constructor(private expandCollapseItemService: ExpandCollapseItemsService, private resourcesService: ResourcesService) { }

  ngOnInit() {
    this.expandCollapseItemService.expandItem$
      .takeUntil(this.unsub$)
      .subscribe((expandedItem) => {
        if (expandedItem.position === this.position) {
          this.expanded = expandedItem.expand;
        }
      });

    this.resourcesService.getProjects()
      .takeUntil(this.unsub$)
      .subscribe((allProjs) => {
        this.projects = allProjs.filter((proj) => {
          return this.resItem.viewProjects.map((vProj) => vProj.name).indexOf(proj.name) == -1;
        });
      });

  }

  expandCollapseItem() {
    this.expandCollapseItemService.expandItem({ position: this.position, expand: !this.expanded });
  }

  assignItem() {
    if (this.selectedProject) {
      this.assign.emit({ value: this.selectedProject, position: this.position });

      const idx = this.projects.findIndex((elem) => elem.name === this.selectedProject);
      this.projects.splice(idx, 1);

      this.showAssignPanel = false;
      this.selectedProject = null;
    }
  }

  ngOnDestroy() {
    this.unsub$.next();
    this.unsub$.complete();
  }
}