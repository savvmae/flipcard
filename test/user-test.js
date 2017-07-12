const application = require('./application.js');
const request = require('supertest');
const assert = require('assert');

describe("POST /api/signup", function () {
    it("should return successfully", function (done) {
        request(application)
            .post("/api/signup")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .end(done);
    })
    it("should return unsuccessfully", function (done) {
        request(application)
            .post("/api/signup")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .end(done);
    })
});

describe("POST /api/login", function () {
    it("should return successfully", function (done) {
        request(application)
            .post("/api/login")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .end(done);
    })
    it("should return unsuccessfully", function (done) {
        request(application)
            .post("/api/login")
            .expect(200)
            .expect("Content-Type", "application/json; charset=utf-8")
            .end(done);
    })
});