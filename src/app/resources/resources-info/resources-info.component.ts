import { Component, Input } from '@angular/core';

@Component({
  selector: 'res-info',
  templateUrl: './resources-info.component.html',
  styleUrls: [
    './resources-info.component.scss'
  ]
})
export class ResourcesInfoComponent {
  @Input() resType: string;
  @Input() resCount: number;
}