import { BrowserModule } from '@angular/platform-browser';
import { NgModule }      from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpModule }    from '@angular/http';
import { routing } from './app.routes';
import { AppComponent }  from './app.component';
import { CandyComponent } from './candy/candy.component';

@NgModule({
  declarations: [
    AppComponent,
    CandyComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    routing,
    HttpModule
  ],
  providers: [],
  bootstrap: [ AppComponent ]
})
export class AppModule {}