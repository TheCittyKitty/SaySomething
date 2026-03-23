require('dotenv').config();
const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds]
});

// --- VARIANTS ---

const intros = [
  "Don't even think!",
  "No thought allowed!",
  "No lying!",
  "Just say something!",
];

const prompts = [
  "Tell a personal story involving",
  "What's something interesting that happened to you involving",
  "What's the funniest thing that's happened to you involving",
  "What's the most peculiar experience you've had involving",
  "Do you have a funny true story about",

];

const objects = [
  "clock", "chair", "bus", "phone", "TV",
  "laptop", "keyboard", "mouse", "table", "desk",
  "door", "window", "mirror", "lamp", "light",
  "bed", "sofa", "pillow", "blanket", "shelf",
  "book", "notebook", "pen", "pencil", "bag",
  "backpack", "suitcase", "wallet", "key", "lock",
  "bottle", "cup", "glass", "plate", "bowl",
  "fork", "knife", "spoon", "pan", "pot",
  "fridge", "oven", "microwave", "toaster", "kettle",
  "car", "bike", "scooter", "train", "plane",
  "helmet", "jacket", "shirt", "shoe", "hat",
  "watch", "ring", "chain", "bracelet", "coin",
  "ball", "toy", "controller", "console", "speaker",
  "camera", "tripod", "drone", "remote", "charger",
  "cable", "battery", "plug", "switch", "socket",
  "bin", "box", "container", "drawer", "cupboard",
  "fan", "heater", "AC unit", "radiator", "vent",
  "sign", "poster", "frame", "painting", "photo"
];

function withArticle(word) {
  const vowels = ['a','e','i','o','u'];
  return vowels.includes(word[0].toLowerCase())
    ? `an ${word}`
    : `a ${word}`;
}

// --- HELPER ---

function random(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

// --- BOT LOGIC ---

client.on('interactionCreate', async interaction => {
  if (!interaction.isChatInputCommand()) return;

  if (interaction.commandName === 'revive') {
    const intro = random(intros);
    const prompt = random(prompts);
    const objectRaw = random(objects);
    const object = withArticle(objectRaw);

    const formattedObject = `__**${object}**__`;

    const message = `@everyone ${intro} ${prompt} ${formattedObject}.`;

    await interaction.reply({
      content: message,
      allowedMentions: { parse: ['everyone'] }
    });
  }
});

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.login(process.env.TOKEN);