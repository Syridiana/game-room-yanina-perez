import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { addDoc, FirestoreModule, collection, Firestore, doc } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import UserInterface from '../Entities/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserFirestoreService {

  constructor(private firestore: Firestore) {

  }

  addUser(user: UserInterface){
    const userRef = collection(getFirestore(), 'users');
    
    console.log(this.firestore)
    return addDoc(userRef, user);
  }


}
