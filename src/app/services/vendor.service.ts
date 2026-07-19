import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";

import { Vendor } from "../models/vendor";
import { PagedResult } from "../models/paged-result";
import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: 'root' })

export class VendorService {

    private apiUrl = "http://localhost:5027/api/Vendor";

    vendors = signal<Vendor[]>([]);

    constructor(private http: HttpClient) { }

    getPagedVendor(
        VendorCode: string,
        VendorName: string,
        ContactPerson: string | null,
        MobileNo: string | null,
        Email: string | null,
        City: string | null,
        IsActive: boolean | null,
        pageNumber: number,
        pageSize: number
    ): Observable<PagedResult<Vendor>> {

        let params = new HttpParams()
            .set('VendorCode', VendorCode || '')
            .set('VendorName', VendorName || '')
            .set('ContactPerson', ContactPerson || '')
            .set('MobileNo', MobileNo || '')
            .set('Email', Email || '')
            .set('City', City || '');

        if (IsActive !== null) {
            params = params.set('IsActive', IsActive);
        }

        params = params
            .set('pageNumber', pageNumber)
            .set('pageSize', pageSize);

        return this.http.get<PagedResult<Vendor>>(
            `${this.apiUrl}/GetAllPaged`,
            { params }
        );
    }

    GetAll(): Observable<Vendor[]> {
        return this.http.get<Vendor[]>(`${this.apiUrl}/GetAll`);
    }

    GetById(id: number): Observable<Vendor> {
        return this.http.get<Vendor>(`${this.apiUrl}/GetById/${id}`);
    }

    create(request: Vendor): Observable<number> {
        return this.http.post<number>(`${this.apiUrl}/Create`, request);
    }

    Update(id: number, request: Vendor): Observable<boolean> {
        return this.http.put<boolean>(`${this.apiUrl}/Update/${id}`, request);
    }

    delete(id: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.apiUrl}/Delete/${id}`);
    }
}