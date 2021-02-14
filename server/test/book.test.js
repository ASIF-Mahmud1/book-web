// Add import statements

const app = require("../server"); // runs app.js
const mongoose = require("../server");
const Book = require("../models/book.model"); // imports Article model
const request = require("supertest"); // needed to make API requests

describe("When the Book CRUD server is running", () => {
  // Add individual test cases
  it("should return 200 response if GET request to '/'", async () => {
    const res = await request(app).get("/api/books");
    expect(res.status).toBe(200);
    expect(res.body.message).toBe("ok");
  });

  afterAll(async () => {
    await app.close();
    await mongoose.connection.db.dropDatabase();
    await mongoose.connection.close();
  });
});
