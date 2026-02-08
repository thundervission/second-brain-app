/**
 * Database utilities using Vercel Postgres (100% FREE)
 * No Prisma needed - direct SQL for simplicity
 */

import { sql } from '@vercel/postgres';

export interface KnowledgeItem {
  id: string;
  title: string;
  content: string;
  type: 'NOTE' | 'LINK' | 'INSIGHT';
  source_url?: string;
  tags: string[];
  summary?: string;
  created_at: Date;
  updated_at: Date;
}

/**
 * Initialize database tables
 * Run this once to set up your database
 */
export async function initDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS knowledge_items (
        id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
        title TEXT NOT NULL,
        content TEXT NOT NULL,
        type TEXT NOT NULL CHECK (type IN ('NOTE', 'LINK', 'INSIGHT')),
        source_url TEXT,
        tags TEXT[] DEFAULT '{}',
        summary TEXT,
        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
      );
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_knowledge_items_type ON knowledge_items(type);
    `;

    await sql`
      CREATE INDEX IF NOT EXISTS idx_knowledge_items_created_at ON knowledge_items(created_at DESC);
    `;

    return { success: true };
  } catch (error) {
    console.error('Database initialization error:', error);
    return { success: false, error };
  }
}

/**
 * Get all knowledge items with optional filters
 */
export async function getAllItems(filters?: {
  type?: string;
  tag?: string;
  search?: string;
}) {
  try {
    let queryText = `SELECT * FROM knowledge_items WHERE 1=1`;
    const params: any[] = [];
    let paramIndex = 1;

    if (filters?.type && filters.type !== 'all') {
      queryText += ` AND type = $${paramIndex++}`;
      params.push(filters.type.toUpperCase());
    }

    if (filters?.tag) {
      queryText += ` AND $${paramIndex++} = ANY(tags)`;
      params.push(filters.tag);
    }

    if (filters?.search) {
      const searchTerm = `%${filters.search}%`;
      queryText += ` AND (title ILIKE $${paramIndex++} OR content ILIKE $${paramIndex++})`;
      params.push(searchTerm);
      params.push(searchTerm);
    }

    queryText += ` ORDER BY created_at DESC`;

    const result = await sql.query(queryText, params);
    return result.rows as KnowledgeItem[];
  } catch (error) {
    console.error('Error fetching items:', error);
    throw error;
  }
}

/**
 * Get single item by ID
 */
export async function getItemById(id: string) {
  try {
    const result = await sql`
      SELECT * FROM knowledge_items WHERE id = ${id}
    `;
    return result.rows[0] as KnowledgeItem | undefined;
  } catch (error) {
    console.error('Error fetching item:', error);
    throw error;
  }
}

/**
 * Create new knowledge item
 */
export async function createItem(data: {
  title: string;
  content: string;
  type: 'NOTE' | 'LINK' | 'INSIGHT';
  sourceUrl?: string;
  tags?: string[];
  summary?: string;
}) {
  try {
    const result = await sql`
      INSERT INTO knowledge_items (title, content, type, source_url, tags, summary)
      VALUES (
        ${data.title},
        ${data.content},
        ${data.type},
        ${data.sourceUrl || null},
        ${(data.tags || [])},
        ${data.summary || null}
      )
      RETURNING *
    `;
    return result.rows[0] as KnowledgeItem;
  } catch (error) {
    console.error('Error creating item:', error);
    throw error;
  }
}

/**
 * Update existing item
 */
export async function updateItem(
  id: string,
  data: Partial<{
    title: string;
    content: string;
    type: 'NOTE' | 'LINK' | 'INSIGHT';
    sourceUrl: string;
    tags: string[];
    summary: string;
  }>
) {
  try {
    const updates: string[] = [];
    const values: any[] = [];
    let paramIndex = 1;

    if (data.title !== undefined) {
      updates.push(`title = $${paramIndex++}`);
      values.push(data.title);
    }
    if (data.content !== undefined) {
      updates.push(`content = $${paramIndex++}`);
      values.push(data.content);
    }
    if (data.type !== undefined) {
      updates.push(`type = $${paramIndex++}`);
      values.push(data.type);
    }
    if (data.sourceUrl !== undefined) {
      updates.push(`source_url = $${paramIndex++}`);
      values.push(data.sourceUrl);
    }
    if (data.tags !== undefined) {
      updates.push(`tags = $${paramIndex++}`);
      values.push(data.tags);
    }
    if (data.summary !== undefined) {
      updates.push(`summary = $${paramIndex++}`);
      values.push(data.summary);
    }

    updates.push(`updated_at = NOW()`);
    values.push(id);

    const result = await sql.query(
      `UPDATE knowledge_items SET ${updates.join(', ')} WHERE id = $${paramIndex} RETURNING *`,
      values
    );

    return result.rows[0] as KnowledgeItem;
  } catch (error) {
    console.error('Error updating item:', error);
    throw error;
  }
}

/**
 * Delete item
 */
export async function deleteItem(id: string) {
  try {
    await sql`DELETE FROM knowledge_items WHERE id = ${id}`;
    return { success: true };
  } catch (error) {
    console.error('Error deleting item:', error);
    throw error;
  }
}

/**
 * Get all unique tags
 */
export async function getAllTags() {
  try {
    const result = await sql`
      SELECT DISTINCT unnest(tags) as tag FROM knowledge_items
      WHERE tags IS NOT NULL AND array_length(tags, 1) > 0
      ORDER BY tag
    `;
    return result.rows.map((row: any) => row.tag) as string[];
  } catch (error) {
    console.error('Error fetching tags:', error);
    return [];
  }
}
