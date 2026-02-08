import { NextRequest, NextResponse } from 'next/server';
import { createItem } from '@/lib/db';
import { generateSummary, generateTags } from '@/lib/ai';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, content, type, sourceUrl, tags, autoSummarize, autoTag } = body;

    // Validation
    if (!title || !content || !type) {
      return NextResponse.json(
        { error: 'Title, content, and type are required' },
        { status: 400 }
      );
    }

    // Validate type
    const validTypes = ['NOTE', 'LINK', 'INSIGHT'];
    if (!validTypes.includes(type.toUpperCase())) {
      return NextResponse.json(
        { error: 'Invalid type. Must be NOTE, LINK, or INSIGHT' },
        { status: 400 }
      );
    }

    let summary = null;
    let finalTags = tags || [];

    // Generate AI summary if requested (FREE Gemini!)
    if (autoSummarize) {
      const summaryResult = await generateSummary(content);
      if (!summaryResult.error) {
        summary = summaryResult.summary;
      }
    }

    // Generate AI tags if requested (FREE Gemini!)
    if (autoTag && (!tags || tags.length === 0)) {
      const tagsResult = await generateTags(title, content);
      if (!tagsResult.error && tagsResult.tags.length > 0) {
        finalTags = tagsResult.tags;
      }
    }

    // Create knowledge item in FREE database
    const item = await createItem({
      title,
      content,
      type: type.toUpperCase(),
      sourceUrl: sourceUrl || undefined,
      tags: finalTags,
      summary: summary || undefined,
    });

    return NextResponse.json({ item, success: true }, { status: 201 });
  } catch (error) {
    console.error('Error creating item:', error);
    return NextResponse.json({ error: 'Failed to create item' }, { status: 500 });
  }
}
