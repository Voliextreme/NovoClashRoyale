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
  
  ngOnInit(): void {
    this.service.coins = Number(localStorage.getItem("coins"));
  }

  @ViewChild('train') train : any;


  hasOneDayPassed() {
    var date = new Date().toLocaleDateString();

    if (localStorage.yourapp_date == date) {
      return false;
    }

    localStorage.yourapp_date = date;
    return true;
  }

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
    }else{
      this.train.nativeElement.style.animation = "piscar 2s ";
      setTimeout(() => {
        this.router.navigate(['/lobby']);
      }, 2000);
    }
  }
 



}
