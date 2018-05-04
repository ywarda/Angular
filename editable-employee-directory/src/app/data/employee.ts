import { Position } from './position';

export class Employee {

  _id: string;
  FirstName: string;
  LastName: string;
  AddressStreet: string;
  AddressState: string;
  AddressCity: string;
  AddressZip: string;
  PhoneNum: string;
  Extension: number;
  Position: Position;
  HireDate: string;
  SalaryBonus: number;
  __v: number;

  constructor() { 
    this._id = '';
    this.FirstName = '';
    this.LastName = '';
    this.AddressStreet = '';
    this.AddressState = '';
    this.AddressCity = '';
    this.AddressZip = '';
    this.PhoneNum = '';
    this.Extension = 0;
    this.Position = new Position();
    this.HireDate = '';
    this.SalaryBonus = 0;
    this.__v = 0;
  }
}