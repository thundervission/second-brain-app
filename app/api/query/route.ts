import { NextRequest, NextResponse } from 'next/server';
import { getAllItems } from '@/lib/db';
import { queryKnowledgeBase } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { query } = body;

    if (!query || query.trim().length === 0) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Fetch items from FREE database
    const items = await getAllItems();
    const limitedItems = items.slice(0, 20); // Limit to 20 most recent

    // Query using FREE Gemini AI
    const result = await queryKnowledgeBase(query, limitedItems);

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({
      answer: result.answer,
      relevantItems: result.relevantItems,
      totalItemsSearched: limitedItems.length,
    });
  } catch (error) {
    console.error('Error processing query:', error);
    return NextResponse.json({ error: 'Failed to process query' }, { status: 500 });
  }
}
