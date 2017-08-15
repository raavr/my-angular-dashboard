import { Component, Input } from '@angular/core';

@Component({
    selector: 'res-type-header',
    templateUrl: './resource-type-header.component.html',
    styleUrls: [ 
        './resource-type-header.component.scss'
    ]
})
export class ResourceTypeHeaderComponent {
    @Input() resType: string;
}