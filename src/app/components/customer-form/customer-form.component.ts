import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { CustomerService } from  '../../services/customer.service';
import { Customer } from '../../models/customer';

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

import { SelectOnFocusDirective } from "../../custom-directives/select-on-focus.directive";

@Component({
  selector: 'app-customer-form',
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
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css']
})
export class CustomerFormComponent implements OnInit {

  form!: FormGroup;

  isEdit = false;
  id!: number;
  isSubmitted = false;

  constructor(
    private fb: FormBuilder,
    private service: CustomerService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  get f() {
    return this.form.controls;
  }

  ngOnInit(): void {

    this.form = this.fb.group({

      code: ['', [Validators.required, Validators.maxLength(10)]],

      name: ['', [Validators.required, Validators.maxLength(100)]],

      contactPerson: ['', Validators.maxLength(100)],

      email: ['', [Validators.email, Validators.maxLength(255)]],

      phoneNumber: ['', Validators.maxLength(20)],

      gstNumber: ['', Validators.maxLength(20)],

      address: ['', Validators.maxLength(250)],

      city: ['', Validators.maxLength(100)],

      state: ['', Validators.maxLength(100)],

      zipCode: ['', Validators.maxLength(10)],

      isActive: [true]

    });

    if (this.data) {
      this.isEdit = true;
      this.id = this.data.id;
     this.form.patchValue({
  code: this.data.customerCode,
  name: this.data.customerName,
  contactPerson: this.data.contactPerson,
  phoneNumber: this.data.mobileNo,
  email: this.data.email,
  gstNumber: this.data.gstNo,
  address: this.data.address1,
  city: this.data.city,
  state: this.data.state,
  zipCode: this.data.zipCode,
  isActive: this.data.isActive
});
    }

  }

submit() {

  this.isSubmitted = true;

  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  const formValue = this.form.value;

  const payload: Customer = {
    id: this.id,
    customerCode: formValue.code,
    customerName: formValue.name,
    contactPerson: formValue.contactPerson,
    mobileNo: formValue.phoneNumber,
    email: formValue.email,
    address1: formValue.address,
    address2: '',
    city: formValue.city,
    state: formValue.state,
    country: '',
    zipCode: formValue.zipCode,
    gstNo: formValue.gstNumber,
    isActive: formValue.isActive
  };

  if (this.isEdit) {

    this.service.Update(this.id, payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => {
        this.snackBar.open('Error updating customer', 'Close', {
          duration: 3000
        });
      }
    });

  } else {

    this.service.create(payload).subscribe({
      next: () => this.dialogRef.close(true),
      error: () => {
        this.snackBar.open('Error creating customer', 'Close', {
          duration: 3000
        });
      }
    });

  }
}

  allowOnlyNumbers(event: KeyboardEvent) {

    if (!/^[0-9]$/.test(event.key)) {
      event.preventDefault();
    }

  }

}