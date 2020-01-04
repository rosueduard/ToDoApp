import { Component, OnInit } from '@angular/core';
import { ToDoListService } from '../services/todolist.service';
import { ToDoList } from '../services/todolist';
import { HttpClient, HttpHeaders} from '@angular/common/http';
import { CONST } from 'src/app/shared/constants';

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
    this.http.get(CONST.URL.GET_LIST).subscribe((list: ToDoList) => {
      // @ts-ignore
      this.itemsList = list.data;
    });
  }

  addItemToList() {
    if (this.newItem !== undefined) {
      this.http.post(CONST.URL.ADD_ITEM, {name : this.newItem, done: false}, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      }).subscribe((data) => {
          // @ts-ignore
          this.itemsList.push(data.data);
          this.newItem = null;
        });
    }
  }

  clearList() {
    this.http.delete(CONST.URL.DELETE_ALL).subscribe(data => {
      this.itemsList = [];
    });
  }

  removeItemToList(item, index) {
    this.http.delete(`${CONST.URL.DELETE}/${item._id}`).subscribe(() => {
      // remove element from displayed list
      this.itemsList.splice(index, 1);
    });
  }

  updateItem(item, index, e) {
    if (e.target.tagName !== 'SPAN') {
      this.http.post(CONST.URL.UPDATE, {item})
        .subscribe((data) => {
          // @ts-ignore
          if (data.updated) {
            // @ts-ignore
            this.itemsList[index] = data.item;
          }
        });
    }
  }

}
