import { PencilIcon, PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Link } from "@/src/i18n/navigation";
import { deleteInvoice } from "@/src/app/lib/invoiceActions";
import { getTranslations } from "next-intl/server";
import { ROUTES } from "@/src/routing/constants";

export async function CreateInvoice() {
  const t = await getTranslations("InvoicesTable");
  return (
    <Link
      href={{ pathname: ROUTES.createInvoice }}
      className="flex h-10 items-center rounded-lg bg-blue-600 px-4 text-sm font-medium text-white transition-colors hover:bg-blue-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
    >
      <span className="hidden md:block">{t("createInvoice")}</span>{" "}
      <PlusIcon className="h-5 md:ml-4" />
    </Link>
  );
}

export function UpdateInvoice({ id }: { id: string }) {
  return (
    <Link
      href={ROUTES.editInvoice(id)}
      className="rounded-md border p-2 hover:bg-gray-100"
    >
      <PencilIcon className="w-5" />
    </Link>
  );
}

export async function DeleteInvoice({ id }: { id: string }) {
  const t = await getTranslations("InvoicesTable");
  const deleteInvoiceWithId = deleteInvoice.bind(null, id);
  return (
    <form action={deleteInvoiceWithId}>
      <button type="submit" className="rounded-md border p-2 hover:bg-gray-100">
        <span className="sr-only">{t("deleteLabel")}</span>
        <TrashIcon className="w-5" />
      </button>
    </form>
  );
}
