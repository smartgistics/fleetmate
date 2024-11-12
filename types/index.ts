export * from "./orders";
export * from "./carriers";
export * from "./customers";
export * from "./common";
export * from "./trips";
export * from "./interliners";
export * from "./masterdata";

// TruckMate API Error Types
export interface TruckMateError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export type ErrorCode =
  | "movedPermanently"
  | "unauthorized"
  | "forbidden"
  | "resourceNotFound"
  | "methodNotAllowed"
  | "resourceConflict"
  | "licenseNotAvailable"
  | "tooManyRequests"
  | "serverError"
  | "belowMinValue"
  | "exceedsMaxLength"
  | "invalidJsonArray"
  | "invalidJsonObject"
  | "noValidFields"
  | "invalidJsonValue"
  | "invalidDateTime"
  | "invalidDate"
  | "invalidTime"
  | "invalidPattern"
  | "invalidFormat"
  | "invalidDouble"
  | "invalidEnum"
  | "invalidInteger"
  | "invalidString"
  | "missingRequiredField"
  | "invalidQueryParameter"
  | "invalidDBValue"
  | "invalidBusinessLogic";

// TruckMate API Response Types
export interface TruckMateResponse<T> {
  success: boolean;
  data?: T;
  error?: TruckMateError;
}

export interface PaginatedTruckMateResponse<T> extends TruckMateResponse<T[]> {
  total: number;
  page: number;
  pageSize: number;
  limit?: number;
}

// Additional shared types
export interface SearchResult {
  type: "shipment" | "carrier" | "customer";
  id: string | number;
  title: string;
  subtitle: string;
}

export interface WeeklyData {
  week: string;
  revenue: number;
  shipments: number;
}

export interface CountItem {
  name: string;
  count: number;
}

export interface RevenueItem {
  name: string;
  total: number;
}

// Query Parameters
export interface TruckMateQueryParams {
  page?: number;
  pageSize?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  expand?: string[];
  filter?: string;
}

// API Configuration
export interface TruckMateConfig {
  baseUrl: string;
  apiKey?: string;
  timeout?: number;
  retryAttempts?: number;
  retryDelay?: number;
}
