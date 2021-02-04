export const getAccountsUS1 = async () : Promise<string[]> =>
    await (await fetch('http://localhost:8080/user-story1')).json();

    export const getAccountsUS3 = async () : Promise<string[]> =>
    await (await fetch('http://localhost:8080/user-story3')).json();