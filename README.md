# Innovation Starter Kit

AI-powered innovation wizard guiding you through transforming ideas into validated business concepts and pitch decks.

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ and npm
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://dev.azure.com/BDC-RBVH-ETM/digi-easy/_git/de_innovation_starter_kit
   cd de_innovation_starter_kit
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root directory:

   ```bash
   # Required: OpenAI API Key
   OPENAI_API_KEY=your_openai_api_key_here

   # Optional: API Base URL (default: https://api.openai.com/v1)
   OPENAI_BASE_URL=https://api.openai.com/v1

   # Optional: Default Model (default: gpt-4o)
   OPENAI_DEFAULT_MODEL=gpt-4o

   # Optional: Tavily API Key for web search features
   TAVILY_API_KEY=your_tavily_key_here
   ```

   **📖 For complete configuration reference, see:** `/home/htr1hc/01_PJNE/07_innovation-starterkit/.env`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (http://localhost:3000) |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## ⚙️ Configuration

### Environment Variables

**Required:**
- `OPENAI_API_KEY` - Your OpenAI API key

**Optional:**
- `OPENAI_BASE_URL` - API base URL (default: `https://api.openai.com/v1`)
- `OPENAI_DEFAULT_MODEL` - Default model to use (default: `gpt-4o`)
- `TAVILY_API_KEY` - Tavily API key for web search features
- `API_TIMEOUT` - API timeout in milliseconds (default: `180000`)
- `API_MAX_RETRIES` - Maximum retry attempts (default: `3`)
- `NEXT_PUBLIC_DEMO_MODE` - Enable demo mode with sample data (`true`/`false`)
- `NEXT_PUBLIC_DISABLE_TOUR` - Disable onboarding tour (`true`/`false`)

## 🎯 Features

- **5-Step Innovation Wizard**
  1. Challenge - Define problems and target audience
  2. Market - Analyze trends and competition
  3. Ideation - Generate and refine business ideas
  4. Investment - Financial analysis and ROI evaluation
  5. Pitch - Create compelling presentations

- **AI-Powered Assistance** - Real-time guidance through each step
- **Interactive Analysis** - "Crack It" text selection feature for insights
- **Export & Share** - Generate PDF reports and export session data
- **Case Studies** - Learn from successful innovation examples

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Components:** Radix UI
- **AI Integration:** Vercel AI SDK
- **PDF Generation:** jsPDF
- **Charts:** Recharts

## 📁 Project Structure

```
de_innovation_starter_kit/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── challenge/         # Challenge page
│   ├── ideation/          # Ideation page
│   ├── market/            # Market analysis page
│   ├── investment/        # Investment appraisal page
│   └── pitch/             # Pitch deck page
├── components/            # React components
│   ├── ui/               # Base UI components
│   ├── wizard/           # Wizard navigation
│   └── ...
├── lib/                  # Utility functions
├── types/                # TypeScript types
└── public/               # Static assets
```

## 🔧 Troubleshooting

**Port 3000 already in use:**
```bash
# Kill process on port 3000
npx kill-port 3000
# Or use a different port
npm run dev -- -p 3001
```

**Module not found errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json .next
npm install
```

**API key issues:**
- Verify your `.env` file is in the root directory
- Check that the API key is valid and active
- Ensure the `OPENAI_BASE_URL` matches your provider

## 📝 Development Notes

- The application uses **client-side storage** (localStorage) for session data
- No backend database required for development
- All AI API calls are made directly from the browser/API routes
- Demo mode available for testing without API keys

## 🤝 Contributing

This is an internal Bosch application. For contributions:
1. Create a feature branch from `main`
2. Make your changes
3. Test thoroughly
4. Submit a pull request for review

## 📄 License

Internal Bosch Application - All Rights Reserved

---

**Need help?** Check the reference configuration: `/home/htr1hc/01_PJNE/07_innovation-starterkit/.env`

---

## ⚠️ Deprecated Configuration

The following configurations are **deprecated** and kept for reference only:

### Z.AI (Deprecated)

**Deprecated Configuration:**
```bash
# ❌ DEPRECATED
OPENAI_BASE_URL=https://api.z.ai/api/paas/v4/
OPENAI_DEFAULT_MODEL=glm-4.7
```

**Deprecated Models:**
- `glm-4.7`
- `glm-4.7-flash`

**Migration:**
- Use official OpenAI endpoints (`https://api.openai.com/v1`)
- Use OpenAI models (`gpt-4o`, `gpt-4o-mini`, etc.)

**Reference Only:**
- See `/home/htr1hc/01_PJNE/07_innovation-starterkit/.env` for examples
- These configurations exist for historical reference only
