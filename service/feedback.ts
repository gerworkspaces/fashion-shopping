import type { FeedbackRequest } from "~/types/feedback";
import { deleteData, getData, postData, putData } from "./api-service";

export class FeedbackService {
    getAllFeedback() {
        return getData("/feedback");
    }
    addFeedback(data: FeedbackRequest) {
        return postData("/feedback", data);
    }
    updateFeedback(data: FeedbackRequest, id: number) {
        return putData(`/feedback?id=${id}`, data);
    }
    deleteFeedback(id: number) {
        return deleteData(`/feedback?id=${id}`);
    }
}
