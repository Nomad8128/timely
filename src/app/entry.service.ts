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
    let updateData = {
      name: name,
      start: start,
      end: end,
      duration: duration,
      creationDate: serverTimestamp()
    };

    this.angularFirestore
      .collection('entry-collection', (ref) => ref.where('name', '==', oldName))
      .get()
      .subscribe((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          doc.ref
            .update(updateData)
            .then(() => {
              console.log('Document successfully updated!');
            })
            .catch(function (error) {
              console.error('Error updating document: ', error);
            });
        });
      });
  }
}
