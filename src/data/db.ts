import postgres from "postgres";

export const sql = postgres(
  "postgres://steampipe:ci-password@127.0.0.1:9193/steampipe",
);
