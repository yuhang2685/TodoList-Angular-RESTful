import { Component } from '@angular/core';

// Wherever it is the element <app-root>, it is replaced by the html and css.
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Demo-Angular-Todolist';
  name = 'YUHANG';

  constructor(){
    
  }
}
