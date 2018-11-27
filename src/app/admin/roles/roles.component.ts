import {Component, OnInit} from '@angular/core';
import {RolesService} from 'src/app/services/roles.service';
import {Role} from 'src/app/models/role.model';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
    roles: Role[] = [];
    disableDelete = true; // temporary set to true

    constructor(
        private rolesService: RolesService
    ) {}

    ngOnInit() {
        this.rolesService.getRoles().subscribe(
            list => {
                this.roles = list;
            }
        )
    }

    onAddRole() {
        console.log('onAddRole');
    }

    onEditRole(index: number) {
        console.log('onEditRole', index);
    }

}
