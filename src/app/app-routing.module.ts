import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArenaComponent } from './pages/arena/arena.component';
import { CardsComponent } from './pages/cards/cards.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { LoginComponent } from './pages/login/login/login.component';
import { TrainingComponent } from './pages/training/training.component';

const routes: Routes = [
  {path: "lobby", component: LobbyComponent},
  {path: "arena", component: ArenaComponent},
  {path: "cards", component: CardsComponent},
  {path: "login", component: LoginComponent},
  {path: "train", component: TrainingComponent},
  {path: "", component: LoginComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
