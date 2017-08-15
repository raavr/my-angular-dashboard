import { Component, Input } from '@angular/core';

@Component({
    selector: 'res-info',
    templateUrl: './resource-info.component.html',
    styleUrls: [ 
        './resource-info.component.scss'
    ]
})
export class ResourceInfoComponent {
    @Input() resType: string;
    @Input() resCount: number;
}