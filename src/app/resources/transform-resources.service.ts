import { Injectable } from '@angular/core';
import { Resource, HoursPerDate, Project } from './resources-model/resource';
import { DateRange } from './resources-model/date-range';
import { Observable } from 'rxjs/Observable';
import {
  ViewResource,
  ViewProject,
  HoursPerDateMap,
  ProjectWorkingHours
} from './resources-model/view-resource';

const ZERO_HOUR = 0;
const DAYS_MS = 86400000; //1 day (86400000 ms)

@Injectable()
export class TransformResourcesService {

  getDaysList(dateRange: DateRange): Date[] {
    const dateDiff = dateRange.endDate.getTime() - dateRange.startDate.getTime();
    const daysNumber = Math.floor(dateDiff) / DAYS_MS + 1;

    return Array(daysNumber)
      .fill(0)
      .map(
        (_, idx) => new Date(dateRange.startDate.getTime() + idx * DAYS_MS)
      );
  }

  private initDefaultHoursPerDateMap(dateRange: DateRange): HoursPerDateMap {
    return this.getDaysList(dateRange)
      .reduce((obj, next) => {
        obj[next.getTime()] = ZERO_HOUR;
        return obj;
      }, {});
  }

  private assignHoursToDate(hoursPerDateList: HoursPerDate[], hoursPerDateMap: HoursPerDateMap): Observable<HoursPerDateMap> {
    return Observable.from(hoursPerDateList)
      .reduce(
        (hoursPerDayMap: HoursPerDateMap, hoursPerDate: HoursPerDate) => {
          hoursPerDayMap[hoursPerDate.date] = hoursPerDate.workingHours;
          return hoursPerDayMap;
        },
        Object.assign({}, hoursPerDateMap)
      )
  }

  transformResources(resources: Resource[], dateRange: DateRange): Observable<ViewResource[]> {
    const hoursPerDateMap = this.initDefaultHoursPerDateMap(dateRange);
    return Observable.from(resources)
      .switchMap(resource =>
        this.mapToProjectsWithHours(resource.projects, hoursPerDateMap),
        (resource, projectsWithHoursList) => ({
          member: resource.member,
          projectsWithHoursList: projectsWithHoursList
        })
      ).switchMap(
        (memberWithProjects) => this.mapToViewProjectList(memberWithProjects.projectsWithHoursList),
        (memberWithProjects, viewProjectsList) => ({ ...memberWithProjects, viewProjectsList })
      ).switchMap(
        (memberWithProjects) => this.sumAllProjectHoursPerDay(memberWithProjects.projectsWithHoursList),
        (memberWithProjects, allDailyHoursPerMember) =>
          new ViewResource(
            memberWithProjects.member,
            memberWithProjects.viewProjectsList,
            allDailyHoursPerMember
          )
      ).toArray();
  }

  private mapToProjectsWithHours(projects: Project[], hoursPerDayMap: HoursPerDateMap): Observable<ProjectWorkingHours[]> {
    return Observable.from(projects)
      .switchMap(
        project => this.assignHoursToDate(project.hoursPerDate, hoursPerDayMap),
        (project, workingHoursPerDay: HoursPerDateMap) => new ProjectWorkingHours(project.name, workingHoursPerDay)
      ).toArray();
  }

  private mapToViewProjectList(projectWorkingHours: ProjectWorkingHours[]): Observable<ViewProject[]> {
    return Observable.from(projectWorkingHours)
      .switchMap(
        singleProjectHours => Observable.of(this.mapToHoursPerDateList(singleProjectHours.hoursPerDateMap)),
        (singleProjectHours, projectDatetimeList) => new ViewProject(singleProjectHours.projectName, projectDatetimeList)
      )
      .toArray();
  }

  private mapToHoursPerDateList(map: HoursPerDateMap): HoursPerDate[] {
    return Object.keys(map)
      .map(key => new HoursPerDate(+key, map[key]));
  }

  private sumAllProjectHoursPerDay(projectWorkingHours: ProjectWorkingHours[]): Observable<HoursPerDate[]> {
    return Observable.from(projectWorkingHours)
      .map(projectHours => projectHours.hoursPerDateMap)
      .reduce(
        (finalObj, current) => this.sumProjectHoursPerDay(finalObj, current), {}
      )
      .map(e => Observable.of(this.mapToHoursPerDateList(e)))
      .flatMap(e => Observable.from(e));
  }

  private sumProjectHoursPerDay(objA: HoursPerDateMap, objB: HoursPerDateMap): HoursPerDateMap {
    return Object.keys(objA).reduce((obj, k) => {
      obj[k] = (obj[k] || 0) + objA[k];
      return obj;
    }, Object.assign({}, objB))
  }

  createDefaultHoursPerDateList(dateRange: DateRange) {
    const workingHoursMap = this.initDefaultHoursPerDateMap(dateRange);
    return this.mapToHoursPerDateList(workingHoursMap);
  }
}
