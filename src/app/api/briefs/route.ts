import { NextResponse } from 'next/server';
import { BriefResult } from '@/types/brief';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
    try {
        // Debug: Check if Env vars are loaded
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
            console.error('Missing Supabase Environment Variables');
            return NextResponse.json({
                error: 'Configuration Error',
                details: 'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
            }, { status: 500 });
        }

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
            .from('design-brief')
            .insert({
                id,
                data,
            });

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({
                error: 'Failed to save to Supabase',
                message: error.message,
                details: error
            }, { status: 500 });
        }

        return NextResponse.json({ id });
    } catch (error: any) {
        console.error('Failed to save brief:', error);
        return NextResponse.json({
            error: 'Internal Server Error',
            message: error.message || 'Unknown error',
            details: error
        }, { status: 500 });
    }
}
