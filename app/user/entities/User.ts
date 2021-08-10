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
}
