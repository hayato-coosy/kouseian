import { NextResponse } from 'next/server';
import { BriefResult } from '@/types/brief';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const data: BriefResult = body;

        // Simple validation
        if (!data.summary || !data.details || !data.actions) {
            return NextResponse.json({ error: 'Invalid data' }, { status: 400 });
        }

        // Generate a random ID (6 chars)
        const id = Math.random().toString(36).substring(2, 8);

        // Save to Supabase
        const { error } = await supabase
            .from('briefs')
            .insert({
                id,
                data,
            });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ error: 'Failed to save' }, { status: 500 });
        }

        return NextResponse.json({ id });
    } catch (error) {
        console.error('Failed to save brief:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
