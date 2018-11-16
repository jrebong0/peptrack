import { SecurityGroup } from "./security.group.model";
import { Role } from "./role.model";

export interface Employee {
    id?: string;
    email: string;
    employeeId: number;
    firstName: string;
    lastName: string;
    password: string;
    status: string;
    type: string;
    role: Role;
    studio?: any; // @todo Refactor studio model and service
    securityGroup: SecurityGroup;
    permissions?: string[]; /* Temporarily set to Optional to test login */
}
