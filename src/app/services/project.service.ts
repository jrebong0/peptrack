import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReferenceService } from './reference.service';
import { map } from 'rxjs/operators';
import { Project } from '../models/project.model';
import { NgForm } from '@angular/forms';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    project: Project;

    constructor(private db: AngularFirestore,
        private refService: ReferenceService) { }

    getProjectList() {
        return this.db.collection('projects').stateChanges().pipe(
            map(items=>{
                return items.map(
                    (item: any) => {
                        const key = item.payload.doc.id;
                        const data = item.payload.doc.data();
                        return {key, ...data};
                    }
                );
            })
        );
    }

    updateProject(form: NgForm) {
        this.project = {
            name: form.value.updateName,
            dateCreated: Date(),
            createdBy: this.refService.getReferencePath(
                'employee/'.concat(localStorage.getItem('currentUser'))),
            engagement: this.refService.getReferencePath(
                'engagements/'.concat(form.value.engagementName))
        };
        this.db.collection('projects').doc(form.value.key).update(this.project);
    }

    addProject(form: NgForm) {
        this.project = {
            name: form.value.projectName,
            dateCreated: Date(),
            createdBy: this.refService.getReferencePath(
                'employee/'.concat(localStorage.getItem('currentUser'))),
            engagement: this.refService.getReferencePath(
                'engagements/'.concat(form.value.engagementName))
          };
        this.db.collection('projects').add(this.project);
    }

    deleteProject(key: string) {
      this.db.doc('/projects/' + key).delete();
    }
}
