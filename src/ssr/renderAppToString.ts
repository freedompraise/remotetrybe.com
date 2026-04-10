import type { ReactNode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { Writable } from "node:stream";

/**
 * Full SSR/SSG string render (waits for Suspense boundaries via streaming API).
 */
export function renderReactToHtmlString(node: ReactNode): Promise<string> {
  return new Promise((resolve, reject) => {
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

    const { pipe } = renderToPipeableStream(node, {
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
