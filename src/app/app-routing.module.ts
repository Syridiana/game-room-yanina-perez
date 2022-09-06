import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Components/error/error.component';
import { LoginComponent } from './Components/login/login.component';
import { AboutComponent } from './Views/about/about.component';
import { GameComponent } from './Views/games/game.component';
import { GreaterOrLessComponent } from './Views/games/greater-or-less/greater-or-less.component';
import { HangmanComponent } from './Views/games/hangman/hangman.component';
import { MyGameComponent } from './Views/games/my-game/my-game.component';
import { TriviaComponent } from './Views/games/trivia/trivia.component';
import { HomeComponent } from './Views/home/home.component';
import { NotFoundComponent } from './Views/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GameComponent, children: [
    { path: 'my-game', component: MyGameComponent },
    { path: 'hangman', component: HangmanComponent },
    { path: 'greater-or-less', component: GreaterOrLessComponent },
    { path: 'trivia', component: TriviaComponent },
  ]
  },
  { path: 'about', component: AboutComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'login', component: LoginComponent },
  { path: "**", component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
