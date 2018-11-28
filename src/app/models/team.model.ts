export class Team {
    id: string;
    name: string;
    tower: string;
    type: string;
    key: string;
    members?: any[];
    skill?: string;
    employees: any[];

    constructor(
        id: string = '',
        name: string = '',
        tower: string = '',
        employees: any[] = []
    ) {
        this.id = id;
        this.name = name;
        this.tower = tower;
        this.employees = employees;
    }
}
