import { Component, OnInit } from '@angular/core';
import { Employee } from './data/employee';
import { EmployeeService } from './data/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  getEmployeeSub: any;
  loadingError: boolean;

  constructor(private e: EmployeeService) {
      this.employees = [];
      this.getEmployeeSub = '';
      this.loadingError = false;
   }

  ngOnInit() {
    this.getEmployeeSub = 
      this.e.getEmployees().subscribe((employees) => {
    this.employees = employees;
    }, () => {
    this.loadingError = true;
    })
  }

  ngOnDestroy() {
    this.getEmployeeSub.unsubscribe();
  }
}
