export interface Feedback {
  _id: string;
  rate: number;
  description: string;
  userName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CreateFeedbackData {
  locationId: string;
  rate: number;
  description: string;
}

export interface FeedbacksPaginationResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  feedbacks: Feedback[];
}
