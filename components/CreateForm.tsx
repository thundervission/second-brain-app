'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Sparkles, Loader2 } from 'lucide-react';

interface CreateFormProps {
  onSuccess: () => void;
}

export default function CreateForm({ onSuccess }: CreateFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    type: 'NOTE',
    sourceUrl: '',
    tags: '',
  });
  const [autoSummarize, setAutoSummarize] = useState(true);
  const [autoTag, setAutoTag] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const tags = formData.tags
        .split(',')
        .map((tag) => tag.trim().toLowerCase())
        .filter((tag) => tag.length > 0);

      const response = await fetch('/api/items/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          tags,
          autoSummarize,
          autoTag: autoTag && tags.length === 0,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create item');
      }

      // Reset form
      setFormData({ title: '', content: '', type: 'NOTE', sourceUrl: '', tags: '' });
      onSuccess();
    } catch (err: any) {
      setError(err.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-2 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl">Capture Knowledge</CardTitle>
          <CardDescription>Add a new note, link, or insight to your Second Brain</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-lg bg-destructive/10 p-3 text-sm text-destructive">
                {error}
              </div>
            )}

            <div>
              <label className="mb-1.5 block text-sm font-medium">Title *</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Enter a descriptive title..."
                required
                className="transition-all duration-200 focus:scale-[1.01]"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Content *</label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your thoughts, paste an article, or capture insights..."
                required
                className="min-h-[150px] transition-all duration-200 focus:scale-[1.01]"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="mb-1.5 block text-sm font-medium">Type *</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  required
                >
                  <option value="NOTE">Note</option>
                  <option value="LINK">Link</option>
                  <option value="INSIGHT">Insight</option>
                </select>
              </div>

              <div>
                <label className="mb-1.5 block text-sm font-medium">Source URL (optional)</label>
                <Input
                  type="url"
                  value={formData.sourceUrl}
                  onChange={(e) => setFormData({ ...formData, sourceUrl: e.target.value })}
                  placeholder="https://..."
                />
              </div>
            </div>

            <div>
              <label className="mb-1.5 block text-sm font-medium">Tags (comma-separated)</label>
              <Input
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                placeholder="ai, productivity, learning"
              />
            </div>

            <div className="space-y-2 rounded-lg bg-muted/50 p-4">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="font-medium">AI Features</span>
              </div>

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={autoSummarize}
                  onChange={(e) => setAutoSummarize(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm">Auto-generate summary</span>
              </label>

              <label className="flex cursor-pointer items-center gap-2">
                <input
                  type="checkbox"
                  checked={autoTag}
                  onChange={(e) => setAutoTag(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300"
                />
                <span className="text-sm">Auto-generate tags (if none provided)</span>
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full transition-all duration-200 hover:scale-[1.02]"
              size="lg"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Knowledge Item'
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
}
