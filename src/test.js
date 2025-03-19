// login-test.ts (or add to src/index.ts)
import { IgApiClient } from "instagram-private-api";
import * as dotenv from "dotenv";

dotenv.config();

const INSTAGRAM_USERNAME = process.env.INSTAGRAM_USERNAME;
const INSTAGRAM_PASSWORD = process.env.INSTAGRAM_PASSWORD;

if (!INSTAGRAM_USERNAME || !INSTAGRAM_PASSWORD) {
  console.error(
    "[Error] Missing required environment variables: INSTAGRAM_USERNAME and INSTAGRAM_PASSWORD",
  );
  process.exit(1);
}

async function testLogin() {
  const ig = new IgApiClient();
  let isLoggedIn = false;

  try {
    console.log("[Auth] Attempting to log in to Instagram...");
    ig.state.generateDevice(INSTAGRAM_USERNAME);
    await ig.account.login(INSTAGRAM_USERNAME, INSTAGRAM_PASSWORD);
    isLoggedIn = true;
    console.log("[Auth] Successfully logged in to Instagram");
  } catch (error) {
    console.error("[Auth Error] Failed to log in to Instagram:", error);
  }

  return isLoggedIn;
}

async function runLoginTest() {
  const result = await testLogin();
  console.log("Login Result:", result);
}

runLoginTest();
