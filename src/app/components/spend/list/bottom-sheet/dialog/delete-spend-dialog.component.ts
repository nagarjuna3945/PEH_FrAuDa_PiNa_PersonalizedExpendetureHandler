import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Spend } from '../../../../../model/spend';

@Component({
  selector: 'app-delete-spend-dialog',
  templateUrl: './delete-spend-dialog.component.html',
  styleUrls: ['./delete-spend-dialog.component.scss']
})
export class DeleteSpendDialogComponent {
  spendData: Spend = null;

  constructor(
    public dialogRef: MatDialogRef<DeleteSpendDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Spend
  ) {
    this.spendData = data;
  }

}
