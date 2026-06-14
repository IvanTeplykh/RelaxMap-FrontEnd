export interface Feedback {
  _id: string;
  rate: number;
  description: string;
  userName: string;
  createdAt: string;
  updatedAt: string;
}

export interface FeedbackWithLocation extends Feedback {
  locationName: string | null;
}

export interface FeedbacksResponse {
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
  feedbacks: Feedback[];
}
