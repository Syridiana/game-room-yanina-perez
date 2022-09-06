import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './Views/game/game.component';
import { HomeComponent } from './Views/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ErrorComponent } from './Components/error/error.component';
import { NotFoundComponent } from './Vistas/not-found/not-found.component';
import { NavComponent } from './Components/nav/nav.component';
import { AboutComponent } from './Views/about/about.component';



@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    NotFoundComponent,
    NavComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
