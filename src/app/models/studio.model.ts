export interface Studio {
    data: {
        name: string;
        tower: string;
        type: string;
    };
    key: string;
    // @todo For refactoring
    id?: string;
    name?: string;
}
