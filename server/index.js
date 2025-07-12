const express = require('express');
const cors = require('cors');

const app = express();

// ✅ Allow only your GitHub Pages frontend to access the backend
app.use(cors({
  origin: 'https://kopalkaba.github.io'
}));

app.use(express.json());

app.post('/api/check', async (req, res) => {
  const wallets = req.body.wallets;

  if (!Array.isArray(wallets)) {
    return res.status(400).json({ error: 'Invalid wallet list.' });
  }

  // Example leaderboard data (replace this with real logic later if needed)
  const leaderboard = [
    { wallet: '0x123...', points: 900 },
    { wallet: '0x456...', points: 750 },
    { wallet: '0x789...', points: 500 },
  ];

  // Match wallets from input
  const results = leaderboard
    .filter(entry => wallets.includes(entry.wallet))
    .map(entry => ({ wallet: entry.wallet, points: entry.points }));

  res.json(results);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
