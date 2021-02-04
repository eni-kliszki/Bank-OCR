import { type } from "os";

export type AccountType = {
    result: string;
}

export const getAccountsUS1 = async () : Promise<AccountType[]> =>
    await (await fetch('http://localhost:8080/user-story1')).json();