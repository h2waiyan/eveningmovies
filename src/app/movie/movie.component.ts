import { Component, Input } from '@angular/core';
import { Result } from '../home/movie_interface';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent {
  @Input() movieTitle: String = 'Child Comp';
  @Input() movieList?: Result[];
}
