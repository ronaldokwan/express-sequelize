const request = require("supertest");
const app = require("../index");

describe("GET /", () => {
  test("Home", async () => {
    const response = await request(app).get("/");
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("message", "Home");
  });
});
