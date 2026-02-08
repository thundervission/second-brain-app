import { NextRequest, NextResponse } from 'next/server';
import { getAllItems } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const tag = searchParams.get('tag');
    const search = searchParams.get('search');

    const items = await getAllItems({
      type: type || undefined,
      tag: tag || undefined,
      search: search || undefined,
    });

    return NextResponse.json({ items, count: items.length });
  } catch (error) {
    console.error('Error fetching items:', error);
    return NextResponse.json({ error: 'Failed to fetch items' }, { status: 500 });
  }
}
