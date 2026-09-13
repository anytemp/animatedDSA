import { motion } from 'framer-motion';
import { useEffect, useRef } from 'react';

interface CodePanelProps {
  code: string;
  activeLine: number;
  language?: string;
  title?: string;
}

export default function CodePanel({
  code,
  activeLine,
  language = 'pseudocode',
  title = 'Code',
}: CodePanelProps) {
  const codeRef = useRef<HTMLDivElement>(null);
  const activeLineRef = useRef<HTMLDivElement>(null);
  const codeLines = code.split('\n');

  useEffect(() => {
    if (activeLineRef.current && codeRef.current) {
      const container = codeRef.current;
      const element = activeLineRef.current;
      const containerRect = container.getBoundingClientRect();
      const elementRect = element.getBoundingClientRect();

      if (
        elementRect.top < containerRect.top ||
        elementRect.bottom > containerRect.bottom
      ) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }, [activeLine]);

  return (
    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8">
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm font-semibold text-white/60 uppercase tracking-wider">
          {title}
        </div>
        <div className="text-xs font-mono text-white/40">{language}</div>
      </div>
      <div
        ref={codeRef}
        className="bg-[#0D0B18] rounded-2xl p-6 overflow-y-auto max-h-[500px]"
      >
        <pre className="text-sm leading-relaxed">
          {codeLines.map((line, i) => (
            <motion.div
              key={i}
              ref={i === activeLine ? activeLineRef : null}
              animate={{
                backgroundColor:
                  i === activeLine ? 'rgba(168, 85, 247, 0.15)' : 'transparent',
              }}
              transition={{ duration: 0.3 }}
              className={`px-3 py-1 rounded font-mono ${
                i === activeLine
                  ? 'border-l-4 border-purple-400 bg-purple-500/10'
                  : 'border-l-4 border-transparent'
              }`}
            >
              <span className="text-white/30 mr-4 select-none">
                {String(i + 1).padStart(2, '0')}
              </span>
              <code className="text-white/90">{line}</code>
            </motion.div>
          ))}
        </pre>
      </div>
    </div>
  );
}
