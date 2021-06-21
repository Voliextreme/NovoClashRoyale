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
  }

  @ViewChild('train') train : any;

  trained : boolean = false;
  

  treinar(){
    if(!this.trained){
      this.service.coins -= 500;
      this.trained = true;
      let atk = this.service.charescolhido.atk + 5;
      let crit = this.service.charescolhido.atk + 5;
      let hp = this.service.charescolhido.atk + 5;
      this.service.updateStats(atk, crit, hp).subscribe((x) => {
        console.log(x['data']);
      });
    }else{
      this.train.nativeElement.style.animation = "piscar 2s ";
      setTimeout(() => {
        this.router.navigate(['/lobby']);
      }, 2000);
    }
  }


 



}
