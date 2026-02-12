import Form from "@/src/app/ui/invoices/create-form";
import Breadcrumbs from "@/src/app/ui/invoices/breadcrumbs";
import { fetchCustomers } from "@/src/app/lib/data";
import { getTranslations } from "next-intl/server";
import { generateRoute } from "@/src/routing/generate";

export default async function Page() {
  const t = await getTranslations("Breadcrumbs");
  const customers = await fetchCustomers();
  const invoicesRoute = await generateRoute("invoices");
  const invoicesCreateRoute = await generateRoute("createInvoice");

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: t("invoices"), href: invoicesRoute },
          {
            label: t("createInvoice"),
            href: invoicesCreateRoute,
            active: true,
          },
        ]}
      />
      <Form customers={customers} />
    </main>
  );
}
