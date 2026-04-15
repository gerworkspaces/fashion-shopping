import {
    addCategory,
    updateCategory,
    deleteCategory,
    getAllCategories,
    getCategoryById,
} from "./category";
import { defineEventHandler } from "h3";

export default defineEventHandler(async (event) => {
    const method = event.node.req.method;

    if (method === "POST") {
        return addCategory(event);
    } else if (method === "PUT") {
        return updateCategory(event);
    } else if (method === "DELETE") {
        return deleteCategory(event);
    } else if (method === "GET") {
        const { id } = getQuery(event);
        return id ? getCategoryById(event) : getAllCategories(event);
    } else {
        throw createError({ statusCode: 405, statusMessage: "Method not allowed" });
    }
});
