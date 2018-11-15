import { SecurityGroup } from "./security.group.model";
import { Role } from "./role.model";

export interface Employee {
    key: string;
    employeeId: number;
    firstName: string;
    lastName: string;
    password: string;
    status: string;
    type: string;
    securityGroup: SecurityGroup;
    role: Role;
}
