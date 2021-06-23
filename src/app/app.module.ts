import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LobbyComponent } from './pages/lobby/lobby.component';
import { ArenaComponent } from './pages/arena/arena.component';
import { CardsComponent } from './pages/cards/cards.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './pages/login/login/login.component';
import { TrainingComponent } from './pages/training/training.component';

@NgModule({
  declarations: [
    AppComponent,
    LobbyComponent,
    ArenaComponent,
    CardsComponent,
    LoginComponent,
    TrainingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [LobbyComponent, ArenaComponent, CardsComponent],
  
  
  bootstrap: [AppComponent]
})
export class AppModule { }
