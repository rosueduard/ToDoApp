import {Component, ElementRef, OnInit} from '@angular/core';
import {ToDoListService} from '../services/todolist.service';
import {ToDoList} from '../services/todolist';
import {HttpClient} from '@angular/common/http';
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
  ) {}

  ngOnInit() {
    this.http.get('assets/list.json').subscribe((list: ToDoList) => {
      // @ts-ignore
      this.itemsList = list;
      console.log(list);
    });
  }

  addItemToList() {
    this.itemsList.push({
      name: this.newItem,
      done: false
    });
  }

  clearList() {
    this.itemsList = [];
    this.updateList();
  }

  updateList() {
    const blob = new Blob( [JSON.stringify(this.itemsList)], {type: 'application/octet-stream'} );
    saveAs( blob, 'list.json');
  }

}
