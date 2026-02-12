import { Route } from "next";
import { getLocale } from "next-intl/server";

export async function generateRoute(
  path: string,
  locale?: string,
): Promise<Route> {
  console.log(locale, path);
  const localeInfered = locale || (await getLocale());
  console.log("Generating route for locale:", localeInfered, "and path:", path);
  const suffix = path === "/" ? "" : path;
  console.log(`Generated route: /${localeInfered}${suffix}`);
  return `/${localeInfered}${suffix}` as Route;
}

export async function generateRoutes(paths: string[]): Promise<Route[]> {
  const locale = await getLocale();

  const generatedPaths = paths.map((path) => generateRoute(path, locale));
  return Promise.all(generatedPaths);
}
