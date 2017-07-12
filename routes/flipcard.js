const express = require('express');
const router = express.Router();
const data = require('../data.json');
const bodyParser = require('body-parser');
const session = require('express-session');
const fs = require('fs');

// gets all decks
router.get('/api/decks', (request, response) => {
    if (data.decks) {
        var modelStatus = {
            message: "success",
            data: data.decks
        }
        return response.status(200).json(modelStatus);
    } else {
        return response.status(400).json({ message: "Route Failed" });
    }
});

// creates new deck
router.post('/api/decks', (request, response) => {

    if (request.body.name) {
        var newDeck = {
            id: data.decks.length,
            name: request.body.name,
            cards: []
        }

        data.decks.push(newDeck);
        var itemsJSON = JSON.stringify(data);
        fs.writeFileSync('data.json', itemsJSON);
        return response.status(200).json({ message: "Sucesss", newDeck });

    } else {

        return response.status(400).json({ message: "Incomplete Data" });

    }
});

// create new card in deck
router.post('/api/decks/:id', (request, response) => {
    var deckIndex = data.decks.findIndex(q => q.id === parseInt(request.params.id));

    if (request.body.question && request.body.answer) {
    
        var newCard = {
            cardId: data.decks[deckIndex].cards.length,
            question: request.body.question,
            answer: request.body.answer
        }
        data.decks[deckIndex].cards.push(newCard);
        var itemsJSON = JSON.stringify(data);
        fs.writeFileSync('data.json', itemsJSON);
        return response.status(200).json({ message: "Sucesss", newCard });
    }
});

// update card in deck
router.put('/api/decks/:id/:cardId', (request, response) => {
    var currentCardId = parseInt(request.params.cardId);
    var deckIndex = data.decks.findIndex(deck => { return deck.id === parseInt(request.params.id) });
    var cardIndex = data.decks[deckIndex].cards.findIndex(card => { return card.cardId === currentCardId });

    if (deckIndex != -1 && cardIndex != -1) {
        if (request.body.question && request.body.answer) {

            data.decks[deckIndex].cards[cardIndex].question = request.body.question;
            data.decks[deckIndex].cards[cardIndex].answer = request.body.answer;

            var modelStatus = {
                message: "success",
                data: data.decks[deckIndex].cards[cardIndex]
            }
            var itemsJSON = JSON.stringify(data);
            fs.writeFile('data.json', itemsJSON, function (err) { });
            return response.status(200).json(modelStatus);

        } else {

            return response.status(400).json({ message: "Incomplete Data" });
        }
    } else {

        return response.status(400).json({ message: "Flip Card not found" });
    }

});

// deletes card from deck
router.delete('/api/decks/:id/:cardId', (request, response) => {

    var currentCardId = parseInt(request.params.cardId);
    var deckIndex = data.decks.findIndex(deck => { return deck.id === parseInt(request.params.id) });
    var cardIndex = data.decks[deckIndex].cards.findIndex(card => { return card.cardId === currentCardId });
    var card = data.decks[deckIndex].cards.find(card => { return card.cardId === currentCardId });

    if (deckIndex != -1 && cardIndex != -1) {

        data.decks[deckIndex].cards.splice(cardIndex, 1);
        var modelStatus = {
            message: "success",
            data: card
        }

        var itemsJSON = JSON.stringify(data);
        fs.writeFile('data.json', itemsJSON);
        return response.status(200).json(modelStatus);

    } else {
        return response.status(400).json({ message: "Flip Card not found" });
    }

});

// gets card, starts game, interchange id to get to different cards while in quiz
router.get('/api/decks/:id', (request, response) => {

    var deck = data.decks.find(deck => { return deck.id === parseInt(request.params.id) });
    if (deck) {
        var modelStatus = {
            message: "success",
            data: deck.cards
        }
        return response.status(200).json(modelStatus);

    } else {

        return response.status(400).json({ message: "Deck not found" });
    }
});



// stores whether user answered question correctly or not
router.post('/api/decks/:id/:cardId/correct', (request, response) => {

    var currentCardId = parseInt(request.params.cardId);
    var deckIndex = data.decks.findIndex(deck => { return deck.id === parseInt(request.params.id) });
    var cardIndex = data.decks[deckIndex].cards.findIndex(card => { return card.cardId === currentCardId });
    var card = data.decks[deckIndex].cards.find(card => { return card.cardId === currentCardId });

    if (deckIndex != -1 && cardIndex != -1) {
        data.decks[deckIndex].cards[cardIndex].correct = true;

        var modelStatus = {
            message: "success",
            data: card
        }

        var itemsJSON = JSON.stringify(data);
        fs.writeFile('data.json', itemsJSON);
        return response.status(200).json(modelStatus);

    } else {
        return response.status(400).json({ message: "Flip Card not found" });
    }
});

router.post('/api/decks/:id/:cardId/incorrect', (request, response) => {

    var currentCardId = parseInt(request.params.cardId);
    var deckIndex = data.decks.findIndex(deck => { return deck.id === parseInt(request.params.id) });
    var cardIndex = data.decks[deckIndex].cards.findIndex(card => { return card.cardId === currentCardId });
    var card = data.decks[deckIndex].cards.find(card => { return card.cardId === currentCardId });

    if (deckIndex != -1 && cardIndex != -1) {
        data.decks[deckIndex].cards[cardIndex].correct = false;

        var modelStatus = {
            message: "success",
            data: card
        }

        var itemsJSON = JSON.stringify(data);
        fs.writeFile('data.json', itemsJSON);
        return response.status(200).json(modelStatus);

    } else {
        return response.status(400).json({ message: "Flip Card not found" });
    }
});

module.exports = router;