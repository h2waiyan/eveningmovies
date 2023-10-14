import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
  constructor(private activatedRoute: ActivatedRoute) { }
  movieId: String = '';
  ngOnInit() {
    this.movieId = this.activatedRoute.snapshot.params['id'];
  }
}
