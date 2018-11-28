export class Team {
    id: string;
    name: string;
    project: string;
    type: string;
    key: string;
    members?: any[];
    skill?: string;
    employees: any[];

    constructor(
        id: string = '',
        name: string = '',
        project: string = '',
        employees: any[] = []
    ) {
        this.id = id;
        this.name = name;
        this.project = project;
        this.employees = employees;
    }
}
