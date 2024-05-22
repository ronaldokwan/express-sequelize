const request = require("supertest");
const app = require("../index");
const { User } = require("../models");

describe("POST /register", () => {
  test("Success register user", async () => {
    const data = {
      name: "user1",
      age: 20,
      email: "user1@example.com",
      password: "123456",
    };
    const res = await request(app).post("/register").send(data);
    expect(res.status).toBe(201);
    expect(res.body).toMatchObject({
      id: expect.any(Number),
      name: data.name,
      age: data.age,
      email: data.email,
    });
  });

  test("Name is empty", async () => {
    const data = {
      age: 20,
      email: "user1@example.com",
      password: "123456",
    };
    const res = await request(app).post("/register").send(data);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Name is required");
  });

  test("Age is empty", async () => {
    const data = {
      name: "user1",
      email: "user1@example.com",
      password: "123456",
    };
    const res = await request(app).post("/register").send(data);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Age is required");
  });

  test("Email is empty", async () => {
    const data = {
      name: "user1",
      age: 20,
      password: "123456",
    };
    const res = await request(app).post("/register").send(data);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Email is required");
  });

  test("Password is empty", async () => {
    const data = {
      name: "user1",
      age: 20,
      email: "user1@example.com",
    };
    const res = await request(app).post("/register").send(data);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Password is required");
  });

  test("password at least 6 characters", async () => {
    const data = {
      name: "user2",
      age: 20,
      email: "user2@example.com",
      password: "123",
    };
    const res = await request(app).post("/register").send(data);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty(
      "message",
      "Password at least 6 characters"
    );
  });

  test("Email already exist", async () => {
    const data = {
      name: "user1",
      age: 20,
      email: "user1@example.com",
      password: "123456",
    };
    const res = await request(app).post("/register").send(data);

    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Email already exist");
  });

  test("Not a valid Email", async () => {
    const data = {
      name: "user1",
      age: 20,
      email: "user1exampleCom",
      password: "123456",
    };
    const res = await request(app).post("/register").send(data);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Email format is not correct");
  });
});

describe("POST /login", () => {
  test("Success login user", async () => {
    const data = {
      email: "user1@example.com",
      password: "123456",
    };
    const res = await request(app).post("/login").send(data);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("access_token", expect.any(String));
  });

  test("Email is required", async () => {
    const data = {
      password: "123456",
    };
    const res = await request(app).post("/login").send(data);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Email is required");
  });

  test("Password is required", async () => {
    const data = {
      email: "user1@example.com",
    };
    const res = await request(app).post("/login").send(data);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Password is required");
  });

  test("Invalid Email", async () => {
    const data = {
      email: "user1exampleCom",
      password: "123456",
    };
    const res = await request(app).post("/login").send(data);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid email/password");
  });

  test("Invalid Password", async () => {
    const data = {
      email: "user1@example.com",
      password: "123",
    };
    const res = await request(app).post("/login").send(data);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid email/password");
  });
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
});
