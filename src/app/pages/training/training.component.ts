import { ViewChild } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoyaleServiceService } from 'src/app/services/royale-service.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit {
  
  service : RoyaleServiceService;
  router : Router;
  constructor(private RoyaleService : RoyaleServiceService, router : Router) { 
    this.service = RoyaleService
    this.router = router;
  }
  //ao iniciar a pagina ir buscar as coins á api
  ngOnInit(): void {
    this.service.coins = Number(localStorage.getItem("coins"));
  }

  @ViewChild('train') train : any;
  @ViewChild('losecoins') losecoins : any;

// Verificaçao se passou um dia para voltar a poder treinar
  hasOneDayPassed() {
    var date = new Date().toLocaleDateString();

    if (localStorage.yourapp_date == date) {
      return false;
    }

    localStorage.yourapp_date = date;
    return true;
  }

  //Funçao para treinar a personagem selecionada 
  //Aumenta 5 de stats a cada atributo , da update na api e as coins na localstorage, mostra uma animaçao
  //caso ja tenha treinado nas ultimas 24 horas mostra uma animaçao e é redirecionado para o lobby
  treinar(){
    if(this.hasOneDayPassed() && this.service.coins >= 500){
      this.service.coins -= 500;
      let atk = +this.service.charescolhido.atk +5;
      let crit = +this.service.charescolhido.crit +5;
      let hp = +this.service.charescolhido.hp +5;
      let id = this.service.charescolhido.id;
      this.service.updateStats(atk, crit, hp, id).subscribe((x) => {
        console.log(x['data']);
      });
      localStorage.setItem("coins", this.service.coins);
      this.losecoins.nativeElement.style.animation = "treining 1.5s";
    }else{
      this.train.nativeElement.style.animation = "piscar 2s ";
      setTimeout(() => {
        this.router.navigate(['/lobby']);
      }, 2000);
    }
  }
 



}
