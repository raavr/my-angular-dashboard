export interface Resource {
  member: string;
  projects: Project[];
}

export interface Project {
  name: string,
  hoursPerDate: HoursPerDate[];
}

export interface ProjectName {
  name: string;
}

export class HoursPerDate {
  date: number;
  workingHours: number;

  constructor(date: number, workingHours: number) {
    this.date = date;
    this.workingHours = workingHours;
  }
}