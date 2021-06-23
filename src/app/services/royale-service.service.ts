import { HttpClient, HttpUrlEncodingCodec } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})



export class RoyaleServiceService {   

  constructor(private http: HttpClient) {}


 
  charescolhido: any = {
    name: "archer",
    id: "30",
    atk: "10",
    isMonset: "false",
    crit: "10",
    hp: "30",
    img: "",
    design: "",
    idPlayer: "",
    weaponsimg : "../../../assets/ImagesArena/arrow.png",
    weapondamage : 10,
  };


  monster: any = {
    name: "goblin",
    id: "",
    atk: "0",
    isMonset: "",
    crit: "0",
    hp: "0",
    img: "../../../assets/ImagesCards/GoblinsCard.png",
    idPlayer: "",
    weaponsimg : "../../../assets/ImagesArena/spear.png",
    weapondamage : 10,
  };

  coins : any;

  name : any;
  pass : any;
  
  linkLogin: string = "http://moreiramoises.pt/server/apis/login.php";
  linkRegister: string = 'http://moreiramoises.pt/server/apis/signup.php';
  linkCreateChar: string = 'http://moreiramoises.pt/server/apis/createChart.php';
  linkCharId: string = 'http://moreiramoises.pt/server/apis/get/getChar.php?PlayerID=';
  linkRndChar: string = 'http://moreiramoises.pt/server/apis/get/getRandomChar.php?';
  linkUpdateChar: string = 'http://moreiramoises.pt/server/apis/updateChart.php';

  login(name,pass){
    let bodyData: FormData = new FormData();
    bodyData.append("username", name);
    bodyData.append("password", pass);
    this.name = name;
    this.pass = pass;
    return this.http.post(this.linkLogin, bodyData);
  }
  
  register(name,pass){
    let bodyData: FormData = new FormData();
    bodyData.append("username", name);
    bodyData.append("password", pass);
    return this.http.post(this.linkRegister, bodyData);
  }

  getCharID(id) {
    return this.http.get(this.linkCharId + id);
  }

  getRndChar() {
    return this.http.get(this.linkRndChar);
  }

  updateStats(atk, crit, hp, id) {
    let bodyData: FormData = new FormData();
      bodyData.append('idChar', id.toString());
      bodyData.append('name', this.charescolhido.name);
      bodyData.append('atk', atk.toString());
      bodyData.append('isMonster', 'false');
      bodyData.append('int', crit.toString());
      bodyData.append('vida', hp.toString());
      bodyData.append('username', "tiago");
      bodyData.append('password', "tiago123");
    
    return this.http.post(this.linkUpdateChar, bodyData);
  }

  criarChar(nome, atk, int, vida, utilizador, password){
    let bodyData: FormData = new FormData();
    bodyData.append('name', nome.toString());
    bodyData.append('atk', atk.toString());
    bodyData.append('isMonster', 'false');
    bodyData.append('int', int.toString());
    bodyData.append('vida', vida.toString());
    bodyData.append('username', utilizador);
    bodyData.append('password', password);
    return this.http.post(this.linkCreateChar, bodyData);
  }

}
