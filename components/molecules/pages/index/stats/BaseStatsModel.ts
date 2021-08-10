export default class BaseStatsModel {
  title: string
  icons: Array<string>
  stat: number

  constructor(title: string, icons: Array<string>, stat: number) {
    this.title = title;
    this.icons = icons;
    this.stat = stat;
  }

  toJSON () {
    return { ...this } // here I make a POJO's copy of the class instance
  }
}
