import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../services/api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  constructor(private activatedRoute: ActivatedRoute, private apiService: ApiService) { }
  movieId: String = '';

  casts = [];
  overview: any = {};

  backdropImage = '';

  ngOnInit() {

    this.movieId = this.activatedRoute.snapshot.params['id'];

    this.apiService.getCasts(this.movieId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.casts = data['cast'];
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    }) // Observable

    this.apiService.getMovieDetails(this.movieId).subscribe({
      next: (data: any) => {
        console.log(data);
        this.overview = data;
        this.backdropImage = "https://image.tmdb.org/t/p/w500" + this.overview['backdrop_path']
        console.log(this.backdropImage);
      },
      error: (err: HttpErrorResponse) => {
        console.log(err);
      }
    })

  }
}
