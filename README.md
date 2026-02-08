# 🧠 Second Brain - 100% FREE AI-Powered Knowledge System

[![Next.js](https://img.shields.io/badge/Next.js-14-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)](https://www.typescriptlang.org/)
[![Gemini](https://img.shields.io/badge/Gemini-FREE-green)](https://aistudio.google.com/)
[![Vercel](https://img.shields.io/badge/Vercel-FREE-orange)](https://vercel.com/)

> **🆓 ZERO COST** - No credit card required! Uses 100% FREE services.

A sophisticated knowledge management platform that captures, organizes, and intelligently surfaces information using AI. Built with modern web technologies and designed with architectural excellence in mind.

**Total Monthly Cost: $0.00** 💰

---

## 🎯 What Makes This 100% FREE?

### FREE Services Used:
- ✅ **Google Gemini API** - Powerful AI (60 requests/min, FREE forever!)
- ✅ **Vercel Hosting** - Frontend + API (100 GB bandwidth, FREE forever!)
- ✅ **Vercel Postgres** - Database (256 MB storage, FREE!)
- ✅ **No Credit Card Required** - Just sign up and deploy!

---

## ✨ Features

### Core Capabilities
- **📝 Knowledge Capture** - Rich form for notes, links, and insights
- **🗂️ Smart Dashboard** - Search, filter, sort with beautiful UI
- **🤖 FREE AI Processing** - Auto-summarization and intelligent tagging
- **💬 Conversational Query** - Ask questions about your knowledge
- **🌐 Public API** - RESTful endpoint for integrations
- **🎨 Beautiful UI** - Smooth animations and responsive design

### AI Features (100% FREE!)
- **Auto-Summarization** - Concise summaries using Gemini
- **Smart Tagging** - Intelligent categorization
- **Semantic Queries** - Natural language understanding
- **Context-Aware** - Understands your knowledge base

---

## 🚀 Quick Start (5 Minutes)

### Prerequisites
- Node.js 18+
- GitHub account (free)
- Google account (for Gemini - free)

### Local Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd second-brain-app

# Install dependencies
npm install

# Get FREE Gemini API key
# 1. Visit: https://aistudio.google.com/app/apikey
# 2. Click "Create API Key"
# 3. Copy your key

# Create environment file
cp .env.example .env.local

# Add your FREE Gemini key to .env.local:
# GEMINI_API_KEY=AIzaSyC...

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) 🎉

---

## 🌐 Deploy to Production (10 Minutes - 100% FREE!)

### Step-by-Step FREE Deployment:

**See [FREE_DEPLOYMENT.md](./FREE_DEPLOYMENT.md) for detailed instructions.**

**Quick version:**

1. **Get FREE Gemini API Key**
   ```
   Visit: https://aistudio.google.com/app/apikey
   Click: "Create API Key"
   Copy: Your key (starts with AIzaSy...)
   ```

2. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push -u origin main
   ```

3. **Deploy to Vercel (FREE)**
   ```
   Visit: https://vercel.com
   Sign up with GitHub
   Import your repository
   Deploy!
   ```

4. **Add FREE Database**
   ```
   In Vercel dashboard:
   Storage → Create Database → Postgres
   Connect to your project
   Done! (Auto-configured)
   ```

5. **Add Environment Variables**
   ```
   Settings → Environment Variables
   Add: GEMINI_API_KEY=your-key
   Save and redeploy
   ```

6. **Initialize Database**
   ```
   Visit: https://your-app.vercel.app/api/init-db
   ```

**Done! Your app is live and 100% FREE!** 🎉

---

## 📚 API Documentation

### Public Query Endpoint (FREE!)

**Endpoint:** `GET /api/public/brain/query`

**Parameters:**
- `q` (required) - Your question

**Example:**
```bash
curl "https://your-app.vercel.app/api/public/brain/query?q=what+are+my+AI+notes"
```

**Response:**
```json
{
  "query": "what are my AI notes",
  "answer": "Based on your knowledge base...",
  "sources": [
    {
      "id": "...",
      "title": "AI Basics",
      "excerpt": "...",
      "url": "https://your-app.vercel.app/items/..."
    }
  ],
  "itemCount": 15,
  "timestamp": "2026-02-07T..."
}
```

### Internal API Routes

- `GET /api/items` - Fetch all items (with filters)
- `POST /api/items/create` - Create new item with FREE AI features
- `GET /api/items/[id]` - Get single item
- `PATCH /api/items/[id]` - Update item
- `DELETE /api/items/[id]` - Delete item
- `POST /api/query` - Conversational query (FREE Gemini!)
- `GET /api/init-db` - Initialize database tables

---

## 🏗️ Architecture

This project demonstrates four key principles:

### 1. Portable Architecture
- **Swappable AI Provider:** Gemini can be replaced with any LLM
- **Database Abstraction:** Direct SQL with easy migration path
- **Platform Agnostic:** Can deploy anywhere Node.js runs

### 2. Principles-Based UX
- **Transparency:** AI features are opt-in and visible
- **Progressive Enhancement:** Works without AI
- **Immediate Feedback:** Loading states everywhere
- **User Control:** Override AI suggestions

### 3. Agent Thinking
- **Self-Improving:** AI enhances organization over time
- **Semantic Understanding:** Understands context and intent
- **Proactive Features:** Suggests tags and summaries

### 4. Infrastructure Mindset
- **Public API:** RESTful endpoint for integrations
- **Embeddable:** Can be integrated into other sites
- **Scalable:** Stateless design for growth

**Full architecture documentation:** Visit `/docs` in the app

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** (App Router) - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations

### Backend
- **Next.js API Routes** - Server-side endpoints
- **Direct SQL** - Simple, efficient queries

### Database
- **Vercel Postgres** - FREE serverless database
- **256 MB storage** - ~1,000+ knowledge items

### AI
- **Google Gemini Pro** - FREE forever!
- **60 requests/minute** - More than enough
- **Server-side only** - Secure API key handling

### Deployment
- **Vercel** - FREE hobby tier
- **Automatic HTTPS** - Secure by default
- **Global CDN** - Fast everywhere

---

## 💰 Cost Breakdown

### This Project:
| Service | Cost | Limits |
|---------|------|--------|
| Gemini API | **$0/month** | 60 req/min, 1.5K/day |
| Vercel Hosting | **$0/month** | 100 GB bandwidth |
| Vercel Postgres | **$0/month** | 256 MB storage |
| SSL Certificate | **$0/month** | Included |
| **TOTAL** | **$0/month** | ✅ Perfect for demo! |

### Alternative (Paid):
| Service | Cost |
|---------|------|
| OpenAI API | $5-20/month |
| Database hosting | $5-10/month |
| **TOTAL** | **$10-30/month** |

**You save $10-30/month by using FREE services!** 💰

---

## 📁 Project Structure

```
second-brain-app/
├── app/
│   ├── api/
│   │   ├── items/           # CRUD operations
│   │   ├── query/           # FREE Gemini queries
│   │   ├── public/          # Public API
│   │   └── init-db/         # Database setup
│   ├── docs/                # Architecture docs
│   ├── page.tsx             # Main app
│   └── layout.tsx           # Root layout
├── components/
│   ├── CreateForm.tsx       # Knowledge capture
│   ├── Dashboard.tsx        # Main interface
│   ├── QueryInterface.tsx   # AI queries
│   └── ui/                  # Reusable components
├── lib/
│   ├── ai.ts                # FREE Gemini integration
│   ├── db.ts                # FREE Vercel Postgres
│   └── utils.ts             # Helpers
├── FREE_DEPLOYMENT.md       # Step-by-step guide
└── README.md                # This file!
```

---

## 🎨 UI Highlights

- **Smooth Animations** - Framer Motion throughout
- **Gradient Backgrounds** - Professional design
- **Micro-Interactions** - Hover effects and transitions
- **Loading States** - Skeleton loaders and spinners
- **Responsive Design** - Works on all devices
- **Dark Mode Ready** - Easy to add

---

## 🔒 Security

- ✅ API keys stored in environment variables
- ✅ Server-side AI processing only
- ✅ No client-side API exposure
- ✅ SQL injection prevention (parameterized queries)
- ✅ Input validation on all forms

---

## 🚨 Troubleshooting

### Gemini API Issues
```bash
# Verify your key at: https://aistudio.google.com/app/apikey
# Key should start with: AIzaSy...
# Check Vercel environment variables
```

### Database Connection
```bash
# Ensure Vercel Postgres is connected
# Visit: /api/init-db to create tables
# Check Vercel logs for errors
```

### Deployment Fails
```bash
# Check build logs in Vercel dashboard
# Ensure all environment variables are set
# Try: vercel --prod --force
```

---

## 📖 Documentation

- **FREE Deployment Guide:** [FREE_DEPLOYMENT.md](./FREE_DEPLOYMENT.md)
- **Architecture Details:** Visit `/docs` in the app
- **API Reference:** See above
- **Troubleshooting:** See above

---

## 🎯 Perfect For

- ✅ **Internship Submissions** - Professional quality
- ✅ **Portfolio Projects** - Shows full-stack skills
- ✅ **Personal Use** - Actually useful!
- ✅ **Learning** - Clean, well-documented code
- ✅ **Demos** - Fast and free to deploy

---

## 🌟 What Makes This Special

### Technical Excellence
- Modern Next.js 14 with TypeScript
- Production-ready architecture
- Comprehensive error handling
- Clean, maintainable code

### FREE Stack
- Zero monthly costs
- No credit card needed
- Professional-grade AI
- Unlimited deployments

### Beautiful Design
- Smooth animations
- Professional UI
- Responsive layout
- Attention to detail

### Well Documented
- Step-by-step guides
- Architecture explanations
- Code comments
- API documentation

---

## 🤝 Contributing

This project was built for the Altibbe Full-Stack Internship assignment. Feel free to:
- Fork and improve
- Submit issues
- Suggest features
- Use as inspiration

---

## 📝 License

MIT License - Use freely!

---

## 👨‍💻 Author

**Ajay Kumar**

Built for Altibbe/Hedamo Full-Stack Engineering Internship

---

## 🙏 Acknowledgments

- **Google Gemini** - For FREE, powerful AI API
- **Vercel** - For FREE hosting and database
- **Next.js** - For amazing developer experience
- **Shadcn/ui** - For beautiful components

---

## 📞 Support

**Having issues?**
1. Check [FREE_DEPLOYMENT.md](./FREE_DEPLOYMENT.md)
2. Review Vercel deployment logs
3. Verify environment variables
4. Check Gemini API status

**Still stuck?** The code includes detailed comments to help!

---

## 🎊 Ready to Deploy?

```bash
# 1. Get FREE Gemini key (2 min)
Visit: https://aistudio.google.com/app/apikey

# 2. Push to GitHub (1 min)
git push origin main

# 3. Deploy to Vercel (5 min)
Visit: https://vercel.com

# 4. Initialize database (30 sec)
Visit: https://your-app.vercel.app/api/init-db

# Done! 🎉
```

**Total time: ~10 minutes**  
**Total cost: $0.00**  
**Result: Professional AI app!** 🚀

---

**This is a 100% FREE, production-ready application perfect for internship submissions!**
