import ServicesInterface from "~/app/user/services/ServicesInterface";
import Credentials from "~/app/user/entities/Credentials";
import User from "~/app/user/entities/User";
import AdapterInterface from "~/app/user/adapters/AdapterInterface";
import FirebaseAdapter from "~/app/user/adapters/FirebaseAdapter";
import HasuraAdapter from "~/app/user/adapters/HasuraAdapter";

export default class Services implements ServicesInterface {

  private readonly module: any

  constructor(module: any) {
    this.module = module
  }

  async authenticateUser(credentials: Credentials): Promise<User | null> {

    const adapter: AdapterInterface | null = new FirebaseAdapter(this.module)

    return await adapter.authenticateWithEmailAndPassword(credentials.email.value, credentials.password.value)
  }

  async queryTotalUsers(jwt: string): Promise<number|null> {
    const adapter: AdapterInterface | null = new HasuraAdapter(jwt)

    return await adapter.queryTotalUsers()
  }
}
