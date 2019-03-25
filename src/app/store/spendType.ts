export default {
  isPublic: false, // デフォルト値：Private
  publicTapNum: 0,
  privateTapNum: 1,

  /**
   * setPublicType
   * 支出タイプを「Public」にする
   */
  setPublicSpendType() {
    this.isPublic = true;
  },
  /**
   * setPrivateType
   * 支出タイプを「Private」にする
   */
  setPrivateSpendType() {
    this.isPublic = false;
  }
};
