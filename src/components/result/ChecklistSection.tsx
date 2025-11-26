'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ChecklistItem } from './ChecklistItem';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { BriefResult } from '@/types/brief';
import { CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';

interface ChecklistSectionProps {
    actions: BriefResult['actions'];
}

export function ChecklistSection({ actions }: ChecklistSectionProps) {
    // State to track checked items. Key is `${categoryIndex}-${itemIndex}`
    const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
    const [isLoaded, setIsLoaded] = useState(false);

    // Load from local storage on mount
    useEffect(() => {
        const saved = localStorage.getItem('brief_checklist_state');
        if (saved) {
            try {
                setCheckedItems(new Set(JSON.parse(saved)));
            } catch (e) {
                console.error('Failed to load checklist state', e);
            }
        }
        setIsLoaded(true);
    }, []);

    // Save to local storage whenever state changes
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem('brief_checklist_state', JSON.stringify(Array.from(checkedItems)));
        }
    }, [checkedItems, isLoaded]);

    const toggleItem = (id: string) => {
        const newSet = new Set(checkedItems);
        if (newSet.has(id)) {
            newSet.delete(id);
        } else {
            newSet.add(id);
        }
        setCheckedItems(newSet);
    };

    const getIcon = (color: string) => {
        switch (color) {
            case 'blue': return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
            case 'orange': return <HelpCircle className="w-5 h-5 text-orange-500" />;
            case 'red': return <AlertTriangle className="w-5 h-5 text-red-500" />;
            default: return <CheckCircle2 className="w-5 h-5 text-gray-500" />;
        }
    };

    const getBorderColor = (color: string) => {
        switch (color) {
            case 'blue': return 'border-l-blue-500';
            case 'orange': return 'border-l-orange-500';
            case 'red': return 'border-l-red-500';
            default: return 'border-l-gray-500';
        }
    };

    if (!isLoaded) return null; // Prevent hydration mismatch

    return (
        <div className="space-y-6" id="next-actions">
            <SectionHeader title="Next Actions" />

            <div className="grid gap-4">
                {actions.map((action, categoryIndex) => (
                    <Card
                        key={categoryIndex}
                        className={`p-5 border-l-4 ${getBorderColor(action.color)} bg-white dark:bg-gray-900 shadow-sm`}
                    >
                        <div className="flex items-start gap-4 mb-4">
                            <div className="mt-1">{getIcon(action.color)}</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3">
                                    <h3 className="font-bold text-[var(--foreground)]">{action.category}</h3>
                                    <Badge variant={action.color === 'red' ? 'destructive' : 'secondary'} className="text-xs">
                                        {action.label}
                                    </Badge>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1 pl-9">
                            {action.items.map((item, itemIndex) => {
                                const id = `${categoryIndex}-${itemIndex}`;
                                return (
                                    <ChecklistItem
                                        key={id}
                                        label={item}
                                        checked={checkedItems.has(id)}
                                        onToggle={() => toggleItem(id)}
                                    />
                                );
                            })}
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
