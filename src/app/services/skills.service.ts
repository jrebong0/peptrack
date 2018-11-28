import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {map} from 'rxjs/operators';
import {Skill} from '../models/skill.model';
import {UserAccessService} from './user-access.service';

@Injectable({
    providedIn: 'root'
})
export class SkillsService {
    private skillCollection: AngularFirestoreCollection<Skill>;

    constructor(
        private db: AngularFirestore,
        private userAccessService: UserAccessService,
    ) {
        this.skillCollection = db.collection<Skill>('skills');
    }

    getSkills() {
        return this.skillCollection.snapshotChanges().pipe(
            map(items => {
                return items.map(item => {
                    const id = item.payload.doc.id;
                    const data = item.payload.doc.data();
                    return {id, ...data};
                });
            })
        );
    }

    addSkill(item: {name: string}) {
        let userLoginRef = this.db.collection('employees').doc(this.userAccessService.hasUserLoggedIn()).ref;
        let addSkill = {
            name: item.name,
            createdBy: userLoginRef,
            dateCreated: new Date()
        }
        return this.db.collection('skills').add(addSkill);
    }

    updateSkill(item: {name: string}, key: string) {
        let userLoginRef = this.db.collection('employees').doc(this.userAccessService.hasUserLoggedIn()).ref;
        let updateSkill = {
            name: item.name,
            updateBy: userLoginRef,
            dateUpdated: new Date()
        }
        return this.db.collection('skills').doc(key).update(updateSkill);
    }
}
