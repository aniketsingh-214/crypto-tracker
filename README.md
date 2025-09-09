# 🚀 Crypto Portfolio Tracker

A **Crypto Portfolio Tracker** built with **React + TypeScript** that allows users to track live crypto prices, maintain a mock trading portfolio, and view profits/losses.  
Deployed on **Vercel** with support for authentication, trading, and responsive UI.

---

## ✨ Features

- 📊 **Live Crypto Prices**
  - Fetch prices from [CoinGecko API](https://www.coingecko.com/en/api)
  - Auto-refresh every 30 seconds
  - Show 24h price changes

- 🔐 **Authentication**
  - Simple login/register flow
  - Protected routes for portfolio and trading pages

- 💼 **Portfolio Dashboard**
  - Start with **$10,000 mock USD**
  - View holdings and total portfolio value
  - Track profit/loss in real-time

- 💱 **Trading Page**
  - Buy/sell BTC, ETH, USDT, USDC, XMR, and SOL
  - Real-time price conversion
  - Last 10 trades history

- 🎨 **Design**
  - Mobile responsive
  - Clean and professional UI with **Tailwind CSS**

---

## 🌟 Bonus Features (Implemented / Optional)

- ⚡ Real-time price updates (WebSocket / API polling)
- 🌗 Dark/Light mode toggle
- 📥 Export trades to CSV
- 🔔 Price alerts (basic mock)
- 📱 PWA support (optional)

---

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript
- **Routing:** React Router DOM
- **State Management:** Zustand / Context API
- **Styling:** Tailwind CSS
- **API:** CoinGecko (free crypto data API)
- **Deployment:** Vercel

---

## 📂 Folder Structure

```

src
┣ components      # Reusable UI components (Navbar, PriceTicker, TradeForm, etc.)
┣ pages           # Route pages (Home, Login, Register, Portfolio, Trading, Settings)
┣ store           # Zustand/Context stores for auth, portfolio, alerts
┣ utils           # Helper functions (API handlers, constants, formatters)
┣ hooks           # Custom hooks (auth, alerts, etc.)
┣ App.tsx         # App entry point
┣ main.tsx        # ReactDOM root
┗ index.css       # Tailwind base styles

````

---

## ⚙️ Installation & Setup

Clone the repository and install dependencies:

```bash
git clone https://github.com/your-username/crypto-tracker.git
cd crypto-tracker
npm install
````

Run development server:

```bash
npm run dev
```

Build for production:

```bash
npm run build
npm start
```


## 🚀 Deployment (Vercel)

1. Push your project to GitHub.
2. Go to [Vercel](https://vercel.com).
3. Import your repo.
4. Add environment variables if needed.
5. Deploy 🎉

---

## 🧪 Testing (Optional)

```bash
npm run test
```

Coverage is added for:

* Portfolio state management
* Trading logic
* Utility functions

---

## 📸 Demo

🔗 **Live Demo:** [https://crypto-tracker-pi-pearl.vercel.app/](https://crypto-tracker-pi-pearl.vercel.app/)

---

## 👨‍💻 Author

Developed by **Aniket Singh** ✨

* GitHub: [@your-username](https://github.com/aniketsingh-214)
* LinkedIn: [Your Profile](https://www.linkedin.com/in/aniketsingh214)


