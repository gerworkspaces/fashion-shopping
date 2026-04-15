import { defineStore } from "pinia";
import { OrderProductService } from "~/service/order-products";
import { PaymentsService } from "~/service/payments";
import type {
    OrderProductsState,
    OrderRequest,
    OrdersResponse,
} from "~/types/order-products";

const eventTicketService = new OrderProductService();
const paymentService = new PaymentsService();

export const useEventTicketsStore = defineStore("eventTickets", {
    state: (): OrderProductsState => ({
        products: [],
        product: {} as OrdersResponse,
        payments: [],
    }),
    actions: {
        async getAllTickets() {
            this.products = await eventTicketService.getAllTickets();
        },
        async getAllTicketsByFilters(filters: {
            category_id?: string;
            min_price?: number;
            max_price?: number;
            start_date?: string;
            end_date?: string;
        }) {
            this.products = await eventTicketService.getAllTicketsByFilters(filters);
        },
        async fetchTicketById(id: number) {
            this.products = await eventTicketService.getTicketById(id);
        },
        async addTicket(ticketData: any) {
            return await eventTicketService.addTicket(ticketData);
        },
        async updateTicket(ticket: OrderRequest) {
            return await eventTicketService.updateTicket(ticket);
        },
        async deleteTicket(id: number) {
            return await eventTicketService.deleteTicket(id);
        },
        async getAllPayments() {
            this.payments = await paymentService.getAllPayments();
        },
        async deletePayment(id: number) {
            return await paymentService.deletePayment(id);
        },
    },
});
