import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  constructor(private http: HttpClient) { }

  register(email: String, username: String, password: String) {
    const url = 'https://notes.eizarphyo.me/noteapp/v1/auth/signup';
    const body = {
      "email": email,
      "username": username,
      "password": password
    };

    const options = {
      headers: new HttpHeaders({
        'Accept': 'text/html,application/json',
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(url, body, options);
  }

  login(loginInfo: any) {
    const url = 'https://notes.eizarphyo.me/noteapp/v1/auth/signin';


    const options = {
      headers: new HttpHeaders({
        'Accept': 'text/html,application/json',
        'Content-Type': 'application/json',
      }),
    };

    return this.http.post(url, loginInfo, options);
  }

  getMovies(movieType: String) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieType}?language=en-US&page=10&api_key=050c28541f900007285c3020069bfd62`); // observable
  }

  getCasts(movieId: String) {
    return this.http.get(`http://api.themoviedb.org/3/movie/${movieId}/credits?api_key=050c28541f900007285c3020069bfd62`); // observable
  }

  getMovieDetails(movieId: String) {
    return this.http.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=050c28541f900007285c3020069bfd62`)
  }

  searchMovie(movieName: String) {
    return this.http.get(`https://api.themoviedb.org/3/search/movie?query=${movieName}&include_adult=false&language=en-US&page=1&api_key=050c28541f900007285c3020069bfd62`)
  }

  getRecommendedMovies() {

  }
}

