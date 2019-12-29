import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ToDoList} from './todolist';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  private apiUrl = 'http://jsonplaceholder.typicode.com/users';
  public itemsList: ToDoList[] = [];


  constructor(
    private http: HttpClient
  ) {}

  getData() {
    return this.http.get(this.apiUrl);
  }

  getListItem() {
    return this.itemsList;
  }

  setListItem(item: ToDoList) {
    this.itemsList.push(item);
  }

}
