import { type } from "os";

type AccountType = {

}

export const getAccountsUS1 = async () : Promise<AccountType> =>
    await (await fetch('http://localhost:8080/user-story1')).json();