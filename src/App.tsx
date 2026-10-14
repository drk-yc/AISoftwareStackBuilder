import { useMemo, useState } from "react";
import corsairSails from "./assets/corsair-sails.png";

type Workload = "data" | "ml" | "creative" | "developer";
type Setup = "core" | "recommended" | "complete";

type Package = {
  name: string;
  description: string;
  category: string;
  level: Setup;
};

const workloads: {
  id: Workload;
  label: string;
  mark: string;
  description: string;
  headline: string;
  copy: string;
  packages: Package[];
}[] = [
  {
    id: "data",
    label: "Data science",
    mark: "DATA",
    description: "Explore, transform, and visualize data.",
    headline: "FROM RAW DATA TO CLEAR ANSWERS.",
    copy: "A Python-first environment for notebooks, data preparation, statistics, and rich visualization.",
    packages: [
      { name: "Python", description: "Programming runtime", category: "Runtime", level: "core" },
      { name: "JupyterLab", description: "Interactive notebooks", category: "Workspace", level: "core" },
      { name: "Pandas", description: "Data analysis toolkit", category: "Data", level: "core" },
      { name: "NumPy", description: "Scientific computing", category: "Compute", level: "core" },
      { name: "Polars", description: "Fast dataframes", category: "Data", level: "recommended" },
      { name: "Matplotlib", description: "Data visualization", category: "Visualize", level: "recommended" },
      { name: "PyTorch", description: "GPU-accelerated modeling", category: "AI", level: "complete" },
      { name: "DuckDB", description: "Local analytical database", category: "Database", level: "complete" },
    ],
  },
  {
    id: "ml",
    label: "AI / ML",
    mark: "AI",
    description: "Train, tune, and run models locally.",
    headline: "PUT YOUR GPU TO WORK.",
    copy: "A CUDA-ready environment for machine learning, local inference, experimentation, and model tracking.",
    packages: [
      { name: "Python", description: "Programming runtime", category: "Runtime", level: "core" },
      { name: "PyTorch", description: "Deep learning framework", category: "Framework", level: "core" },
      { name: "TensorFlow", description: "ML development platform", category: "Framework", level: "core" },
      { name: "scikit-learn", description: "Classical machine learning", category: "ML", level: "recommended" },
      { name: "Hugging Face", description: "Models and datasets", category: "Models", level: "recommended" },
      { name: "Ollama", description: "Run LLMs locally", category: "Inference", level: "recommended" },
      { name: "MLflow", description: "Experiment tracking", category: "MLOps", level: "complete" },
      { name: "JupyterLab", description: "Interactive notebooks", category: "Workspace", level: "complete" },
    ],
  },
  {
    id: "creative",
    label: "Creative media",
    mark: "3D",
    description: "Create images, video, audio, and 3D.",
    headline: "CREATE WITHOUT THE WAIT.",
    copy: "A GPU-accelerated creative studio for 3D production, generative imaging, editing, and streaming.",
    packages: [
      { name: "Blender", description: "3D creation suite", category: "3D", level: "core" },
      { name: "GIMP", description: "Image editing", category: "Image", level: "core" },
      { name: "OBS Studio", description: "Recording and streaming", category: "Video", level: "core" },
      { name: "Krita", description: "Digital painting", category: "Image", level: "recommended" },
      { name: "Audacity", description: "Audio production", category: "Audio", level: "recommended" },
      { name: "ComfyUI", description: "Generative image workflows", category: "Gen AI", level: "recommended" },
      { name: "FFmpeg", description: "Media processing", category: "Media", level: "complete" },
      { name: "DaVinci Resolve", description: "Video post-production", category: "Video", level: "complete" },
    ],
  },
  {
    id: "developer",
    label: "Development",
    mark: "</>",
    description: "Build, test, and ship applications.",
    headline: "YOUR LOCAL BUILD ENVIRONMENT.",
    copy: "A modern toolkit for containerized development, source control, APIs, and AI-assisted coding.",
    packages: [
      { name: "Visual Studio Code", description: "Code editor", category: "Editor", level: "core" },
      { name: "Git", description: "Version control", category: "Source", level: "core" },
      { name: "Docker", description: "Container platform", category: "Containers", level: "core" },
      { name: "Node.js", description: "JavaScript runtime", category: "Runtime", level: "recommended" },
      { name: "Python", description: "Programming runtime", category: "Runtime", level: "recommended" },
      { name: "Postman", description: "API workspace", category: "API", level: "recommended" },
      { name: "DBeaver", description: "Database tooling", category: "Database", level: "complete" },
      { name: "Ollama", description: "Local AI models", category: "AI", level: "complete" },
    ],
  },
];

const setupOptions: { id: Setup; label: string; detail: string }[] = [
  { id: "core", label: "Core", detail: "Essentials only" },
  { id: "recommended", label: "Recommended", detail: "Best for most users" },
  { id: "complete", label: "Complete", detail: "Every available tool" },
];

const levelOrder: Record<Setup, number> = { core: 0, recommended: 1, complete: 2 };

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return <span aria-hidden="true" className={diagonal ? "arrow diagonal" : "arrow"}>→</span>;
}

