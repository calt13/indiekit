import process from "node:process";
import test from "ava";
import { testServer } from "@indiekit-test/server";

test("Returns categories", async (t) => {
  const request = await testServer();

  const response = await request
    .get("/micropub")
    .auth(process.env.TEST_TOKEN, { type: "bearer" })
    .set("accept", "application/json")
    .query("q=syndicate-to");

  t.truthy(response.body["syndicate-to"]);
});
