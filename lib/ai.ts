/**
 * AI Service using FREE Google Gemini API
 * Get your free API key: https://aistudio.google.com/app/apikey
 * 60 requests per minute - completely FREE!
 */

export interface SummarizeResult {
  summary: string;
  error?: string;
}

export interface TagsResult {
  tags: string[];
  error?: string;
}

export interface QueryResult {
  answer: string;
  relevantItems: Array<{ id: string; title: string; excerpt: string }>;
  error?: string;
}

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

/**
 * Call Gemini API - 100% FREE
 */
async function callGemini(prompt: string): Promise<string> {
  try {
    // Retry logic for 429 errors
    let attempt = 0;
    const maxRetries = 5; // Increased from 3

    while (attempt <= maxRetries) {
      try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [
                  {
                    text: prompt,
                  },
                ],
              },
            ],
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 500,
            },
          }),
        });

        if (response.status === 429) {
          if (attempt === maxRetries) throw new Error('API Rate Limit Exceeded (429) after 5 retries. Please wait a moment.');
          // Aggressive Exponential backoff: 2s, 4s, 8s, 16s, 32s
          // This allows us to survive the 60-second quota reset windows
          const waitTime = Math.pow(2, attempt + 1) * 1000;
          console.log(`Rate limited (429). Retrying in ${waitTime}ms...`);
          await new Promise(resolve => setTimeout(resolve, waitTime));
          attempt++;
          continue;
        }

        if (!response.ok) {
          const data = await response.json().catch(() => ({}));
          throw new Error(`Gemini API Error ${response.status}: ${JSON.stringify(data)}`);
        }

        const data = await response.json();
        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
        return text.trim();

      } catch (error: any) {
        // If it's not a 429 or we ran out of retries, throw
        if (attempt === maxRetries || (error.message && !error.message.includes('429'))) {
          throw error;
        }
        attempt++;
      }
    }
    throw new Error('Failed to get response from Gemini');
  } catch (error) {
    console.error('Gemini API error:', error);
    throw error;
  }
}

/**
 * Generate a concise summary using FREE Gemini
 */
export async function generateSummary(content: string): Promise<SummarizeResult> {
  try {
    if (!content || content.trim().length === 0) {
      return { summary: '', error: 'Content is empty' };
    }

    if (!GEMINI_API_KEY) {
      return { summary: '', error: 'Gemini API key not configured' };
    }

    const prompt = `Summarize the following content in under 100 words, focusing on key insights:\n\n${content}`;
    const summary = await callGemini(prompt);

    return { summary };
  } catch (error) {
    console.error('Error generating summary:', error);
    return { summary: '', error: 'Failed to generate summary' };
  }
}

/**
 * Generate relevant tags using FREE Gemini
 */
export async function generateTags(title: string, content: string): Promise<TagsResult> {
  try {
    if (!content || content.trim().length === 0) {
      return { tags: [], error: 'Content is empty' };
    }

    if (!GEMINI_API_KEY) {
      return { tags: [], error: 'Gemini API key not configured' };
    }

    const prompt = `Generate 3-5 relevant tags for this content. Return only the tags separated by commas, nothing else.\n\nTitle: ${title}\nContent: ${content.substring(0, 500)}`;
    const tagsString = await callGemini(prompt);

    const tags = tagsString
      .split(',')
      .map((tag) => tag.trim().toLowerCase().replace(/[^a-z0-9-]/g, ''))
      .filter((tag) => tag.length > 0)
      .slice(0, 5);

    return { tags };
  } catch (error) {
    console.error('Error generating tags:', error);
    return { tags: [], error: 'Failed to generate tags' };
  }
}

/**
 * Query knowledge base using FREE Gemini
 */
export async function queryKnowledgeBase(
  query: string,
  items: Array<{ id: string; title: string; content: string; summary?: string | null }>
): Promise<QueryResult> {
  try {
    if (!query || query.trim().length === 0) {
      return { answer: '', relevantItems: [], error: 'Query is empty' };
    }

    if (!GEMINI_API_KEY) {
      return { answer: '', relevantItems: [], error: 'Gemini API key not configured' };
    }

    if (items.length === 0) {
      return {
        answer: 'No knowledge items found in your brain yet. Add some notes to get started!',
        relevantItems: [],
      };
    }

    // Create context from knowledge items
    const context = items
      .slice(0, 10) // Limit to 10 items to stay within token limits
      .map((item, idx) => `[${idx + 1}] ${item.title}\n${item.summary || item.content.substring(0, 300)}`)
      .join('\n\n');

    const prompt = `You are a helpful AI assistant answering questions based on a user's personal knowledge base. Use the provided context to answer questions accurately. If the answer is not in the context, say so. Always cite which items you're referencing by their number [1], [2], etc.\n\nContext:\n${context}\n\nQuestion: ${query}\n\nAnswer:`;

    const answer = await callGemini(prompt);

    // Extract relevant items (simple approach - take first 3)
    const relevantItems = items.slice(0, 3).map((item) => ({
      id: item.id,
      title: item.title,
      excerpt: item.summary || item.content.substring(0, 150) + '...',
    }));

    return { answer, relevantItems };
  } catch (error: any) {
    console.error('Error querying knowledge base:', error);
    return { answer: '', relevantItems: [], error: `Query failed: ${error.message || 'Unknown error'}` };
  }
}
