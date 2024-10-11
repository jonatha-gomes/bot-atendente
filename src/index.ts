process.env.TZ = "America/Sao_Paulo";
import TelegramBot from "node-telegram-bot-api";

const token = "8176235010:AAESYh2aLFAPMpgAzYTDP-vN-PKFbbZUq8Q";
const bot = new TelegramBot(token, { polling: true });

const affiliateLink = "https://go.aff.donald.bet/ut8e2sx3";
const channelLink = "https://t.me/+dRhTwG_p9EE3Nzkx";
const channelSaveId = "-1002256247576";

type Users = {
  chatId: number;
  whatsapp: string;
};
const users: { [chatId: string]: Users } = {};

const welcomeMessage = `
Bem-vindo ao Grupo de Sinais! Aqui você encontrará os melhores sinais, com 97% de assertividade ✅

Fique atento aos sinais e acompanhe cada movimentação para aproveitar ao máximo e faturar bastante 🤑

Estamos à disposição para tirar dúvidas e ajudar na sua jornada!
`;

const selectMessage = `
❗️ Escolha uma das opções abaixo ❗️

👇👇👇👇👇👇
`;

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  users[chatId] = { chatId: chatId, whatsapp: "" };
  // bot.sendMessage(chatId, "mensagem", {
  //   reply_markup: {
  //     inline_keyboard: [text: "", url]
  //   }
  // });
});
