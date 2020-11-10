import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie, CarteleraResponse } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  public movies: Movie[] = [];
  public moviesSlideshow: Movie[] = [];

  @HostListener('window:scroll',['$event'])
  onScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max = (document.documentElement.scrollHeight || document.body.scrollHeight);

    if (pos > max) {
      // Llamar el servicio

      if (this.peliculasService.cargando) {
        return;
      }

      this.peliculasService.getCartelera()
        .subscribe( (resp:CarteleraResponse) => {
          this.movies.push(...resp.results);
        })
    }
  }

  constructor( private peliculasService: PeliculasService) {
  }

  ngOnInit(): void {
    this.peliculasService.getCartelera()
    .subscribe( resp => {
      //console.log(resp.results);
      this.movies = resp.results;
      this.moviesSlideshow = resp.results;
    })
  }

  ngOnDestroy() {
    this.peliculasService.resetCarteleraPage();
  }

}
