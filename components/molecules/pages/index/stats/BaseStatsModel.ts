export default class BaseStatsModel {
  title: string
  icons: Array<string>
  stat: number
  linkPath: string

  constructor(title: string, icons: Array<string>, stat: number, linkPath: string) {
    this.title = title;
    this.icons = icons;
    this.stat = stat;
    this.linkPath = linkPath
  }

  toJSON () {
    return { ...this } // here I make a POJO's copy of the class instance
  }
}
