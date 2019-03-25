import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.scss']
})
export class AlertMessageComponent {

  constructor(public snackBar: MatSnackBar) {}

  /**
   * openSnackBar
   * SnackBarメッセージを表示
   *
   * @param message メッセージの文言
   */
  openSnackBar(message: string) {
    this.snackBar.open(message, 'Confirmation', {
      duration: 3000,
    });
  }
}
