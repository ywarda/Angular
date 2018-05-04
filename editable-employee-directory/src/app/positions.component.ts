import { Component, OnInit } from '@angular/core';
import { Position } from './data/position';
import { PositionService } from './data/position.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  
  positions: Position[];
  getPositionsSub: any;
  loadingError: boolean;

  constructor(private p: PositionService, private posRouter: Router) {
    this.positions = [];
    this.getPositionsSub = '';
    this.loadingError = false;
   }
   
   routePosition(id : string) {
     this.posRouter.navigate(['/position', id]);
   }

  ngOnInit() {
    this.getPositionsSub = 
      this.p.getPositions().subscribe((positions) => {
    this.positions = positions;
    }, () => {
    this.loadingError = true;
    })
  }

  ngOnDestroy() {
    if(this.getPositionsSub){
      this.getPositionsSub.unsubscribe();
    }
  }

}
