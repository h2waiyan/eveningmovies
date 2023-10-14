import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Result, MovieResponse } from './movie_interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) {
  }

  loading = true;
  popularMovies: Result[] = [];
  nowplayingMovies: Result[] = [];
  upcomingMovies: Result[] = [];
  topratedMovies: Result[] = [];


  ngOnInit() {

    this.apiService.getMovies('popular').subscribe(
      {
        next: (data: MovieResponse) => {
          this.popularMovies = data.results!;
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.message, err.status,);
          alert(`Something went wrong. ${err.message}`);
          this.loading = false;
        }
      }
    )

    this.apiService.getMovies('upcoming').subscribe(
      (data: MovieResponse) => {
        this.upcomingMovies = data.results!;
      }
    )

    this.apiService.getMovies('top_rated').subscribe((data: MovieResponse) => {
      this.topratedMovies = data.results!;
    })

    this.apiService.getMovies('now_playing').subscribe((data: MovieResponse) => {
      this.nowplayingMovies = data.results!;
    })
  }
}
