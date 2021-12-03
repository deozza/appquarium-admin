import AdapterInterface from "~/app/user/adapters/AdapterInterface";
import HasuraClient from "~/app/utils/hasura/HasuraClient";
import User from "~/app/user/entities/User";
import HasuraQueryBuilder from "~/app/utils/hasura/HasuraRequestBuilder/HasuraQueryBuilder";

export default class HasuraAdapter extends HasuraClient implements AdapterInterface{
  getRefreshedToken(): Promise<string | null> {
    return Promise.resolve(null);
  }

  constructor(jwt: string) {
    super(jwt);
  }

  async queryTotalUsers(): Promise<number | null> {
    let queryBuilder: HasuraQueryBuilder = new HasuraQueryBuilder('user_aggretaget')
    queryBuilder.addReturn('aggregate {count}')
    const query: string = queryBuilder.getRequest()

    try {
      const data = await this.client.request(query)
      return data.users_aggregate.aggregate.count
    }
    catch (e) {
      return null
    }
  }

  async authenticateWithEmailAndPassword(email: string, password: string): Promise<User | null> {
    return Promise.resolve(null);
  }

}
