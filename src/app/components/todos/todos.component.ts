/*
Building blocks in Angular:

Component is a building block of Angular application.
A component encapsulates Data, HTML Template and Logic for a view.
Every App has at least a component called "App / root component".
A real world App is a tree of components starting from the root component.

Module is a container for related components.
Each App has at least one module called "App module".

Steps for using components:
1. Create a component;
2. Register it in a module;
3. Add an element in an HTML markup.

Alternative way:
1. In terminal run "ng g c componentName". It will auto register.
*/

// Import "Component" declarator
import { Component, OnInit } from '@angular/core';
import { TodoService } from '../../services/todo.service';
import { Todo } from 'src/app/models/Todo';

/* Customized HTML vocabulary
*    Wherever there is an element named 'courses', 
*    Angular will render the template inside the element.
*/

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.css']
})

// Create this component by command "ng generate component components/Todos"
// where it generates a folder "components" for containing it.
// What is ngOnInit?
// It is a life-cycle method. It runs when the component is created. Suitable for initialisation work.
export class TodosComponent implements OnInit {

  // This field is used to hold the data returns from external webservices...
  todos: Todo[];

  // Constructor is usually used for services.
  // In order to use a TodoService by Dependency Injection, 
  // we add it into the constructor...
  constructor(private todoService: TodoService) { }

  
  ngOnInit() {

    // Subscribe to the observable in the instance of TodoService (see getTodos() in todo.service.ts)
    this.todoService.getTodos()
          // Set the field todos above by todos returns from TodoService
          .subscribe(todos => {this.todos = todos;});
  }

    deleteTodo(todo:Todo){
      console.log('delete me');
      // Remove from UI
      this.todos = this.todos.filter(t => t.id !== todo.id);
      // Remove from service
      this.todoService.deleteTodo(todo).subscribe();
    }

    addTodo(todo:Todo){
      this.todoService.addTodo(todo).subscribe(todo => {
        this.todos.push(todo);
      });
    }
}
