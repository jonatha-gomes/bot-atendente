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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const welcomeMessage = `
Bem-vindo ao Grupo de Sinais! Aqui você encontrará os melhores sinais, com 97% de assertividade ✅

Fique atento aos sinais e acompanhe cada movimentação para aproveitar ao máximo e faturar bastante 🤑

Estamos à disposição para tirar dúvidas e ajudar na sua jornada!
`;

const selectMessage = `
❗️ Escolha uma das opções abaixo ❗️

👇👇👇👇👇👇
`;

const minesSelectedMessage =
  "Você selecionou: 💎 Mines. Para continuar faça o cadastro na plataforma clicando no botão abaixo!";

bot.onText(/\/start/, async (msg) => {
  const chatId = msg.chat.id;
  users[chatId] = { chatId: chatId, whatsapp: "" };

  await bot.sendChatAction(chatId, "typing");
  await delay(2000);

  await bot.sendMessage(chatId, welcomeMessage);

  await bot.sendChatAction(chatId, "typing");
  await delay(2000);

  await bot.sendMessage(chatId, selectMessage, {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "💎 Mines",
            callback_data: "mines",
          },
        ],
      ],
    },
  });
});

bot.on("callback_query", async (query) => {
  const chatId = query.message?.chat.id || "";

  if (query.data === "mines") {
    await bot.sendChatAction(chatId, "typing");
    await delay(2000);

    await bot.sendMessage(chatId, minesSelectedMessage);

    await bot.sendChatAction(chatId, "typing");
    await delay(1000);

    await bot.sendMessage(chatId, "Clique no botão abaixo para se cadastrar:", {
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "Cadastro",
              url: affiliateLink,
            },
          ],
        ],
      },
    });

    await bot.sendChatAction(chatId, "typing");
    await delay(5000);

    await bot.sendMessage(
      chatId,
      "Você se cadastrou? Responda apenas SIM ou NÃO."
    );
  }
});

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;

  if (msg.text?.toLowerCase() == "sim") {
    await bot.sendChatAction(chatId, "typing");
    await delay(2000);

    await bot
      .sendMessage(
        chatId,
        "Por favor, envie o seu número do WhatsApp para entrega de prêmios:"
      )
      .then(() => {
        bot.once("message", async (msg) => {
          const whatsappNumber = msg.text || "";
          users[chatId].whatsapp = whatsappNumber;

          await bot.sendChatAction(chatId, "typing");
          await delay(2000);

          await bot.sendMessage(
            chatId,
            "Obrigado! Você agora tem acesso. Aqui está o botão de entrar:"
          );

          await bot.sendChatAction(chatId, "typing");
          await delay(2000);

          await bot.sendMessage(
            chatId,
            "Clique no botão para entrar no grupo:",
            {
              reply_markup: {
                inline_keyboard: [
                  [
                    {
                      text: "ACESSAR GRUPO",
                      url: channelLink,
                    },
                  ],
                ],
              },
            }
          );

          await delay(2000);
          await bot.sendMessage(
            channelSaveId,
            `NOVO USUÁRIO: \nChat ID: ${chatId} \nWhatsapp: ${whatsappNumber}`
          );
        });
      });
  } else if (
    msg.text?.toLowerCase() == "nao" ||
    msg.text?.toLowerCase() == "não"
  ) {
    await bot.sendChatAction(chatId, "typing");
    await delay(2000);
    await bot.sendMessage(
      chatId,
      "Por favor, faça seu cadastro e digite 'sim' quando terminar ou 'não' para tentar novamente."
    );
  }
});
