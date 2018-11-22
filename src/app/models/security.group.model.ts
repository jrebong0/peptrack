export class SecurityGroup {
    id?: string; // Firebase key
    name: string;
    dateCreated: Date;
    sortOrder: number = 1;

    constructor(
        id: string = '',
        name: string = ''
    ) {
        this.id = id;
        this.name = name;
    }
}
