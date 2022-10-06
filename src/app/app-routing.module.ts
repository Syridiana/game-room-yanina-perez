import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatComponent } from './Components/chat/chat.component';
import { LoginComponent } from './Components/login/login.component';
import { ScoresComponent } from './Components/scores/scores.component';
import { ErrorComponent } from './Components/shared/error/error.component';
import { AboutComponent } from './Views/about/about.component';
import { GameComponent } from './Views/games/game.component';
import { HomeComponent } from './Views/home/home.component';
import { NotFoundComponent } from './Views/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GameComponent },
  { path: 'games', loadChildren: () => import ('../app/Views/games/games-routing.module').then(m => m.GamesRoutingModule) },
  { path: 'chat', component: ChatComponent },
  { path: 'about', component: AboutComponent },
  { path: 'error', component: ErrorComponent },
  { path: 'login', component: LoginComponent },
  { path: 'scores', component: ScoresComponent },
  { path: "**", component: NotFoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
