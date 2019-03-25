import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Spend } from '../model/spend';
import store from '../store/spendType';

// Service
import { AuthService } from '../core/auth.service';

import * as _moment from 'moment';
const moment = _moment;

@Injectable({
  providedIn: 'root'
})
export class SpendService {
  private spendPublicListRef  = this.db.list<Spend>('public_spend', ref => ref.orderByChild('createDate'));
  private spendPrivateListRef = this.db.list<Spend>('private_spend/' + this.authService.uid, ref => ref.orderByChild('createDate'));

  constructor(
    private db: AngularFireDatabase,
    public authService: AuthService
  ) { }

  /**
   * addSpend
   * 支出データを登録
   *
   * @param {Spend} spend
   * @returns
   * @memberof SpendService
   */
  addSpend(spend: Spend) {
    // Public
    if (store.isPublic) {
      return this.spendPublicListRef.push(spend);
    }

    // Private
    return this.spendPrivateListRef.push(spend);
  }

  // TODO: get~SpendList()を１つの関数にまとめる
  // Get Public
  getPublicSpendList(searchDate = null) {
    searchDate = (!searchDate) ? this.getSearchDate() : this.getSearchDate(searchDate);

    return this.db.list<Spend>('public_spend',
      ref => ref.orderByChild('createDate')
                .startAt(searchDate.startAt)
                .endAt(searchDate.endAt));
  }

  // Get Private
  getPrivateSpendList(searchDate = null) {
    searchDate = (!searchDate) ? this.getSearchDate() : this.getSearchDate(searchDate);

    return this.db.list<Spend>('private_spend/' + this.authService.uid,
      ref => ref.orderByChild('createDate')
                .startAt(searchDate.startAt)
                .endAt(searchDate.endAt));
  }

  /**
   * getSpendList
   * 支出リストを取得
   *
   * @param searchDate 検索月
   */
  getSpendList(searchDate = null) {
    searchDate = (!searchDate) ? this.getSearchDate() : this.getSearchDate(searchDate);

    // Public
    if (store.isPublic) {
      return this.db.list<Spend>('public_spend',
        ref => ref.orderByChild('createDate')
                  .startAt(searchDate.startAt)
                  .endAt(searchDate.endAt));
    }

    // Private
    return this.db.list<Spend>('private_spend/' + this.authService.uid,
      ref => ref.orderByChild('createDate')
                .startAt(searchDate.startAt)
                .endAt(searchDate.endAt));
  }

  /**
   * deleteSpend
   * 支出データを削除
   *
   * @param {*} deleteKey
   * @returns
   * @memberof SpendService
   */
  deleteSpend(deleteKey: any) {
    if (store.isPublic) {
      return this.db.list<Spend>('public_spend/' + deleteKey).remove();
    }
    return this.db.list<Spend>('private_spend/' + this.authService.uid + '/' + deleteKey).remove();
  }

  // TODO: 関数名を全体的に修正 - index(), add(), edit() delete()

  /**
   * editSpend
   * 支出データを編集
   *
   * @param editKey
   * @param spend
   */
  editSpend(editKey: any, spend: Spend) {
    if (store.isPublic) {
      return this.db.list<Spend>('public_spend/').update(editKey, spend);
    }
    return this.db.list<Spend>('private_spend/' + this.authService.uid).update(editKey, spend);
  }

  /**
   * getSearchDate
   * 取得する検索期間をセットする
   * ただし、期間を指定していない場合は、現在の日付を基準にする
   *
   * @param searchDate
   */
  getSearchDate(searchDate = null) {
    if (!searchDate) {
      return {
        startAt: moment().startOf('month').toISOString(),
        endAt: moment().endOf('month').toISOString()
      };
    }

    return {
      startAt: moment(searchDate).startOf('month').toISOString(),
      endAt: moment(searchDate).endOf('month').toISOString()
    };
  }
}
