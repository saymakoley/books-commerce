export default defineEventHandler(async (e) => {
    if (e.node.req.method === 'POST') {
        const body = readBody(e)

        const user = useStorage().getItem('user')
        const users = useStorage().getItem('users')

        console.log(user)
        console.log(users)
    }
})