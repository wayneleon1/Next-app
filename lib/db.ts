import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const client = postgres(
  "postgres://default:HsCb2MT3Inrh@ep-falling-waterfall-a49usiub-pooler.us-east-1.aws.neon.tech/verceldb?sslmode=require"
);

export const db = drizzle(client, { schema, logger: true });
