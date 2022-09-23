import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GreaterOrLessComponent } from './greater-or-less/greater-or-less.component';
import { HangmanComponent } from './hangman/hangman.component';
import { MyGameComponent } from './my-game/my-game.component';
import { TriviaComponent } from './trivia/trivia.component';

const routes: Routes = [
    { path: 'my-game', component: MyGameComponent },
    { path: 'hangman', component: HangmanComponent },
    { path: 'greater-or-less', component: GreaterOrLessComponent },
    { path: 'trivia', component: TriviaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesRoutingModule { }

