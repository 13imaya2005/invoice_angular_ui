import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { Customer } from "../models/customer";
import { PagedResult } from "../models/paged-result";
import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class CustomerService {

    private apiUrl = "http://localhost:5027/api/Customer";

    customers = signal<Customer[]>([]);

    constructor(private http: HttpClient) { }

    getPagedCustomers(
        CustomerCode: string,
        CustomerName: string,
        pageNumber: number,
        pageSize: number
    ): Observable<PagedResult<Customer>> {

        let params = new HttpParams()
            .set('CustomerCode', CustomerCode || '')
            .set('CustomerName', CustomerName || '')
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);

        return this.http.get<PagedResult<Customer>>(
            `${this.apiUrl}/GetAllPaged`,
            { params }
        );
    }

    GetAll(): Observable<Customer[]> {
        return this.http.get<Customer[]>(`${this.apiUrl}/GetAll`);
    }

    GetById(Id: number): Observable<Customer> {
        return this.http.get<Customer>(`${this.apiUrl}/GetById/${Id}`);
    }

    create(request: Customer): Observable<number> {
        return this.http.post<number>(`${this.apiUrl}/Create`, request);
    }

    Update(Id: number, request: Customer): Observable<boolean> {
        return this.http.put<boolean>(`${this.apiUrl}/Update/${Id}`, request);
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}/Delete/${id}`);
    }
}
