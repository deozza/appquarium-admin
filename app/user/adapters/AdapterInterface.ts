import User from "~/app/user/entities/User";

export default interface AdapterInterface {
  authenticateWithEmailAndPassword(email: string, password: string): Promise<User | null>
}
