import { Component, OnInit, OnDestroy } from '@angular/core';
import { EmployeeRaw } from './data/employeeRaw';
import { EmployeeService } from './data/employee.service';
import { Position } from './data/position';
import { PositionService } from './data/position.service';
import { EmployeesComponent } from './employees.component';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit, OnDestroy {

  private paramSubScription : any;
  private employeeSubscription : any;
  private getPositionsSubcription : any;
  private saveEmployeeSubscription : any;
  private employee: EmployeeRaw;
  private positions : Position[];
  private successMessage = false;
  private failMessage = false;


  constructor(private employeeService : EmployeeService, private activatedRoute : ActivatedRoute, private positionService : PositionService) { 

  }

  ngOnInit() {
    this.paramSubScription = this.activatedRoute.params.subscribe((params) => {
      this.employeeSubscription = this.employeeService.getEmployee(params['_id']).subscribe((emp) => {
        this.employee = emp[0];
        this.getPositionsSubcription = this.positionService.getPositions().subscribe( pos => {
          this.positions = pos;
        });
      });
    })
  }

  onSubmit() {
    this.saveEmployeeSubscription = this.employeeService.saveEmployee(this.employee).subscribe(() => {
      this.successMessage = true;
      setTimeout(() => {
        this.successMessage = false;
      }, 2500);
    });
  }

  ngOnDestroy() {
    if(this.paramSubScription){
      this.paramSubScription.unsubscribe();
    }
    if(this.employeeSubscription){
      this.employeeSubscription.unsubscribe();
    }
    if(this.getPositionsSubcription){
      this.getPositionsSubcription.unsubscribe();
    }
    if(this.saveEmployeeSubscription){
      this.saveEmployeeSubscription.unsubscribe();
    }
  }
}
