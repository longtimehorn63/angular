import { Component, trigger, state, style, transition, animate, keyframes, group } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  /*
  Angular animations transition an element between two states
  */
  animations:[
    trigger('divState', [  // divState is just a name we defined, could be anything
      state('normal', style({
        'background-color' : 'red',
        transform: 'translateX(0)'
      })),  // state names are defined by us
      state('highlighted', style({
        'background-color' : 'blue',
        transform: 'translateX(100px)'
      })),
      // transition('normal => highlighted', animate(300)),
      // transition('highlighted => normal', animate(800)),  // directional states and how many milliseconds it should take to get there
      transition('normal <=> highlighted', animate(300)), // <=> use the same timing
    ]),
    trigger('wildState', [  // wildState is just a name we defined, could be anything
      state('normal', style({
        'background-color' : 'red',
        transform: 'translateX(0) scale(1)'
      })),  // state names are defined by us
      state('highlighted', style({
        'background-color' : 'green',
        transform: 'translateX(100px) scale(1)'
      })),
      state('shrunken', style({
        'background-color' : 'green',
        transform: 'translateX(0) scale(0.5)'
      })),
      transition('normal => highlighted', animate(300)),
      transition('highlighted => normal', animate(800)),  // directional states and how many milliseconds it should take to get there
      transition('shrunken <=> *', [
        style ({                            // starting phase
          'background-color' : 'orange'
        }),
        animate(1000, style({   // apply a style over time
          borderRadius: '50px'
        })),
        animate(500)  // tranisition to the end state
      ]), // wildcard from and to any state
    ]),
    trigger('list1', [  
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),  
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translateX(-100px)'
        }),
        animate(300)
      ]), // void is an element that wasn't there in the DOM  this is non-existant to ,  
      transition('* => void',
        animate(300, style({
          transform: 'translateX(100px)',
          opacity: 0
        }))
      ), 
    ]),
    trigger('list2', [  
      state('in', style({
        opacity: 1,
        transform: 'translateX(0)'
      })),  
      transition('void => *', [
         animate(1000, keyframes([
           style({
            transform: 'translateX(-100px)',
            opacity: 0,
            offset: 0  // % of time of the animate
           }),
           style({
            transform: 'translateX(-50px)',
            opacity: 0.5,
            offset: 0.3
           }),
           style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset: 0.8
           }),
           style({
            transform: 'translateX(-20px)',
            opacity: 1,
            offset: 1
           }),
         ]))
      ]), // void is an element that wasn't there in the DOM  this is non-existant to ,  
      transition('* => void', [
        group([     // grouping the animations has them start at the same time
          animate(200, style({
            color: 'red'
          })),
          animate(900, style({
            transform: 'translateX(100px)',
            opacity: 0
          }))
        ])
      ]), 
    ]),
  ]
})
export class AppComponent {
  state = 'normal';
  wildState = 'normal';
  list = ['Milk', 'Sugar', 'Bread'];

    onAdd(item) {
      this.list.push(item);
    }

    onDelete(item){
      const index = this.list.indexOf(item);
      this.list.splice(index, 1);
    }

    onAnimate(){
      this.state === 'normal' ? this.state = 'highlighted' : this.state = 'normal';
      this.wildState === 'normal' ? this.wildState = 'highlighted' : this.wildState = 'normal';
    }

    onShrink(){
      this.wildState = 'shrunken';
    }

    animationStarted(event){
      console.log('started');
      console.log(event);
    }

    animationEnded(event){
      console.log('ended');
      console.log(event);
    }
}
