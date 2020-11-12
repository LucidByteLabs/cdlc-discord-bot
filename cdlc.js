import Discord from "discord.js";
import { cdlcToken } from "./cdlc-token.js";
import fs from "fs";

const client = new Discord.Client();
const channels = client.channels;

client.on("ready", () => {
  let time = new Date();
  fs.appendFile(
    "./cdlc-logs.txt",
    client.user.tag + " has connected at " + time + "\n",
    function (err) {
      if (err) throw err;
    }
  );

  // const serverList = client.guilds.cache;

  // serverList.forEach((guild) => {
  //   console.log(guild.name);

  //   guild.channels.cache.forEach((channel) => {
  //     logChannelAndEmojiIDs(
  //       `${channel.type} -  ${channel.name} ${channel.id}\n`
  //     );
  //   });
  // });

  console.log("Running ...");
});

// Function to be triggered on any message to any server the bot is in
client.on("message", (receivedMessage) => {
  const incomingM = receivedMessage.content.toLowerCase();

  // This if statement keeps the bot from replying to itself.
  if (receivedMessage.author == client.user) {
    return;
  }

  // receivedMessage.guild.emojis.cache.forEach((customEmoji) => {
  //   logChannelAndEmojiIDs(`${customEmoji.name} ${customEmoji.id}\n`);
  // });

  // Initial command string.
  if (incomingM.startsWith("!cdlc")) {
    const command = incomingM.substring(6); // Command string truncated
    let tts = false;

    if (command.includes("tts")) {
      tts = true; // Bot will read sent message out loud using Discord Text-To-Speech.
    }

    if (command.startsWith("help")) {
      receivedMessage.channel.send(
        "No help data currently.",
        { tts: tts } // Set to true if command contains "tts"
      );
    }

    if (command.startsWith("say hi")) {
      receivedMessage.channel.send(
        "Hello, " + receivedMessage.author.toString() + "!",
        { tts: tts } // Set to true if command contains "tts"
      );
    }
  }
});

// Will not work currently
function localDataWriteService(dataToWrite) {
  let rawCdlcData = fs.readFileSync("./cdlc-command-data.json");
  let cdlcData = JSON.parse(rawCdlcData);
  //   cdlcData.dataToWrite;
  const stringCdlcData = JSON.stringify(cdlcData, null, 2);
  fs.writeFileSync("./cdlc-command-data.json", stringCdlcData);
}

// No data to read currently
function localDataReadService() {
  let rawCdlcData = fs.readFileSync("./cdlc-command-data.json");
  let cdlcData = JSON.parse(rawCdlcData);
  return cdlcData;
}

// Run once.
function logChannelAndEmojiIDs(identificationData) {
  console.log(identificationData);
  fs.appendFileSync("./cdlc-ids.txt", identificationData);
}

// Log message in case of bot disconnect.
client.on("disconnect", () => {
  fs.appendFileSync("./cdlc-logs.txt", "CDLC Bot has disconnected.");
});

client.login(cdlcToken);
