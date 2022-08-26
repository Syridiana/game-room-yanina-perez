import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Entidades/usuario';

@Component({
  selector: 'app-juego',
  templateUrl: './juego.component.html',
  styleUrls: ['./juego.component.css']
})
export class JuegoComponent implements OnInit {

  usuario:Usuario = new Usuario();

  constructor() { 
    this.usuario.nombre = '';
  }

  ngOnInit(): void {
    this.usuario.nombre = "Kiki";
    this.usuario.apellido = "Reina";
  }


}
