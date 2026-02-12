"use client";
import { Locale, useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/src/i18n/navigation";
import { useRouter as useNextRouter } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import { Globe } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LocaleSwitcher() {
  const currentLocale = useLocale();
  const router = useRouter();
  const nextRouter = useNextRouter();
  const pathname = usePathname();
  const t = useTranslations("Navigation");

  function switchLocale(locale: Locale) {
    router.replace(pathname, { locale });
    nextRouter.refresh();
  }

  return (
    <Select value={currentLocale} onValueChange={switchLocale}>
      <SelectTrigger className="w-full">
        <Globe className="h-4 w-4 shrink-0 text-gray-400" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {routing.locales.map((locale) => (
          <SelectItem key={locale} value={locale}>
            {t(locale)}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
