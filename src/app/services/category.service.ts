import {Injectable,signal} from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { Category } from "../models/category";
import { PagedResult }from "../models/paged-result";
 
 
@Injectable({providedIn:'root'})
 
export class CategoryService
{
    private apiUrl="http://localhost:5027/api/Category";
    items = signal<Category[]>([]);
    constructor(private http:HttpClient){}
    getPagedcategory(
    Code: string,
    Name: string,
    pageNumber: number,
    pageSize: number
 
    ):Observable<PagedResult<Category>> {
    let params = new HttpParams()
      .set('Code', Code || '')
      .set('Name', Name || '')
      .set('pageNumber', pageNumber)
      .set('pageSize', pageSize);
 
    return this.http.get<PagedResult<Category>>(
      `${this.apiUrl}/GetAllPaged`,
      { params }
    );
  }
 
 
    GetAll():Observable<Category[]>
    {
        return this.http.get<Category[]>(`${this.apiUrl}/GetAll`);
    }
    GetById(Id:number):Observable<Category>
    {
        return this.http.get<Category>(`${this.apiUrl}/GetById/${Id}`);
    }
    create(request:Category):Observable<number>
    {
        return this.http.post<number>(`${this.apiUrl}/Create`,request);
    }
    Update(Id:number, request:Category):Observable<boolean>
    {
        return this.http.put<boolean>(`${this.apiUrl}/Update/${Id}`,request);
    }
    delete(Id:number):Observable<boolean>
    {
        return this.http.delete<boolean>(`${this.apiUrl}/delete/${Id}`);
    }
}
 