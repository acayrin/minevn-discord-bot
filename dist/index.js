"use strict";
exports.__esModule = true;
var SucklessBot_1 = require("./core/SucklessBot");
new SucklessBot_1.SucklessBot({
    debug: true,
    clientOptions: {
        intents: [],
        presence: {
            activities: [
                {
                    name: "minevn.net",
                    type: "PLAYING"
                },
            ]
        }
    }
}).start();
