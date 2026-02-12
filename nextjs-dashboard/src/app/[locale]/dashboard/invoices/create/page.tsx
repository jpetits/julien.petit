import Form from "@/src/app/ui/invoices/create-form";
import Breadcrumbs from "@/src/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/src/app/lib/data";
import { getTranslations } from "next-intl/server";
import { ROUTES } from "@/src/routing/constants";

export default async function Page() {
  const t = await getTranslations("Breadcrumbs");
  const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t("invoices"), href: ROUTES.invoices },
          {
            label: t("createInvoice"),
            href: ROUTES.createInvoice,
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
