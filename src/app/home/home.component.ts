import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ApiService } from '../services/api.service';
import { Result, MovieResponse } from './movie_interface';
import { Subscription } from 'rxjs';

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
  searchResults: Result[] = [];
  searchName: String = '';
  movieSubscription: Subscription = new Subscription();

  searchMovie() {
    // alert(`>>>>>> Searching... ${this.searchName}`);
    this.apiService.searchMovie(this.searchName).subscribe(
      {
        next: (data: MovieResponse) => {
          this.searchResults = data.results!;
          this.loading = false;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.message, err.status,);
          alert(`Something went wrong. ${err.message}`);
          this.loading = false;
        }
      }
    )
  }

  async ngOnInit() {

    // this.getMovie('popular')
    //   .then((pR) => {
    //     this.popularMovies = pR as Result[]
    //   })
    //   .catch((error: any) => {
    //     alert("Something wrong")
    //   })
    //   .finally(() => {
    //     this.loading = false;
    //   })

    try {
      this.popularMovies = await this.getMovie('popular') as Result[];
      this.loading = false;
    } catch (error: any) {
      alert("Something wrong");
      this.loading = false;
    }

    this.nowplayingMovies = await this.getMovie('now_playing') as Result[];
    this.upcomingMovies = await this.getMovie('upcoming') as Result[];


    this.movieSubscription = this.apiService.getMovies('top_rated').subscribe(
      {
        next: (data: MovieResponse) => {
          console.log(data);
          this.topratedMovies = data.results!;
        },
        error: (err: HttpErrorResponse) => {
          console.log(err.message, err.status,);
          alert(`Something went wrong. ${err.message}`);
        }
      }
    )
  }

  getMovie(movieType: String) {
    return new Promise((resolve, reject) => {
      this.movieSubscription = this.apiService.getMovies(movieType).subscribe(
        {
          next: (data: MovieResponse) => {
            console.log(data);

            resolve(data.results as Result);
          },
          error: (err: HttpErrorResponse) => {
            console.log(err.message, err.status,);
            alert(`Something went wrong. ${err.message}`);

            reject(err)
          }
        }
      )
    })
  }

  ngOnDestroy() {
    if (this.movieSubscription) {
      this.movieSubscription.unsubscribe();
    }
  }
}
