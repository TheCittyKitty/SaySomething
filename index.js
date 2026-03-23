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

// --- OBJECT BANK ---
// category meanings:
// - object: normal thing, usually gets a/an
// - owned: personal thing, usually gets "your"
// - place: location, usually no article
//
// You can now go through this list and change category per item.

const objects = [
  { word: "clock", category: "object" },
  { word: "bus", category: "place" },
  { word: "phone", category: "owned" },
  { word: "TV", category: "object" },

  { word: "laptop", category: "owned" },
  { word: "keyboard", category: "object" },
  { word: "mouse", category: "object" },
  { word: "table", category: "object" },
  { word: "desk", category: "object" },

  { word: "door", category: "object" },
  { word: "window", category: "object" },
  { word: "mirror", category: "object" },
  { word: "lamp", category: "object" },
  { word: "light", category: "object" },

  { word: "bed", category: "owned" },
  { word: "sofa", category: "object" },
  { word: "pillow", category: "owned" },
  { word: "blanket", category: "owned" },
  { word: "shelf", category: "object" },

  { word: "book", category: "owned" },
  { word: "notebook", category: "owned" },
  { word: "pen", category: "owned" },
  { word: "pencil", category: "owned" },
  { word: "bag", category: "owned" },

  { word: "backpack", category: "owned" },
  { word: "suitcase", category: "owned" },
  { word: "wallet", category: "owned" },
  { word: "key", category: "owned" },
  { word: "lock", category: "object" },

  { word: "bottle", category: "owned" },
  { word: "cup", category: "object" },
  { word: "glass", category: "object" },
  { word: "plate", category: "object" },
  { word: "bowl", category: "object" },

  { word: "fork", category: "object" },
  { word: "knife", category: "object" },
  { word: "spoon", category: "object" },
  { word: "pan", category: "object" },
  { word: "pot", category: "object" },

  { word: "fridge", category: "object" },
  { word: "oven", category: "object" },
  { word: "microwave", category: "object" },
  { word: "toaster", category: "object" },
  { word: "kettle", category: "object" },

  { word: "car", category: "owned" },
  { word: "bike", category: "owned" },
  { word: "scooter", category: "owned" },
  { word: "train", category: "place" },
  { word: "plane", category: "place" },

  { word: "helmet", category: "owned" },
  { word: "jacket", category: "owned" },
  { word: "shirt", category: "owned" },
  { word: "shoe", category: "owned" },
  { word: "hat", category: "owned" },

  { word: "watch", category: "owned" },
  { word: "ring", category: "owned" },
  { word: "chain", category: "owned" },
  { word: "bracelet", category: "owned" },
  { word: "coin", category: "object" },

  { word: "ball", category: "object" },
  { word: "toy", category: "object" },
  { word: "controller", category: "owned" },
  { word: "console", category: "owned" },
  { word: "speaker", category: "object" },

  { word: "camera", category: "owned" },
  { word: "tripod", category: "object" },
  { word: "drone", category: "owned" },
  { word: "remote", category: "object" },
  { word: "charger", category: "owned" },

  { word: "cable", category: "object" },
  { word: "battery", category: "object" },
  { word: "plug", category: "object" },
  { word: "switch", category: "object" },
  { word: "socket", category: "object" },

  { word: "bin", category: "object" },
  { word: "box", category: "object" },
  { word: "container", category: "object" },
  { word: "drawer", category: "object" },
  { word: "cupboard", category: "object" },

  { word: "fan", category: "object" },
  { word: "heater", category: "object" },
  { word: "AC unit", category: "object" },
  { word: "radiator", category: "object" },
  { word: "vent", category: "object" },

  { word: "sign", category: "object" },
  { word: "poster", category: "object" },
  { word: "frame", category: "object" },
  { word: "painting", category: "object" },
  { word: "photo", category: "owned" },
];

// --- GRAMMAR HELPERS ---

function withArticle(word) {
  const vowels = ['a', 'e', 'i', 'o', 'u'];
  return vowels.includes(word[0].toLowerCase())
    ? `an ${word}`
    : `a ${word}`;
}

function formatItem(item) {
  switch (item.category) {
    case 'owned':
      return `your ${item.word}`;

    case 'place':
      return item.word;

    case 'object':
    default:
      return withArticle(item.word);
  }
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
    const itemRaw = random(objects);
    const item = formatItem(itemRaw);

    const formattedItem = `__**${item}**__`;
    const message = `@everyone ${intro} ${prompt} ${formattedItem}.`;

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