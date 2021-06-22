import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RoyaleServiceService } from 'src/app/services/royale-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  router :Router

  constructor(private royaleService : RoyaleServiceService, router :Router) {
    this.router = router;
  }

  ngOnInit(): void {
    if(localStorage.getItem("coins")){
     this.royaleService.coins = Number(localStorage.getItem("coins")) ;
    }else{
      localStorage.setItem("coins", "5050"); 
      this.royaleService.coins = Number(localStorage.getItem("coins"));
    }
  }

  dologin(name,pass, formulario : HTMLDivElement){
    this.royaleService.login(name, pass).subscribe(x =>{
      if(x['code'] == 200){
        localStorage.setItem("id_personagem", x['data'])
        localStorage.setItem("logged", "true") 
        console.log(x['data'])
        this.router.navigate(['/lobby'])
      }else{
        
        console.log("Wrong Username or Password!")
        localStorage.setItem("logged", "false")
      }
    })
  }

}
