export default class User{
  uid: string
  email: string
  jwt: Promise<string>|string
  lastSignInTime: string


  constructor(uid: string, email: string, jwt: Promise<string>|string, lastSignInTime: string) {
    this.uid = uid;
    this.email = email;
    this.jwt = jwt;
    this.lastSignInTime = lastSignInTime;
  }

  public extractUserIdFromJwt(): string {
    if (typeof this.jwt !== "string") {
      return ''
    }

    let base64Url = this.jwt.split('.')[1];
    let base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload).user_id
  }
}
