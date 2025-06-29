const axios = require("axios");
const fs = require("fs");
const os = require("os");
const path = require("path");
const FormData = require("form-data");
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const config = require('../config');

cmd({
    pattern: "menu",
    alias: ["help", "commands"],
    desc: "Show all menu categories",
    category: "main",
    react: "❄️",
    filename: __filename
},
async (conn, mek, m, { from, pushname: _0x1279c5, reply }) => {
    try {
        const os = require("os");
        const uptime = process.uptime();
        const totalMem = os.totalmem() / (1024 ** 3);
        const freeMem = os.freemem() / (1024 ** 3);
        const usedMem = totalMem - freeMem;

        const version = "².⁰.⁹";
        const plugins = commands.length;
        const now = new Date();
        const time = now.toLocaleTimeString("en-US", { hour12: true, timeZone: "Africa/Lagos" });
        const date = now.toLocaleDateString("en-CA", { timeZone: "Africa/Lagos" });

        const days = Math.floor(uptime / (3600 * 24));
        const hours = Math.floor((uptime % (3600 * 24)) / 3600);
        const minutes = Math.floor((uptime % 3600) / 60);
        const seconds = Math.floor(uptime % 60);
        const uptimeStr = `${days}𝐝 ${hours}𝐡 ${minutes}𝐦 ${seconds}𝐬`;

        let menuText = `╭⭑━━━━━➤ *𝗛𝗔𝗜𝗞𝗢 𝗫𝗠𝗗*
┃❍ *Mᴏᴅᴇ:* ${config.MODE}
┃❍ *Pʀᴇғɪx:* [ ${config.PREFIX} ]
┃❍ *Commnd By:* ${_0x1279c5 || "User"}
┃❍ *Pʟᴜɢɪɴs:* ${plugins}
┃❍ *Vᴇʀsɪᴏɴ:* ${version}
┃❍ *Uᴘᴛɪᴍᴇ:* ${uptimeStr}
┃❍ *Tɪᴍᴇ Nᴏᴡ:* ${time}
┃❍ *Dᴀᴛᴇ Tᴏᴅᴀʏ:* ${date}
┃❍ *Tɪᴍᴇ Zᴏɴᴇ:* Africa/Lagos
┃❍ *Sᴇʀᴠᴇʀ Rᴀᴍ:* ${usedMem.toFixed(2)} GB / ${totalMem.toFixed(2)} GB
╰━━━━━━━━━━━━━⭑━━━➤\n\n`;

        const categories = [...new Set(commands.map(cmd => cmd.category))];

        for (const category of categories) {
            const cmdsInCat = commands.filter(cmd => cmd.category === category);
            if (cmdsInCat.length === 0) continue;

            menuText += `╭━━━━❮ *${category.toUpperCase()}* ❯━⊷\n`;
            cmdsInCat.forEach(cmd => {
                menuText += `┣➢ ${config.PREFIX} ${cmd.pattern}\n`;
            });
            menuText += `╰⭑━━━━━━➤\n\n`;
        }

        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/06cgye.jpg` },
            caption: menuText.trim()
        }, { quoted: mek });

        await conn.sendMessage(from, {
            react: { text: "✅", key: m.key }
        });

    } catch (e) {
        console.error(e);
        reply("Error while generating menu:\n" + e.toString());
    }
});
