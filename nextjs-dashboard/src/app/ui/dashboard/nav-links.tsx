"use client";
import {
  UserGroupIcon,
  HomeIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/24/outline";
import { Link } from "@/src/i18n/navigation";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import clsx from "clsx";
import { ROUTES } from "@/src/routing/constants";
import { Route } from "next";

const NAV_LINKS = [
  { key: "home" as const, path: ROUTES.dashboard, icon: HomeIcon },
  {
    key: "invoices" as const,
    path: ROUTES.invoices,
    icon: DocumentDuplicateIcon,
  },
  { key: "customers" as const, path: ROUTES.customers, icon: UserGroupIcon },
];

export default function NavLinks() {
  const t = useTranslations("Navigation");
  const pathname = usePathname();
  const locale = useLocale();

  return (
    <>
      {NAV_LINKS.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.path}
            href={link.path as Route}
            className={clsx(
              "flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
              {
                "bg-sky-100 text-blue-600": pathname === link.path,
              },
            )}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{t(link.key)}</p>
          </Link>
        );
      })}
    </>
  );
}
