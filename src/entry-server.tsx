import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";
import { StaticRouter } from "react-router-dom/server";
import {
  AppProviders,
  AppRoutesTree,
  createQueryClient,
} from "@/AppShared";

/** Preload route chunks so React.lazy resolves before streaming completes. */
function preloadAppChunks() {
  return Promise.all([
    import("@/pages/Index"),
    import("@/pages/VAMasterclass"),
    import("@/pages/NotFound"),
    import("@/pages/ThankYou"),
    import("@/pages/ReferralProgress"),
    import("@/pages/OdosaEgharevba"),
    import("@/pages/Affiliate"),
    import("@/layouts/AuthLayout"),
    import("@/pages/login"),
    import("@/pages/admin/AdminRoute"),
    import("@/pages/admin/layout"),
    import("@/pages/admin/affiliates/index"),
    import("@/pages/admin/affiliates/[id]"),
  ]);
}

export async function render(url: string) {
  await preloadAppChunks();
  const queryClient = createQueryClient();
  const app = (
    <AppProviders queryClient={queryClient}>
      <StaticRouter location={url}>
        <AppRoutesTree />
      </StaticRouter>
    </AppProviders>
  );

  return new Promise<string>((resolve, reject) => {
    const chunks: Buffer[] = [];
    const writable = new Writable({
      write(chunk, _enc, cb) {
        chunks.push(Buffer.from(chunk));
        cb();
      },
    });

    writable.on("finish", () => {
      resolve(Buffer.concat(chunks).toString("utf8"));
    });
    writable.on("error", reject);

    const { pipe } = renderToPipeableStream(app, {
      onAllReady() {
        pipe(writable);
      },
      onShellError(err) {
        reject(err);
      },
      onError(error) {
        console.error("SSG stream error:", error);
      },
    });
  });
}
