'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Sparkles, Loader2, Brain } from 'lucide-react';

interface QueryResponse {
  answer: string;
  relevantItems: Array<{
    id: string;
    title: string;
    excerpt: string;
  }>;
}

export default function QueryInterface() {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState<QueryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuery = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsLoading(true);
    setError('');
    setResponse(null);

    try {
      const res = await fetch('/api/query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to process query');
      }

      setResponse(data);
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const exampleQueries = [
    'What have I learned about AI recently?',
    'Show me insights about productivity',
    'What are my notes on web development?',
    'Summarize my thoughts on design',
  ];

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="border-2 shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-primary/10 p-2">
                <Brain className="h-5 w-5 text-primary" />
              </div>
              <div>
                <CardTitle className="text-2xl">Ask Your Second Brain</CardTitle>
                <CardDescription>Query your knowledge base conversationally</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleQuery} className="space-y-4">
              {error && (
                <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div>
                <Textarea
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Ask a question about your knowledge..."
                  className="min-h-[100px] transition-all duration-200 focus:scale-[1.01]"
                />
              </div>

              <Button
                type="submit"
                disabled={isLoading || !query.trim()}
                className="w-full transition-all duration-200 hover:scale-[1.02]"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Thinking...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Ask AI
                  </>
                )}
              </Button>
            </form>

            {/* Example Queries */}
            <div className="mt-4">
              <p className="mb-2 text-xs font-medium text-muted-foreground">Try asking:</p>
              <div className="flex flex-wrap gap-2">
                {exampleQueries.map((example, idx) => (
                  <button
                    key={idx}
                    onClick={() => setQuery(example)}
                    className="rounded-full border px-3 py-1 text-xs transition-all duration-200 hover:border-primary hover:bg-primary/5"
                  >
                    {example}
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Response */}
      <AnimatePresence>
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  AI Response
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="whitespace-pre-wrap text-sm leading-relaxed">{response.answer}</p>
                </div>

                {response.relevantItems.length > 0 && (
                  <div>
                    <h4 className="mb-3 text-sm font-semibold">Relevant Sources:</h4>
                    <div className="space-y-2">
                      {response.relevantItems.map((item) => (
                        <Card key={item.id} className="transition-all hover:shadow-md">
                          <CardContent className="p-4">
                            <h5 className="mb-1 font-medium">{item.title}</h5>
                            <p className="text-sm text-muted-foreground">{item.excerpt}</p>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
