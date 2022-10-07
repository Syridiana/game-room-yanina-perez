import { Injectable } from '@angular/core';
import { ScoreI } from '../Entities/score-interface';
import { addDoc, collection, collectionData, query, orderBy } from '@angular/fire/firestore';
import { getFirestore, Firestore } from 'firebase/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScoresService {

  constructor() { }


  addScore(score: ScoreI){
    const scoreRef = collection(getFirestore(), 'scores');
    return addDoc(scoreRef, score);
  }

  getScores(){
    const scoreRef = collection(getFirestore(), 'scores');
    const orderedScores = query(scoreRef, orderBy("savedAt", 'desc'));
    return collectionData(orderedScores) as Observable<ScoreI[]>;
  }
}
