import { NextResponse } from 'next/server';
import * as fs from 'fs';
import * as path from 'path';

export async function GET() {
  try {
    // Path to merged.csv
    const csvPath = path.join(process.cwd(), '..', 'dash-api', 'backend', 'merged.csv');
    const csvData = fs.readFileSync(csvPath, 'utf-8');
    
    return new NextResponse(csvData, {
      headers: {
        'Content-Type': 'text/csv',
      },
    });
  } catch (error) {
    console.error('Error reading CSV:', error);
    return new NextResponse('Error reading CSV file', { status: 500 });
  }
}
