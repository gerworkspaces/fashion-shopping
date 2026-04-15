import type { OrderRequest, ReviewOrderRequest } from "~/types/order";
import { postData, getData, putData, deleteData } from "./api-service";

export class OrderService {
    getAllOrders() {
        return getData("/events");
    }
    addOrder(event: OrderRequest) {
        return postData("/events", event);
    }
    getOrderById(id: number) {
        return getData(`/events?id=${id}`);
    }
    updateOrder(id: number, event: OrderRequest) {
        return putData(`/events?id=${id}`, event);
    }
    deleteOrder(id: number) {
        return deleteData(`/events?id=${id}`);
    }
    getAllReviews() {
        return getData("/events?type=reviews");
    }
    addReviewOrder(review: ReviewOrderRequest) {
        return postData("/events", review);
    }
    deleteReviewOrder(id: number) {
        return deleteData(`/events?id=${id}&type=reviews`);
    }
}
