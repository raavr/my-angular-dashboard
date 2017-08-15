import { ProjectDatetime } from './resource';

export class ViewResource {
    member: string;
    viewDays: ProjectDatetime[];
    viewProjects: ViewProject[];

    constructor(member: string, viewDays: ProjectDatetime[], viewProjects: ViewProject[]) {
        this.member = member;
        this.viewDays = viewDays;
        this.viewProjects = viewProjects;
    }
}

export class ViewProject {
    name: string;
    viewDays: ProjectDatetime[];

    constructor(name: string, viewDays: ProjectDatetime[]) {
        this.name = name;
        this.viewDays = viewDays;
    }
}

export interface WorkingHoursPerDay {
    [key: number]: number
}

export class DailyProjectHours {
    projectName: string;
    workingHoursPerDay: WorkingHoursPerDay;

    constructor(projectName: string, workingHoursPerDay: WorkingHoursPerDay) {
        this.projectName = projectName;
        this.workingHoursPerDay = workingHoursPerDay;
    }
}