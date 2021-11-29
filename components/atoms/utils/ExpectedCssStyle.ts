export default class ExpectedCssStyle {
  public static getExpectedStyles(): Array<string>{
    return [
      'primary',
      'secondary',
      'success',
      'danger',
      'warning',
      'info',
      'link',
      'light',
      'dark'
    ]
  }

  public static getExpectedSizes(): Array<string> {
    return  [
      'normal',
      'small',
      'large'
    ]
  }

  public static getExpectedButtonTypes(): Array<string> {
    return [
      'submit',
      'button',
      'reset'
    ]
  }
}
