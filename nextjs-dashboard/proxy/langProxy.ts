import NextAuth from "next-auth";
import Negotiator from "negotiator";
import { routing } from "@/src/i18n/routing";
import { match } from "@formatjs/intl-localematcher";
import { NextRequest, NextResponse } from "next/server";

const { locales, defaultLocale } = routing;
const prefixes = routing.localePrefix as {
  mode: string;
  prefixes?: Record<string, string>;
};
const localePrefix = Object.fromEntries(
  locales.map((locale) => [
    locale,
    prefixes?.prefixes?.[locale] ?? `/${locale}`,
  ]),
);

export function langProxy(req: NextRequest) {
  const pathnameHasLocale = locales.some(
    (locale) =>
      req.nextUrl.pathname.startsWith(`${localePrefix[locale]}/`) ||
      req.nextUrl.pathname === localePrefix[locale],
  );

  if (!pathnameHasLocale) {
    const acceptLanguage = req.headers.get("accept-language") ?? "";
    const languages = new Negotiator({
      headers: { "accept-language": acceptLanguage },
    }).languages();
    const locale = match(languages, locales, defaultLocale);

    return NextResponse.redirect(
      new URL(
        `${localePrefix[locale]}${req.nextUrl.pathname}${req.nextUrl.search}`,
        req.url,
      ),
    );
  }

  const locale =
    locales.find(
      (l) =>
        req.nextUrl.pathname.startsWith(`${localePrefix[l]}/`) ||
        req.nextUrl.pathname === localePrefix[l],
    ) ?? defaultLocale;

  const requestHeaders = new Headers(req.headers);
  requestHeaders.set("X-NEXT-INTL-LOCALE", locale);
  return NextResponse.next({ request: { headers: requestHeaders } });
}
