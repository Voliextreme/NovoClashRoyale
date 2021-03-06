/* O jogo segue uma "logica" no qual ao fazer o login o utilizador primeiramente tem de ir ás cartas simbolo do lado direito da imagem da arena
e escolher uma personagem , caso esta personagem nao exista na conta do utilizador o jogo vai se encarregar de criar a personagem 
porem para as 4 possiveis personagens funcionem 100% é necessario que sejam clickadas ordenadamente da direita para a esquerda 
caso contrario algumas das variaveis inseridas manualmente no objeto vao estar trocadas , mas a personagem e sua ligaçao á api funciona igual

Caso o jogo nao esteja a funcionar corretamente por favor tentar com o meu login username: tiago | password: tiago123

Breve explicação do jogo funciona á base das coins o player começa com 5050 e pode treinar diariamente por 500 coins e comprar um set de armas melhoradas
para todos os personagens por 1000 coins e a cada batalha ganha o jogador recebe 10 coins*/

import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RoyaleServiceService } from 'src/app/services/royale-service.service';

@Component({
  selector: 'app-arena',
  templateUrl: './arena.component.html',
  styleUrls: ['./arena.component.css']
})
export class ArenaComponent implements OnInit {

  //Declaraçao e import dos serviços
  service : RoyaleServiceService;
  router : Router;
  constructor(private RoyaleService : RoyaleServiceService, router : Router) { 
    this.service = RoyaleService
    this.router = router;
  }

  // Ao iniciar vai buscar um random player
  ngOnInit(): void {
    this.getRndPlayer(); 
  }
  ngAfterViewInit() : void{
  }

// Funçao para ir buscar um random player e iguala as stats dele ao objeto monster do servico
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
// declaraçao de variaveis e viewchild para ediçao do DOM
@ViewChild('vidaplayer') vidaplayer : any;
@ViewChild('vidainimigo') vidainimigo : any;
@ViewChild('tiroamigo') tiroamigo : any;
@ViewChild('tiroinimigo') tiroinimigo : any;

@ViewChild('start') start : any;
  
  playeratk : boolean = true;
  vidabase : number;
  op: boolean = false;

  // funçao que verifica quem é o proximo a atacar
  ataque(){
    this.start.nativeElement.style.display = "none";
    if(this.playeratk){
      this.playerataque();
    }else{
      this.monsterataque(); 
    }
  }

// caso seja o turno do player, faz um calculo do dano do player no qual soma o dano do player da arma e 1/3 do atributo crit 
// divide este dano por 2 para haver umas batalhas mais equilibradas 

  playerataque(){
    let playerAtkValue = Math.round((+this.service.charescolhido.atk + +this.service.charescolhido.weapondamage + (+this.service.charescolhido.crit/3))/2);
    this.tiroamigo.nativeElement.classList.toggle("disparofriend");
    this.service.monster.hp -= playerAtkValue;
    //this.vidaplayer.nativeElement.style.transform = "translate(" + (-(this.service.charescolhido.hp - this.service.monster.atk) * 100 / this.service.charescolhido.hp) + "%";
    this.verificarhp();
  }

  // o ataque do monstro "inimigo" é semelhante porem inclui uma funçao para verificar se o inimigo é demasiado OP ou seja
  // calcula se o dano do monstro é superior á vida base do player e se sim na primeira jogada o monstro sofre o dano
  // para o player ter uma chance 
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
      // Este translate em baixo era uma tentativa de por a barra da vida a diminuir conforme o hp baixava porem nao ficou 100% funcional entao fica em comentario 
      //this.vidainimigo.nativeElement.style.width = "translate(" + ((this.service.monster.hp - this.service.charescolhido.atk) * 100 / this.service.monster.hp) + "%";
      this.verificarhp();
    }
  }

  //Apos o ataque de cada um esta funcao "verificarhp" é chamada no qual verifica se algum jogador morreu e se sim quem ganha 
  //se ninguem morrer passa o turno
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
  resultado : any;
  @ViewChild('result') result : any;
  // Funçao de fim de jogo , reset ás variveis necessarias . Incrementa 10 coins a cada vitoria e volta ao lobby
  endgame(lost : any){
    this.op = false;
    this.result.nativeElement.style.display ="flex";
    //Caso o player ganhe, recebe 10 coins e guarda em localstorage
    if(lost == 1){
      this.service.coins += 10;
      localStorage.setItem("coins", this.service.coins);
      this.resultado = "Winner";
    }else{
      this.resultado = "Loser";
    }
    setTimeout(() => {
      this.service.charescolhido.hp = this.vidabase;
      this.router.navigate(['/lobby']);
      this.result.nativeElement.style.display ="none";
    }, 3000);
  }
}
