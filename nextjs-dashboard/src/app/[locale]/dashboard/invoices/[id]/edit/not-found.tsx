import { Link } from "@/src/i18n/navigation";
import { FaceFrownIcon } from "@heroicons/react/24/outline";
import { ROUTES } from "@/src/routing/constants";
import { getTranslations } from "next-intl/server";

export default async function NotFound() {
  const [t] = await Promise.all([getTranslations("InvoiceNotFound")]);
  return (
    <main className="flex h-full flex-col items-center justify-center gap-2">
      <FaceFrownIcon className="w-10 text-gray-400" />
      <h2 className="text-xl font-semibold">{t("title")}</h2>
      <p>{t("description")}</p>
      <Link
        href={ROUTES.invoices}
        className="mt-4 rounded-md bg-blue-500 px-4 py-2 text-sm text-white transition-colors hover:bg-blue-400"
      >
        {t("back")}
      </Link>
    </main>
  );
}
