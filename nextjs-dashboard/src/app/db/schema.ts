import { pgTable, uuid, varchar, text, integer, date } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
});

export const customers = pgTable("customers", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  image_url: varchar("image_url", { length: 255 }).notNull(),
});

export const invoices = pgTable("invoices", {
  id: uuid("id").primaryKey().defaultRandom(),
  customer_id: uuid("customer_id").notNull(),
  amount: integer("amount").notNull(),
  status: varchar("status", { length: 255 }).notNull(),
  date: date("date").notNull(),
});

export const revenue = pgTable("revenue", {
  month: varchar("month", { length: 4 }).primaryKey(),
  revenue: integer("revenue").notNull(),
});
