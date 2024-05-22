const request = require("supertest");
const app = require("../index");
const { User, Note } = require("../models");
const { signToken } = require("../helpers/jwt");

let token1;
let token2;
beforeAll(async () => {
  let user1 = await User.create({
    name: "user1",
    age: 20,
    email: "user1@example.com",
    password: "123456",
  });
  token1 = signToken({ id: user1.id });

  let user2 = await User.create({
    name: "user2",
    age: 25,
    email: "user2@example.com",
    password: "qwerty",
  });
  token2 = signToken({ id: user2.id });
});

describe("POST /note", () => {
  test("Add new note 1", async () => {
    const data = {
      title: "Important Meeting Notes",
      description:
        "Meeting with the team on [DATE]. Discussed project progress, deadlines, and next steps. Key takeaways: [list of key points]",
    };
    const res = await request(app)
      .post("/note")
      .set("Authorization", `Bearer ${token1}`)
      .send(data);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Note has been added");
  });

  test("Add new note 2", async () => {
    const data = {
      title: "Weekend Plans",
      description:
        "Planning activities for the upcoming weekend. Considering [list of options]",
    };
    const res = await request(app)
      .post("/note")
      .set("Authorization", `Bearer ${token2}`)
      .send(data);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("message", "Note has been added");
  });

  test("Title is required", async () => {
    const data = {
      description:
        "Meeting with the team on [DATE]. Discussed project progress, deadlines, and next steps. Key takeaways: [list of key points]",
    };
    const res = await request(app)
      .post("/note")
      .set("Authorization", `Bearer ${token1}`)
      .send(data);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Title is required");
  });

  test("Invalid token 1", async () => {
    const data = {
      title: "Important Meeting Notes",
      description:
        "Meeting with the team on [DATE]. Discussed project progress, deadlines, and next steps. Key takeaways: [list of key points]",
    };
    const res = await request(app).post("/note").send(data);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid token");
  });

  test("Invalid token 2", async () => {
    const data = {
      title: "Important Meeting Notes",
      description:
        "Meeting with the team on [DATE]. Discussed project progress, deadlines, and next steps. Key takeaways: [list of key points]",
    };
    const res = await request(app)
      .post("/note")
      .set("Authorization", `Bea asd`)
      .send(data);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid token");
  });
});

describe("GET /note", () => {
  test("Get note", async () => {
    const data = {
      title: "Important Meeting Notes",
      description:
        "Meeting with the team on [DATE]. Discussed project progress, deadlines, and next steps. Key takeaways: [list of key points]",
    };
    const res = await request(app)
      .get("/note")
      .set("Authorization", `Bearer ${token1}`);
    expect(res.status).toBe(200);
    expect(res.body).toMatchObject([
      {
        id: expect.any(Number),
        title: data.title,
        description: data.description,
        userId: expect.any(Number),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
    ]);
  });

  test("Invalid token 1", async () => {
    const res = await request(app).get("/note");
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid token");
  });

  test("Invalid token 2", async () => {
    const res = await request(app).get("/note").set("Authorization", `Bea asd`);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid token");
  });
});

describe("PATCH /edit-description/:id", () => {
  test(" note", async () => {
    const data = {
      description: "Patched description",
    };
    const res = await request(app)
      .patch(`/edit-description/${1}`)
      .set("Authorization", `Bearer ${token1}`)
      .send(data);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Note has been updated");
  });

  test("Invalid Token 1", async () => {
    const data = {
      description: "Patched description",
    };
    const res = await request(app).patch(`/edit-description/${1}`).send(data);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid token");
  });

  test("Invalid Token 2", async () => {
    const data = {
      description: "Patched description",
    };
    const res = await request(app)
      .patch(`/edit-description/${1}`)
      .set("Authorization", `Bearer asd`)
      .send(data);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid token");
  });

  test("You're not authorized", async () => {
    const data = {
      description: "Patched description",
    };
    const res = await request(app)
      .patch(`/edit-description/${2}`)
      .set("Authorization", `Bearer ${token1}`)
      .send(data);
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message", "You're not authorized");
  });

  test("Note not found", async () => {
    const data = {
      description: "Patched description",
    };
    const res = await request(app)
      .put(`/edit-note/${100}`)
      .set("Authorization", `Bearer ${token1}`)
      .send(data);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Note not found");
  });
});

describe("PUT /edit-note/:id", () => {
  test("Edit note", async () => {
    const data = {
      title: "Updated title",
      description: "Updated description",
    };
    const res = await request(app)
      .put(`/edit-note/${1}`)
      .set("Authorization", `Bearer ${token1}`)
      .send(data);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Note has been updated");
  });

  test("Title is required", async () => {
    const data = {
      description: "Updated description",
    };
    const res = await request(app)
      .put(`/edit-note/${1}`)
      .set("Authorization", `Bearer ${token1}`)
      .send(data);
    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty("message", "Title is required");
  });

  test("Invalid Token 1", async () => {
    const data = {
      title: "Updated title",
      description: "Updated description",
    };
    const res = await request(app).put(`/edit-note/${1}`).send(data);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid token");
  });

  test("Invalid Token 2", async () => {
    const data = {
      title: "Updated title",
      description: "Updated description",
    };
    const res = await request(app)
      .put(`/edit-note/${1}`)
      .set("Authorization", `Bearer asd`)
      .send(data);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid token");
  });

  test("You're not authorized", async () => {
    const data = {
      title: "Updated title",
      description: "Updated description",
    };
    const res = await request(app)
      .put(`/edit-note/${2}`)
      .set("Authorization", `Bearer ${token1}`)
      .send(data);
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message", "You're not authorized");
  });

  test("Note not found", async () => {
    const data = {
      title: "Updated title",
      description: "Updated description",
    };
    const res = await request(app)
      .put(`/edit-note/${100}`)
      .set("Authorization", `Bearer ${token1}`)
      .send(data);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Note not found");
  });
});

describe("DELETE /delete-note/:id", () => {
  test("Delete note", async () => {
    const res = await request(app)
      .delete(`/delete-note/${1}`)
      .set("Authorization", `Bearer ${token1}`);
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("message", "Note has been deleted");
  });

  test("Invalid Token 1", async () => {
    const res = await request(app).delete(`/delete-note/${2}`);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid token");
  });

  test("Invalid Token 2", async () => {
    const res = await request(app)
      .delete(`/delete-note/${2}`)
      .set("Authorization", `bea asd`);
    expect(res.status).toBe(401);
    expect(res.body).toHaveProperty("message", "Invalid token");
  });

  test("You're not authorized", async () => {
    const res = await request(app)
      .delete(`/delete-note/${2}`)
      .set("Authorization", `Bearer ${token1}`);
    expect(res.status).toBe(403);
    expect(res.body).toHaveProperty("message", "You're not authorized");
  });

  test("Note not found", async () => {
    const res = await request(app)
      .delete(`/delete-note/${100}`)
      .set("Authorization", `Bearer ${token1}`);
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty("message", "Note not found");
  });
});

afterAll(async () => {
  await User.destroy({ truncate: true, cascade: true, restartIdentity: true });
  await Note.destroy({ truncate: true, cascade: true, restartIdentity: true });
});
