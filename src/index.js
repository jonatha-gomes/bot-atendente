const TelegramBot = require("node-telegram-bot-api");

const token = "8176235010:AAESYh2aLFAPMpgAzYTDP-vN-PKFbbZUq8Q";

const bot = new TelegramBot(token, { polling: true });
