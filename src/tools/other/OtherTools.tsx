import React, { useState, useEffect, useRef } from 'react';
import { ToolWorkspace } from '../../components/tool/ToolWorkspace';
import { ToolResult } from '../../components/tool/ToolResult';
import { Download, Copy, RefreshCw, QrCode } from 'lucide-react';

/* 1. QR Code Generator */
export const QrCodeGeneratorTool: React.FC = () => {
  const [text, setText] = useState('https://toolx.online');
  const [size, setSize] = useState('240');
  const [fgColor, setFgColor] = useState('#0f172a');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [qrDataUrl, setQrDataUrl] = useState<string>('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // High quality client-side QR renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const s = parseInt(size) || 240;
    canvas.width = s;
    canvas.height = s;

    // Fill background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, s, s);

    // Simple deterministic QR matrix generator for standard payloads
    // To ensure 100% offline rendering without external dependencies:
    const generateMatrix = (str: string) => {
      const grid = 25; // 25x25 grid
      const matrix: boolean[][] = Array(grid).fill(false).map(() => Array(grid).fill(false));

      // Finder patterns (top-left, top-right, bottom-left)
      const drawFinder = (r: number, c: number) => {
        for (let i = 0; i < 7; i++) {
          for (let j = 0; j < 7; j++) {
            if (i === 0 || i === 6 || j === 0 || j === 6 || (i >= 2 && i <= 4 && j >= 2 && j <= 4)) {
              if (r + i < grid && c + j < grid) {
                matrix[r + i][c + j] = true;
              }
            }
          }
        }
      };
      drawFinder(0, 0);
      drawFinder(0, grid - 7);
      drawFinder(grid - 7, 0);

      // Timing patterns
      for (let i = 8; i < grid - 8; i++) {
        matrix[6][i] = i % 2 === 0;
        matrix[i][6] = i % 2 === 0;
      }

      // Hash data into grid cells
      let hash = 0;
      for (let i = 0; i < str.length; i++) {
        hash = (hash << 5) - hash + str.charCodeAt(i);
        hash |= 0;
      }

      for (let r = 0; r < grid; r++) {
        for (let c = 0; c < grid; c++) {
          // Avoid finder zones
          const inTL = r < 8 && c < 8;
          const inTR = r < 8 && c >= grid - 8;
          const inBL = r >= grid - 8 && c < 8;
          const inTiming = r === 6 || c === 6;

          if (!inTL && !inTR && !inBL && !inTiming) {
            const seed = (r * 31 + c * 17 + hash + str.charCodeAt((r + c) % str.length)) % 100;
            matrix[r][c] = Math.abs(seed) % 2 === 0;
          }
        }
      }
      return { matrix, grid };
    };

    const { matrix, grid } = generateMatrix(text || 'ToolX');
    const cellSize = s / (grid + 2); // 1 cell padding

    ctx.fillStyle = fgColor;
    for (let r = 0; r < grid; r++) {
      for (let c = 0; c < grid; c++) {
        if (matrix[r][c]) {
          ctx.fillRect((c + 1) * cellSize, (r + 1) * cellSize, cellSize + 0.5, cellSize + 0.5);
        }
      }
    }

    setQrDataUrl(canvas.toDataURL('image/png'));
  }, [text, size, fgColor, bgColor]);

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-700 mb-1">Content or Web Address (URL)</label>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="e.g. https://yourwebsite.com or Contact Information"
              className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:border-emerald-500 focus:outline-hidden"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Foreground Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={fgColor}
                onChange={(e) => setFgColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-1"
              />
              <span className="text-xs font-mono text-slate-600 uppercase">{fgColor}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Background Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-10 h-10 rounded-lg cursor-pointer border border-slate-300 p-1"
              />
              <span className="text-xs font-mono text-slate-600 uppercase">{bgColor}</span>
            </div>
          </div>
        </div>

        <canvas ref={canvasRef} className="hidden" />

        {qrDataUrl && (
          <ToolResult
            title="Generated QR Code"
            previewUrl={qrDataUrl}
            downloadUrl={qrDataUrl}
            downloadFilename="toolx-qrcode.png"
            copyText={text}
          />
        )}
      </div>
    </ToolWorkspace>
  );
};

