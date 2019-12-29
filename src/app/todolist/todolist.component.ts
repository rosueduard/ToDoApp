import {Component, ElementRef, OnInit} from '@angular/core';
import {ToDoListService} from '../services/todolist.service';
import {ToDoList} from '../services/todolist';

@Component({
  selector: 'to-do-list',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class ToDoListComponent implements OnInit {

  public itemsList: ToDoList[] = [];
  public newItem: ToDoList;

  constructor(
    private todolistService: ToDoListService
  ) {}

  ngOnInit() {
    console.log(ElementRef);
  }

  addItemToList() {
    const item: ToDoList = {
      name: this.newItem,
      description: 'Test',
      done: false
    };
    this.itemsList.push(item);
  }

}
