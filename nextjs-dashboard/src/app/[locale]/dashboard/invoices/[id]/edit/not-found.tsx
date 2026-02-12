import Link from "next/link";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { ROUTES } from "@/src/routing/constants";
import { generateRoute } from "@/src/routing/generate";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const [t, invoicePath] = await Promise.all([
    getTranslations("InvoiceNotFound"),
    generateRoute(ROUTES.invoices),
  ]);
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">{t("title")}</h2>
      <p>{t("description")}</p>
      <Link
        href={invoicePath}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        {t("back")}
      </Link>
    </main>
  );
}
