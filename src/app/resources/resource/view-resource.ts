import { HoursPerDate } from './resource';

export class ViewResource {
  member: string;
  projectHoursPerDate: ViewProject[];
  summedHoursPerDate: HoursPerDate[];

  constructor(member: string, projectHoursPerDate: ViewProject[],  summedHoursPerDate: HoursPerDate[]) {
    this.member = member;
    this.projectHoursPerDate = projectHoursPerDate;
    this.summedHoursPerDate = summedHoursPerDate;
  }
}

export class ViewProject {
  name: string;
  hoursPerDate: HoursPerDate[];

  constructor(name: string, hoursPerDate: HoursPerDate[]) {
    this.name = name;
    this.hoursPerDate = hoursPerDate;
  }
}

export interface HoursPerDateMap {
  [key: number]: number
}

export class ProjectWorkingHours {
  projectName: string;
  hoursPerDateMap: HoursPerDateMap;

  constructor(projectName: string, hoursPerDateMap: HoursPerDateMap) {
    this.projectName = projectName;
    this.hoursPerDateMap = hoursPerDateMap;
  }
}