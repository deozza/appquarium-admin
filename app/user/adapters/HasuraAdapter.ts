import AdapterInterface from "~/app/user/adapters/AdapterInterface";
import HasuraClient from "~/app/utils/hasura/HasuraClient";
import User from "~/app/user/entities/User";

export default class HasuraAdapter extends HasuraClient implements AdapterInterface{
  getRefreshedToken(): Promise<string | null> {
    return Promise.resolve(null);
  }

  constructor(jwt: string) {
    super(jwt);
  }

  async queryTotalUsers(): Promise<number | null> {
    const query: string = `query{
      users_aggregate {
        aggregate {
          count
        }
      }
    }
    `
    try {
      const data = await this.client.request(query)
      const totalUsers: number = data.users_aggregate.aggregate.count
      return totalUsers
    }
    catch (e) {
      return null
    }
  }

  async authenticateWithEmailAndPassword(email: string, password: string): Promise<User | null> {
    return Promise.resolve(null);
  }

}
