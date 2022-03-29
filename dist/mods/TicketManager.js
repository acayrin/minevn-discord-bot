"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var SucklessMod_1 = require("../core/interface/SucklessMod");
var discord_js_1 = require("discord.js");
var GenerateId_1 = require("../core/utils/GenerateId");
var CoreHelp = (function (_super) {
    __extends(CoreHelp, _super);
    function CoreHelp() {
        return _super.call(this, {
            name: "Ticket Manager",
            author: "acayrin",
            intents: [discord_js_1.Intents.FLAGS.GUILDS, discord_js_1.Intents.FLAGS.GUILD_MESSAGES],
            command: "ticket",
            aliases: ["t"],
            description: "Ticket management command",
            usage: "%prefix%<command/alias> [args]",
            priority: 10,
            single: true,
            events: {
                onMsgCreate: ticketCheck
            }
        }) || this;
    }
    return CoreHelp;
}(SucklessMod_1.SucklessMod));
exports["default"] = CoreHelp;
var ticketCheck = function (msg, args, bot) { return __awaiter(void 0, void 0, void 0, function () {
    var tid, json, category, channel, s, r, d, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (msg.author.bot || msg.deleted)
                    return [2];
                tid = (0, GenerateId_1.id)();
                json = msg.channel.toJSON();
                return [4, msg.guild.channels.fetch(json["parentId"])];
            case 1:
                category = _a.sent();
                channel = undefined;
                if (!((args === null || args === void 0 ? void 0 : args.indexOf("close")) > -1)) return [3, 2];
                if (json["name"].startsWith("ticket-")) {
                    if (bot.configs.get("ticket.json")["staff_roles"].indexOf(msg.member.roles.highest.id) > -1 ||
                        msg.member.permissions.has(discord_js_1.Permissions.FLAGS.MANAGE_CHANNELS))
                        return [2, msg.channel["delete"]()];
                }
                return [3, 7];
            case 2:
                if (msg.channel.id !== bot.configs.get("ticket.json")["ticket_channel"])
                    return [2];
                s = msg.content.split("\n");
                r = {
                    a: s[0],
                    b: s[1],
                    c: s[2],
                    d: s[3]
                };
                s.splice(0, 3);
                r.d = s.join("\n");
                d = function (text) {
                    return msg["delete"]()["finally"](function () {
                        return msg.channel.send("".concat(msg.member, " - ").concat(text)).then(function (m) { return setTimeout(function () { return m["delete"](); }, 5000); });
                    });
                };
                if (bot.configs.get("ticket.json")["ticket_types"].indexOf(r.a.toLowerCase()) < 0)
                    return [2, d("Invalid ticket type. Possible values: " + bot.configs.get("ticket.json")["ticket_types"].join(", "))];
                if (!r.b)
                    return [2, d("Missing date!")];
                else if (!r.c)
                    return [2, d("Missing server!")];
                else if (!r.d)
                    return [2, d("Missing description!")];
                else if (msg.attachments.size < 1)
                    return [2, d("Missing attachments!")];
                _a.label = 3;
            case 3:
                _a.trys.push([3, 5, , 6]);
                return [4, category.createChannel("Ticket-".concat(tid))];
            case 4:
                channel = _a.sent();
                if (channel.isText())
                    channel.send({
                        embeds: [
                            new discord_js_1.MessageEmbed()
                                .setColor(bot.configs.get("core.json")["color"])
                                .setTitle(r.a.toUpperCase())
                                .setDescription("**Date**: ".concat(r.b, "\n**Server**: ").concat(r.c, "\n\n").concat(r.d))
                                .setAuthor("".concat(msg.author.username, "#").concat(msg.author.discriminator), msg.author.avatarURL()),
                        ],
                        files: Array.from(msg.attachments.values())
                    });
                return [3, 6];
            case 5:
                e_1 = _a.sent();
                bot.emit("debug", "[Ticket ".concat(tid, "] Unable to create channel: ").concat(e_1));
                return [3, 6];
            case 6:
                channel.permissionOverwrites.create(msg.author, {
                    VIEW_CHANNEL: true,
                    SEND_MESSAGES: true,
                    READ_MESSAGE_HISTORY: true
                });
                bot.configs.get("ticket.json")["staff_roles"].forEach(function (id) { return __awaiter(void 0, void 0, void 0, function () {
                    var role;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4, msg.guild.roles.fetch(id)];
                            case 1:
                                role = _a.sent();
                                if (role)
                                    channel.permissionOverwrites.create(role, {
                                        VIEW_CHANNEL: true,
                                        SEND_MESSAGES: true,
                                        READ_MESSAGE_HISTORY: true
                                    });
                                else
                                    null;
                                return [2];
                        }
                    });
                }); });
                return [2, msg["delete"]()];
            case 7: return [2];
        }
    });
}); };
