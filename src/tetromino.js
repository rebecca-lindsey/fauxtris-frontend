class Tetromino {
  constructor() {
    this.orientation = "first";
  }
  static activeBlock;

  static nextLetterRowUpwards(rowName) {
    return `${String.fromCharCode(rowName.charCodeAt(0) + 1)}Row`;
  }

  static nextLetterRowDownwards(rowName) {
    return `${String.fromCharCode(rowName.charCodeAt(0) - 1)}Row`;
  }
}
