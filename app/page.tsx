'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Brain, Plus, Search, Sparkles, Database, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CreateForm from '@/components/CreateForm';
import Dashboard from '@/components/Dashboard';
import QueryInterface from '@/components/QueryInterface';

export default function Home() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'create' | 'query'>('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);

  const handleCreateSuccess = () => {
    setActiveTab('dashboard');
    setRefreshKey((prev) => prev + 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 py-20 text-white"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20"></div>

        <div className="container relative mx-auto max-w-6xl px-4">
          <motion.div
            initial={{ y: -30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center"
          >
            <div className="mb-6 flex justify-center">
              <motion.div
                animate={{
                  rotate: [0, 360],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm"
              >
                <Brain className="h-16 w-16" />
              </motion.div>
            </div>

            <h1 className="mb-4 text-5xl font-bold tracking-tight md:text-6xl">
              Your Second Brain
            </h1>
            <p className="mx-auto mb-8 max-w-2xl text-xl text-blue-100">
              An AI-powered knowledge management system that captures, organizes, and intelligently
              surfaces your insights
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => setActiveTab('create')}
                size="lg"
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                <Plus className="mr-2 h-5 w-5" />
                Capture Knowledge
              </Button>
              <Button
                onClick={() => setActiveTab('query')}
                size="lg"
                variant="outline"
                className="border-white/20 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
              >
                <Sparkles className="mr-2 h-5 w-5" />
                Ask AI
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Animated waves */}
        <div className="absolute bottom-0 left-0 w-full">
          <svg viewBox="0 0 1440 120" xmlns="http://www.w3.org/2000/svg">
            <motion.path
              initial={{ d: 'M0,64L1440,64L1440,120L0,120Z' }}
              animate={{
                d: [
                  'M0,64L1440,64L1440,120L0,120Z',
                  'M0,32L1440,96L1440,120L0,120Z',
                  'M0,64L1440,64L1440,120L0,120Z',
                ],
              }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
              fill="white"
              fillOpacity="0.1"
            />
            <path d="M0,96L1440,96L1440,120L0,120Z" fill="white" />
          </svg>
        </div>
      </motion.div>

      {/* Features Banner */}
      <div className="border-b bg-white py-8">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex items-center gap-4"
            >
              <div className="rounded-lg bg-blue-100 p-3">
                <Zap className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold">AI-Powered</h3>
                <p className="text-sm text-muted-foreground">Auto-summarization & smart tagging</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <div className="rounded-lg bg-purple-100 p-3">
                <Database className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold">Organized</h3>
                <p className="text-sm text-muted-foreground">Smart categorization & search</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4"
            >
              <div className="rounded-lg bg-green-100 p-3">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold">Secure</h3>
                <p className="text-sm text-muted-foreground">PostgreSQL with Prisma ORM</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b bg-white">
        <div className="container mx-auto max-w-6xl px-4">
          <nav className="flex gap-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 border-b-2 px-6 py-4 font-medium transition-colors ${activeTab === 'dashboard'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
            >
              <Search className="h-4 w-4" />
              Dashboard
            </button>
            <button
              onClick={() => setActiveTab('create')}
              className={`flex items-center gap-2 border-b-2 px-6 py-4 font-medium transition-colors ${activeTab === 'create'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
            >
              <Plus className="h-4 w-4" />
              Create
            </button>
            <button
              onClick={() => setActiveTab('query')}
              className={`flex items-center gap-2 border-b-2 px-6 py-4 font-medium transition-colors ${activeTab === 'query'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
            >
              <Sparkles className="h-4 w-4" />
              Ask AI
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto max-w-6xl px-4 py-12">
        {activeTab === 'dashboard' && <Dashboard key={refreshKey} />}
        {activeTab === 'create' && <CreateForm onSuccess={handleCreateSuccess} />}
        {activeTab === 'query' && <QueryInterface />}
      </div>

      {/* Footer */}
      <footer className="mt-20 border-t bg-white py-8">
        <div className="container mx-auto max-w-6xl px-4 text-center text-sm text-muted-foreground">
          <div className="flex justify-center gap-6 mb-4">
            <a href="/docs" className="text-blue-600 hover:underline font-medium">Architecture & Design Principles</a>
            <a href="/api/public/brain/query?q=Hello" className="text-blue-600 hover:underline font-medium" target="_blank" rel="noopener noreferrer">Public API</a>
          </div>
          <p>Built with Next.js, TypeScript, PostgreSQL, and Google Gemini</p>
          <p className="mt-2">Second Brain © {new Date().getFullYear()} - Intelligent Knowledge Management</p>
        </div>
      </footer>
    </div>
  );
}
