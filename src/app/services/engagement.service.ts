import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReferenceService } from './reference.service';
import { map } from 'rxjs/operators';
import { Engagement } from '../models/engagement.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class EngagementService {
  engagement: Engagement;

  constructor(private db: AngularFirestore,
      private refService: ReferenceService) { }

  getEngagementList() {
      return this.db.collection('engagements').stateChanges().pipe(
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

  updateEngagement(form: NgForm) {
      this.engagement = {
          name: form.value.updateName,
          dateCreated: Date(),
          createdBy: this.refService.getReferencePath(
              'employee/'.concat(localStorage.getItem('currentUser')))
      };
      this.db.collection('engagements').doc(form.value.key)
        .update(this.engagement);
  }

  addEngagement(form: NgForm) {
      this.engagement = {
          name: form.value.engagementName,
          dateCreated: Date(),
          createdBy: this.refService.getReferencePath(
              'employee/'.concat(localStorage.getItem('currentUser')))
        };
      this.db.collection('engagements').add(this.engagement);
  }

  deleteEngagement(key: string) {
    this.db.doc('/engagements/' + key).delete();
  }
}
