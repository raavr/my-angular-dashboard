import { Component, Input } from '@angular/core';

@Component({
  selector: 'res-type',
  templateUrl: './resources-type.component.html',
  styleUrls: [
    './resources-type.component.scss'
  ]
})
export class ResourcesTypeComponent {
  @Input() resType: string;
}