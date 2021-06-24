import { Component, OnInit, ViewChild } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { asapScheduler } from 'rxjs';
import { RoyaleServiceService } from 'src/app/services/royale-service.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsComponent implements OnInit {

  service : RoyaleServiceService
  constructor( private RoyaleService: RoyaleServiceService, private router: Router) { 
    this.service = RoyaleService;
  }

  ngOnInit(): void {
    if(JSON.parse(localStorage.getItem("bought"))){
      this.service.bought = JSON.parse(localStorage.getItem("bought"));
    }else{
      localStorage.setItem("bought", false.toString());
      this.service.bought = JSON.parse(localStorage.getItem("bought"));
    }
  }

  //Funçao para ir buscar o player conforme a carta escolhida da api
  getchar(){
      this.RoyaleService.getCharID(localStorage.getItem("id_personagem")).subscribe((x) => {
        if (x['code'] == 200) {
          this.RoyaleService.charescolhido.name = x['data'].Personagens[this.escolhido].Nome;
          this.RoyaleService.charescolhido.id = x['data'].Personagens[this.escolhido].ID;
          this.RoyaleService.charescolhido.atk = x['data'].Personagens[this.escolhido].Atk;
          this.RoyaleService.charescolhido.isMonset = x['data'].Personagens[this.escolhido].IsMonset;
          this.RoyaleService.charescolhido.crit = x['data'].Personagens[this.escolhido].Int;
          this.RoyaleService.charescolhido.hp = x['data'].Personagens[this.escolhido].Vida;
          this.RoyaleService.charescolhido.idPlayer = x['data'].Personagens[this.escolhido].ID_Player;
        }
      });
  }
 
  escolhido: string ="0";

  public bright:boolean = false

  //funçao toggle para ao clickar numa personagem apareceer os personagens vindos da api 
  toggle(main: HTMLDivElement, weapons:HTMLDivElement, stats:HTMLDivElement, charac:any) {
    this.choosedweapon(stats, weapons);
    this.pagar.nativeElement.style.display = "none";
    document.getElementById("usar").style.pointerEvents = "none";
    weapons.style.display="none";
    if(stats.style.zIndex == "20"){
      stats.style.zIndex = "-5";
    }else{
      stats.style.zIndex = "20";
    }
    this.bright = !this.bright;
    if(this.bright == true){
    main.style.filter="brightness(0.3)";
    }else{
      main.style.filter="brightness(1)";
    }
    main.style.overflow="hidden";
    this.escolhido = charac;
    //conforme o player escolhido passo alguns parametros extra para o objeto do player manualmente
    if(+this.escolhido == 0){
      this.RoyaleService.charescolhido.img = "../../../assets/ImagesCards/ArchersCard.png";
      this.RoyaleService.charescolhido.design = "A powerful she/her with some arrows to spare";
      this.RoyaleService.charescolhido.weaponsimg = "../../../assets/ImagesArena/arrow.png";
      this.RoyaleService.charescolhido.weaponsimg2 = "../../../assets/ImagesArena/arrow2.png";
    }else if(+this.escolhido == 1){
      this.RoyaleService.charescolhido.img = "../../../assets/ImagesCards/BomberCard.png";
      this.RoyaleService.charescolhido.design = "Small skeleton but powerful with powerful bombs";
      this.RoyaleService.charescolhido.weaponsimg = "../../../assets/ImagesArena/bomb.png";
      this.RoyaleService.charescolhido.weaponsimg2 = "../../../assets/ImagesArena/bomb2.png";
    }else if(+this.escolhido == 2){
      this.RoyaleService.charescolhido.img = "../../../assets/ImagesCards/GoblinsCard.png";
      this.RoyaleService.charescolhido.design = "One sportinguista with hope of victory";
      this.RoyaleService.charescolhido.weaponsimg = "../../../assets/ImagesArena/spear.png";
      this.RoyaleService.charescolhido.weaponsimg2 = "../../../assets/ImagesArena/spear2.png";
    }else if(+this.escolhido == 3){
      this.RoyaleService.charescolhido.img = "../../../assets/ImagesCards/MusketeerCard.png";
      this.RoyaleService.charescolhido.design = "Strong Hoe with strong weapon";
      this.RoyaleService.charescolhido.weaponsimg = "../../../assets/ImagesArena/ball.png";
      this.RoyaleService.charescolhido.weaponsimg2 = "../../../assets/ImagesArena/ball2.png";
    }
    this.criarChar(this.escolhido);

  } 

  @ViewChild('weapon2') weapon2:any;
  @ViewChild('pagar') pagar:any;

// Funçao para mostrar o div das weapons
  turn(stats: HTMLDivElement, weapons: HTMLDivElement) {
    if(this.service.bought == false){
      this.weapon2.nativeElement.style.filter = "brightness(0.3)";
      this.weapon2.nativeElement.style.pointerEvents ="none";
      this.pagar.nativeElement.style.display = "flex";
    }

    stats.classList.add("rotatestats");
    setTimeout(() => {
      weapons.style.display="block";
      weapons.classList.add("fadeweapons");
    }, 600);

    setTimeout(() => {
      stats.style.display="none";
    }, 800);

  }
  // Funçao para verificar que arma foi escolhida
  choosedweapon(stats: HTMLDivElement, weapons: HTMLDivElement, weapones?:any){
    document.getElementById("usar").style.pointerEvents = "all";
    stats.classList.remove("rotatestats");
    weapons.style.display="none";
    stats.style.display="block";
    if(weapones == 0){
      this.RoyaleService.charescolhido.weapondamage = 10;
    }else if(weapones == 1){
      this.RoyaleService.charescolhido.weapondamage = 15 ;
    }
  }


  //METODO UTILIZADO NO CRIAR UMA PERSONAGEM NOVA
  criarChar(id){
      this.RoyaleService.getCharID(localStorage.getItem("id_personagem")).subscribe((x) => {
        if (x['data'].Personagens[id]) {
          this.getchar();
        }else {
          if(id == 0){
            var nome = "Archer";
            var atk = 30;
            var int = 35;
            var vida = 70;
          }else if(id == 1){
            var nome = "Bomber";
            var atk = 40;
            var int = 10;
            var vida = 120;
          }else if(id == 2){
            var nome = "Goblin";
            var atk = 30;
            var int = 18;
            var vida = 90;
          }else if(id == 3){
            var nome = "Musketeer";
            var atk = 60;
            var int = 5;
            var vida = 80;
          }
          this.RoyaleService.criarChar(nome, atk, int, vida, this.RoyaleService.name, this.RoyaleService.pass).subscribe((x) =>{
            console.log(x['data']);
            this.getchar();
          });
        }
      });
  }
  
  //Funçao para verificar se o player desbloqueia o acesso ás armas superiores
  payed(){
    if(this.service.coins >= 1000 && this.service.bought == false){
      this.service.bought = true;
      this.service.coins -= 1000;
      localStorage.setItem("coins", this.service.coins);
      localStorage.setItem("bought", this.service.bought.toString());
      this.pagar.nativeElement.style.zIndex = "-1";
      this.weapon2.nativeElement.style.filter = "brightness(1)"; 
      this.weapon2.nativeElement.style.pointerEvents ="inherit";
    }
  }

}
