import type { OrderRequest } from "~/types/order-products";
import { postData, getData, putData, deleteData } from "./api-service";

export class OrderProductService {
    getAllTickets() {
        return getData("/order-products");
    }

    getAllTicketsByFilters(
        filters: {
            category_id?: string;
            min_price?: number;
            max_price?: number;
            start_date?: string;
            end_date?: string;
        } = {}
    ) {
        const stringifiedFilters = {
            ...filters,
            min_price: filters.min_price?.toString() || "",
            max_price: filters.max_price?.toString() || "",
        };
        const queryParams = new URLSearchParams(stringifiedFilters).toString();
        return getData(`/order-products?${queryParams}`);
    }

    getTicketById(id: number) {
        return getData(`/order-products?id=${id}`);
    }

    addTicket(order: OrderRequest) {
        return postData("/order-products", order);
    }

    updateTicket(order: OrderRequest) {
        return putData(`/order-products/${order.order_id}`, order);
    }

    deleteTicket(id: number) {
        return deleteData(`/order-products/${id}`);
    }
}
