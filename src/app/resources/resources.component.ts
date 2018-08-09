import { Component, Input } from '@angular/core';
import { Resource } from './resource/resource';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})
export class ResourcesComponent {
  resources: Resource[];

  constructor(
    private router: Router, 
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.data
      .subscribe(
        (data: { resources: Resource[] }) => this.resources = data.resources
      );
  }
}