import "@/src/app/ui/global.css";
import { inter } from "@/src/app/ui/fonts";
import { getLocale } from "next-intl/server";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  return (
    <html lang={locale}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
