import { Component, OnInit } from '@angular/core';
import { RoyaleServiceService } from 'src/app/services/royale-service.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  service : RoyaleServiceService
  constructor(private royaleService : RoyaleServiceService) {
    this.service = royaleService;
   }

  ngOnInit(): void {
  }

}
