'use client';

import { Card } from '@/components/ui/Card';
import { BriefResult } from '@/types/brief';
import { CheckCircle2, AlertTriangle, HelpCircle } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface ActionListProps {
    actions: BriefResult['actions'];
}

export function ActionList({ actions }: ActionListProps) {
    const getIcon = (color: string) => {
        switch (color) {
            case 'blue': return <CheckCircle2 className="w-5 h-5 text-blue-500" />;
            case 'orange': return <HelpCircle className="w-5 h-5 text-orange-500" />;
            case 'red': return <AlertTriangle className="w-5 h-5 text-red-500" />;
            default: return <CheckCircle2 className="w-5 h-5 text-gray-500" />;
        }
    };

    const getBgColor = (color: string) => {
        switch (color) {
            case 'blue': return 'bg-blue-50 dark:bg-blue-900/20 border-blue-100 dark:border-blue-900/50';
            case 'orange': return 'bg-orange-50 dark:bg-orange-900/20 border-orange-100 dark:border-orange-900/50';
            case 'red': return 'bg-red-50 dark:bg-red-900/20 border-red-100 dark:border-red-900/50';
            default: return 'bg-gray-50 dark:bg-gray-900/50 border-gray-100 dark:border-gray-800';
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-[var(--foreground)] flex items-center gap-2">
                <span className="w-1 h-8 bg-[var(--primary-blue)] rounded-full"></span>
                Next Actions
            </h2>

            <div className="grid gap-4">
                {actions.map((action, index) => (
                    <Card key={index} className={`p-5 border ${getBgColor(action.color)}`}>
                        <div className="flex items-start gap-4">
                            <div className="mt-1">{getIcon(action.color)}</div>
                            <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                    <h3 className="font-bold text-[var(--foreground)]">{action.category}</h3>
                                    <Badge variant={action.color === 'red' ? 'destructive' : 'secondary'} className="text-xs">
                                        {action.label}
                                    </Badge>
                                </div>
                                <ul className="space-y-2">
                                    {action.items.map((item, i) => (
                                        <li key={i} className="text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2">
                                            <span className="block w-1.5 h-1.5 mt-1.5 rounded-full bg-gray-400 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </div>
    );
}
