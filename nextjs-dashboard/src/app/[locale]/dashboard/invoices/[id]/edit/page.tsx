import Form from "@/src/app/ui/invoices/edit-form";
import Breadcrumbs from "@/src/app/ui/invoices/breadcrumbs";
import { fetchInvoiceById, fetchCustomers } from "@/src/app/lib/data";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { generateRoute } from "@/src/routing/generate";
import { ROUTES } from "@/src/routing/constants";

export default async function Page(props: { params: Promise<{ id: string }> }) {
  const t = await getTranslations("Breadcrumbs");
  const params = await props.params;
  const id = params.id;
  const [invoice, customers, editInvoicePath, invoicesPath] = await Promise.all(
    [
      fetchInvoiceById(id),
      fetchCustomers(),
      generateRoute(ROUTES.editInvoice(id)),
      generateRoute(ROUTES.invoices),
    ],
  );

  if (!invoice) {
    notFound();
  }
  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t("invoices"), href: invoicesPath },
          {
            label: t("editInvoice"),
            href: editInvoicePath,
            active: true,
          },
        ]}
      />
      <Form invoice={invoice} customers={customers} />
    </main>
  );
}
