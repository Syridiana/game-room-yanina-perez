import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './Views/games/game.component';
import { HomeComponent } from './Views/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { NotFoundComponent } from './Views/not-found/not-found.component';
import { AboutComponent } from './Views/about/about.component';
import { MyGameComponent } from './Views/games/my-game/my-game.component';
import { HangmanComponent } from './Views/games/hangman/hangman.component';
import { GreaterOrLessComponent } from './Views/games/greater-or-less/greater-or-less.component';
import { TriviaComponent } from './Views/games/trivia/trivia.component';

import { AngularFireModule }  from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { SpinnerComponent } from './Components/shared/spinner/spinner.component';
import { NavComponent } from './Components/shared/nav/nav.component';
import { ErrorComponent } from './Components/shared/error/error.component';



@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    HomeComponent,
    LoginComponent,
    NotFoundComponent,
    AboutComponent,
    MyGameComponent,
    HangmanComponent,
    GreaterOrLessComponent,
    TriviaComponent,
    SpinnerComponent,
    NavComponent,
    ErrorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
