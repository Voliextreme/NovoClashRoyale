import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RoyaleServiceService } from 'src/app/services/royale-service.service';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css']
})
export class ArenaComponent implements OnInit {

  service : RoyaleServiceService;
  router : Router;
  constructor(private RoyaleService : RoyaleServiceService, router : Router) { 
    this.service = RoyaleService
    this.router = router;
  }

  ngOnInit(): void {
    this.getRndPlayer(); 
  }
  ngAfterViewInit() : void{
  }

getRndPlayer() {
  this.vidabase = this.service.charescolhido.hp;
  this.service.getRndChar().subscribe((x) => {
    if (x['code'] == 200) {
      this.service.monster.name = x['data'].Nome;
      this.service.monster.id = x['data'].ID;
      this.service.monster.atk = x['data'].Atk;
      this.service.monster.isMonset = x['data'].IsMonset;
      this.service.monster.crit = x['data'].Int;
      this.service.monster.hp = x['data'].Vida;
      //this.service.monster.img = x['data'].Imagem;
      this.service.monster.idPlayer = x['data'].ID_Player;
      console.log("Inimigo:", this.service.monster.name);
    }
  });
}

@ViewChild('vidaplayer') vidaplayer : any;
@ViewChild('vidainimigo') vidainimigo : any;
@ViewChild('tiroamigo') tiroamigo : any;
@ViewChild('tiroinimigo') tiroinimigo : any;

@ViewChild('start') start : any;
  
  playeratk : boolean = true;
  vidabase : number;
  op: boolean = false;

  ataque(){
    this.start.nativeElement.style.display = "none";
    if(this.playeratk){
      this.playerataque();
    }else{
      this.monsterataque(); 
    }
  }


  playerataque(){
    let playerAtkValue = Math.round((+this.service.charescolhido.atk + +this.service.charescolhido.weapondamage + (+this.service.charescolhido.crit/3))/2);
    this.tiroamigo.nativeElement.classList.toggle("disparofriend");
    this.service.monster.hp -= playerAtkValue;
    //this.vidaplayer.nativeElement.style.transform = "translate(" + (-(this.service.charescolhido.hp - this.service.monster.atk) * 100 / this.service.charescolhido.hp) + "%";
    this.verificarhp();
  }

  monsterataque(){
    let monsterAtkValue = Math.round((+this.service.monster.atk + +this.service.monster.weapondamage + (+this.service.monster.crit/3))/2);
    if(this.service.monster.atk > this.vidabase && this.op != true){
      this.op = true;
      this.service.monster.hp -= monsterAtkValue;
      console.log("monstro OP");
      console.log(this.service.monster.atk);
      this.verificarhp();
    }
    else{
      this.tiroinimigo.nativeElement.classList.toggle("disparoememy");
      this.tiroamigo.nativeElement.classList.toggle("disparofriend");
      this.service.charescolhido.hp -= monsterAtkValue;
      //this.vidainimigo.nativeElement.style.width = "translate(" + ((this.service.monster.hp - this.service.charescolhido.atk) * 100 / this.service.monster.hp) + "%";
      this.verificarhp();
    }
  }

  verificarhp(){
    if(this.service.charescolhido.hp <= 0){
      this.endgame(0);
    }
    else if(this.service.monster.hp <= 0){
      this.endgame(1);
    }
    else if(this.service.charescolhido.hp > 0 && this.service.monster.hp > 0){
      if(this.playeratk){
        this.playeratk = false;
      }else{
        this.playeratk = true;
      }
      setTimeout(() => {
        this.ataque(); 
        this.tiroinimigo.nativeElement.classList.toggle("disparoememy");
      }, 3000);
    }
  }

  endgame(lost : any){
    this.op = false;
    if(lost == 1){
      console.log("winner");
      this.service.coins += 10;
      localStorage.setItem("coins", this.service.coins);
    }else{
      console.log("loser");
    }
    setTimeout(() => {
      this.service.charescolhido.hp = this.vidabase;
      this.router.navigate(['/lobby']);
    }, 3000);
  }







}
