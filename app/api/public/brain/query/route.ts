import { NextRequest, NextResponse } from 'next/server';
import { getAllItems } from '@/lib/db';
import { queryKnowledgeBase } from '@/lib/ai';

/**
 * Public API endpoint for querying the knowledge base
 * GET /api/public/brain/query?q=your+question
 * 100% FREE using Gemini and Vercel Postgres!
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');

    if (!query || query.trim().length === 0) {
      return NextResponse.json(
        {
          error: 'Query parameter "q" is required',
          example: '/api/public/brain/query?q=what+are+my+notes+about+AI',
        },
        { status: 400 }
      );
    }

    // Fetch items from FREE Vercel Postgres
    const items = await getAllItems();
    const limitedItems = items.slice(0, 20);

    if (limitedItems.length === 0) {
      return NextResponse.json({
        answer: 'The knowledge base is empty. No items found.',
        sources: [],
        itemCount: 0,
      });
    }

    // Query using FREE Gemini AI
    const result = await queryKnowledgeBase(query, limitedItems);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    // Format response for public API
    return NextResponse.json({
      query,
      answer: result.answer,
      sources: result.relevantItems.map((item) => ({
        id: item.id,
        title: item.title,
        excerpt: item.excerpt,
        url: `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/items/${item.id}`,
      })),
      itemCount: items.length,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in public query API:', error);
    return NextResponse.json(
      { error: 'Internal server error while processing query' },
      { status: 500 }
    );
  }
}
