export class Studio {
    id: string;
    name: string;
    tower: string;
    type: string;
    key: string;

    constructor(
        id: string = '',
        name: string = '',
        tower: string = ''
    ) {
        this.id = id;
        this.name = name;
        this.tower = tower;
    }
}
