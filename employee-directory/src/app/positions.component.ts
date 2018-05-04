import { Component, OnInit } from '@angular/core';
import { Position } from './data/position';
import { PositionService } from './data/position.service';

@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.css']
})
export class PositionsComponent implements OnInit {
  
  positions: Position[];
  getPositionsSub: any;
  loadingError: boolean;

  constructor(private p: PositionService) {
    this.positions = [];
    this.getPositionsSub = '';
    this.loadingError = false;
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
