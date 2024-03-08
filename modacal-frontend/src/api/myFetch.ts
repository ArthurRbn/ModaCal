export const myFetch = async (route: string, options?: any) => {
    try {
        const jwt = localStorage.getItem("jwt") || "";
        if (jwt === "") {
            throw new Error("jwt is not defined");
        }
        const body = {
            ...options,
            ...{
                headers: {
                    "content-type": "application/json",
                    authorization: `Bearer ${jwt}`,
                },
            },
        };
        return await fetch(route, body);
    } catch (ex) {
        console.error(ex);
        return undefined;
    }
};