export default function App() {
  const [workload, setWorkload] = useState<Workload>("data");
  const [setup, setSetup] = useState<Setup>("recommended");
  const [copied, setCopied] = useState(false);
  const selected = workloads.find((item) => item.id === workload) ?? workloads[0];
  const packages = useMemo(
    () => selected.packages.filter((item) => levelOrder[item.level] <= levelOrder[setup]),
    [selected, setup],
  );
  const command = `corsair-stack install --profile ${workload} --level ${setup}`;

  const copyCommand = async () => {
    await navigator.clipboard?.writeText(command);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Corsair AI setup home">
          <img className="brand-mark" src={corsairSails} alt="" aria-hidden="true" />
          <span>CORSAIR</span>
        </a>
        <div className="nav-links" aria-label="Primary navigation">
          <a href="#workload">Workloads</a>
          <a href="#stack">Software stack</a>
          <a href="#support">Setup help</a>
        </div>
        <a className="nav-cta" href="#stack">Build my stack <Arrow /></a>
      </nav>

      <section className="hero setup-hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="orb orb-one" aria-hidden="true" />
        <div className="orb orb-two" aria-hidden="true" />
        <div className="hero-content">
          <p className="kicker"><span /> AI WORKSTATION SETUP</p>
          <h1>YOUR SYSTEM.<br /><em>READY FOR AI.</em></h1>
          <p className="hero-copy">Choose what you want to build. We’ll assemble the right free software stack for your CORSAIR AI Workstation.</p>
          <a className="primary-cta" href="#workload">Start setup <Arrow /></a>
          <div className="owner-note"><span>01</span><p>Designed for workstation owners<br /><b>No paid software required</b></p></div>
        </div>
        <div className="terminal-hero" aria-label="Software setup terminal preview">
          <div className="terminal-bar"><i /><i /><i /><span>WORKSTATION_SETUP</span></div>
          <div className="terminal-body">
            <p><b>$</b> corsair-stack detect</p>
            <p className="terminal-muted">Checking GPU and drivers...</p>
            <p><span>✓</span> NVIDIA RTX detected</p>
            <p><span>✓</span> CUDA ready</p>
            <p><span>✓</span> 128 GB memory available</p>
            <p className="terminal-prompt"><b>$</b> select your workload<span className="cursor" /></p>
          </div>
        </div>
        <a href="#workload" className="scroll-cue">BEGIN SETUP <span>↓</span></a>
      </section>

      <section className="selector-section" id="workload">
        <div className="section-heading">
          <p className="kicker"><span /> STEP 01 / WORKLOAD</p>
          <h2>WHAT WILL YOU<br />USE IT FOR?</h2>
          <p>We’ll recommend compatible, free tools based on your primary workflow. You can customize the bundle later.</p>
        </div>
        <div className="role-grid">
          {workloads.map((item, index) => (
            <button type="button" key={item.id} className={`role-card ${workload === item.id ? "active" : ""}`} onClick={() => setWorkload(item.id)} aria-pressed={workload === item.id}>
              <span className="role-number">0{index + 1}</span>
              <span className="role-mark">{item.mark}</span>
              <strong>{item.label}</strong>
              <small>{item.description}</small>
              <Arrow diagonal />
            </button>
          ))}
        </div>
      </section>

      <section className="use-case">
        <div className="use-copy">
          <p className="kicker"><span /> {selected.label}</p>
          <h2>{selected.headline}</h2>
          <p>{selected.copy}</p>
          <div className="tags"><span>FREE TOOLS</span><span>GPU ACCELERATED</span><span>LOCAL FIRST</span></div>
        </div>
        <div className="software-preview">
          <div className="panel-top"><span>INCLUDED SOFTWARE / PREVIEW</span><i /><i /><i /></div>
          {selected.packages.slice(0, 5).map((item, index) => (
            <div className="preview-row" key={item.name}>
              <span className="package-index">0{index + 1}</span>
              <div><strong>{item.name}</strong><small>{item.description}</small></div>
              <span className="package-category">{item.category}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="configure" id="stack">
        <div className="config-heading">
          <p className="kicker"><span /> STEP 02 / SETUP DEPTH</p>
          <h2>CHOOSE YOUR<br />SOFTWARE STACK.</h2>
        </div>
        <div className="scale-toggle" aria-label="Choose setup depth">
          {setupOptions.map((item) => (
            <button type="button" key={item.id} className={setup === item.id ? "active" : ""} onClick={() => setSetup(item.id)}>
              <strong>{item.label}</strong><small>{item.detail}</small>
            </button>
          ))}
        </div>

        <div className="stack-builder">
          <div className="stack-summary">
            <p className="kicker">YOUR SELECTED STACK</p>
            <h3>{selected.label}</h3>
            <p>{packages.length} free tools selected for your {setup} setup.</p>
            <div className="system-checks">
              <span><b>✓</b> Windows 11 / Ubuntu 24.04</span>
              <span><b>✓</b> NVIDIA GPU optimized</span>
              <span><b>✓</b> Isolated environments</span>
            </div>
            <div className="install-command">
              <small>QUICK INSTALL</small>
              <code>{command}</code>
              <button type="button" onClick={copyCommand}>{copied ? "Copied" : "Copy command"}</button>
            </div>
            <a className="primary-cta" href="#support">Open guided setup <Arrow /></a>
          </div>
          <div className="package-list">
            <div className="package-list-head"><span>SOFTWARE</span><span>TYPE</span></div>
            {packages.map((item) => (
              <div className="package-item" key={item.name}>
                <span className="check">✓</span>
                <div><strong>{item.name}</strong><small>{item.description}</small></div>
                <span className="package-category">{item.category}</span>
              </div>
            ))}
            <button className="add-package" type="button">+ Customize packages</button>
          </div>
        </div>
      </section>

      <footer id="support">
        <div><p className="kicker"><span /> NEED A HAND?</p><h2>SET UP ONCE.<br /><em>BUILD ANYTHING.</em></h2></div>
        <a className="primary-cta" href="mailto:ai@corsair.com">Get setup support <Arrow /></a>
        <p className="copyright">CORSAIR AI WORKSTATION · SOFTWARE SETUP</p>
      </footer>
    </main>
  );
}
