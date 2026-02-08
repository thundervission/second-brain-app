
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-12 text-white">
          <Link href="/" className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to App
          </Link>
          <h1 className="text-4xl font-bold mb-4">Architecture & Design Principles</h1>
          <p className="text-xl text-blue-100">Technical documentation for the Second Brain AI System</p>
        </div>

        <div className="p-8 space-y-12">
          {/* Section 1: Portable Architecture */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">1</span>
              Portable Architecture
            </h2>
            <div className="prose max-w-none text-gray-600 space-y-4">
              <p>
                The system is designed with a clear separation of concerns, ensuring components can be swapped or upgraded without major refactoring.
              </p>
              <div className="grid md:grid-cols-2 gap-6 mt-4">
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">AI Provider Agnostic</h3>
                  <p className="text-sm">
                    The AI logic is encapsulated in <code>lib/ai.ts</code>. While currently powered by Google Gemini (for its generous free tier), the interface can be easily adapted to use OpenAI, Claude, or local LLMs by modifying a single service file.
                  </p>
                </div>
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                  <h3 className="font-semibold text-gray-900 mb-2">Database Abstraction</h3>
                  <p className="text-sm">
                    Data access is handled through direct SQL queries in <code>lib/db.ts</code>. This "no-ORM" approach reduces bundle size and dependency overhead while maintaining complete control over query performance. Migration to Supabase or standard Postgres requires only connection string updates.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Principles-Based UX */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">2</span>
              Principles-Based UX
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-purple-600 mb-3">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Immediate Feedback</h3>
                <p className="text-sm text-gray-600">
                  Every interaction acknowledges user input instantly. Skeleton loaders and optimistic UI updates ensure the application feels faster than the network allows.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-blue-600 mb-3">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Transparent AI</h3>
                <p className="text-sm text-gray-600">
                  AI is a tool, not a black box. The system clearly indicates when content is AI-generated (tags, summaries) and always cites sources in chat responses, building user trust.
                </p>
              </div>

              <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="text-green-600 mb-3">
                  <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                  </svg>
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Progressive Power</h3>
                <p className="text-sm text-gray-600">
                  The interface remains simple for basic tasks (note taking) but reveals complexity (advanced filtering, vector-like semantic search) only when needed by the user.
                </p>
              </div>
            </div>
          </section>

          {/* Section 3: Agent Thinking */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">3</span>
              Agent Thinking
            </h2>
            <div className="bg-gray-900 text-gray-300 p-8 rounded-xl relative overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-white text-xl font-bold mb-4">Automation That Enhances</h3>
                <p className="mb-6">
                  The system acts as an intelligent agent that actively organizes your knowledge, rather than a passive database.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <div>
                      <strong className="text-white">Auto-Tagging Taxonomy:</strong> The agent analyzes content semantics to apply consistent tags, creating an organized taxonomy without user effort.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <div>
                      <strong className="text-white">Contextual Summarization:</strong> Long-form content is automatically distilled into key insights, making future retrieval and review significantly faster.
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-400 mr-2">✓</span>
                    <div>
                      <strong className="text-white">Retrieval Augmented Generation (RAG):</strong> The query interface doesn't hallucinate; it acts as an agent that reads your notes first, then synthesizes an answer based strictly on your personal knowledge base.
                    </div>
                  </li>
                </ul>
              </div>
              <div className="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-green-900/20 to-transparent pointer-events-none"></div>
            </div>
          </section>

          {/* Section 4: Infrastructure Mindset */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <span className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center mr-3 text-sm">4</span>
              Infrastructure Mindset
            </h2>
            <div className="prose max-w-none text-gray-600">
              <p>
                The Second Brain is built not just as an app, but as a platform. Functionality is exposed via a RESTful API layer, allowing the system to serve as the backend intelligence for other applications or personal websites.
              </p>
              <div className="mt-6 bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-mono text-purple-600 font-semibold">GET /api/public/brain/query</span>
                  <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Live Endpoint</span>
                </div>
                <pre className="bg-gray-900 text-gray-50 p-4 rounded text-xs overflow-x-auto">
                  {`{
  "query": "What is AI?",
  "answer": "AI is the simulation of human intelligence...",
  "sources": [
    {
      "id": "123",
      "title": "Artificial Intelligence Note",
      "url": "https://second-brain.app/items/123"
    }
  ]
}`}
                </pre>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
