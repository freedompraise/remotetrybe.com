import { StaticRouter } from "react-router-dom/server";
import {
  AppProviders,
  AppRoutesTree,
  createQueryClient,
} from "@/AppShared";
import { preloadAppRouteModules } from "@/ssr/preloadRoutes";
import { renderReactToHtmlString } from "@/ssr/renderAppToString";

export async function render(url: string) {
  await preloadAppRouteModules();
  const queryClient = createQueryClient();
  return renderReactToHtmlString(
    <AppProviders queryClient={queryClient}>
      <StaticRouter location={url}>
        <AppRoutesTree />
      </StaticRouter>
    </AppProviders>
  );
}
