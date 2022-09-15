import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { addDoc, collection, Firestore, collectionData } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import UserInterface from '../Entities/user-interface';

@Injectable({
  providedIn: 'root'
})
export class UserFirestoreService {

  constructor(private firestore: Firestore) {

  }

  addUser(user: UserInterface){
    const userRef = collection(getFirestore(), 'users');
    return addDoc(userRef, user);
  }


  getUsers(){
    const userRef = collection(getFirestore(), 'users');
    return collectionData(userRef, { idField : 'id' }) as Observable<UserInterface[]>;
  }

  findUser(email:string) {
/*     const userArray = this.getUsers();
    userArray.find() */
  }

  isUser(user: UserInterface, email: string) {
    return user.email === email;
  }


}
