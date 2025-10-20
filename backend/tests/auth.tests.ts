import request from "supertest";
import app from "../src/app";
import prisma from "../src/db";

describe("Auth", () => {
  beforeAll(async () => {
    // ensure test db is clean; with sqlite this is simple; with postgres in CI you'll run migrations
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("registers and logs in a user", async () => {
    const email = `test+${Date.now()}@example.com`;
    const password = "goodpass123";

    const res = await request(app)
      .post("/api/auth/register")
      .send({ email, password })
      .expect(200);

    expect(res.body.user).toBeDefined();
    const login = await request(app).post("/api/auth/login").send({ email, password }).expect(200);
    expect(login.body.token).toBeDefined();
  });
});
