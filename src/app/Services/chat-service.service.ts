import { Injectable } from '@angular/core';
import ChatMessageI from '../Entities/chat-message-interface';
import { addDoc, collection, collectionData } from '@angular/fire/firestore';
import { getFirestore, Firestore } from 'firebase/firestore';
import { Observable } from 'rxjs';
import { query, orderBy, limit } from "firebase/firestore";

@Injectable({
  providedIn: 'root'
})
export class ChatServiceService {

  constructor() { 
  
  }

  sendMessage(message: ChatMessageI){
    const chatRef = collection(getFirestore(), 'chat');
    return addDoc(chatRef, message);
  }

  getMessages(){
    const chatRef = collection(getFirestore(), 'chat');
    const filteredChats = query(chatRef, orderBy("savedAt", 'desc'));
    return collectionData(filteredChats) as Observable<ChatMessageI[]>;
  }

}
