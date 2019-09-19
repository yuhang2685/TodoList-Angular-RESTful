
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/Todo';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  // The class field todo is of type Todo from somewhere...
  // It is for <app-todo-item ... [todo]="todo"...>
  @Input() todo: Todo;
  // emit out to the current component?
  @Output() deleteTodo: EventEmitter<Todo> = new EventEmitter();

  constructor(private todoService: TodoService) { }

  ngOnInit() {
  }

  // Set Dynamic Classes, which is required in it's html...
  setClasses(){
    let classes = {
      // How to interprete below?
      // Dynamic binding: 
      // "todo" property in css is bind to true (the css always apply), 
      // 'is-complete' property is bind to the field completed (the css will apply depends on the field of obj)
      todo: true,
      'is-complete': this.todo.completed
    }
    return classes;
  }

  // Other functions required in html...
  onToggle(todo){
    // Toggle in UI
    todo.completed = !todo.completed;
    // Toggle on server
    this.todoService.toggleCompleted(todo)
          .subscribe(todo => console.log(todo));
  }
 
  onDelete(todo){
    console.log('delete');
    this.deleteTodo.emit(todo);
  }
}
