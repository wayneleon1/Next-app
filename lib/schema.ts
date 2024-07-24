import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
  id: serial("id").primaryKey(),
  desciption: text("description").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});


