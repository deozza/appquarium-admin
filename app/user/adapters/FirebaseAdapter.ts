import AdapterInterface from "~/app/user/adapters/AdapterInterface";
import User from "~/app/user/entities/User";
import firebase from "firebase";

export default class FirebaseAdapter implements AdapterInterface {

  private auth: any

  constructor(auth: any) {
    this.auth = auth
  }

  async authenticateWithEmailAndPassword(email: string, password: string): Promise<User | null> {
    try {
      const userFromFirebase: firebase.auth.UserCredential =  await this.auth.signInWithEmailAndPassword(
        email,
        password
      )
      
      return new User(userFromFirebase.user?.uid!, userFromFirebase.user?.email!, await userFromFirebase.user?.getIdToken()!, userFromFirebase.user?.metadata.lastSignInTime!);
    }
    catch (e) {
      return null
    }
  }

}
