import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, updateDoc, doc } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import UserInterface from '../Entities/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserFirestoreService {

  constructor() {

  }

  addUser(user: UserInterface){
    const userRef = collection(getFirestore(), 'users');
    return addDoc(userRef, user);
  }

  updateUser(user: UserInterface, date: string){
    const userDocRef = doc(getFirestore(), `users/${user.id}`);
    return updateDoc(userDocRef, { loginDate: date });
  }


  getUsers(){
    const userRef = collection(getFirestore(), 'users');
    return collectionData(userRef, { idField : 'id' }) as Observable<UserInterface[]>;
  }

  updateUserPoints(user: UserInterface, points: number){
    const userDocRef = doc(getFirestore(), `users/${user.id}`);
  /*   return updateDoc(userDocRef, { loginDate: date }); */
  }



}
