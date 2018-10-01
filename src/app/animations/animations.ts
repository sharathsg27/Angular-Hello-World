import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';


export let slide = trigger('slide', [

  state('void', style({opacity: 0})),

  transition(':enter', [
    animate('0.5s ease-out', style({transform: 'translateY(100%)'}))
  ]),

  transition(':leave', [
    animate('0.5s ease-in', keyframes([

      style({
        offset: .2,
        opacity: 1,
        transform: 'translateX(20px)'
      }),

      style({
        offset: 1,
        opacity: 0,
        transform: 'translateX(-100%)'
      })
    ]))
  ]),


]);

export let fade = trigger('fade', [
  transition('void => *', [
    style({backgroundColor: 'yellow', opacity: 0}),
    animate(2000, style({backgroundColor: 'white', opacity: 1}))
  ])
]);
