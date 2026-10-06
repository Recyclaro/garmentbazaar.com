// Runs once when the production server starts. Kicks off IndexNow pings in
// the background (never blocks startup): shortly after each deploy, then
// every 6 hours to pick up newly approved collections and new guides.
export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs" || process.env.NODE_ENV !== "production") return;

  const run = async () => {
    try {
      const { pingIndexNow } = await import("@/lib/indexnow");
      await pingIndexNow();
    } catch (e) {
      console.warn("[indexnow]", e instanceof Error ? e.message : e);
    }
  };
  setTimeout(run, 60_000).unref();
  setInterval(run, 6 * 60 * 60 * 1000).unref();
}
