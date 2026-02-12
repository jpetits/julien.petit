import { customers } from "../app/db/schema";

export const ROUTES = {
  home: "/",
  dashboard: "/dashboard",
  invoices: "/dashboard/invoices",
  createInvoice: "/dashboard/invoices/create",
  customers: "/dashboard/customers",
  editInvoice: (id: string) => `/dashboard/invoices/${id}/edit`,
};
