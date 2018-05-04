import { Component, OnInit, OnDestroy } from '@angular/core';
import { Position } from './data/position';
import { PositionService } from './data/position.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit, OnDestroy {

  private paramSubScription : any;
  private positionSubscription : any;
  private savePositionSubscription: any;
  private position : Position;
  private successMessage = false;
  private failMessage = false;

  constructor(private positionService : PositionService, private activatedRoute : ActivatedRoute) {

   }

  ngOnInit() {
    this.paramSubScription  = this.activatedRoute.params.subscribe((params) => {
      this.positionSubscription = this.positionService.getPosition(params['_id']).subscribe((pos) => {
        this.position = pos[0];
      });
    });
  }

  onSubmit() {
    this.savePositionSubscription = this.positionService.savePosition(this.position).subscribe(() => {
      this.successMessage = true;
      setTimeout (() => {
        this.successMessage = false;
      }, 2500);
    });
  }

  ngOnDestroy(){
    if(this.paramSubScription){
      this.paramSubScription.unsubscribe();
    }
    if(this.positionSubscription){
      this.positionSubscription.unsubscribe();
    }
    if(this.savePositionSubscription){
      this.savePositionSubscription.unsubscribe();
    }
  }

}
