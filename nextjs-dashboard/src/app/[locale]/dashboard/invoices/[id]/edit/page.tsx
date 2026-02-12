import Form from "@/src/app/ui/invoices/edit-form";
import Breadcrumbs from "@/src/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/src/app/lib/data";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ROUTES } from "@/src/routing/constants";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const t = await getTranslations("Breadcrumbs");
  const params = await props.params;
  const id = params.id;
  const [invoice, customers] = await Promise.all([
    fetchInvoiceById(id),
    fetchCustomers(),
  ]);

  if (!invoice) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t("invoices"), href: ROUTES.invoices },
          {
            label: t("editInvoice"),
            href: ROUTES.editInvoice(id),
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
