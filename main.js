var builder = require("botbuilder");
var database = require("botbuilder-storage-firebase-database");
var url = require("./conf")
console.log(url)
const admin = require('firebase-admin');
admin.initializeApp(
    {
        databaseURL: url
    }
);
var db = admin.database();
var ref = db.ref("botState");

var client = new database.FireBaseBotStorage(ref, { refName: "botState" });


var bot = new builder.UniversalBot(new builder.ConsoleConnector().listen()).set("storage", client);
bot.dialog("/", [s => {
    s.send("hello");
    s.beginDialog("greetings")
}
    , (s) => {

        s.send("bady")
    }

])
bot.dialog('greetings', [
    // Step 1
    function (session) {
        builder.Prompts.text(session, 'Hi! What is your name?');
    },
    // Step 2
    function (session, results) {
        session.endDialog(`Hello ${results.response}!`);
    }
]);