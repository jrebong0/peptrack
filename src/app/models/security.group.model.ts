export class SecurityGroup {
    id?: string; // Firebase key
    name: string;
    vital?: boolean = false;
    staticName?: boolean = false;
    permissions?: string;
    dateCreated?: Date;
    sortOrder?: number = 1;

    constructor(
        id: string = '',
        name: string = ''
    ) {
        this.id = id;
        this.name = name;
    }
}
