import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReferenceService } from './reference.service';
import { Project } from '../models/project.model';
import { NgForm } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { EngagementService } from './engagement.service';

@Injectable({
    providedIn: 'root'
})
export class ProjectService {
    project: Project;

    constructor(private db: AngularFirestore,
        private refService: ReferenceService,
        private engagementService: EngagementService) { }

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

    getCleanProjects() {
        return combineLatest([
            this.getProjectList(),
            this.engagementService.getEngagementList()
          ]).pipe(
            map(([projectList, engagementList]) => {
              return projectList.map(
                project => {
                  const assocEngagement = engagementList.find(engage => (
                    engage.key === project.engagement.id
                  ));
                  let projectData = {
                    engagement: assocEngagement.name
                  }
                  return {...project, ...projectData};
                }
              );
            })
          )
    }
}
