import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {ToDoList} from './todolist';

@Injectable({
  providedIn: 'root'
})
export class ToDoListService {

  private apiUrl = 'https://jsonplaceholder.typicode.com/posts/2';
  private postUrl = 'https://jsonplaceholder.typicode.com/posts';
  public itemsList: ToDoList[] = [];


  constructor(
    private http: HttpClient
  ) {}

  getData() {
    return this.http.get(this.apiUrl);
  }

  setData(data) {
    return this.http.post(this.postUrl, data);
  }

  getListItem(): ToDoList[] {
    return this.itemsList;
  }

  setListItem(item: ToDoList) {
    this.itemsList.push(item);
  }

}
