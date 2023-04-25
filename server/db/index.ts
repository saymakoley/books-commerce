interface User {
    id: string,
    name: string,
    email: string, 
    password: string,
    online: boolean
}

export const db = {
    users: [] as User[],
}