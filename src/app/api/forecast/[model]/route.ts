import { NextResponse } from 'next/server';

export async function GET(request: Request, { params }: { params: { model: string } }) {
  const { searchParams } = new URL(request.url);
  const features = searchParams.get('features');
  const model = params.model;

  try {    const backendRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/forecast/${model}?features=${features}`
    );
    const data = await backendRes.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch forecast data' }, { status: 500 });
  }
}