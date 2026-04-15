import { defineEventHandler, readBody, getQuery } from "h3";
import pool from "../../database/db";
import type { ResultSetHeader } from "mysql2/promise";

// Thêm vé sự kiện
export const addEventTicket = defineEventHandler(async (event) => {
    const {
        event_id,
        total_tickets,
        available_tickets,
        ticket_price,
        ticket_name,
        ticket_description,
        ticket_image,
    } = await readBody(event);

    const [result] = await pool.query<ResultSetHeader>(
        `INSERT INTO event_tickets (event_id, total_tickets, available_tickets, ticket_price, ticket_name, ticket_description, ticket_image) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            event_id,
            total_tickets,
            available_tickets,
            ticket_price,
            ticket_name,
            ticket_description,
            ticket_image,
        ]
    );

    return {
        message: "Event ticket added successfully",
        ticketId: result.insertId,
    };
});

// Sửa vé sự kiện
export const updateEventTicket = defineEventHandler(async (event) => {
    const { id } = getQuery(event);
    const {
        total_tickets,
        available_tickets,
        ticket_price,
        ticket_name,
        ticket_description,
        ticket_image,
    } = await readBody(event);

    await pool.query(
        `UPDATE event_tickets SET total_tickets = ?, available_tickets = ?, ticket_price = ?, ticket_name = ?, ticket_description = ?, ticket_image = ? WHERE event_id = ?`,
        [
            total_tickets,
            available_tickets,
            ticket_price,
            ticket_name,
            ticket_description,
            ticket_image,
            id,
        ]
    );

    return { message: "Event ticket updated successfully" };
});

// Xóa vé sự kiện
export const deleteEventTicket = defineEventHandler(async (event) => {
    const { id } = getQuery(event);

    await pool.query(`DELETE FROM event_tickets WHERE event_id = ?`, [id]);
    return { message: "Event ticket deleted successfully" };
});

// Xem tất cả vé sự kiện với các bộ lọc
export const getAllEventTickets = defineEventHandler(async (event) => {
    const { category_id, min_price, max_price, start_date, end_date } =
        getQuery(event);

    let query = `
    SELECT et.*
    FROM event_tickets et
    JOIN events e ON et.event_id = e.event_id
    WHERE 1=1
  `;

    const params: any[] = [];

    // Lọc theo danh mục
    if (category_id) {
        query += ` AND e.museum_id IN (SELECT museum_id FROM museums WHERE category_id = ?)`;
        params.push(category_id);
    }

    // Lọc theo giá vé
    if (min_price) {
        query += ` AND ticket_price >= ?`;
        params.push(min_price);
    }
    if (max_price) {
        query += ` AND ticket_price <= ?`;
        params.push(max_price);
    }

    // Lọc theo thời gian mở cửa
    if (start_date) {
        query += ` AND e.event_date >= ?`;
        params.push(start_date);
    }
    if (end_date) {
        query += ` AND e.event_date <= ?`;
        params.push(end_date);
    }

    const [rows] = await pool.query(query, params);
    return rows;
});

// Xem một vé sự kiện cụ thể
export const getEventTicketById = defineEventHandler(async (event) => {
    const { id } = getQuery(event);
    const [rows]: [any[], any] = await pool.query(
        `
    SELECT et.*, c.category_name, e.event_date, e.event_name, e.event_image,
           JSON_ARRAYAGG(JSON_OBJECT('review_id', re.review_id, 'content', re.content, 'rating', re.rating, 'subject', re.subject, 'email', re.email, 'full_name', re.full_name)) AS reviews
    FROM event_tickets et
    JOIN events e ON et.event_id = e.event_id
    JOIN museums m ON e.museum_id = m.museum_id
    JOIN categories c ON m.category_id = c.category_id
    LEFT JOIN review_event re ON e.event_id = re.event_id
    WHERE et.event_id = ?
    GROUP BY et.event_id, c.category_name
  `,
        [id]
    );

    if (rows.length === 0) {
        throw createError({ statusCode: 404, message: "Event ticket not found" });
    }

    return rows[0];
});
