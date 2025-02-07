"use client"
import { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { materialDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Copy, Check } from 'lucide-react';
import { nightOwl } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface CodeBlockProps {
    language: string;
    code: string;
}

export default function CodeBlock({ language, code }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(code);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="relative w-full overflow-x-hidden">
            <div className="relative">
                <SyntaxHighlighter
                    language={language}
                    style={oneDark}
                    customStyle={{
                        fontSize: '0.75rem', // Smaller font for mobile
                        borderRadius: '0.5rem',
                        padding: '1rem',
                        width: '100%',
                        overflowX: 'auto'
                    }}
                >
                    {code}
                </SyntaxHighlighter>
                <button 
                    onClick={handleCopy}
                    className="absolute top-2 right-2 p-2 bg-gray-700 text-white rounded-md hover:bg-gray-600 transition-colors"
                >
                    {copied ? <Check size={16} /> : <Copy size={16} />}
                </button>
            </div>
        </div>
    );
}