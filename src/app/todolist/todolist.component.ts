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
      // console.log(list);
    });

  }

  addItemToList() {
    const url = 'http://localhost:3000/api/add';
    this.itemsList.push({
      name: this.newItem,
      done: false
    });

    // multipart/form-data
    this.http.post(url, {item : {name : this.newItem, done: false}}, { headers: new HttpHeaders().set('Content-Type', 'application/json')})
      .subscribe((data) => {
        console.log(data);
        this.newItem = null;
    });
  }

  clearList() {
    this.itemsList = [];
    this.saveList();
  }

  saveList() {
    const blob = new Blob( [JSON.stringify(this.itemsList)], {type: 'application/octet-stream'} );
    saveAs( blob, 'list.json');
  }

}
