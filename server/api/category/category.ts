import { defineEventHandler, readBody, getQuery } from "h3";
import pool from "../../database/db";
import type { ResultSetHeader } from "mysql2/promise";

// Thêm danh mục
export const addCategory = defineEventHandler(async (event) => {
    const { category_id, category_name } = await readBody(event);

    const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO categories (category_id, category_name) VALUES (?, ?)`,
        [category_id, category_name]
    );

    return {
        message: "Category added successfully",
        categoryId: result.insertId,
    };
});

// Sửa danh mục
export const updateCategory = defineEventHandler(async (event) => {
    const { id } = getQuery(event);
    const { category_name } = await readBody(event);

    await pool.query(
        `UPDATE categories SET category_name = ? WHERE category_id = ?`,
        [category_name, id]
    );

    return { message: "Category updated successfully" };
});

// Xóa danh mục
export const deleteCategory = defineEventHandler(async (event) => {
    const { id } = getQuery(event);

    await pool.query(`DELETE FROM categories WHERE category_id = ?`, [id]);
    return { message: "Category deleted successfully" };
});

// Xem tất cả danh mục
export const getAllCategories = defineEventHandler(async (event) => {
    const [rows] = await pool.query("SELECT * FROM categories");
    return rows;
});

// Xem một danh mục cụ thể
export const getCategoryById = defineEventHandler(async (event) => {
    const { id } = getQuery(event);
    const [rows]: [any[], any] = await pool.query(
        `SELECT * FROM categories WHERE category_id = ?`,
        [id]
    );

    if (rows.length === 0) {
        throw createError({ statusCode: 404, message: "Category not found" });
    }

    return rows[0];
});
