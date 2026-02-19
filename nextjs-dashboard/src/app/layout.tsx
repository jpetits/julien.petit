import "@/styles/global.css";
import { inter } from "@/src/app/ui/fonts";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { getMessages, setRequestLocale, getLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/src/i18n/routing";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acme Dashboard",
  description: "The official Next.js Course Dashboard, built with App Router.",
  metadataBase: new URL("https://next-learn-dashboard.vercel.sh"),
};

type Props = {
  children: React.ReactNode;
};
export default async function RootLayout({ children }: Props) {
  return (
    <html>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
