import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Entities/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import UserInterface from 'src/app/Entities/user-interface';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  usuario:User = new User();
  edadUno:number|undefined;
  edadDos:number|undefined;
  promedio:number|undefined;

  public currentUser!: any | null;


  constructor(private angularFireAuth: AngularFireAuth) { 
    this.angularFireAuth.onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
      }
    })
  }

  ngOnInit(): void {
/*     this.usuario.nombre = "Kiki";
    this.usuario.apellido = "El demonio"; */
    localStorage.setItem("user", JSON.stringify(this.usuario));

  }

  calcular():void{
    if(this.edadUno && this.edadDos ){
      this.promedio = (this.edadDos + this.edadUno) / 2;
    }

  }

  limpiar():void {
    this.edadDos =  undefined;
    this.edadUno = undefined;
    this.promedio = undefined;
  }

}
