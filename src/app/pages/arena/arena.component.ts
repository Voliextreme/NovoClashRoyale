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

/*
  ataque(){
   setTimeout(() => {
    document.getElementById("ataquefriend").classList.toggle("disparofriend");
    this.ataque();
    console.log(this.delay);
   }, this.delay);
  }
*/
getRndPlayer() {
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
      console.log(this.service.monster.name);
    }
  });
}

@ViewChild('vidaplayer') vidaplayer : any;
@ViewChild('vidainimigo') vidainimigo : any;

@ViewChild('start') start : any;
  
  playeratk : boolean = false;
  vidabase : number = 0;

  ataque(){
    this.start.nativeElement.style.display = "none";
    this.vidabase = this.service.charescolhido.hp;
    if(this.playeratk){
      this.playerataque();
    }else{
      this.monsterataque(); 
    }
  }


  playerataque(){
    if(this.service.monster.atk > this.vidabase){
      this.service.monster.hp -= this.service.monster.atk;
      console.log("monster atk", this.service.monster.atk)
      this.service.charescolhido.hp = 1;
      this.verificarhp();
    }
    else{
        this.service.charescolhido.hp -= this.service.monster.atk;
        console.log("vidinha", this.service.charescolhido.hp);
        this.vidaplayer.nativeElement.style.transform = "translate(" + (-(this.service.charescolhido.hp - this.service.monster.atk) * 100 / this.service.charescolhido.hp) + "%";
        this.verificarhp();
    }
  }

  monsterataque(){
    this.service.monster.hp -= this.service.charescolhido.atk;
    console.log("player  atk", this.service.charescolhido.atk);
    console.log("hp do inimigo ", this.service.monster.hp);
    this.vidainimigo.nativeElement.style.width = "translate(" + ((this.service.monster.hp - this.service.charescolhido.atk) * 100 / this.service.monster.hp) + "%";
    this.verificarhp();
  }

  verificarhp(){
    if(this.service.charescolhido.hp <= 0){
      this.endgame(0);
    }
    if(this.service.monster.hp <= 0){
      this.endgame(1);
    }
    if(this.service.charescolhido.hp > 0 && this.service.monster.hp > 0){
      if(this.playeratk){
        this.playeratk = false;
      }else{
        this.playeratk = true;
      }
      setTimeout(() => {
        this.ataque();    
      }, 2000);
    }
  }

  endgame(lost : any){
    if(lost == 1){
      console.log("winner");
      this.service.coins += 10;
    }else{
      console.log("loser");
    }
    setTimeout(() => {
      this.router.navigate(['/lobby']);
    }, 3000);
  }







}
