import { Component, OnInit } from '@angular/core';
import { Employee } from './data/employee';
import { EmployeeService } from './data/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  getEmployeeSub: any;
  loadingError: boolean;
  filteredEmployees: Employee[];

  constructor(private e: EmployeeService, private empRouter: Router) {
      this.employees = [];
      this.getEmployeeSub = '';
      this.loadingError = false;
      this.filteredEmployees = [];
   }

  routeEmployee(id : string){
    this.empRouter.navigate(["/employee", id]);
  }

  ngOnInit() {
    this.getEmployeeSub = 
      this.e.getEmployees().subscribe((employees) => {
    this.employees = employees;
    this.filteredEmployees = employees;
    }, () => {
    this.loadingError = true;
    })
  }

  onEmployeeSearchKeyUp(event: any){    
    let substring : string = event.target.value.toLowerCase();
    this.filteredEmployees = this.employees.filter((e) => ((e.FirstName.toLowerCase().indexOf(substring) !== -1 ) || (e.LastName.toLowerCase().indexOf(substring) !== -1)))
}

  ngOnDestroy() {
    this.getEmployeeSub.unsubscribe();
  }
}
