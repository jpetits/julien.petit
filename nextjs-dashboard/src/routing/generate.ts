import { Route } from "next";
import { getLocale } from "next-intl/server";

export async function generateRoute(
  path: string,
  locale?: string,
): Promise<Route> {
  const localeInfered = locale || (await getLocale());
  const suffix = path === "/" ? "" : path;
  return `/${localeInfered}${suffix}` as Route;
}

export async function generateRoutes(paths: string[]): Promise<Route[]> {
  const locale = await getLocale();

  const generatedPaths = paths.map((path) => generateRoute(path, locale));
  return Promise.all(generatedPaths);
}