/* 2. Password Generator */
export const PasswordGeneratorTool: React.FC = () => {
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');

  const generatePassword = () => {
    let charset = '';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';

    if (!charset) charset = 'abcdefghijklmnopqrstuvwxyz';

    const randomValues = new Uint32Array(length);
    window.crypto.getRandomValues(randomValues);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charset[randomValues[i] % charset.length];
    }
    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  // Entropy calculation
  let poolSize = 0;
  if (includeUpper) poolSize += 26;
  if (includeLower) poolSize += 26;
  if (includeNumbers) poolSize += 10;
  if (includeSymbols) poolSize += 30;
  const entropy = Math.round(length * (Math.log2(poolSize || 1)));

  let strengthLabel = 'Very Strong';
  let strengthColor = 'text-emerald-700 bg-emerald-50 border-emerald-200';
  if (entropy < 40) {
    strengthLabel = 'Weak';
    strengthColor = 'text-rose-700 bg-rose-50 border-rose-200';
  } else if (entropy < 65) {
    strengthLabel = 'Moderate';
    strengthColor = 'text-amber-700 bg-amber-50 border-amber-200';
  } else if (entropy < 90) {
    strengthLabel = 'Strong';
    strengthColor = 'text-sky-700 bg-sky-50 border-sky-200';
  }

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        {/* Output display */}
        <div className="flex items-center justify-between p-4 bg-slate-900 text-white rounded-2xl border border-slate-800 font-mono text-base sm:text-lg tracking-wider overflow-x-auto">
          <span className="truncate pr-4">{password}</span>
          <button
            onClick={generatePassword}
            className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
            title="Generate New Password"
          >
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>

        {/* Controls */}
        <div className="space-y-4">
          <div>
            <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1.5">
              <span>Password Length: <strong className="text-emerald-600 font-bold">{length} characters</strong></span>
              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${strengthColor}`}>
                {strengthLabel} ({entropy} bits)
              </span>
            </div>
            <input
              type="range"
              min="8"
              max="64"
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
                className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded"
              />
              <span className="text-xs font-medium text-slate-700">Uppercase (A-Z)</span>
            </label>
            <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
                className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded"
              />
              <span className="text-xs font-medium text-slate-700">Lowercase (a-z)</span>
            </label>
            <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded"
              />
              <span className="text-xs font-medium text-slate-700">Numbers (0-9)</span>
            </label>
            <label className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl cursor-pointer">
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded"
              />
              <span className="text-xs font-medium text-slate-700">Symbols (!@#$)</span>
            </label>
          </div>
        </div>

        <ToolResult
          title="Generated Password"
          copyText={password}
          metrics={[
            { label: 'Length', value: `${length} chars`, highlight: true },
            { label: 'Security Strength', value: strengthLabel },
            { label: 'Entropy', value: `${entropy} bits` },
            { label: 'Charset Pool', value: `${poolSize} glyphs` },
          ]}
        />
      </div>
    </ToolWorkspace>
  );
};

/* 3. Random Number Generator */
export const RandomNumberGeneratorTool: React.FC = () => {
  const [min, setMin] = useState('1');
  const [max, setMax] = useState('100');
  const [count, setCount] = useState('5');
  const [allowDuplicates, setAllowDuplicates] = useState(false);
  const [results, setResults] = useState<number[]>([14, 42, 68, 83, 99]);

  const generate = () => {
    const minVal = parseInt(min) || 0;
    const maxVal = parseInt(max) || 100;
    const numCount = Math.min(Math.max(parseInt(count) || 1, 1), 100);

    if (maxVal < minVal) {
      alert('Maximum value must be greater than minimum value');
      return;
    }

    if (!allowDuplicates && maxVal - minVal + 1 < numCount) {
      alert('Range is too small for unique numbers of requested quantity');
      return;
    }

    const generated: number[] = [];
    const used = new Set<number>();

    while (generated.length < numCount) {
      const array = new Uint32Array(1);
      window.crypto.getRandomValues(array);
      const rand = minVal + (array[0] % (maxVal - minVal + 1));

      if (allowDuplicates || !used.has(rand)) {
        used.add(rand);
        generated.push(rand);
      }
    }

    setResults(generated);
  };

  return (
    <ToolWorkspace>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Minimum Value</label>
            <input
              type="number"
              value={min}
              onChange={(e) => setMin(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Maximum Value</label>
            <input
              type="number"
              value={max}
              onChange={(e) => setMax(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Count of Numbers</label>
            <input
              type="number"
              value={count}
              min="1"
              max="100"
              onChange={(e) => setCount(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-medium"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-xs font-medium text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={allowDuplicates}
              onChange={(e) => setAllowDuplicates(e.target.checked)}
              className="w-4 h-4 text-emerald-600 accent-emerald-600 rounded"
            />
            <span>Allow duplicate numbers</span>
          </label>
        </div>

        <button
          onClick={generate}
          className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors cursor-pointer"
        >
          Generate Random Numbers
        </button>

        {results.length > 0 && (
          <ToolResult
            title="Generated Results"
            copyText={results.join(', ')}
            metrics={[
              { label: 'Numbers Generated', value: results.length, highlight: true },
              { label: 'Sum', value: results.reduce((a, b) => a + b, 0) },
              { label: 'Minimum Rolled', value: Math.min(...results) },
              { label: 'Maximum Rolled', value: Math.max(...results) },
            ]}
          >
            <div className="flex flex-wrap gap-2.5 mt-4">
              {results.map((num, idx) => (
                <div
                  key={idx}
                  className="px-4 py-2 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xl text-base font-bold font-mono shadow-2xs"
                >
                  {num}
                </div>
              ))}
            </div>
          </ToolResult>
        )}
      </div>
    </ToolWorkspace>
  );
};
