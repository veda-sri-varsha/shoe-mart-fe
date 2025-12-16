export type ApiResponse<T> = {
  orderId: any;
  success: boolean;
  status: "success" | "error";
  message: string;
  data: T;
};

export enum Role {
  ADMIN = "ADMIN",
  USER = "USER",
  VENDOR = "VENDOR",
}
