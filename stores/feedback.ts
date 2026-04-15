import { defineStore } from "pinia";
import { FeedbackService } from "~/service/feedback";
import type { FeedbackRequest, FeedbackState } from "~/types/feedback";

const feedbackService = new FeedbackService();

export const useFeedbackStore = defineStore("feedback", {
    state: (): FeedbackState => ({
        feedbacks: [],
    }),
    actions: {
        async fetchAllFeedback() {
            this.feedbacks = await feedbackService.getAllFeedback();
        },
        async addFeedback(data: FeedbackRequest) {
            const res = await feedbackService.addFeedback(data);
            return res.message;
        },
        async updateFeedback(data: FeedbackRequest, id: number) {
            const res = await feedbackService.updateFeedback(data, id);
            return res.message;
        },
        async deleteFeedback(id: number) {
            const res = await feedbackService.deleteFeedback(id);
            return res.message;
        },
    },
});
