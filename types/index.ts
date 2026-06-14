// Global TypeScript interfaces and types
export * from "./auth";
export * from "./feedbacks";
export * from "./location";

export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
