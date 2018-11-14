import { SecurityGroup } from "./security.group.model";
import { Permission } from "./permission.model";

export interface Employee {
    employeeId: number;
    firstName: string;
    lastName: string;
    securityGroup: SecurityGroup;
    permissions: Permission[];
}
