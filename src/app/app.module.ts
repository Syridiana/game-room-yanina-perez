import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './Views/games/game.component';
import { HomeComponent } from './Views/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { ErrorComponent } from './Components/error/error.component';
import { NotFoundComponent } from './Views/not-found/not-found.component';
import { NavComponent } from './Components/nav/nav.component';
import { AboutComponent } from './Views/about/about.component';
import { MyGameComponent } from './Views/games/my-game/my-game.component';
import { HangmanComponent } from './Views/games/hangman/hangman.component';
import { GreaterOrLessComponent } from './Views/games/greater-or-less/greater-or-less.component';
import { TriviaComponent } from './Views/games/trivia/trivia.component';



@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    NotFoundComponent,
    NavComponent,
    AboutComponent,
    MyGameComponent,
    HangmanComponent,
    GreaterOrLessComponent,
    TriviaComponent
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
