import { Component, OnInit } from '@angular/core';
import { Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'ci-sign-the-month-dialog',
  templateUrl: './sign-the-month-dialog.component.html',
  styleUrls: ['./sign-the-month-dialog.component.scss']
})
export class SignTheMonthDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<SignTheMonthDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onCloseNo(): void {
    this.dialogRef.close();
  }

  onCloseOk(): void {
    this.dialogRef.close(this.data);
  }

  ngOnInit() {
  }

}
