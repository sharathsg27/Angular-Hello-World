import {Component, Input, OnInit} from '@angular/core';
import HeroesInterface from '../heroes/heroes.interface';
import {HeroesService} from '../heroes/heroes.service';
import {fade, slide} from '../animations/animations';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  animations: [
    slide,
    fade
  ]
})
export class DashboardComponent implements OnInit {
  @Input() hero: HeroesInterface;
  heroes: HeroesInterface[];

  constructor(private heroesService: HeroesService) {
  }

  ngOnInit() {
    this.heroesService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.splice(1, 5));
  }

  delete(hero): void {
    this.heroes.splice(hero, 1);
    /*this.heroesService.deleteHero(hero).subscribe();*/
  }

}
