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

  updateEngagement(form: any) {
    this.engagement = {
        name: form.updateName,
        dateCreated: Date(),
        createdBy: this.refService.getReferencePath(
            'employee/'.concat(localStorage.getItem('currentUser'))),
        acronyms: this.getAcronyms(form.updateName)
    };
    this.db.collection('engagements').doc(form.key)
    .update(this.engagement);
  }

  addEngagement(form: any) {
    this.engagement = {
        name: form.engagementName,
        dateCreated: Date(),
        createdBy: this.refService.getReferencePath(
            'employee/'.concat(localStorage.getItem('currentUser'))),
        acronyms: this.getAcronyms(form.engagementName)
    };
    this.db.collection('engagements').add(this.engagement);
  }

  deleteEngagement(key: string) {
    this.db.doc('/engagements/' + key).delete();
  }


  getAcronyms(toAcronym: string) {
    let nameSplit = toAcronym.split(" ");
    let acronyms = "";
    if(nameSplit.length > 1) {
        for(let per of nameSplit) {
            acronyms += per.substr(0, 1);
        }
    }
    else {
        acronyms = nameSplit[0].substr(0, 3);
    }
    return acronyms.toUpperCase();
  }
}
