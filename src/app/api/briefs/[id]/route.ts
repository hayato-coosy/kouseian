import { NextResponse } from 'next/server';
import { BriefResult } from '@/types/brief';
import { supabase } from '@/lib/supabase';

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;

        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
        }

        // Get from Supabase
        const { data: brief, error } = await supabase
            .from('briefs')
            .select('data')
            .eq('id', id)
            .single();

        if (error || !brief) {
            return NextResponse.json({ error: 'Not found' }, { status: 404 });
        }

        return NextResponse.json(brief.data);
    } catch (error) {
        console.error('Failed to get brief:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
