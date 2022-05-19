import test from "ava";
import { testServer } from "@indiekit-test/server";

test("Returns 400 if missing client_id value", async (t) => {
  const request = await testServer();
  const result = await request
    .post("/token")
    .set("accept", "application/json")
    .query({ client_id: "https://server.example" })
    .query({ code: "foo" });

  t.is(result.status, 400);
  t.is(result.body.error_description, "Missing redirect URI");
});
