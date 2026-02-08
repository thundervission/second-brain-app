import { NextResponse } from 'next/server';
import { initDatabase } from '@/lib/db';

/**
 * Initialize database tables
 * Call this once after deploying to Vercel
 * GET /api/init-db
 */
export async function GET() {
  try {
    const result = await initDatabase();

    if (result.success) {
      return NextResponse.json({
        success: true,
        message: 'Database initialized successfully! Your Second Brain is ready to use.',
      });
    } else {
      return NextResponse.json(
        {
          success: false,
          message: 'Database initialization failed',
          error: result.error,
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error initializing database:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Database initialization failed',
        error: String(error),
      },
      { status: 500 }
    );
  }
}
