const application = require('../application.js');
const request = require('supertest');
const assert = require('assert');

// EXAMPLE
// describe('ItemsController', () => {
//     it('should add item', (done) => {
//         request(application)
//             .post('/items')
//             .send({ name: 'Squirrels' })
//             .expect(200)
//             .expect(response => {
//                 assert.deepEqual(response.body, { name: 'Squirrels' });
//             })
//             .end(done);
//     });



describe('FlipCardController', () => {

    it('should fail to get decks', (done) => {
        request(application)
            .get('/api/decks')
            .expect(400)
            .expect(response => {
                assert.deepEqual(response.body, { message: "Route Failed" });
            })
            .end(done);
    });

    it('should create new deck', (done) => {
        request(application)
            .post('/api/decks')
            .send({ id: 0, name: "Animals Deck", cards: [] })
            .expect(200)
            .expect(response => {
                assert.deepEqual(response.body, { message: "Success", newDeck: { id: 0, name: "Animals Deck", cards: [] } });
            })
            .end(done);
    });

    it('should fail to create new deck', (done) => {
        request(application)
            .post('/api/decks')
            .send({ id: 0, cards: [] })
            .expect(400)
            .expect(response => {
                assert.deepEqual(response.body, { message: "Incomplete Data" });
            })
            .end(done);
    });

    it('should get all decks', (done) => {
        request(application)
            .get('/api/decks')
            .expect(200)
            .expect(response => {
                assert.deepEqual(response.body, { message: "success", data: [{ id: 0, name: "Animals Deck", cards: [] }] });
            })
            .end(done);
    });

    it('should fail to get deck', (done) => {
        request(application)
            .get('/api/decks/12')
            .expect(400)
            .expect(response => {
                assert.deepEqual(response.body, { message: "Deck not found" });
            })
            .end(done);
    });

    it('should create new card', (done) => {
        request(application)
            .post('/api/decks/0')
            .send({ cardId: 0, question: "What do ducks do?", answer: "Quack" })
            .expect(200)
            .expect(response => {
                assert.deepEqual(response.body, { message: "Success", newCard: { cardId: 0, question: "What do ducks do?", answer: "Quack" } });
            })
            .end(done);
    });

    it('should fail to create new card', (done) => {
        request(application)
            .post('/api/decks/0')
            .send({ cardId: 0, question: "What do ducks do?" })
            .expect(400)
            .expect(response => {
                assert.deepEqual(response.body, { message: "Incomplete Data" });
            })
            .end(done);
    });

    it('should get all cards for a specified deck', (done) => {
        request(application)
            .get('/api/decks/0')
            .expect(200)
            .expect(response => {
                assert.deepEqual(response.body, { message: "success", data: [{ cardId: 0, question: "What do ducks do?", answer: "Quack" }] });
            })
            .end(done);
    });


    it('should fail to get all cards for a specified deck', (done) => {
        request(application)
            .get('/api/decks/12')
            .expect(400)
            .expect(response => {
                assert.deepEqual(response.body, { message: "Deck not found" });
            })
            .end(done);
    });

    it('should update card in deck', (done) => {
        request(application)
            .put('/api/decks/0/0')
            .expect(200)
            .send({ question: "What do ducks do?", answer: "Swim" })
            .expect(response => {
                assert.deepEqual(response.body, {
                    message: "success",
                    data: { cardId: 0, question: "What do ducks do?", answer: "Swim" }
                });
            })
            .end(done);
    });

    it('should fail to update card in deck', (done) => {
        request(application)
            .put('/api/decks/0/7')
            .expect(400)
            .expect(response => {
                assert.deepEqual(response.body, { message: "Flip Card not found" });
            })
            .end(done);
    });

    it('should fail to update card in deck', (done) => {
        request(application)
            .put('/api/decks/0/0')
            .expect(400)
            .send({ question: "What do ducks do?", })
            .expect(response => {
                assert.deepEqual(response.body, { message: "Incomplete Data" });
            })
            .end(done);
    });
    
    it('should add correct: true property/key onto card object', (done) => {
        request(application)
            .post('/api/decks/0/0/correct')
            .expect(200)
            .expect(response => {
                assert.deepEqual(response.body, {
                    message: "success",
                    data: { cardId: 0, question: "What do ducks do?", answer: "Swim", correct: true }
                });
            })
            .end(done);
    });
    it('should fail to add correct: true property/key onto card object', (done) => {
        request(application)
            .post('/api/decks/0/5/correct')
            .expect(400)
            .expect(response => {
                assert.deepEqual(response.body, { message: "Flip Card not found" });
            })
            .end(done);
    });
    it('should add correct: false property/key onto card object', (done) => {
        request(application)
            .post('/api/decks/0/0/incorrect')
            .expect(200)
            .expect(response => {
                assert.deepEqual(response.body, {
                    message: "success",
                    data: { cardId: 0, question: "What do ducks do?", answer: "Swim", correct: false }
                });
            })
            .end(done);
    });
    it('should fail to add correct: false property/key onto card object', (done) => {
        request(application)
            .post('/api/decks/0/5/correct')
            .expect(400)
            .expect(response => {
                assert.deepEqual(response.body, { message: "Flip Card not found" });
            })
            .end(done);
    });
    it('should delete card in deck', (done) => {
        request(application)
            .delete('/api/decks/0/0')
            .expect(200)
            .expect(response => {
                assert.deepEqual(response.body, {
                    message: "success",
                    data: { cardId: 0, question: "What do ducks do?", answer: "Swim", correct: false }
                });
            })
            .end(done);
    });
    it('should fail to delete card in deck', (done) => {
        request(application)
            .delete('/api/decks/0/12')
            .expect(400)
            .expect(response => {
                assert.deepEqual(response.body, {
                    message: "Flip Card not found"
                });
            })
            .end(done);
    });
});
