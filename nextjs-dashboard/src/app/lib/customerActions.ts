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

async function getCustomerSchema() {
  const t = await getTranslations("CustomerForm");
  return z.object({
    id: z.string(),
    name: z.string({ invalid_type_error: t("errors.nameRequired") }),
    email: z.string({ invalid_type_error: t("errors.emailRequired") }),
    image_url: z.string(),
  });
}

export type CustomerState = {
  errors?: {
    name?: string[];
    email?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

export async function createCustomer(
  prevState: CustomerState | undefined,
  formData: FormData,
) {
  const schema = (await getCustomerSchema()).omit({ id: true });
  const validatedFields = schema.safeParse({
    customerId: formData.get("name"),
    amount: formData.get("email"),
    image_url: formData.get("image_url"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Failed to Create Customer.",
    };
  }
  const { name, email, image_url } = validatedFields.data;
  try {
    await db.insert(customer).values({
      name,
      email,
      image_url,
    });
  } catch (error) {
    console.error("Database Error: Failed to Create Customer.", error);
    return;
  }
  const customerPath = ROUTES.customers;
  revalidatePath(customerPath);
  redirect(customerPath as Route);
}
