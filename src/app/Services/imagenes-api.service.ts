import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ImagenesAPIService {

  constructor(private http:HttpClient) { 
  }
  // imagenes: https://www.themoviedb.org/t/p/w533_and_h300_bestv2/
//f01de0fa0017ce1106e1fab2dd2685b7 apikey
  public obtenerFrames(movieId:any){
    const url = 'https://api.themoviedb.org/3/movie/' + movieId + '/images?api_key=f01de0fa0017ce1106e1fab2dd2685b7';
    return this.http.get(url, 
    {headers: new HttpHeaders({'X-Api-Key': 'norcYee9ziaM/Wnd38PvAg==aZknDrLkaDdUvsot'})
  });
}

public obtenerDatos(movieId:any){
  const url = 'https://api.themoviedb.org/3/movie/' + movieId + '?api_key=f01de0fa0017ce1106e1fab2dd2685b7';
  return this.http.get(url, 
  {headers: new HttpHeaders({'X-Api-Key': 'norcYee9ziaM/Wnd38PvAg==aZknDrLkaDdUvsot'})
});
}

public obtenerListaGenero(movieId:number){
  const url = 'https://api.themoviedb.org/3/movie/' + movieId + '/recommendations?api_key=f01de0fa0017ce1106e1fab2dd2685b7';
  
  return this.http.get(url, 
  {headers: new HttpHeaders({'X-Api-Key': 'norcYee9ziaM/Wnd38PvAg==aZknDrLkaDdUvsot'})
});
}
}
