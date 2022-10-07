import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Timestamp } from 'firebase/firestore';
import UserInterface from 'src/app/Entities/user-interface';
import { ScoresService } from 'src/app/Services/scores.service';
import { UserFirestoreService } from 'src/app/Services/user-firestore-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-greater-or-less',
  templateUrl: './greater-or-less.component.html',
  styleUrls: ['./greater-or-less.component.css']
})
export class GreaterOrLessComponent implements OnInit {

  mazoDeCartas = [
    { number: 1, palo: 'Diamantes' }, { number: 2, palo: 'Diamantes' }, { number: 3, palo: 'Diamantes' }, { number: 4, palo: 'Diamantes' },
    { number: 5, palo: 'Diamantes' }, { number: 6, palo: 'Diamantes' }, { number: 7, palo: 'Diamantes' }, { number: 8, palo: 'Diamantes' },
    { number: 9, palo: 'Diamantes' }, { number: 10, palo: 'Diamantes' }, { number: 11, palo: 'Diamantes' }, { number: 12, palo: 'Diamantes' },
    { number: 13, palo: 'Diamantes' },
    { number: 1, palo: 'Picas' }, { number: 2, palo: 'Picas' }, { number: 3, palo: 'Picas' }, { number: 4, palo: 'Picas' },
    { number: 5, palo: 'Picas' }, { number: 6, palo: 'Picas' }, { number: 7, palo: 'Picas' }, { number: 8, palo: 'Picas' },
    { number: 9, palo: 'Picas' }, { number: 10, palo: 'Picas' }, { number: 11, palo: 'Picas' }, { number: 12, palo: 'Picas' },
    { number: 13, palo: 'Picas' },
    { number: 1, palo: 'Corazones' }, { number: 2, palo: 'Corazones' }, { number: 3, palo: 'Corazones' }, { number: 4, palo: 'Corazones' },
    { number: 5, palo: 'Corazones' }, { number: 6, palo: 'Corazones' }, { number: 7, palo: 'Corazones' }, { number: 8, palo: 'Corazones' },
    { number: 9, palo: 'Corazones' }, { number: 10, palo: 'Corazones' }, { number: 11, palo: 'Corazones' }, { number: 12, palo: 'Corazones' },
    { number: 13, palo: 'Corazones' },
    { number: 1, palo: 'Trebol' }, { number: 2, palo: 'Trebol' }, { number: 3, palo: 'Trebol' }, { number: 4, palo: 'Trebol' },
    { number: 5, palo: 'Trebol' }, { number: 6, palo: 'Trebol' }, { number: 7, palo: 'Trebol' }, { number: 8, palo: 'Trebol' },
    { number: 9, palo: 'Trebol' }, { number: 10, palo: 'Trebol' }, { number: 11, palo: 'Trebol' }, { number: 12, palo: 'Trebol' },
    { number: 13, palo: 'Trebol' },
  ];
  cartaActual: any;
  cartaAnterior: any;
  valorElegido: string;
  contadorVictorias = 0;
  paloActual = "";
  numeroActual = "";
  numeroAnterior = "";
  paloAnterior = "";

  usersArray: UserInterface[] | undefined;
  currentUser?: UserInterface;
  public currentUserEmail: any;


  constructor(private scoreService: ScoresService, private angularFireAuth: AngularFireAuth,
    private userFService: UserFirestoreService) {
    this.cartaActual = {};
    this.cartaAnterior = {};
    this.elegirProximaCarta();
    this.valorElegido = "";

    this.angularFireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUserEmail = user.email;
      }
    })

    this.userFService.getUsers().subscribe(users => {
      this.usersArray = users;
      this.currentUser = this.usersArray?.find(u => u.email === this.currentUserEmail);
    })
  }

  elegirProximaCarta() {
    this.cartaAnterior = this.cartaActual;
    let random = Math.floor((Math.random() * (this.mazoDeCartas.length - 1)));
    this.cartaActual = this.mazoDeCartas[random];
    this.paloActual = this.cartaActual.palo;
    this.paloAnterior = this.cartaAnterior.palo;
    if (this.cartaActual.number == 11) {
      this.numeroActual = 'J';
    } else if (this.cartaActual.number == 12) {
      this.numeroActual = 'Q';
    } else if (this.cartaActual.number == 13) {
      this.numeroActual = 'K';
    }
    else {
      this.numeroActual = this.cartaActual.number;
    }

    if (this.cartaAnterior.number == 11) {
      this.numeroAnterior = 'J';
    } else if (this.cartaAnterior.number == 12) {
      this.numeroAnterior = 'Q';
    } else if (this.cartaAnterior.number == 13) {
      this.numeroAnterior = 'K';
    }
    else {
      this.numeroAnterior = this.cartaAnterior.number;
    }

    this.mazoDeCartas.splice(random, 1);


  }

  elegirValor(valor: number) {
    if (valor == 0) {
      if (parseInt(this.cartaAnterior.number) > parseInt(this.cartaActual.number)) {
        this.contadorVictorias++;
        if (this.contadorVictorias == 10) {
          const currentDate = Timestamp.now();
          this.scoreService.addScore({
            game: 'Mayor o Menor',
            userName: this.currentUser?.userName,
            savedAt: currentDate,
            score: 100,
            userEmail: this.currentUserEmail,
          });

          Swal.fire({
            icon: 'success',
            title: 'Great !',
            text: 'Won 10 points',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    } else {
      if (parseInt(this.cartaAnterior.number) < parseInt(this.cartaActual.number)) {
        this.contadorVictorias++;
        if (this.contadorVictorias == 10) {
          const currentDate = Timestamp.now();
          this.scoreService.addScore({
            game: 'Mayor o Menor',
            userName: this.currentUser?.userName,
            savedAt: currentDate,
            score: 100,
            userEmail: this.currentUserEmail,
          });

          Swal.fire({
            icon: 'success',
            title: 'Great !',
            text: 'Won 10 points',
            showConfirmButton: false,
            timer: 1500
          });
        }
      }
    }
  }

  ngOnInit(): void {
  }

  retirarse(){
    const currentDate = Timestamp.now();
    this.scoreService.addScore({
      game: 'Mayor o Menor',
      userName: this.currentUser?.userName,
      savedAt: currentDate,
      score: this.contadorVictorias,
      userEmail: this.currentUserEmail,
    });

    Swal.fire({
      icon: 'success',
      title: 'Great !',
      text: 'Won ' + this.contadorVictorias +  ' points',
      showConfirmButton: false,
      timer: 1500
    });
  }

}

