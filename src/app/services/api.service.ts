import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  getMovies(movieType: String) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieType}?language=en-US&page=10&api_key=050c28541f900007285c3020069bfd62`); // observable
  }

  getCasts(movieId: String) {
    return this.http.get(`http://api.themoviedb.org/3/movie/${movieId}/credits?api_key=050c28541f900007285c3020069bfd62`); // observable

  }
}
