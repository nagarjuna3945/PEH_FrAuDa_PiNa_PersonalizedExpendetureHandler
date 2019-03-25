import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { MatDialog } from '@angular/material';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Spend } from '../../../../model/spend';
import { SpendService } from '../../../../service/spend.service';
import { DeleteSpendDialogComponent } from './dialog/delete-spend-dialog.component';
import { EditSpendComponent } from '../../edit/edit-spend.component';
import { AlertMessageComponent } from '../../../common/alert-message/alert-message.component';

@Component({
  selector: 'app-bottom-sheet',
  templateUrl: './bottom-sheet.component.html',
  styleUrls: ['./bottom-sheet.component.scss']
})
export class BottomSheetComponent {
  spendData: Spend = null;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<BottomSheetComponent>,
    public dialog: MatDialog,
    private spendService: SpendService,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any,
    private alertMessageComponent: AlertMessageComponent
  ) {
    this.spendData = data;
  }

  deleteAlertDialog() {
    // 削除確認のDialogを表示
    const dialogRef = this.dialog.open(DeleteSpendDialogComponent, {
      data: this.spendData
    });

    // bottomSheetを閉じる
    this.bottomSheetRef.dismiss();

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteSpend();
      }
    });
  }

  // 削除処理
  deleteSpend() {
    this.spendService.deleteSpend(this.spendData['$key'])
      .then(ref => {
        this.alertMessageComponent.openSnackBar('支出を削除しました 👀');
      }).catch(ref => {
        this.alertMessageComponent.openSnackBar('支出を削除できませんでした 😱');
      });
  }

  openEditForm() {
    this.dialog.open(EditSpendComponent, {
      width: '75%',
      data: this.spendData
    });

    this.bottomSheetRef.dismiss(); // bottomSheetを閉じる
  }

}
