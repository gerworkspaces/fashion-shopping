import { loginUser, registerUser, logoutUser, verifyUser } from "./auth";


export default defineEventHandler(async (event) => {
    const method = event.node.req.method;

    if (method === "POST") {
        const body = await readBody(event);
        if (body.action === "register") {
            return registerUser(event);
        } else if (body.action === "login") {
            return loginUser(event);
        }
    } else if (method === "DELETE") {
        return logoutUser(event);
    } else if (method === "GET") {
        return verifyUser(event);
    } else {
        throw createError({
            statusCode: 405,
            statusMessage: "Method not allowed",
        });
    }
});
