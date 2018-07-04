export interface Resource {
  member: string;
  projects: Project[];
}

export interface Project {
  name: string,
  datetimes: ProjectDatetime[];
}

export interface ProjectName {
  name: string;
}

export class ProjectDatetime {
  date: number;
  workingHours: number;

  constructor(date: number, workingHours: number) {
    this.date = date;
    this.workingHours = workingHours;
  }
}