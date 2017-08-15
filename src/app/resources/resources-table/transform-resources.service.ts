import { Injectable } from '@angular/core';
import { Resource, ProjectDatetime } from '../resource/resource';
import { DateRange } from '../resource/date-range';
import { Observable } from 'rxjs/Observable';
import { ViewResource, ViewProject, WorkingHoursPerDay, DailyProjectHours } from '../resource/view-resource';

const ZERO_HOUR = 0;

@Injectable()
export class TransformResourcesService {

    getDaysList(dateRange: DateRange): Date[] {
        return Array(Math.floor((dateRange.endDate.getTime() - dateRange.startDate.getTime()) / 86400000) + 1)
            .fill(0)
            .map((e, idx) => (new Date(dateRange.startDate.getTime() + idx * 86400000)))
    }

    private initWorkingHoursPerDayMap(dateRange: DateRange): WorkingHoursPerDay {
        return this.getDaysList(dateRange)
            .reduce((obj, next) => {
                obj[next.getTime()] = ZERO_HOUR;
                return obj;
            }, {});
    }

    private assignWorkingHoursToDaysMap(datetimes: ProjectDatetime[], workingHoursPerDayMap: WorkingHoursPerDay): WorkingHoursPerDay {
        const hoursPerDayMap = Object.assign({}, workingHoursPerDayMap);
        datetimes.forEach((elem) => hoursPerDayMap[elem.date] = elem.workingHours);
        return hoursPerDayMap;
    }

    transformResourcesData(resources: Resource[], dateRange: DateRange): Observable<ViewResource[]> {
        const hoursPerDayMap = this.initWorkingHoursPerDayMap(dateRange);
        
        return Observable.from(resources)
                         .map(resource => this.transformSingleResource(resource, hoursPerDayMap))
                         .flatMap((m) => Observable.from(m))
                         .toArray();
    } 

    private transformSingleResource(resource: Resource, hoursPerDayMap: WorkingHoursPerDay): Observable<ViewResource> {
        return Observable
                .from(resource.projects)
                .map(project => 
                    new DailyProjectHours(project.name, this.assignWorkingHoursToDaysMap(project.datetimes, hoursPerDayMap))
                )
                .toArray()
                .map((transfProjects) => this.createFinalTransformedResource(resource.member, transfProjects))
                .flatMap((transfResource) => Observable.from(transfResource));
    } 

    private createFinalTransformedResource(member: string, transfProjects: DailyProjectHours[]): Observable<ViewResource> {
        return Observable.from(transfProjects)
                .map(el => el.workingHoursPerDay)
                .toArray()
                .map((e) => 
                    new ViewResource(
                            member, 
                            this.convertToProjectDatetime(this.sumAllDailyProjectHours(e)), 
                            transfProjects.map(
                                (elem) => new ViewProject(elem.projectName, this.convertToProjectDatetime(elem.workingHoursPerDay))
                            )
                        )
                    );

    }

    private sumProjectHours(objA: WorkingHoursPerDay, objB: WorkingHoursPerDay): WorkingHoursPerDay {
        return Object.keys(objA).reduce((obj, k) => {
            obj[k] = (obj[k] || 0) + objA[k];
            return obj;
        }, Object.assign({}, objB))
    }

    private sumAllDailyProjectHours(obj: WorkingHoursPerDay[]): WorkingHoursPerDay {      
        let currentObject = Object.assign({}, obj[0]);
        
        for(let i = 1; i < obj.length; i++) {
            currentObject = Object.assign({}, this.sumProjectHours(currentObject, obj[i]));
        }
        return currentObject;
    }

    private convertToProjectDatetime(obj: WorkingHoursPerDay): ProjectDatetime[] {
        return Object.keys(obj).map((key) => {
            return new ProjectDatetime(+key, obj[key]);
        });
    }

}
