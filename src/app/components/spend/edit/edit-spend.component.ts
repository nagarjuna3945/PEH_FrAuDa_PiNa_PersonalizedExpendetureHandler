import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SpendService } from '../../../service/spend.service';
import { AuthService } from '../../../core/auth.service';
import { Spend } from '../../../model/spend';
import { AlertMessageComponent } from '../../common/alert-message/alert-message.component';
import store from '../../../store/spendType';
import * as Const from '../../../shared/data.service';

@Component({
  selector: 'app-edit-spend',
  templateUrl: './edit-spend.component.html',
  styleUrls: ['./edit-spend.component.scss']
})
export class EditSpendComponent {
  spendData: Spend;
  spendForm: FormGroup;
  categories = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Spend,
    public dialogRef: MatDialogRef<EditSpendComponent>,
    private fb: FormBuilder,
    private spendService: SpendService,
    public authService: AuthService,
    private alertMessageComponent: AlertMessageComponent
  ) {
    this.spendData  = data;

    this.categories = store.isPublic ? Const.publicCategory : Const.privateCategory;

    this.spendForm  = this.fb.group({
      category: [ this.spendData['category'], Validators.required ],
      date: [ new Date(this.spendData['createDate']), Validators.required ],
      amount: [ this.spendData['amount'], Validators.required ],
      memo: [ this.spendData['memo'] ]
    });
  }

  save(spend) {
    const editSpend: Spend = {
      uid: this.authService.uid,
      category: spend['category'],
      createDate: spend['date'].toISOString(),
      amount: spend['amount'],
      memo: spend['memo']
    };

    this.spendService.editSpend(this.spendData['$key'], editSpend)
      .then(ref => {
        this.dialogRef.close();
        this.alertMessageComponent.openSnackBar('支出を編集しました ✏️');
      }).catch(ref => {
        this.alertMessageComponent.openSnackBar('支出を編集できませんでした 😱');
      });
  }
}
