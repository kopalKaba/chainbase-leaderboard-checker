// server/index.js
const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

async function getZircon(wallet) {
  const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
  const page = await browser.newPage();
  await page.goto('https://genesis.chainbase.com', { waitUntil: 'networkidle2' });

  await page.evaluate(addr => localStorage.setItem('walletAddress', addr), wallet);
  await page.reload({ waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(3000);

  const text = await page.$eval(
    'div.flex.items-center.gap-2.text-xl.font-semibold.text-white',
    el => el.innerText
  );
  await browser.close();
  return parseInt(text.replace(/\D/g, '')) || 0;
}

app.post('/api/check', async (req, res) => {
  const wallets = req.body.wallets || [];
  const results = [];
  for (const w of wallets) {
    const pts = await getZircon(w);
    results.push({ wallet: w, points: pts });
  }
  res.json(results);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log('Listening on port', port));
