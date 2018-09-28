import {Component, OnInit} from '@angular/core';
import HeroesInterface from '../heroes/heroes.interface';
import {HeroesService} from '../heroes/heroes.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: HeroesInterface[];

  constructor(private heroesService: HeroesService) {
  }

  ngOnInit() {
    this.heroesService.getHeroes()
      .subscribe(heroes => this.heroes = heroes.splice(1, 5));
  }

}
