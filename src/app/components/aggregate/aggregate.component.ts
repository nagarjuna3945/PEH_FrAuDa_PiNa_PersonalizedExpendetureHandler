import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import store from '../../store/spendType';

@Component({
  selector: 'app-aggregate',
  templateUrl: './aggregate.component.html',
  styleUrls: ['./aggregate.component.scss']
})
export class AggregateComponent {
  storeObj    = store;
  selectedTab = store.privateTapNum;
  tabs = [
    { icon: 'home', label: 'Public' },
    { icon: 'face', label: 'Private' }
  ];

  constructor(private route: ActivatedRoute) {
    // 初期表示TABを指定
    this.selectedTab = store.isPublic ? store.publicTapNum : store.privateTapNum;
  }

  /**
   * tabChanged
   * タブを変える時に、isPublicフラグを更新
   *
   * @memberof SpendListComponent
   */
  tabChanged = (tabChangeEvent: number): void => {
    if (tabChangeEvent === store.privateTapNum) {
      store.setPrivateSpendType(); // Select PrivateTap
      return;
    }
    store.setPublicSpendType(); // Select PublicTap
  }
}
