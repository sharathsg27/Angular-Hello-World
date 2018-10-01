import {Component, OnInit} from '@angular/core';
import {HeroesService} from './heroes.service';
import {Observable} from 'rxjs';

import HeroesInterface from './heroes.interface';
import {fade} from '../animations/animations';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  animations: [
    fade
  ]
})
export class HeroesComponent implements OnInit {
  heroes: any[];

  constructor(private heroesService: HeroesService) {
  }

  ngOnInit(): void {
    this.getHeroes().subscribe(heroes => {
      this.heroes = heroes;
    });
  }

  getHeroes(): Observable<HeroesInterface[]> {
    return this.heroesService.getHeroes();
  }

  addHero(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }

    this.heroesService.addHero({name} as HeroesInterface)
      .subscribe(hero => {
        this.heroes.unshift(hero);
      });
  }

}
