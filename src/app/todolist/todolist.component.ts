import { Component, OnInit } from '@angular/core';
import { ToDoListService } from '../services/todolist.service';
import { ToDoList } from '../services/todolist';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { saveAs } from 'file-saver';

@Component({
  selector: 'to-do-list',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class ToDoListComponent implements OnInit {

  public itemsList: ToDoList[] = [];
  public newItem: ToDoList;

  constructor(
    private todolistService: ToDoListService,
    private http: HttpClient
  ) { }


  ngOnInit() {
    const url = 'http://localhost:3000/api/todos';
    this.http.get(url).subscribe((list: ToDoList) => {
      // @ts-ignore
      this.itemsList = list.data;
    });

  }

  addItemToList() {
    const url = 'http://localhost:3000/api/add';
    if (this.newItem !== undefined) {
      this.http.post(url, {name : this.newItem, done: false}, { headers: new HttpHeaders().set('Content-Type', 'application/json')})
        .subscribe((data) => {
          // @ts-ignore
          this.itemsList.push(data.data);
          console.log(data);
          this.newItem = null;
        });
    }
  }

  clearList() {
    const url = 'http://localhost:3000/api/deleteAll';
    this.http.delete(url).subscribe(data => {
      this.itemsList = [];
    });
  }

  removeItemToList(item, index) {
    const url = 'http://localhost:3000/api/delete';
    this.http.delete(`${url}/${item._id}`).subscribe(data => {
      // remove element from displayed list
      this.itemsList.splice(index, 1);
    });
  }

  updateItem(item, index, e) {
    if (e.target.type !== 'button') {
      this.itemsList[index].done = !this.itemsList[index].done;
    }
  }

}
