import { Component, OnInit } from '@angular/core';
import { ImagenesAPIService } from '../../../Services/imagenes-api.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { ScoresService } from 'src/app/Services/scores.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { UserFirestoreService } from 'src/app/Services/user-firestore-service.service';
import UserInterface from 'src/app/Entities/user-interface';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit {

  random: any;
  pickedMovie: any;
  movieListId = [{ 'id': 694, 'name': 'El Resplandor' }];

  usersArray: UserInterface[] | undefined;
  currentUser?: UserInterface;
  public currentUserEmail: any;

  imageUrl = '';
  movieName = "";

  constructor(private datosApi: ImagenesAPIService, private scoreService: ScoresService,
    private angularFireAuth: AngularFireAuth, private userFService: UserFirestoreService) {
    this.pickMovie();
/*     this.loadMovie(782);
    this.loadMovie(680);
    this.loadMovie(493922);
    this.loadMovie(550); */
    this.obtenerLista(782);
/*     this.obtenerLista(493922); */


this.angularFireAuth.onAuthStateChanged((user) => {
  if (user) {
    this.currentUserEmail = user.email;
  }})

  this.userFService.getUsers().subscribe(users => {
    this.usersArray = users;
    this.currentUser = this.usersArray?.find(u => u.email === this.currentUserEmail);
  })
  }

  chequearPelicula(id: any) {
    if (this.pickedMovie.id == id) {

      const currentDate = Timestamp.now();
      this.scoreService.addScore({
        game: 'Preguntados',
        userName: this.currentUser?.userName,
        savedAt: currentDate,
        score: 10,
        userEmail: this.currentUserEmail,
      });

      Swal.fire({
        icon: 'success',
        title: 'Great !',
        text: 'Won 10 points',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Too bad !',
        text: 'Lost 10 points',
        showConfirmButton: false,
        timer: 1500
      });

      const currentDate = Timestamp.now();
      this.scoreService.addScore({
        game: 'Preguntados',
        userName: this.currentUser?.userName,
        savedAt: currentDate,
        score: -10,
        userEmail: this.currentUserEmail,
      });
    }
    this.pickMovie();

  }

  pickMovie() {
    this.random = Math.floor((Math.random() * (this.movieListId.length - 1)));
    this.pickedMovie = this.movieListId[this.random];


    this.datosApi.obtenerFrames((this.pickedMovie.id)).subscribe({
      next: 
      (pelicula: any) => {
        const random = Math.floor((Math.random() * (pelicula.backdrops.length - 1)));
        this.imageUrl = 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/' + pelicula.backdrops[random].file_path;
      },
      error: error => { console.log(error) }});
  }

  loadMovie(idStart: number) {
      this.datosApi.obtenerDatos((idStart)).subscribe({
        next: (pelicula: any) => {
          this.movieName = pelicula.title;
          if(!this.movieListId.some(movie => movie.id === idStart))
          {
            if(pelicula.popularity > 14)
            {
              this.movieListId.push({ 'id': idStart, 'name': this.movieName });
              this.sortList();
            }
          }
        },
        error: error => { console.log(error) }});
  }

  obtenerLista(id: number) {
      this.datosApi.obtenerListaGenero((id)).subscribe({
        next:
        (peliculas: any) => {
          peliculas.results.map((item:any) => {
            this.loadMovie(item.id);
          });
        },
        error: error => { console.log(error) }});
  }

  compare(a: any, b: any) {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    }
    return 0;
  }

  sortList(){
    this.movieListId.sort(this.compare);
  }

  ngOnInit(): void {
  }

}
