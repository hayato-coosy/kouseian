"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/Button"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = React.useState(false)

    React.useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <div className="w-9 h-9" /> // Placeholder to prevent layout shift
    }

    return (
        <div className="flex items-center gap-1 border border-gray-200 dark:border-gray-800 rounded-full p-1 bg-white dark:bg-gray-950">
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme("light")}
                className={`h-7 w-7 px-0 rounded-full ${theme === 'light' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : 'text-gray-400 hover:text-gray-900 dark:hover:text-gray-50'}`}
                title="Light Mode"
            >
                <Sun className="h-4 w-4" />
                <span className="sr-only">Light Mode</span>
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme("system")}
                className={`h-7 w-7 px-0 rounded-full ${theme === 'system' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : 'text-gray-400 hover:text-gray-900 dark:hover:text-gray-50'}`}
                title="System Mode"
            >
                <Monitor className="h-4 w-4" />
                <span className="sr-only">System Mode</span>
            </Button>
            <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme("dark")}
                className={`h-7 w-7 px-0 rounded-full ${theme === 'dark' ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50' : 'text-gray-400 hover:text-gray-900 dark:hover:text-gray-50'}`}
                title="Dark Mode"
            >
                <Moon className="h-4 w-4" />
                <span className="sr-only">Dark Mode</span>
            </Button>
        </div>
    )
}
