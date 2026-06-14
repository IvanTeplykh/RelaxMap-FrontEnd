import { Feedback } from "./feedback";

export interface LocationOwner {
  _id: string;
  name: string;
}

export interface LocationDetails {
  _id: string;
  name: string;
  image: string;
  description: string;
  region: string;
  locationType: string;
  rate: number;
  ownerId: LocationOwner;
  feedbacksId: Feedback[];
  createdAt?: string;
  updatedAt?: string;
}
