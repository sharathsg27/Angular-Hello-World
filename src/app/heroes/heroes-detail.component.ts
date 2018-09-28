import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import HeroesInterface from './heroes.interface';
import {HeroesService} from './heroes.service';

@Component({
  selector: 'app-heroes-detail',
  templateUrl: 'heroes-detail.component.html'
})

export class HeroesDetailComponent implements OnInit {
  @Input() hero: HeroesInterface;

  constructor(private route: ActivatedRoute,
              private location: Location,
              private heroService: HeroesService) {


  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  update(): void {
    this.heroService.updateHero(this.hero)
      .subscribe(() => this.goBack());
  }

  delete(): void {
    this.heroService.deleteHero(this.hero).subscribe();
    this.goBack();
  }

  goBack() {
    this.location.back();
  }
}

