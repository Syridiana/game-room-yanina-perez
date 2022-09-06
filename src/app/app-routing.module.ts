import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './Components/error/error.component';
import { LoginComponent } from './Components/login/login.component';
import { AboutComponent } from './Views/about/about.component';
import { GameComponent } from './Views/game/game.component';
import { HomeComponent } from './Views/home/home.component';
import { NotFoundComponent } from './Vistas/not-found/not-found.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'game', component: GameComponent, children: [{
      path: 'login', component: LoginComponent
    }]
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
