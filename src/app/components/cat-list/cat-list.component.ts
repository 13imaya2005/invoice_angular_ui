import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { CategoryService } from "../../services/category.service";
import { Category } from "../../models/category";
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from "@angular/material/button";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ConfirmDialogComponent } from "../../shared/confirm-dialog.component";
import { PagedResult } from '../../models/paged-result';
import { CategoryFormComponent } from "../cat-form/cat-form.component";


 
@Component({
    selector:'app-category-list',
    standalone:true,
    imports:[CommonModule,RouterModule,ReactiveFormsModule,MatTableModule,MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    MatSortModule],
    templateUrl:'./cat-list.component.html',
    styleUrls:['./cat-list.component.css']
})
export class CategoryListComponent implements OnInit {
    categories = signal<Category[]>([]);
        // Add a MatTableDataSource to connect with mat-table
    dataSource!: MatTableDataSource<Category>;
    displayedColumns:string[] =
            [
                'Code',
                'Name',
                'description',
                'isActive',
                'actions'
            ];
              isLoading = false;
 
  filterForm!: FormGroup;
  pageSize = 10;
  pageIndex = 0;
  totalRecords = 0;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
    constructor(
        private service:CategoryService,
        private snackBar:MatSnackBar,
        private dialog:MatDialog,
        private fb : FormBuilder,
    ){}
    ngOnInit(): void {
        this.initFilterForm();
        this.loadcategory();
    }
    initFilterForm() {
    this.filterForm = this.fb.group({
      Code: [''],
      Name: [''],
    });
 
    this.filterForm.valueChanges
      .pipe(debounceTime(400), distinctUntilChanged())
      .subscribe((value) => {
         this.pageIndex=0;
         this.loadcategory();
      });
  }
  clearFilters() {
    this.filterForm.reset({
      Code: '',
      Name: '',
    });
 
    this.pageIndex = 0;
    this.loadcategory();
  }
  onPageChange(event: any) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadcategory();
  }
  async loadcategory() {
    this.isLoading = true;
 
    try {
      const filter = this.filterForm.value || {};
 
      const res: PagedResult<Category> = await firstValueFrom(
        this.service.getPagedcategory(
          filter.Code,
          filter.Name,
          this.pageIndex + 1, // API usually 1-based
          this.pageSize,
        ),
      );
     
      this.categories.set(res?.data ?? []);
      this.totalRecords = res.totalRecords;
      this.dataSource = new MatTableDataSource(res?.data ?? []);
 
      setTimeout(() => {
        this.dataSource.sort = this.sort;
      });
    } catch {
      this.snackBar.open('Category Loading Error', 'Close', { duration: 3000 });
    } finally {
      this.isLoading = false;
    }
  }
 
  // ---------------- DELETE ----------------
  async delete(id: number, name: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { name },
    });
 
    const result = await firstValueFrom(dialogRef.afterClosed());
    if (!result) return;
 
    try {
      await firstValueFrom(this.service.delete(id));
 
      this.snackBar.open('Category deleted successfully', 'Close', {
        duration: 3000,
      });
 
      await this.loadcategory();
      this.clearFilters();
    } catch {
      this.snackBar.open('Category delete error', 'Close', { duration: 3000 });
    }
  }
 
  // ---------------- DIALOGS ----------------
  openAddDialog() {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '900px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog',
      autoFocus: false,
      data: null,
    });
 
    dialogRef.afterClosed().subscribe((result) => {
      if (result)
      {
          this.snackBar.open('Category created successfully', 'Close', {
            duration: 3000
          });
          this.loadcategory();
      }
    });
  }
 
  openEditDialog(Category: any) {
    const dialogRef = this.dialog.open(CategoryFormComponent, {
      width: '900px',
      maxHeight: '90vh',
      panelClass: 'custom-dialog',
      autoFocus: false,
      data: Category,
    });
 
    dialogRef.afterClosed().subscribe((result) => {
      if (result === true)
      {
         this.snackBar.open('Category updated successfully', 'Close', {
            duration: 3000
          });
        this.loadcategory();
      }
    });
  }
}
 
   
 