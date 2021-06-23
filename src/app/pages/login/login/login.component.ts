import { Component, OnInit, ViewChild } from '@angular/core';
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

  @ViewChild('name') inputname : any;
  @ViewChild('pass') inputpass : any; 
  @ViewChild('formulario') formulario:any;

  ngOnInit(): void {
    if(localStorage.getItem("coins")){
     this.royaleService.coins = Number(localStorage.getItem("coins")) ;
    }else{
      localStorage.setItem("coins", "5050"); 
      this.royaleService.coins = Number(localStorage.getItem("coins"));
    }
  }

  dologin(name,pass){
    this.royaleService.login(name, pass).subscribe(x =>{
      if(x['code'] == 200){
        localStorage.setItem("id_personagem", x['data'])
        localStorage.setItem("logged", "true") 
        console.log(x['data'])
        this.router.navigate(['/lobby'])
        
      }else{
        this.inputname.nativeElement.style.backgroundColor = "rgb(255, 40, 40)";
        this.inputpass.nativeElement.style.backgroundColor = "rgb(255, 40, 40)";
        setTimeout(() => {
          this.inputname.nativeElement.style.backgroundColor = "white"
          this.inputpass.nativeElement.style.backgroundColor = "white"
        }, 1000);
        
        localStorage.setItem("logged", "false")
      }
    })
  }

  doregister(name,pass){
    this.royaleService.register(name, pass).subscribe(x =>{
      if(x['code'] == 200){
        localStorage.setItem("id_personagem", x['data'])
        this.royaleService.criarChar("Archer", 30, 35, 70, name, pass).subscribe((x) =>{});
        this.dologin(name,pass);
      }else{
        this.inputname.nativeElement.style.backgroundColor = "rgb(255, 40, 40)";
        this.inputpass.nativeElement.style.backgroundColor = "rgb(255, 40, 40)";
        setTimeout(() => {
          this.inputname.nativeElement.style.backgroundColor = "white"
          this.inputpass.nativeElement.style.backgroundColor = "white"
        }, 1000);
        localStorage.setItem("registered", "false")
      }
    })
  }

}
