import {Injectable,signal} from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Users } from "../models/users";
import { PagedResult }from "../models/paged-result";
 
 
@Injectable({providedIn:'root'})
 
export class UsersService
{
    private apiUrl="http://localhost:5027/api/Users";
    users = signal<Users[]>([]);
    constructor(private http:HttpClient){}
    getPagedusers(
     UserName :string,
     FirstName:string,
     LastName :string,     
     PhoneNumber: string,
     City:string,
     DateOfBirth:number,
     IsActive:boolean,
     PageNumber:number,
     PageSize:number
     
    ):Observable<PagedResult<Users>> {
    let params = new HttpParams()
      .set('UserName', UserName || '')
      .set('FirstName', FirstName || '')
      .set('LastName', LastName || '')
      .set('PhoneNumber', PhoneNumber || '')
      .set('City', City || '')
      .set('DateOfBirth', DateOfBirth || '')
      .set('IsActive', IsActive || '')  
      .set('PageNumber', PageNumber)
      .set('PageSize', PageSize );
 
    return this.http.get<PagedResult<Users>>(
      `${this.apiUrl}/GetAllPaged`,
      { params }
    );
  }
 
 
    GetAll():Observable<Users[]>
    {
        return this.http.get<Users[]>(`${this.apiUrl}/GetAll`);
    }
    GetById(Id:number):Observable<Users>
    {
        return this.http.get<Users>(`${this.apiUrl}/GetById/${Id}`);
    }
    create(request:Users):Observable<number>
    {
        return this.http.post<number>(`${this.apiUrl}/Create`,request);
    }
    Update(Id:number, request:Users):Observable<boolean>
    {
        return this.http.put<boolean>(`${this.apiUrl}/Update/${Id}`,request);
    }
    delete(Id:number):Observable<boolean>
    {
        return this.http.delete<boolean>(`${this.apiUrl}/delete/${Id}`);
    }
}
 