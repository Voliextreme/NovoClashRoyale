import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { RoyaleServiceService } from 'src/app/services/royale-service.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})

export class CardsComponent implements OnInit {

  service : RoyaleServiceService
  constructor( private RoyaleService: RoyaleServiceService) { 
    this.service = RoyaleService;
  }

  ngOnInit(): void {
    this.getchar();
  }

  getchar(){
      this.RoyaleService.getCharID(110).subscribe((x) => {
        if (x['code'] == 200) {
          this.RoyaleService.charescolhido.name = x['data'].Personagens[0].Nome;
          this.RoyaleService.charescolhido.id = x['data'].Personagens[0].ID;
          this.RoyaleService.charescolhido.atk = x['data'].Personagens[0].Atk;
          this.RoyaleService.charescolhido.isMonset = x['data'].Personagens[0].IsMonset;
          this.RoyaleService.charescolhido.crit = x['data'].Personagens[0].Int;
          this.RoyaleService.charescolhido.hp = x['data'].Personagens[0].Vida;
          // this.RoyaleService.charescolhido.img = x['data'].Personagens[0].Imagem;
          this.RoyaleService.charescolhido.idPlayer = x['data'].Personagens[0].ID_Player;
        }
      });
  }
  
/*
  character: any = [ 
  {
    value: "0",
    img: "../../../assets/ImagesCards/ArchersCard.png",
    name: "Archer",
    design: "A powerful she/her with some arrows to spare",
    hp: 1900,
    damage: 110,
    crit: 1.9,
    weapons: [{
      wname: "arrow",
      wimg : "../../../assets/ImagesArena/arrow.png",
      wdamage : 10,
    },
    {
      wname: "arrow2",
      wimg : "../../../assets/ImagesArena/arrow2.png",
      wdamage : 20,
    },
  ]
  },
  {
    value: "1",
    img: "../../../assets/ImagesCards/BomberCard.png",
    name: "Bomber",
    design: "Small skeleton but powerful with powerful bombs.",
    hp: 1000,
    damage: 190,
    crit: 1.4,
    weapons: [{
      wname: "bomb",
      wimg : "../../../assets/ImagesArena/bomb.png",
      wdamage : 10,
    },
    {
      wname: "bomb2",
      wimg : "../../../assets/ImagesArena/bomb2.png",
      wdamage : 20,
    },
  ]
  },
  {
    value: "2",
    img: "../../../assets/ImagesCards/GoblinsCard.png",
    name: "Goblin",
    design: "One sportinguista with hope of victory",
    hp: 1500,
    damage: 150,
    crit: 1.3,
    weapons: [{
      wname: "spear",
      wimg : "../../../assets/ImagesArena/spear.png",
      wdamage : 10,
    },
    {
      wname: "spear2",
      wimg : "../../../assets/ImagesArena/spear2.png",
      wdamage : 20,
    },
  ]
  },
  {
    value: "3",
    img: "../../../assets/ImagesCards/MusketeerCard.png",
    name: "Musketeer",
    design: "Strong Bitch with strong weapon",
    hp: 3000,
    damage: 130,
    crit: 1,
    weapons: [{
      wname: "ball",
      wimg : "../../../assets/ImagesArena/ball.png",
      wdamage : 10,
    },
    {
      wname: "ball2",
      wimg : "../../../assets/ImagesArena/ball2.png",
      wdamage : 20,
    },
  ]
  },
  ]
  */
  
  escolhido: string ="0";

  public bright:boolean = false

  toggle(main: HTMLDivElement, weapons:HTMLDivElement, stats:HTMLDivElement, charac:any) {
    this.choosedweapon(stats, weapons);
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
  } 


  turn(stats: HTMLDivElement, weapons: HTMLDivElement) {
    stats.classList.add("rotatestats");

    setTimeout(() => {
      weapons.style.display="block";
      weapons.classList.add("fadeweapons");
    }, 600);

    setTimeout(() => {
      stats.style.display="none";
    }, 800);

  }

  armaescolhida: string ="";
  choosedweapon(stats: HTMLDivElement, weapons: HTMLDivElement, weapones?:any){
    document.getElementById("usar").style.pointerEvents = "all";
    stats.classList.remove("rotatestats");
    weapons.style.display="none";
    stats.style.display="block";
    this.armaescolhida = weapones;
  }


}
