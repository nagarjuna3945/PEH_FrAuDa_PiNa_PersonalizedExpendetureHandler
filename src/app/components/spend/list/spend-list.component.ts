import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatSort } from '@angular/material';
import { MatBottomSheet } from '@angular/material';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { Moment } from 'moment';
import { MatDatepicker } from '@angular/material/datepicker';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import * as _moment from 'moment';

import { SpendService } from '../../../service/spend.service';
import { BottomSheetComponent } from './bottom-sheet/bottom-sheet.component';
import { Spend } from '../../../model/spend';
import store from '../../../store/spendType';
import 'rxjs/add/operator/filter';

const moment = _moment;
export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY/MM',
  },
  display: {
    dateInput: 'YYYY/MM',
    monthYearLabel: 'YYYY MMM',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'YYYY MMMM',
  },
};


@Component({
  selector: 'app-spend-list',
  templateUrl: './spend-list.component.html',
  styleUrls: ['./spend-list.component.scss'],
  providers: [
    {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
    {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
  ],
})
export class SpendListComponent {
  selectedTab = store.privateTapNum;
  tabs = [
    { icon: 'home', label: 'Public' },
    { icon: 'face', label: 'Private' }
  ];

  spendTempList:    Spend[];
  spendPublicList:  Spend[];
  spendPrivateList: Spend[];

  searchMonth = new FormControl(moment());
  resultsLength: Number = 0;
  totalAmount: Number   = 0;
  storeObj = store;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private spendService: SpendService,
    private bottomSheet: MatBottomSheet,
    private route: ActivatedRoute
  ) {
    // 初期表示TABを指定
    route.queryParams
      .filter(params => params.isPublic)
      .subscribe(params => {
        // 通知をクリックし、アプリを開いた場合は、初期表示を「Public」にする
        if (params.isPublic) {
          store.setPublicSpendType();
        }
      });

    this.selectedTab = store.isPublic ? store.publicTapNum : store.privateTapNum;

    // 支出リストを取得
    this.getSpendList();
  }

  /**
   * tabChanged
   * タブを変える時に、以下の処理を行う
   *  1.isPublicフラグを更新
   *  2.検索対象月をリセット
   *  3.支出リストを再取得
   *
   * @memberof SpendListComponent
   */
  tabChanged = (tabChangeEvent: number): void => {
    if (tabChangeEvent === store.privateTapNum) {
      // Select PrivateTap
      store.setPrivateSpendType();
    } else {
      // Select PublicTap
      store.setPublicSpendType();
    }

    // 検索対象月をリセット
    this.searchMonth.setValue(moment());

    // 支出リストを再取得
    this.getSpendList();
  }

  /**
   * getSpendList
   * 支出リストを取得
   *
   * @param {*} [searchMonth=null]
   * @memberof SpendListComponent
   */
  getSpendList(searchMonth = null) {
    const data = (searchMonth === null) ? this.spendService.getSpendList() : this.spendService.getSpendList(searchMonth);

    data.snapshotChanges().subscribe(item => {
      // 初期化
      this.spendTempList  = [];
      this.totalAmount    = 0;

      this.resultsLength  = item.length;

      item.forEach(element => {
        const json = element.payload.toJSON();
        json['$key'] = element.key;
        this.spendTempList.push(json as Spend);

        // 合計計算
        this.totalAmount += json['amount'];
      });

      // Public
      if (store.isPublic) {
        this.spendPublicList = this.spendTempList;
        return;
      }
      // Private
      this.spendPrivateList = this.spendTempList;
    });
  }

  /**
   * openBottomSheet
   * アクションメニューを表示（変更、削除）
   *
   * @param spend
   */
  openBottomSheet(spend): void {
    this.bottomSheet.open(BottomSheetComponent, {
      data: spend
    });
  }

  /**
   * chosenMonthHandler
   * [期間検索]のカレンダーから月を選択した時に、以下の処理を行う
   *  - 年、月まで取得し、画面上の入力欄に反映
   *  - 選択された期間で支出リストを再取得
   *  - カレンダーを閉じる
   *
   * @param normlizedMonth
   * @param datepicker
   */
  chosenMonthHandler(normlizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    // 検索対象月を指定
    const ctrlValue = this.searchMonth.value;
    ctrlValue.year(normlizedMonth.year());
    ctrlValue.month(normlizedMonth.month());
    this.searchMonth.setValue(ctrlValue);

    // 支出リストを再取得
    this.getSpendList(this.searchMonth.value);

    datepicker.close();
  }
}
