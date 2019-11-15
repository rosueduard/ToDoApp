import {Component, OnInit} from '@angular/core';
import {ToDoListService} from '../services/todolist.service';

@Component({
  selector: 'to-do-list',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css']
})
export class ToDoListComponent implements OnInit {

  public personalDetails = [];

  constructor(
    private todolistService: ToDoListService
  ) {}

  ngOnInit() {
    this.todolistService.getData().subscribe((data) => {
      this.personalDetails = Array.from(Object.keys(data), k => data[k]);
      console.log(this.personalDetails);
    });
  }

}
