import React, { useRef, useState } from 'react';
import cnnDiagram from '../assets/cnn-diagram.png';
import lungCt from '../assets/lung-ct.jpg';
import lungXray from '../assets/lung-xray.jpg';
import { motion } from 'framer-motion';
import {
  Brain,
  Stethoscope,
  Upload,
  FileDown,
  BarChart3,
  Activity,
  Image as ImageIcon,
  Search,
  History,
  ShieldCheck,
  AlertTriangle,
  Github,
  Linkedin,
  Mail,
  User
} from 'lucide-react';

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'Upload', href: '#upload' },
  { label: 'Results', href: '#results' },
  { label: 'Analytics', href: '#analytics' },
  { label: 'About', href: '#about' },
];

function StatBadge({ colorClass = 'bg-green-100 text-green-700', label, value }) {
  return (
    <div className={`rounded-full px-3 py-1 text-xs font-semibold ${colorClass}`}>{label}: {value}</div>
  );
}

function SectionCard({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.4 }}
      className={`card-surface p-5 sm:p-6 ${className}`}
    >
      {children}
    </motion.div>
  );
}

function PlaceholderChart({ type = 'line' }) {
  return (
    <div className="flex items-center justify-center w-full h-40 sm:h-48">
      <div className="grid items-end w-full h-full grid-cols-12 gap-2 p-3 border rounded-lg bg-gradient-to-br from-healthcare-100 to-white border-slate-200">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className={`rounded-t-md ${type === 'bar' ? 'bg-healthcare-400' : 'bg-healthcare-300'} ${type === 'bar' ? '' : 'opacity-80'}`}
            style={{ height: `${20 + ((i * 13) % 60)}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [dragOver, setDragOver] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [confidence, setConfidence] = useState(null);
  const [filter, setFilter] = useState('');
  const [profileImage, setProfileImage] = useState(null);
  const [aboutDesc, setAboutDesc] = useState('I am Aditya Verma, a passionate developer focused on building clean, efficient, and scalable solutions. I enjoy collaborating to solve real-world problems with AI and modern web technologies.');

  const patientRows = [
    { id: 'PT-1001', date: '2025-02-01', result: 'No Cancer', confidence: 0.94 },
    { id: 'PT-1002', date: '2025-02-02', result: 'Cancer Detected', confidence: 0.91 },
    { id: 'PT-1003', date: '2025-02-03', result: 'No Cancer', confidence: 0.88 },
    { id: 'PT-1004', date: '2025-02-05', result: 'Cancer Detected', confidence: 0.82 },
  ];

  const filteredRows = patientRows.filter(r =>
    r.id.toLowerCase().includes(filter.toLowerCase()) ||
    r.result.toLowerCase().includes(filter.toLowerCase())
  );

  function onBrowseClick() {
    fileInputRef.current?.click();
  }

  function onFileSelected(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => setSelectedImage(e.target.result);
    reader.readAsDataURL(file);
  }

  function onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    onFileSelected(file);
  }

  function onDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    setDragOver(true);
  }

  function onDragLeave() {
    setDragOver(false);
  }

  async function processWithModel() {
    if (!selectedImage) return;
    setProcessing(true);
    // Simulate API call to CNN model
    setTimeout(() => {
      const detected = Math.random() > 0.5;
      const score = (0.8 + Math.random() * 0.18);
      setResult(detected ? 'Cancer Detected' : 'No Cancer Detected');
      setConfidence(score);
      setProcessing(false);
    }, 1200);
  }

  function downloadReport() {
    const blob = new Blob([
      `Lung Cancer AI Report\n\nPrediction: ${result ?? 'N/A'}\nConfidence: ${confidence ? (confidence*100).toFixed(1)+'%' : 'N/A'}\nDate: ${new Date().toLocaleString()}`
    ], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'lung-cancer-ai-report.txt';
    a.click();
    URL.revokeObjectURL(url);
  }

  function onProfileFileSelected(file) {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => setProfileImage(e.target.result);
    reader.readAsDataURL(file);
  }

  return (
    <div className="min-h-screen" id="home">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-30 backdrop-blur supports-[backdrop-filter]:bg-white/70 bg-white/80 border-b border-slate-200">
        <div className="flex items-center justify-between h-16 container-padded">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center border rounded-lg w-9 h-9 bg-healthcare-200 border-healthcare-300">
              <Stethoscope className="text-healthcare-700" size={20} />
            </div>
            <div>
              <p className="text-sm leading-none text-slate-500">AI-Powered</p>
              <h1 className="text-base font-semibold sm:text-lg text-slate-800">Lung Cancer Detection using CNN</h1>
            </div>
          </div>
          <nav className="items-center hidden gap-6 text-sm md:flex">
            {navItems.map(n => (
              <a key={n.href} href={n.href} className="transition-colors text-slate-600 hover:text-healthcare-700">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const c = document.documentElement.classList;
                const next = c.contains('dark') ? 'light' : 'dark';
                c.toggle('dark');
                try { localStorage.setItem('theme', next); } catch (_) {}
              }}
              className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium border rounded-lg border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200"
            >
              Toggle {document?.documentElement?.classList?.contains('dark') ? 'Light' : 'Dark'}
            </button>
            <a href="#upload" className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-white transition-colors rounded-lg bg-healthcare-600 hover:bg-healthcare-700">
              <Upload size={16} /> Upload
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="mt-8 container-padded">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <SectionCard className="lg:col-span-2">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-xl font-semibold sm:text-2xl text-slate-800">Early Detection Saves Lives</h2>
                <p className="mt-1 text-slate-600">Upload chest CT or X-ray scans and let our CNN model assist with fast, reliable screening.</p>
              </div>
              <div className="items-center hidden gap-2 sm:flex">
                <StatBadge label="Model" value="CNN" />
                <StatBadge colorClass="bg-blue-100 text-blue-700" label="v" value="1.0" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-3">
              <div className="flex items-center gap-3">
                <ShieldCheck className="text-healthcare-700" />
                <div>
                  <p className="text-sm font-medium">Clinical Theme</p>
                  <p className="text-xs text-slate-500">Soft blues, clean layout</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="text-healthcare-700" />
                <div>
                  <p className="text-sm font-medium">Fast Inference</p>
                  <p className="text-xs text-slate-500">Optimized pipeline</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Brain className="text-healthcare-700" />
                <div>
                  <p className="text-sm font-medium">AI Assisted</p>
                  <p className="text-xs text-slate-500">Guides doctor review</p>
                </div>
              </div>
            </div>
            {/* Images Section */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <img src={lungXray} alt="Lung X-ray" className="w-auto h-32 rounded shadow" />
              <img src={lungCt} alt="Lung CT" className="w-auto h-2 rounded shado" />
              <img src={cnnDiagram} alt="CNN Diagram" className="w-auto rounded shadow h-25" />
              
          
            </div>
          </SectionCard>
          <SectionCard>
            <div className="flex items-center gap-3">
              <BarChart3 className="text-healthcare-700" />
              <div>
                <p className="text-sm text-slate-600">Current Model Average</p>
                <p className="text-2xl font-semibold text-slate-800">Accuracy 93%</p>
              </div>
            </div>
            <div className="mt-4"><PlaceholderChart type="bar" /></div>
          </SectionCard>
        </div>
      </section>

      {/* Upload Section */}
      <section id="upload" className="mt-8 container-padded">
        <SectionCard>
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800"><Upload className="text-healthcare-700" /> Patient Image Upload</h3>
            <div className="hidden text-xs sm:block text-slate-500">Supported: PNG, JPG</div>
          </div>
          <div
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
            className={`mt-4 border-2 border-dashed rounded-xl p-6 sm:p-8 text-center transition-colors ${dragOver ? 'border-healthcare-500 bg-healthcare-50' : 'border-slate-300 bg-white'}`}
          >
            <ImageIcon className="mx-auto text-healthcare-600" size={36} />
            <p className="mt-3 text-sm text-slate-600">Drag & drop CT/X-ray image here, or</p>
            <div className="mt-3">
              <button onClick={onBrowseClick} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg bg-healthcare-600 hover:bg-healthcare-700">
                <Upload size={16} /> Browse Files
              </button>
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={(e)=>onFileSelected(e.target.files?.[0])} />
            </div>
            {selectedImage && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6">
                <img src={selectedImage} alt="Preview" className="mx-auto border rounded-lg max-h-64 border-slate-200" />
              </motion.div>
            )}
            <div className="flex items-center justify-center gap-3 mt-6">
              <button disabled={!selectedImage || processing} onClick={processWithModel} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white rounded-lg bg-healthcare-600 hover:bg-healthcare-700 disabled:opacity-50">
                <Brain size={16} /> {processing ? 'Processing...' : 'Process with CNN'}
              </button>
            </div>
          </div>
        </SectionCard>
      </section>

      {/* Results */}
      <section id="results" className="mt-8 container-padded">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <SectionCard className="lg:col-span-2">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800"><Activity className="text-healthcare-700" /> AI Detection Results</h3>
              {result && (
                <div className="flex items-center gap-2">
                  <StatBadge label="Result" value={result} colorClass={result === 'No Cancer Detected' || result === 'No Cancer' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} />
                  {confidence && <StatBadge label="Confidence" value={`${(confidence*100).toFixed(1)}%`} colorClass="bg-blue-100 text-blue-700" />}
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2">
              <div className="p-4 card-surface">
                <p className="text-sm text-slate-600">Prediction</p>
                <p className={`mt-1 text-xl font-semibold ${result ? (result.includes('No Cancer') ? 'text-green-700' : 'text-red-700') : 'text-slate-400'}`}>
                  {result ?? 'Awaiting input'}
                </p>
              </div>
              <div className="p-4 card-surface">
                <p className="text-sm text-slate-600">Confidence Score</p>
                <p className="mt-1 text-xl font-semibold text-slate-800">{confidence ? `${(confidence*100).toFixed(1)}%` : '–'}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              <button onClick={downloadReport} disabled={!result} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium border rounded-lg border-slate-300 hover:border-slate-400 text-slate-700 disabled:opacity-50">
                <FileDown size={16} /> Download Report
              </button>
              <div className="inline-flex items-center gap-2 text-xs text-slate-500">
                <AlertTriangle className="text-amber-600" size={16} />
                AI is assistive, not diagnostic.
              </div>
            </div>
          </SectionCard>
          <SectionCard>
            <p className="text-sm font-medium text-slate-700">Confusion Matrix</p>
            <div className="grid grid-cols-3 gap-2 mt-3">
              {[
                { v: 82, c: 'bg-green-200' }, { v: 8, c: 'bg-red-200' }, { v: 0, c: 'bg-slate-100' },
                { v: 7, c: 'bg-red-200' }, { v: 76, c: 'bg-green-200' }, { v: 0, c: 'bg-slate-100' },
                { v: 0, c: 'bg-slate-100' }, { v: 0, c: 'bg-slate-100' }, { v: 0, c: 'bg-slate-100' },
              ].map((cell, i) => (
                <div key={i} className={`aspect-square rounded-lg flex items-center justify-center text-sm font-semibold ${cell.c}`}>{cell.v}</div>
              ))}
            </div>
          </SectionCard>
        </div>
      </section>

      {/* Analytics */}
      <section id="analytics" className="mt-8 container-padded">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SectionCard>
            <div className="flex items-center gap-2 font-semibold text-slate-800"><BarChart3 className="text-healthcare-700" /> Metrics</div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {[
                { k: 'Accuracy', v: '93%' },
                { k: 'Precision', v: '91%' },
                { k: 'Recall', v: '90%' },
                { k: 'F1-Score', v: '90%' },
              ].map(m => (
                <div key={m.k} className="p-4 card-surface">
                  <p className="text-sm text-slate-600">{m.k}</p>
                  <p className="text-xl font-semibold text-slate-800">{m.v}</p>
                </div>
              ))}
            </div>
            <div className="mt-4"><PlaceholderChart type="line" /></div>
          </SectionCard>
          <SectionCard>
            <div className="flex items-center gap-2 font-semibold text-slate-800"><Activity className="text-healthcare-700" /> Training vs Validation</div>
            <div className="grid grid-cols-1 gap-4 mt-4">
              <div>
                <p className="text-sm text-slate-600">Loss</p>
                <PlaceholderChart type="line" />
              </div>
              <div>
                <p className="text-sm text-slate-600">Accuracy</p>
                <PlaceholderChart type="bar" />
              </div>
            </div>
          </SectionCard>
        </div>
      </section>

      {/* Patient Report History */}
      <section className="mt-8 container-padded">
        <SectionCard>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="flex items-center gap-2 text-lg font-semibold text-slate-800"><History className="text-healthcare-700" /> Patient Report History</h3>
            <div className="relative">
              <Search className="absolute -translate-y-1/2 left-3 top-1/2 text-slate-400" size={16} />
              <input value={filter} onChange={(e)=>setFilter(e.target.value)} placeholder="Search by ID or result" className="py-2 pr-3 text-sm bg-white border rounded-lg pl-9 border-slate-300 focus:outline-none focus:ring-2 focus:ring-healthcare-300" />
            </div>
          </div>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead>
                <tr className="text-left text-slate-600">
                  <th className="px-3 py-2">Patient ID</th>
                  <th className="px-3 py-2">Scan Date</th>
                  <th className="px-3 py-2">Result</th>
                  <th className="px-3 py-2">Confidence</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map(r => (
                  <tr key={r.id} className="border-t border-slate-200">
                    <td className="px-3 py-2 font-medium">{r.id}</td>
                    <td className="px-3 py-2">{r.date}</td>
                    <td className={`py-2 px-3 font-medium ${r.result.includes('No') ? 'text-green-700' : 'text-red-700'}`}>{r.result}</td>
                    <td className="px-3 py-2">{(r.confidence*100).toFixed(0)}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </section>

      {/* Additional Insights + About */}
      <section id="about" className="flex justify-center px-4 py-20 bg-black/60">
          <div className="w-full max-w-5xl text-center">
            <h2 className="mb-10 text-3xl font-bold">Know About Me</h2>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 justify-items-center">
              <div className="w-full max-w-xs p-6 border border-gray-500 rounded-lg bg-white/10">
                <img src="https://i.ibb.co/SXD8y4Sy/IMG-20250717-WA0017.jpg" alt="Aditya Verma" className="mx-auto mb-4 border-2 border-purple-500 rounded-full w-25 h-28" />
                <h3 className="text-xl font-semibold">Aditya Verma</h3>
                <p className="text-purple-300">Founder & Developer</p>
                <p className="mt-2 text-sm text-gray-300">Great Leader with Visionary Entrepreneur, Passionate about AI and Startups and 😎Here working as Backend Developer.</p>
                <a href="mailto:9905adityaverma@gmail.com" className="block mt-2 text-purple-400 hover:underline">✉ 9905adityaverma@gmail.com</a>
                <a href="https://www.linkedin.com/in/aditya-verma-2a3915289/" className="block mt-2 text-purple-400 hover:underline">LinkedIn</a>
              </div>

              <div className="w-full max-w-xs p-6 border border-gray-500 rounded-lg bg-white/10">
                <img src="https://png.pngtree.com/png-vector/20230903/ourlarge/pngtree-man-avatar-isolated-png-image_9935806.png" alt="Dhruv" className="mx-auto mb-4 border-2 border-purple-500 rounded-full w-25 h-28" />
                <h3 className="text-xl font-semibold">Dhruv</h3>
                <p className="text-purple-300">Partner & Developer</p>
                <p className="mt-2 text-sm text-gray-300">Great Leader with Visionary Entrepreneur,Here working as Backend Developer.</p>
              </div>

              <div className="w-full max-w-xs p-6 border border-gray-500 rounded-lg bg-white/10">
                <img src="https://static.vecteezy.com/system/resources/previews/029/796/026/non_2x/asian-girl-anime-avatar-ai-art-photo.jpg" alt="Ahana" className="mx-auto mb-4 border-2 border-purple-500 rounded-full w-25 h-28" />
                <h3 className="text-xl font-semibold">Ahana</h3>
                <p className="text-purple-300">Partner</p>
                <p className="mt-2 text-sm text-gray-300">working as Developer.</p>
              </div>

              <div className="w-full max-w-xs p-6 border border-gray-500 rounded-lg bg-white/10">
                <img src="https://img.freepik.com/premium-photo/girl-with-curly-hair-glasses-is-wearing-sweater_1197721-998.jpg" alt="Anju" className="mx-auto mb-4 border-2 border-purple-500 rounded-full w-25 h-28" />
                <h3 className="text-xl font-semibold">Anju</h3>
                <p className="text-purple-300">Partner</p>
                <p className="mt-2 text-sm text-gray-300">Coder</p>
              </div>

              <div className="w-full max-w-xs p-6 border border-gray-500 rounded-lg bg-white/10">
                <img src="https://static.vecteezy.com/system/resources/previews/004/899/833/original/beautiful-girl-with-blue-hair-avatar-of-woman-for-social-network-vector.jpg" alt="Shalu" className="mx-auto mb-4 border-2 border-purple-500 rounded-full w-25 h-28" />
                <h3 className="text-xl font-semibold">Shalu</h3>
                <p className="text-purple-300">Partner</p>
                <p className="mt-2 text-sm text-gray-300">working as Tec Student</p>
              </div>
              
            </div>
          </div>
        </section>


      {/* Footer */}
      <footer className="mt-10 border-t border-slate-200">
        <div className="flex flex-col items-center justify-between gap-3 py-8 container-padded sm:flex-row">
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Stethoscope size={16} className="text-healthcare-700" />
            <span>Built for AIML Project</span>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-600 hover:text-healthcare-700"><Github size={16} /> GitHub</a>
            <a href="mailto:contact@example.com" className="text-slate-600 hover:text-healthcare-700">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
