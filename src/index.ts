import { start, stop } from "./server";
import { login } from "./api/login";
import { API_KEY, MU_USERNAME, MU_PASSWORD } from "./config";

async function teardown(signal: string, err?: any) {
  if (err) {
    console.error(err);
  }
  console.log(`Exiting due to ${signal}.`);

  console.log("Stopping server...");
  await stop();

  console.log("Done.");
  process.exit(err ? Number(err.code) || 1 : 0);
}
process.on("SIGINT", () => teardown("SIGINT"));
process.on("uncaughtException", (err) => teardown("uncaughtException", err));
process.on("unhandledRejection", (err) => teardown("unhandledRejection", err));

export default (async function bootstrap() {
  try {
    if (!API_KEY) {
      console.warn(
        "WARNING: No API key configured! Access will be unauthenticated!",
      );
    }

    if (MU_USERNAME && MU_PASSWORD) {
      console.log("Logging in...");
      await login(MU_USERNAME, MU_PASSWORD);
    } else {
      console.warn(
        "WARNING: No credentials provided. Proceeding unauthenticated.",
      );
    }

    console.log("Starting server...");
    await start();

    console.log("Listening on port 3000.");
  } catch (e) {
    console.error("Failed to initialize:", e);
    process.exit(1);
  }
})();
