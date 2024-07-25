const request = require("supertest");
const express = require("express");
const path = require("path");
const app = express();

// Middleware to serve static files
app.use(express.static("public"));

// Middleware to handle 404 errors
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "..", "public", "404.html"));
});

describe("GET /nonexistent", function () {
  it("should return 404 and serve 404.html", function (done) {
    request(app)
      .get("/nonexistent")
      .expect("Content-Type", /html/)
      .expect(404)
      .expect(/404 - Page Not Found/)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });
});
