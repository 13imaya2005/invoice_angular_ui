import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
 
import { CategoryService} from '../../services/';
import { MatSnackBar } from '@angular/material/snack-bar';
 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogContent,
} from '@angular/material/dialog';
 
import { Category } from '../../models/Category';
import { SelectOnFocusDirective } from "../../custom-directives/select-on-focus.directive";
 
@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatRadioModule,
    MatSelectModule,
    MatIconModule,
    SelectOnFocusDirective,
    MatDialogContent
],
  templateUrl: './cat-form.component.html',
  styleUrls: ['./cat-form.component.css']
})
export class CategoryFormComponent implements OnInit {
 
  form!:FormGroup;
 
  isEdit = false;
  id!: number;
  isSubmitted = false;
  constructor(
    private fb: FormBuilder,
    private service: CategoryService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CategoryFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {}
 
  get f(){
    return this.form.controls;
  }
 
  ngOnInit(): void {
    this.form = this.fb.group({
      Code: ['', [Validators.required, Validators.minLength(1),Validators.maxLength(5)]],
      Name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      description:['', Validators.maxLength(250)],
      isActive:[true]
    });
 
        if (this.data) {
      this.isEdit = true;
      this.id = this.data.id;
      this.form.patchValue(this.data);
    }
  }
 
  submit() {
    this.isSubmitted = true;
    if(this.form.invalid)
      {
       this.form.markAllAsTouched();
        return;
      }
    const formValue = this.form.value;
    const payload: Category = {
        ...formValue,
        isActive: formValue.isActive === true
    };
 
    if (this.isEdit) {
      this.service.Update(this.id, payload).subscribe({
        next: () => {
            this.dialogRef.close(true);
        },
        error: () => {
          this.snackBar.open('Error updating category', 'Close', {
            duration: 3000
          });
        }
      });
    } else {
      this.service.create(payload).subscribe({
        next: () => {
            this.dialogRef.close(true);
        },
         
        error: () => {
          this.snackBar.open('Error creating category', 'Close', {
            duration: 3000
          });
        }
      });
    }
  }
  allowOnlyNumbers(event: KeyboardEvent) {
    const charCode = event.key;
 
    if (!/^[0-9]$/.test(charCode)) {
      event.preventDefault();
    }
  }
}
 
 