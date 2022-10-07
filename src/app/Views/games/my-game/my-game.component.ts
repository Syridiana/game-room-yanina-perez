import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Timestamp } from 'firebase/firestore';
import UserInterface from 'src/app/Entities/user-interface';
import { ScoresService } from 'src/app/Services/scores.service';
import { UserFirestoreService } from 'src/app/Services/user-firestore-service.service';
import Swal from 'sweetalert2';
/* import { AngularFireAuth } from "@angular/fire/auth";
import { UserI } from 'src/app/clases/UserI'; */

@Component({
  selector: 'app-my-game',
  templateUrl: './my-game.component.html',
  styleUrls: ['./my-game.component.css']
})
export class MyGameComponent implements OnInit {

  // Representación de la grilla. Cada número representa a una pieza.
  // El 9 es la posición vacía
  grilla = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  /* Estas dos variables son para guardar la posición de la pieza vacía. 
  Esta posición comienza siendo la [2, 2]*/
  filaVacia = 2;
  columnaVacia = 2;
  points = 0;

  movimientos = [''];
  direccion = "";
  ultimoMov = "";

  usersArray: UserInterface[] | undefined;
  currentUser?: UserInterface;

  public currentUserEmail: any;


  constructor(private angularFireAuth: AngularFireAuth, private scoreService: ScoresService,
    private userFService: UserFirestoreService) {
    this.mezclarPiezas(30);

    this.angularFireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserEmail = user.email;
      }})

      this.userFService.getUsers().subscribe(users => {
        this.usersArray = users;
        this.currentUser = this.usersArray?.find(u => u.email === this.currentUserEmail);
      })
  }

  /* Esta función va a chequear si el Rompecabezas esta en la posicion ganadora. 
  Existen diferentes formas de hacer este chequeo a partir de la grilla. */
  chequearSiGano() {
    var arr = '';
    for (var i = 0; i < this.grilla.length; i++) {
      for (var j = 0; j < this.grilla.length; j++) {
        arr = arr + this.grilla[i][j];
      }
    }
    if (arr == '123456789') {
      if(this.movimientos.length < 12) {
        this.points  = 300;
      } else if (this.movimientos.length < 24){
        this.points  = 100;
      } else {
        this.points = 10;
      }

      const currentDate = Timestamp.now();
      this.scoreService.addScore({
        game: 'Puzzle',
        userName: this.currentUser?.userName,
        savedAt: currentDate,
        score: this.points,
        userEmail: this.currentUserEmail,
      });

      return true;
    } else {
      return false;
    }
  }


  // Implementar alguna forma de mostrar un cartel que avise que ganaste el juego
  mostrarCartelGanador() {
    if (this.chequearSiGano()) {
      Swal.fire({
        icon: 'success',
        title: 'Ganaste ' + this.points + ' puntos.',
        text: 'Te llevó ' + this.movimientos.length + ' movimientos.',
        showConfirmButton: false,
        timer: 2500
      });

      this.points = 0;
    }

  }



  /* Función que intercambia dos posiciones en la grilla.
  Pensar como intercambiar dos posiciones en un arreglo de arreglos. 
  Para que tengas en cuenta:
  Si queremos intercambiar las posiciones [1,2] con la [0, 0], si hacemos: 
  arreglo[1][2] = arreglo[0][0];
  arreglo[0][0] = arreglo[1][2];
  En vez de intercambiar esos valores vamos a terminar teniendo en ambas posiciones el mismo valor.
  Se te ocurre cómo solucionar esto con una variable temporal?
  */
  intercambiarPosicionesGrilla(filaPos1: any, columnaPos1: any, filaPos2: any, columnaPos2: any) {
    var primerNumero = this.grilla[filaPos1][columnaPos1];
    var segundoNumero = this.grilla[filaPos2][columnaPos2];
    this.grilla[filaPos1][columnaPos1] = segundoNumero;
    this.grilla[filaPos2][columnaPos2] = primerNumero;
  }

  // Actualiza la posición de la pieza vacía
  actualizarPosicionVacia(nuevaFila: any, nuevaColumna: any) {
    this.filaVacia = nuevaFila;
    this.columnaVacia = nuevaColumna;
  }


  // Para chequear si la posicón está dentro de la grilla.
  posicionValida(fila: any, columna: any) {
    if (fila >= 0 && fila < 3 && columna >= 0 && columna < 3) {
      return true;
    } else {
      return false;
    }

  }

  /* Movimiento de fichas, en este caso la que se mueve es la blanca intercambiando su posición con otro elemento.
  Las direcciones están dadas por números que representa: arriba (38), abajo (40), izquierda (37), derecha (39) */
  moverEnDireccion(direccion: string) {
    let nuevaFilaPiezaVacia: any;
    let nuevaColumnaPiezaVacia: any;

    // Mueve pieza hacia la abajo, reemplazandola con la blanca
    if (direccion === '↓') {
      nuevaFilaPiezaVacia = this.filaVacia - 1;
      nuevaColumnaPiezaVacia = this.columnaVacia;
    }

    // Mueve pieza hacia arriba, reemplazandola con la blanca
    else if (direccion === '↑') {
      nuevaFilaPiezaVacia = this.filaVacia + 1;
      nuevaColumnaPiezaVacia = this.columnaVacia;
    }

    // Mueve pieza hacia la derecha, reemplazandola con la blanca
    else if (direccion === '→') {
      nuevaFilaPiezaVacia = this.filaVacia;
      nuevaColumnaPiezaVacia = this.columnaVacia - 1;
    }

    // Mueve pieza hacia la izquierda, reemplazandola con la blanca
    else if (direccion === '←') {
      nuevaFilaPiezaVacia = this.filaVacia;
      nuevaColumnaPiezaVacia = this.columnaVacia + 1;
    }

    /* A continuación se chequea si la nueva posición es válida, si lo es, se intercambia. 
    Para que esta parte del código funcione correctamente deberás haber implementado 
    las funciones posicionValida, intercambiarPosicionesGrilla y actualizarPosicionVacia */
    if (this.posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
      this.intercambiarPosiciones(this.filaVacia, this.columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
      this.actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
      this.guardarUltimoMovimiento(direccion);
    }
  }

  guardarUltimoMovimiento(movimiento: string) {
    this.ultimoMov = movimiento;
    this.movimientos.push(this.direccion);
  }

  //////////////////////////////////////////////////////////
  ////////A CONTINUACIÓN FUNCIONES YA IMPLEMENTADAS.////////
  /////////NO TOCAR A MENOS QUE SEPAS LO QUE HACES//////////
  //////////////////////////////////////////////////////////

  /* Las funciones y variables que se encuentran a continuación ya están implementadas.
  No hace falta que entiendas exactamente que es lo que hacen, ya que contienen
  temas aún no vistos. De todas formas, cada una de ellas tiene un comentario
  para que sepas que se está haciendo a grandes rasgos. NO LAS MODIFIQUES a menos que
  entiendas perfectamente lo que estás haciendo! */


  /* Funcion que realiza el intercambio logico (en la grilla) y ademas actualiza
  el intercambio en la pantalla (DOM). Para que funcione debera estar implementada
  la funcion intercambiarPosicionesGrilla() */
  intercambiarPosiciones(fila1: any, columna1: any, fila2: any, columna2: any) {
    // Intercambio posiciones en la grilla
    let pieza1 = this.grilla[fila1][columna1];
    let pieza2 = this.grilla[fila2][columna2];

    this.intercambiarPosicionesGrilla(fila1, columna1, fila2, columna2);
    this.intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);

  }

  /* Intercambio de posiciones de los elementos del DOM que representan
  las fichas en la pantalla */

  intercambiarPosicionesDOM(idPieza1: any, idPieza2: any) {
    // Intercambio posiciones en el DOM
    let elementoPieza1 = document.getElementById(idPieza1);
    let elementoPieza2 = document.getElementById(idPieza2);
    let padre:any;
    let clonElemento1:any;
    let clonElemento2:any;

    if(elementoPieza1 != null){
      padre = elementoPieza1.parentNode;
    }

    if(elementoPieza1 != null){
      clonElemento1 = elementoPieza1.cloneNode(true);
    }

    if(elementoPieza2 != null){
      clonElemento2 = elementoPieza2.cloneNode(true);
    }

    if(clonElemento1 != null){
      padre.replaceChild(clonElemento1, elementoPieza2);
    }

    if(clonElemento2 != null){
      padre.replaceChild(clonElemento2, elementoPieza1);
    }

  }

  /* Actualiza la representación visual del último movimiento 
  en la pantalla, representado con una flecha. */
  actualizarUltimoMovimiento(movimiento: string) {
    this.moverEnDireccion(movimiento);
    this.mostrarCartelGanador();
     }


  /* Función que mezcla las piezas del tablero una cantidad de veces dada.
  Se calcula una posición aleatoria y se mueve en esa dirección. De esta forma
  se mezclará todo el tablero. */

  mezclarPiezas(veces: number) {
    if (veces <= 0) {
      return;
    }

    let direcciones = ['↓', '↑', '→', '←'
    ];

    let direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
    this.moverEnDireccion(direccion);

    setTimeout(() => {
      this.mezclarPiezas(veces - 1);
    }, 100);
    this.movimientos.pop();
  }

  reiniciar() {
    this.mezclarPiezas(30);
    this.movimientos = [''];

  }


  ngOnInit(): void {
  }

}
