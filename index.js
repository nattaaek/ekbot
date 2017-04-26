// Reference the packages we require so that we can use them in creating the bot
var restify = require('restify');
var builder = require('botbuilder');
// =========================================================
// Bot Setup
// =========================================================

// Setup Restify Server
// Listen for any activity on port 3978 of our local server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function() {
    console.log('%s listening to %s', server.name, server.url);
});
// Create chat bot
var connector = new builder.ChatConnector({
    appId: process.env.MICROSOFT_APP_ID,
    appPassword: process.env.MICROSOFT_APP_PASSWORD
});
var bot = new builder.UniversalBot(connector);

// If a Post request is made to /api/messages on port 3978 of our local server, then we pass it to the bot connector to handle
server.post('/api/messages', connector.listen());
// =========================================================
// Bots Dialogs 
// =========================================================
// This is called the root dialog. It is the first point of entry for any message the bot receives
bot.dialog('/', [
    function(session) {
        session.beginDialog('/askName');
    },
    function(session, results) {
        session.send('Hello %s!', results.response);
    }
]);
bot.dialog('/askName', [
    function(session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    function(session, results) {
        session.endDialogWithResult(results);
    }
]);

//osXabmvhMocobHR2MxRTAVa  1431157463615111 62cffb9caed7d9cbc1091f81667644f8

// EAAUVoVA8hocBACsJcYrPG3cxBkWl89vNZCyxp8cHjkD6lIghKeQ2oh0AMyo7BtEmSS99eAztrJ8qsYijw6w72odeJ61RC58TA4vUQuriuDlbeS8NHwOxRJvVS3gqLboHh7rYru0EOj1yYLDsFMQAr1PYZAANePC80ApWXR2QZDZD