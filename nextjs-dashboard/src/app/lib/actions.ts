"use server";

import { z } from "zod";
import { db } from "@/src/app/db";
import { invoices } from "@/src/app/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { ROUTES } from "@/src/routing/constants";
import { getTranslations } from "next-intl/server";
import { Route } from "next";

export type State = {
  errors?: {
    customerId?: string[];
    amount?: string[];
    status?: string[];
  };
  message?: string | null;
};
async function getInvoiceSchema() {
  const t = await getTranslations("InvoiceForm");
  return z.object({
    id: z.string(),
    customerId: z.string({ invalid_type_error: t("errors.customerRequired") }),
    amount: z.coerce.number().gt(0, { message: t("errors.amountRequired") }),
    status: z.enum(["pending", "paid"], {
      errorMap: () => ({ message: t("errors.statusRequired") }),
    }),
    date: z.string(),
  });
}

export async function createInvoice(prevState: State, formData: FormData) {
  const schema = (await getInvoiceSchema()).omit({ id: true, date: true });
  const validatedFields = schema.safeParse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Invoice.",
    };
  }
  const { customerId, amount, status } = validatedFields.data;
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split("T")[0];
  try {
    await db.insert(invoices).values({
      customer_id: customerId,
      amount: amountInCents,
      status,
      date,
    });
  } catch (error) {
    console.error("Database Error: Failed to Create Invoice.", error);
    return;
  }
  const invoicePath = ROUTES.invoices;
  revalidatePath(invoicePath);
  redirect(invoicePath as Route);
}

export async function updateInvoice(id: string, formData: FormData) {
  const schema = (await getInvoiceSchema()).omit({ id: true, date: true });
  const { customerId, amount, status } = schema.parse({
    customerId: formData.get("customerId"),
    amount: formData.get("amount"),
    status: formData.get("status"),
  });
  const amountInCents = amount * 100;
  try {
    await db
      .update(invoices)
      .set({ customer_id: customerId, amount: amountInCents, status })
      .where(eq(invoices.id, id));
  } catch (error) {
    console.error("Database Error: Failed to Update Invoice.", error);
    return;
  }
  const invoicePath = ROUTES.invoices;
  revalidatePath(invoicePath);
  redirect(invoicePath as Route);
}

export async function deleteInvoice(id: string) {
  try {
    await db.delete(invoices).where(eq(invoices.id, id));
  } catch (error) {
    console.error("Database Error: Failed to Delete Invoice.", error);
    return;
  }
  revalidatePath(ROUTES.invoices);
}
