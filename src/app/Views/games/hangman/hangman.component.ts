import { Component, OnInit } from '@angular/core';
/* import { DBService } from '../../servicios/db.service';
import { AngularFireAuth } from "@angular/fire/auth";
import { UserI } from 'src/app/clases/UserI'; */

@Component({
  selector: 'app-hangman',
  templateUrl: './hangman.component.html',
  styleUrls: ['./hangman.component.css']
})
export class HangmanComponent implements OnInit {
  palabras = [
    ["R", "A", "D", "I", "O", "L", "O", "G", "I", "A"],
    ["C", "A", "M", "A", "S", "T", "R", "O"],
    ["A", "U", "T", "O", "M", "O", "T", "O", "R"],
    ["E", "X", "P", "E", "D", "I", "C", "I", "O", "N"],
    ["B", "A", "L", "L", "E", "S", "T", "A"],
    ["I", "N", "T", "E", "R", "V", "E", "N", "C", "I", "O", "N"]
  ];
  random: any;
  palabra: any;
  palabraGuiones: any;
  fehler = 0;
  letraIngresada: string;
  letraCorrecta: boolean;
  letrasErroneas: any;
  vidas = [1, 1, 1, 1, 1, 1];
  message = 'Be brave';
  won = false;
/*   public currentUser!: UserI | null; */

  constructor(/* public dbService: DBService, private angularFireAuth: AngularFireAuth */) {
    this.random = Math.floor((Math.random() * (this.palabras.length - 1)));
    this.palabra = this.palabras[this.random];
    this.palabraGuiones = new Array(this.palabra.length);
    this.formarGuiones();
    this.letraIngresada = "";
    this.letraCorrecta = false;
    this.letrasErroneas = [];
    
/*     this.angularFireAuth.onAuthStateChanged((user) => {
      this.currentUser = user;
    }); */

  }

  formarGuiones() {
    for (var i = 0; i < this.palabraGuiones.length; i++) {
      this.palabraGuiones[i] = "_ ";
    }
  }

  chequearLetraIngresada(letra: string) {
    this.letraCorrecta = false;
    this.letraIngresada = letra;
    for (var i = 0; i < this.palabra.length; i++) {
      if (this.palabra[i] === this.letraIngresada) {
        this.palabraGuiones[i] = this.letraIngresada + " ";
        this.letraCorrecta = true;
      }
    }

    if (!this.letraCorrecta) {
      this.letrasErroneas.push(this.letraIngresada);
      this.vidas.pop();
    }

    if (this.letrasErroneas.length === 6) {
      this.message = 'Ups! You\'re dead now. You lost 100 points';
/*       this.dbService.addPuntaje(-100);
      this.dbService.updatePuntaje(-100); */
    }

    this.chequearPalabraCompleta();

    this.letraIngresada = "";
  }

  chequearPalabraCompleta() {
    let flag = true;

    for (var i = 0; i < this.palabra.length; i++) {
      if (this.palabraGuiones[i] === "_ ") {
        flag = false;
      }
    }
    if (flag) {
      this.message = 'You\'re free ! You earned 100 points';
      this.won = true;
/*       this.dbService.addPuntaje(100);
      this.dbService.updatePuntaje(100); */
    }

  }

  juegoNuevo() {
    this.random = Math.floor((Math.random() * (this.palabras.length - 1)));
    this.palabra = this.palabras[this.random];
    this.palabraGuiones = new Array(this.palabra.length);
    this.formarGuiones();
    this.letraIngresada = "";
    this.letraCorrecta = false;
    this.letrasErroneas = [];
    this.vidas = [1, 1, 1, 1, 1, 1];
    this.message = 'Be brave';
    this.won = false;

  }


  ngOnInit(): void {
  }


}