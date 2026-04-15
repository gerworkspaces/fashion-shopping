import { defineEventHandler, readBody, getQuery } from "h3";
import pool from "../../database/db";
import bcrypt from "bcrypt";
import type { ResultSetHeader } from "mysql2/promise";

// Lây danh sách người dùng
export const getUsers = defineEventHandler(async () => {
    const [rows] = await pool.query(`SELECT * FROM users`);
    return rows;
});
// Thêm người dùng
export const addUser = defineEventHandler(async (event) => {
    const { username, email, password_hash, role_id } = await readBody(event);

    const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO users (username, email, phone, address_user, password_hash, role_id, status_user) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [username, email, password_hash, role_id]
    );

    return {
        message: "User added successfully",
        userId: result.insertId,
    };
});

// Sửa thông tin người dùng
export const updateUser = defineEventHandler(async (event) => {
    const { id } = getQuery(event);
    const {
        username,
        email,
        phone,
        address_info,
        password_hash,
        role_id,
        status_user,
        image,
    } = await readBody(event);
    const hashedPassword = await bcrypt.hash(password_hash, 10);

    await pool.query(
        `UPDATE users SET username = ?, email = ?, phone = ?, address_info = ?, password_hash = ?, role_id = ?, status_user = ?, user_image = ? WHERE user_id = ?`,
        [
            username,
            email,
            phone,
            address_info,
            hashedPassword,
            role_id,
            status_user,
            image,
            id,
        ]
    );

    return { message: "User updated successfully" };
});

// Xóa người dùng
export const deleteUser = defineEventHandler(async (event) => {
    const { id } = getQuery(event);

    await pool.query(`DELETE FROM users WHERE user_id = ?`, [id]);
    return { message: "User deleted successfully" };
});

// Tìm kiếm người dùng theo tên
export const searchUserByName = defineEventHandler(async (event) => {
    const { name } = getQuery(event);
    const [rows] = await pool.query(`SELECT * FROM users WHERE username LIKE ?`, [
        `%${name}%`,
    ]);

    return rows;
});
