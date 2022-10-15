import { Injectable } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {collection, getFirestore, onSnapshot, query, serverTimestamp, where} from "@angular/fire/firestore";
import {Entry} from "./entry-model";

@Injectable({
  providedIn: 'root'
})
export class EntryService {

  constructor(private angularFirestore: AngularFirestore) {

  }

  getAllEntries(){
    return this.angularFirestore.collection<Entry>("entry-collection", ref => ref.orderBy('creationDate')).valueChanges()
  }

  addToFirestore(name: string, start: string, end: string, duration: string){
    return this.angularFirestore.collection("entry-collection").doc().set({
      name: name,
      start: start,
      end: end,
      duration: duration,
      creationDate: serverTimestamp()
    })
  }

  deleteByDocumentID(name: string) {
    this.angularFirestore
      .collection('entry-collection', (ref) => ref.where('name', '==', name))
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .delete()
            .then(() => {
              console.log('Document successfully deleted!');
            })
            .catch(function (error) {
              console.error('Error removing document: ', error);
            });
        });
      });
  }

  updateEntry(oldName : string, name: string, start: string, end: string, duration: string){

    const db = getFirestore();
    const colRef = collection(db, 'entry-collection')
    const q = query(colRef, where("name", "==", oldName))

    let updateData = {
      name: name,
      start: start,
      end: end,
      duration: duration,
      creationDate: serverTimestamp()
    };

    onSnapshot(q, (snapshot) => {
      let entries: { id: string; }[] = []
      snapshot.docs.forEach((doc) => {
        entries.push({ ...doc.data(), id: doc.id})
        return this.angularFirestore.collection('entry-collection').doc(entries[0].id).set(updateData)

      })
    })
  }

}
