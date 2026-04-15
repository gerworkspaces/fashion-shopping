import { defineStore } from "pinia";
import { OrderService } from "~/service/orders";
import type {
    OrderRequest,
    OrderState,
    ReviewOrderRequest,
} from "~/types/order";

const eventService = new OrderService();

export const useOrderStore = defineStore("events", {
    state: (): OrderState => ({
        events: [],
        reviews: [],
    }),
    actions: {
        async fetchOrders() {
            this.events = await eventService.getAllOrders();
        },
        async addOrder(event: OrderRequest) {
            return await eventService.addOrder(event);
        },
        async getOrderById(id: number) {
            return await eventService.getOrderById(id);
        },
        async updateOrder(id: number, event: OrderRequest) {
            return await eventService.updateOrder(id, event);
        },
        async deleteOrder(id: number) {
            return await eventService.deleteOrder(id);
        },
        async getAllReviews() {
            this.reviews = await eventService.getAllReviews();
        },
        async addReviewOrder(review: ReviewOrderRequest) {
            return await eventService.addReviewOrder(review);
        },
        async deleteReviewOrder(id: number) {
            return await eventService.deleteReviewOrder(id);
        },
    },
});
