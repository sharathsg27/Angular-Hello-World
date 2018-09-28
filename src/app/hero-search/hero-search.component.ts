import {Component, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

import {HeroesService} from '../heroes/heroes.service';
import {Observable, Subject} from 'rxjs';
import HeroesInterface from '../heroes/heroes.interface';

@Component({
  selector: 'app-hero-search',
  templateUrl: './hero-search.component.html',
  styleUrls: ['./hero-search.component.css']
})
export class HeroSearchComponent implements OnInit {

  heroes$: Observable<HeroesInterface[]>;
  private searchTerms = new Subject<string>();

  constructor(private heroesService: HeroesService) {
  }

  // Push a search term every time User enters
  search(term: string) {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.heroes$ = this.searchTerms.pipe(
      debounceTime(1000),

      distinctUntilChanged(),

      switchMap((term: string) => this.heroesService.searchHeroes(term))
    );
  }

}
