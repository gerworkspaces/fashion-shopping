import { createError, defineEventHandler, readBody } from "h3";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import pool from "../../database/db";
import type { ResultSetHeader } from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET || "defaultSecret"; // Đảm bảo lấy từ biến môi trường

// Đăng ký
export const registerUser = defineEventHandler(async (event) => {
    const { username, password, email, phone, role, image } = await readBody(event);

    // Kiểm tra nếu user là admin
    // if (role === 1) {
    //   const user = event.context.authUser; // AuthUser từ middleware (nếu có)
    //   if (!user || user.role !== 1) {
    //     throw createError({ statusCode: 403, message: "Unauthorized" });
    //   }
    // }

    const [existingUsers]: any = await pool.query(
        `SELECT * FROM users WHERE username = ? OR email = ?`,
        [username, email]
    );

    if (existingUsers.length > 0) {
        throw createError({
            statusCode: 409,
            message: "Username or email already exists",
        });
    }

    const validRoles = [1, 2, 3];
    if (role && !validRoles.includes(role)) {
        throw createError({
            statusCode: 400,
            message: "Invalid role specified",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO users (username, password_hash, email,  role_id, user_image) VALUES (?, ?, ?, ?, ?)`,
        [username, hashedPassword, email, phone, role, image || 2]
    );

    return { message: "User registered successfully", userId: result.insertId };
});

// Đăng nhập
export const loginUser = defineEventHandler(async (event) => {
    const { username, password } = await readBody(event);

    const [rows]: any = await pool.query(
        `SELECT * FROM users WHERE username = ?`,
        [username]
    );

    if (rows.length === 0) {
        throw createError({ statusCode: 404, message: "User not found" });
    }

    const user = rows[0];

    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
        throw createError({ statusCode: 401, message: "Invalid credentials" });
    }

    // Create JWT
    const token = jwt.sign(
        { userId: user.user_id, role: user.role_id },
        JWT_SECRET,
        { expiresIn: "1h" }
    );

    return {
        message: "Login successful",
        token,
        user: {
            user_id: user.user_id,
            username: user.username,
            email: user.email,
            phone: user.phone,
            address_info: user.address_info,
            role_id: user.role_id,
            status_user: user.status_user,
            image: user.user_image,
        },
    };
});

// Kiểm tra trạng thái đăng nhập
export const verifyUser = defineEventHandler((event) => {
    const authHeader = event.node.req.headers["authorization"];
    const token = authHeader && authHeader?.split(" ")[1];

    if (!token) {
        throw createError({ statusCode: 401, message: "Access token missing" });
    }

    // Verify JWT
    try {
        const user = jwt.verify(token, JWT_SECRET);
        console.log('Token is valid', decode);
        return { message: "User is logged in", user };
    } catch (error) {
        console.log('Invalid token');
        throw createError({ statusCode: 401, message: "Invalid token" });
    }
});

// Đăng xuất
export const logoutUser = defineEventHandler(async () => {
    return { message: "Logout successful" };
});
