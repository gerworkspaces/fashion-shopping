export interface FeedbackState {
    feedbacks: FeedbackResponse[];
}

export interface FeedbackResponse {
    feedback_id?: number;
    user_id: number;
    content: string;
    full_name: string;
    email: string;
    subject: string;
}

export interface FeedbackRequest {
    user_id: number;
    content: string;
    full_name: string;
    email: string;
    subject: string;
}
