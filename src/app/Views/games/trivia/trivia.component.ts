import { Component, OnInit } from '@angular/core';
import { ImagenesAPIService } from '../../../Services/imagenes-api.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.css']
})
export class TriviaComponent implements OnInit {

  random: any;
  pickedMovie: any;
  movieListId = [{ 'id': 694, 'name': 'The shining' }];

  imageUrl = '';
  movieName = "";

  constructor(/* private datosApi: ImagenesAPIService */) {
/*     this.pickMovie();
    this.loadMovie(782);
    this.loadMovie(680);
    this.loadMovie(493922);
    this.loadMovie(550);
    this.obtenerLista(782);
    this.obtenerLista(493922); */
  }

  chequearPelicula(id: any) {
    if (this.pickedMovie.id == id) {

      Swal.fire({
        icon: 'success',
        title: 'Great !',
        text: 'Good Job',
        showConfirmButton: false,
        timer: 1500
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Too bad !',
        text: 'That\'s wrong',
        showConfirmButton: false,
        timer: 1500
      });
    }
  /*   this.pickMovie(); */

  }

/*   pickMovie() {
    this.random = Math.floor((Math.random() * (this.movieListId.length - 1)));
    this.pickedMovie = this.movieListId[this.random];
    this.datosApi.obtenerFrames((this.pickedMovie.id)).subscribe(
      (pelicula: any) => {
        const random = Math.floor((Math.random() * (pelicula.backdrops.length - 1)));
        this.imageUrl = 'https://www.themoviedb.org/t/p/w533_and_h300_bestv2/' + pelicula.backdrops[random].file_path;
      },
      error => { console.log(error) });
  } */

/*   loadMovie(idStart: number) {
      this.datosApi.obtenerDatos((idStart)).subscribe(
        (pelicula: any) => {
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
        error => { console.log(error) });
  } */

/*   obtenerLista(id: number) {
      this.datosApi.obtenerListaGenero((id)).subscribe(
        (peliculas: any) => {
          peliculas.results.map((item:any) => {
            this.loadMovie(item.id);
          });
        },
        error => { console.log(error) });
  } */

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
