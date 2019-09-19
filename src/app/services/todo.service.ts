// Allow to be injective
import { Injectable } from '@angular/core';
// HttpHeaders is for contents of type JSON
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Todo } from '../models/Todo';
import { Observable } from 'rxjs';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
}

// Set to be injective
@Injectable({
  providedIn: 'root'
})

// Service are used to share data/functionality between components
export class TodoService {

  todosUrl:string = 'https://jsonplaceholder.typicode.com/todos';
  todosLimit:string = '?_limit=8';

  // In order to use a HttpClient by Dependency Injection, 
  // we add it into the constructor...
  constructor(private http:HttpClient) { }

  // Observable is asynchronized???
  getTodos():Observable<Todo[]>{
    // get<Todo[]> gets a Todo array
    // below in () could be plain string, but here it has to do concatenation on string variables
    return this.http.get<Todo[]>(`${this.todosUrl}${this.todosLimit}`);
  }

  // Delete Todo
  deleteTodo(todo:Todo):Observable<Todo> {
    // below line for UI: showing not the delete item
    // this.todos = this.todos.filter(t => t.id !== todo.id);
    const url = '${this.todosUrl}/${todo.id}';
    return this.http.delete<Todo>(url, httpOptions);
  }

  // Add Todo
  addTodo(todo:Todo):Observable<Todo> {
    return this.http.post<Todo>(this.todosUrl, todo, httpOptions);
  }

  // Toggle completed
  toggleCompleted(todo:Todo):Observable<any> {
    const url = '${this.todosUrl}/${todo.id}';
    return this.http.put(url, todo, httpOptions);
  }
}
