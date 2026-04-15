import { defineEventHandler, readBody, getQuery } from "h3";
import pool from "../../database/db";
import type { ResultSetHeader } from "mysql2/promise";

// Thêm đồ ăn
export const addFood = defineEventHandler(async (event) => {
    const {
        name,
        location,
        description,
        category_id,
        food_image,
        open_time,
        close_time,
    } = await readBody(event);

    const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO foods (name, location, description, category_id, food_image, open_time, close_time) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            name,
            location,
            description,
            category_id,
            food_image,
            open_time,
            close_time,
        ]
    );

    return {
        message: "Food added successfully",
        foodId: result.insertId,
    };
});

// Sửa đồ ăn
export const updateFood = defineEventHandler(async (event) => {
    const { id } = getQuery(event);
    const {
        name,
        location,
        description,
        category_id,
        food_image,
        open_time,
        close_time,
    } = await readBody(event);

    await pool.query(
        `UPDATE foods SET name = ?, location = ?, description = ?, category_id = ?, food_image = ?, open_time = ?, close_time = ? WHERE food_id = ?`,
        [
            name,
            location,
            description,
            category_id,
            food_image,
            open_time,
            close_time,
            id,
        ]
    );

    return { message: "Food updated successfully" };
});

// Xóa đồ ăn
export const deleteFood = defineEventHandler(async (event) => {
    const { id } = getQuery(event);

    await pool.query(`DELETE FROM foods WHERE food_id = ?`, [id]);
    return { message: "Food deleted successfully" };
});

// Xem tất cả đồ ăn
export const getAllFoods = defineEventHandler(async (event) => {
    const [rows] = await pool.query("SELECT * FROM foods");
    return rows;
});

// Xem một đồ ăn cụ thể
export const getFoodById = defineEventHandler(async (event) => {
    const { id } = getQuery(event);
    const [rows]: [any[], any] = await pool.query(
        `SELECT * FROM foods WHERE food_id = ?`,
        [id]
    );

    if (rows.length === 0) {
        throw createError({ statusCode: 404, message: "Food not found" });
    }

    return rows[0];
});

// Tìm kiếm đồ ăn
export const searchFoods = defineEventHandler(async (event) => {
    const { query, category_id } = getQuery(event);

    let sql = `SELECT * FROM foods WHERE 1=1`;
    const params: any[] = [];

    if (query) {
        sql += ` AND (name LIKE ? OR location LIKE ? OR description LIKE ?)`;
        const likeQuery = `%${query}%`;
        params.push(likeQuery, likeQuery, likeQuery);
    }

    if (category_id) {
        sql += ` AND category_id = ?`;
        params.push(category_id);
    }

    const [rows] = await pool.query(sql, params);
    return rows;
});
