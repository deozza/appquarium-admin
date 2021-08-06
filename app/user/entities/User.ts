export default class User{
  uid: string
  email: string
  jwt: Promise<string>


  constructor(uid: string, email: string, jwt: Promise<string>) {
    this.uid = uid;
    this.email = email;
    this.jwt = jwt;
  }
}
