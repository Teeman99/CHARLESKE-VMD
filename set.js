const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidUtFZEQyT1J3cmFhM2REWU1TLzkrTFZVUjBjUnc1bEp5K2Y3QzM4dFZWTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOGdXS1JwenhBenNvUHZuWS9qa0poVFMxTHNJQ2pTM2FQR1hVTGRDTm1qND0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJxUGV6ZFhrK05MTGJCclZWTzdXQUFvMEpVS3FTRi9DVXdsM09rYUtpRzI0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJyRVNGUEVFbkEweldVUk93MFlQSjFDMS9OS0ZIKzBsMG53ZlM3cEtOdERzPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Im9HejBablNWcEUyK3UvSnd3NTlmVTlSTWp0NlVGYkM3M3NuMXVGeHhHMEE9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImU3MHE0NUJGOC95cHNHTzdkM3hEQjRBRCtWbUpaSHZvTXF1dFhUd08rMzA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTUZ3K3ZhSXdLL2loUG1LZGJZWGNMMmtkcFI5REtuc3dPcHN3ajRmQ29ITT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNUcrbDdBT1dLeGlyaHNiZ0FGeEM3ZUU4NHMyeDl2bmxPcjVpZG5xOWF4dz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IktiV0xGdVpDVDVydFZhV2JCb1FhT0JXclUwU0JPMkJqNTFqQUZ2UHo1ekpFYXd4QS92VXVMb1VzRlJXOGlOajBHUmtyRlpseVZnSkhPVTdCaE1vY0NnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTQ3LCJhZHZTZWNyZXRLZXkiOiJQMHg0d2FjckhVZHRveTBoQXBYNUpuSGRGWWEydTQvZHErNE1URlREN3hVPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjI2Mzc4NTgyNDQ2OUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiI3ODY2QzQwODEzNEQwNjk2MkU4ODVFMEFEMjE2RTVFRSJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzQ1Mjc4ODk4fSx7ImtleSI6eyJyZW1vdGVKaWQiOiIyNjM3ODU4MjQ0NjlAcy53aGF0c2FwcC5uZXQiLCJmcm9tTWUiOnRydWUsImlkIjoiQkM2ODJDQ0UyRUFCREE2NTc3QjFBM0JEQUVGOTE3QzgifSwibWVzc2FnZVRpbWVzdGFtcCI6MTc0NTI3ODg5OX0seyJrZXkiOnsicmVtb3RlSmlkIjoiMjYzNzg1ODI0NDY5QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjAxQTI0QkY1MDEwRUYzQTcxMTFFQjFEQ0Y0NTUxNTBGIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDUyNzg5MTh9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IkJWNVp4dks3U3lhODkyak9heVlLZnciLCJwaG9uZUlkIjoiZTc0NzBiZDAtMzRlNi00MWM3LTkwZTctOWRkYzAyZDg1MDkyIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVwZFY4cEtFRG5kSUJYa2J1YWFIOXd1Ujh0Zz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJzTGVBTXdmV2tMekFWUWRhcENlRlNDK1ladW89In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiREZCUERWQzMiLCJtZSI6eyJpZCI6IjI2Mzc4NTgyNDQ2OTozQHMud2hhdHNhcHAubmV0IiwibmFtZSI6IlRlZW1hbuKEou+4jyJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSitBemM0Q0VKdXZtOEFHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiSXhKeDgzaHNJa0VRUmJPTXNmMWNIZmNyUXU2Q0U4NUdCNVRFSVJPcjRpST0iLCJhY2NvdW50U2lnbmF0dXJlIjoiZTV6clpvdGVPRUlqdmRBYUw2NnJxanIxa1JqdWFRREZDeThDRWxQRkhKZ0U3VXpQZXl4alBvajQxalAxdGpzak5hWnd6VWZzT0IwUGlGTllZN21oQUE9PSIsImRldmljZVNpZ25hdHVyZSI6IlVlSnVsWVRLaW5meGhsN3JJSi8ydmNrTW9YNWs3bE5QTXBHa2pCRzM2UTJEeUU5dlYvZmQwVnJzTEQzdFBZY3NwZTlkczhkU0NHV3dxNTJlZnpuK0R3PT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjYzNzg1ODI0NDY5OjNAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCU01TY2ZONGJDSkJFRVd6akxIOVhCMzNLMEx1Z2hQT1JnZVV4Q0VUcStJaSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTc0NTI3ODg4OCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFGWXUifQ==',
    PREFIXE: process.env.PREFIX || "×",
    OWNER_NAME: process.env.OWNER_NAME || "TEEMAN",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "+263785824468",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'LIL'SMOKEY',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    ANTICALL : process.env.ANTICALL || 'no',   
    AUTO_BIO : process.env.AUTO_BIO || 'no',               
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ANTIDELETE1 : process.env.ANTI_DELETE_MESSAGE || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',
    AUTO_REACT : process.env.AUTO_REACT || 'yes',              
    AUTO_REACT_STATUS : process.env.AUTO_REACT_STATUS || 'yes',
    AUTO_READ : process.env.AUTO_READ || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

