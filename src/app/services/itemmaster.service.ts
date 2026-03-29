import {Injectable,signal} from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Itemmaster } from "../models/itemmaster";
 
@Injectable({providedIn:'root'})
 
export class ItemmasterService
{
    private apiUrl="http://localhost:5027/api/Itemmaster";
    items = signal<Itemmaster[]>([]);
    constructor(private http:HttpClient){}
    GetAll():Observable<Itemmaster[]>
    {
        return this.http.get<Itemmaster[]>(`${this.apiUrl}/GetAll`);
    }
    GetById(Id:number):Observable<Itemmaster>
    {
        return this.http.get<Itemmaster>(`${this.apiUrl}/GetById/${Id}`);
    }
    create(request:Itemmaster):Observable<number>
    {
        return this.http.post<number>(`${this.apiUrl}/Create`,request);
    }
    Update(Id:number, request:Itemmaster):Observable<boolean>
    {
        return this.http.put<boolean>(`${this.apiUrl}/Update/${Id}`,request);
    }
    delete(Id:number):Observable<boolean>
    {
        return this.http.delete<boolean>(`${this.apiUrl}/delete/${Id}`);
    }
}
 