const application = require('../application.js');
const request = require('supertest');
const assert = require('assert');
const crypto = require('crypto');

// EXAMPLE
// describe('ItemsController', () => {
//     it('should add item', (done) => {
//         expressMocker(application)
//             .post('/items')
//             .send({ name: 'Squirrels' })
//             .expect(200)
//             .expect(response => {
//                 assert.deepEqual(response.body, { name: 'Squirrels' });
//             })
//             .end(done);
//     });



// DONE
describe("userRouter", function () {
    it("should return successfully", function (done) {
        request(application)
            .post("/api/signup")
            .send({ email: "test@test", password: crypto.pbkdf2Sync('test', 'salt', 10, 512, 'sha512').toString('base64')})
            .expect(200)
            .expect(response => {
                assert.deepEqual(response.body, { email: "test@test", message: "Success"})
            })
            .end(done);
    })
    it("should return unsuccessfully", function (done) {
        request(application)
            .post("/api/signup")
            .send({ email: "test@test", password: crypto.pbkdf2Sync('test', 'salt', 10, 512, 'sha512').toString('base64')})
            .expect(400)
            .expect(response => {
                assert.deepEqual(response.body, { message: "Email already registered" });
            })
            .end(done);
    })
    it("should return unsuccessfully", function (done) {
        request(application)
            .post("/api/signup")
            .send({ password: crypto.pbkdf2Sync('test', 'salt', 10, 512, 'sha512').toString('base64')})
            .expect(400)
            .expect(response => {
                assert.deepEqual(response.body, { message: "Missing Data Fields" });
            })
            .end(done);
    })
 it("should return successfully", function (done) {
        request(application)
            .post("/api/login")
            .send({  email: "test@test", password: crypto.pbkdf2Sync('test', 'salt', 10, 512, 'sha512').toString('base64')})
            .expect(200)
            .expect(response => {
                assert.deepEqual(response.body, { message: "Success", data: "test@test" });
            })
            .end(done);
    })
 it("should return unsuccessfully", function (done) {
        request(application)
            .post("/api/login")
            .send({  email: "test@test", password: crypto.pbkdf2Sync('testing', 'salt', 10, 512, 'sha512').toString('base64')})
            .expect(400)
            .expect(response => {
                assert.deepEqual(response.body, { message: "Incorrect password" });
            })
            .end(done);
    })
 it("should return unsuccessfully", function (done) {
        request(application)
            .post("/api/login")
            .send({  email: "testblahhh@test", password: crypto.pbkdf2Sync('test', 'salt', 10, 512, 'sha512').toString('base64')})
            .expect(400)
            .expect(response => {
                assert.deepEqual(response.body, { message: "User not found" });
            })
            .end(done);
    })
 it("should return successfully", function (done) {
        request(application)
            .post("/api/logout")
            .expect(200)
            .expect(response => {
                assert.deepEqual(response.body, { message: "successfully logged out" });
            })
            .end(done);
    })
});
