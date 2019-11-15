import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToDoListComponent} from './todolist/todolist.component';
import { ToDoListService} from './services/todolist.service';
import { HttpClientModule} from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ToDoListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
  ],
  providers: [ ToDoListService],
  bootstrap: [ AppComponent]
})
export class AppModule { }
