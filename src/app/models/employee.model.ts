import { SecurityGroup } from "./security.group.model";
import { Permission } from "./permission.model";

export interface Employee {
    email: string;
    employeeId: number;
    firstName: string;
    lastName: string;
    password: string;
    securityGroup: SecurityGroup;
    permissions?: Permission[]; /* Temporarily set to Optional to test login */
}
