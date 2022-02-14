import dotenv from "dotenv";
import path from "path";
import commandLineArgs from "command-line-args";
import { cwd } from "process";
// import dotenvExpand from "dotenv-expand";

// dotenvExpand(dotenv.config());

(() => {
  // Setup command line options
  const options = commandLineArgs([
    {
      name: "env",
      alias: "e",
      defaultValue: "development",
      type: String,
    },
  ]);
  // Set the env file
  const result2 = dotenv.config({
    path: path.join(cwd(), `src/pre-start/env/${options.env as string}.env`),
  });
  if (result2.error) {
    throw result2.error;
  }
})();

const config = [
  {
    name: "default",
    type: "postgres",
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: ["src/entities/**/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entities",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber",
    },
  },
];

export default config;
