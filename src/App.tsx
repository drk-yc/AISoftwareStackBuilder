import { useState } from "react"
import corsairSails from "./assets/corsair-sails.png"

type Workload = "data" | "ml" | "creative" | "developer"
type Setup = "core" | "recommended" | "complete"

type Package = {
  name: string
  description: string
  category: string
  level: Setup
}

const workloads: {
  id: Workload
  label: string
  mark: string
  description: string
  headline: string
  copy: string
  packages: Package[]
}[] = [
  {
    id: "data",
    label: "Data science",
    mark: "DATA",
    description: "Explore, transform, and visualize data.",
    headline: "FROM RAW DATA TO CLEAR ANSWERS.",
    copy: "A Python-first environment for notebooks, data preparation, statistics, and rich visualization.",
    packages: [
      {
        name: "Python",
        description: "Programming runtime",
        category: "Runtime",
        level: "core",
      },
      {
        name: "JupyterLab",
        description: "Interactive notebooks",
        category: "Workspace",
        level: "core",
      },
      {
        name: "Pandas",
        description: "Data analysis toolkit",
        category: "Data",
        level: "core",
      },
      {
        name: "NumPy",
        description: "Scientific computing",
        category: "Compute",
        level: "core",
      },
      {
        name: "Polars",
        description: "Fast dataframes",
        category: "Data",
        level: "recommended",
      },
      {
        name: "Matplotlib",
        description: "Data visualization",
        category: "Visualize",
        level: "recommended",
      },
      {
        name: "PyTorch",
        description: "GPU-accelerated modeling",
        category: "AI",
        level: "complete",
      },
      {
        name: "DuckDB",
        description: "Local analytical database",
        category: "Database",
        level: "complete",
      },
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
      {
        name: "Python",
        description: "Programming runtime",
        category: "Runtime",
        level: "core",
      },
      {
        name: "PyTorch",
        description: "Deep learning framework",
        category: "Framework",
        level: "core",
      },
      {
        name: "TensorFlow",
        description: "ML development platform",
        category: "Framework",
        level: "core",
      },
      {
        name: "scikit-learn",
        description: "Classical machine learning",
        category: "ML",
        level: "recommended",
      },
      {
        name: "Hugging Face",
        description: "Models and datasets",
        category: "Models",
        level: "recommended",
      },
      {
        name: "Ollama",
        description: "Run LLMs locally",
        category: "Inference",
        level: "recommended",
      },
      {
        name: "MLflow",
        description: "Experiment tracking",
        category: "MLOps",
        level: "complete",
      },
      {
        name: "JupyterLab",
        description: "Interactive notebooks",
        category: "Workspace",
        level: "complete",
      },
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
      {
        name: "Blender",
        description: "3D creation suite",
        category: "3D",
        level: "core",
      },
      {
        name: "GIMP",
        description: "Image editing",
        category: "Image",
        level: "core",
      },
      {
        name: "OBS Studio",
        description: "Recording and streaming",
        category: "Video",
        level: "core",
      },
      {
        name: "Krita",
        description: "Digital painting",
        category: "Image",
        level: "recommended",
      },
      {
        name: "Audacity",
        description: "Audio production",
        category: "Audio",
        level: "recommended",
      },
      {
        name: "ComfyUI",
        description: "Generative image workflows",
        category: "Gen AI",
        level: "recommended",
      },
      {
        name: "FFmpeg",
        description: "Media processing",
        category: "Media",
        level: "complete",
      },
      {
        name: "DaVinci Resolve",
        description: "Video post-production",
        category: "Video",
        level: "complete",
      },
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
      {
        name: "Visual Studio Code",
        description: "Code editor",
        category: "Editor",
        level: "core",
      },
      {
        name: "Git",
        description: "Version control",
        category: "Source",
        level: "core",
      },
      {
        name: "Docker",
        description: "Container platform",
        category: "Containers",
        level: "core",
      },
      {
        name: "Node.js",
        description: "JavaScript runtime",
        category: "Runtime",
        level: "recommended",
      },
      {
        name: "Python",
        description: "Programming runtime",
        category: "Runtime",
        level: "recommended",
      },
      {
        name: "Postman",
        description: "API workspace",
        category: "API",
        level: "recommended",
      },
      {
        name: "DBeaver",
        description: "Database tooling",
        category: "Database",
        level: "complete",
      },
      {
        name: "Ollama",
        description: "Local AI models",
        category: "AI",
        level: "complete",
      },
    ],
  },
]

type SetupOption = {
  id: Setup
  label: string
  detail: string
}

const setupOptions: SetupOption[] = [
  { id: "core", label: "Core", detail: "Essentials only" },
  { id: "recommended", label: "Recommended", detail: "Best for most users" },
  { id: "complete", label: "Complete", detail: "Every available tool" },
]

const levelOrder: Record<Setup, number> = {
  core: 0,
  recommended: 1,
  complete: 2,
}

type Os = "windows" | "ubuntu"

type GuideStep = {
  id: string
  title: string
  detail: string
  command: string
}

const slug = (name: string) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

const tierDefaults = (packages: Package[], setup: Setup) =>
  new Set(
    packages
      .filter((item) => levelOrder[item.level] <= levelOrder[setup])
      .map((item) => item.name),
  )

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <span aria-hidden="true" className={diagonal ? "arrow diagonal" : "arrow"}>
      →
    </span>
  )
}

export default function App() {
  const [workload, setWorkload] = useState<Workload>("data")
  const [setup, setSetup] = useState<Setup>("recommended")
  const [chosen, setChosen] = useState(() =>
    tierDefaults(workloads[0].packages, "recommended"),
  )
  const [copied, setCopied] = useState<string | null>(null)
  const [os, setOs] = useState<Os>("windows")
  const [done, setDone] = useState<Set<string>>(new Set())
  const [openStep, setOpenStep] = useState<string | null>(null)
  const selected =
    workloads.find((item) => item.id === workload) ?? workloads[0]
  const packages = selected.packages.filter((item) => chosen.has(item.name))
  const defaults = tierDefaults(selected.packages, setup)
  const customized =
    defaults.size !== chosen.size ||
    [...chosen].some((name) => !defaults.has(name))
  const command = customized
    ? `corsair-stack install --profile ${workload} --packages ${packages.map((item) => slug(item.name)).join(",")}`
    : `corsair-stack install --profile ${workload} --level ${setup}`

  const chooseWorkload = (id: Workload) => {
    setWorkload(id)
    setChosen(
      tierDefaults(workloads.find((item) => item.id === id)!.packages, setup),
    )
    setDone(new Set())
    setOpenStep(null)
  }

  const chooseSetup = (id: Setup) => {
    setSetup(id)
    setChosen(tierDefaults(selected.packages, id))
  }

  const togglePackage = (name: string) =>
    setChosen((prev) => {
      const next = new Set(prev)
      if (!next.delete(name)) next.add(name)
      return next
    })

  const copy = async (key: string, text: string) => {
    await navigator.clipboard?.writeText(text)
    setCopied(key)
    window.setTimeout(
      () => setCopied((current) => (current === key ? null : current)),
      1800,
    )
  }

  const steps: GuideStep[] = [
    {
      id: `drivers-${os}`,
      title: "Update GPU drivers",
      detail:
        os === "windows"
          ? "Install the latest NVIDIA Studio Driver, restart, then confirm your GPU is detected."
          : "Install the recommended NVIDIA driver, reboot, then confirm your GPU is detected.",
      command:
        os === "windows"
          ? "nvidia-smi"
          : "sudo ubuntu-drivers install && nvidia-smi",
    },
    {
      id: "cli",
      title: "Install the CORSAIR stack tool",
      detail:
        "Run the CORSAIR Stack installer from your workstation's support page, then check it's on your path.",
      command: "corsair-stack --version",
    },
    {
      id: `init-${workload}`,
      title: "Create your environment",
      detail: `Sets up an isolated ${selected.label.toLowerCase()} environment so tools don't conflict with each other.`,
      command: `corsair-stack init --profile ${workload}`,
    },
    ...packages.map((item) => ({
      id: `pkg-${workload}-${slug(item.name)}`,
      title: `Install ${item.name}`,
      detail: `${item.description} · ${item.category}`,
      command: `corsair-stack add ${slug(item.name)}`,
    })),
    {
      id: `verify-${workload}`,
      title: "Verify your stack",
      detail:
        "Runs a quick health check on every installed tool and confirms GPU acceleration is active.",
      command: `corsair-stack verify --profile ${workload}`,
    },
  ]
  const completed = steps.filter((step) => done.has(step.id)).length
  const activeStep =
    openStep ?? steps.find((step) => !done.has(step.id))?.id ?? null

  const toggleDone = (id: string) => {
    setDone((prev) => {
      const next = new Set(prev)
      if (!next.delete(id)) next.add(id)
      return next
    })
    setOpenStep(null)
  }

  return (
    <main>
      <nav className="nav">
        <a className="brand" href="#top" aria-label="Corsair AI setup home">
          <img
            className="brand-mark"
            src={corsairSails}
            alt=""
            aria-hidden="true"
          />
          <span>CORSAIR</span>
        </a>
        <div className="nav-links" aria-label="Primary navigation">
          <a href="#workload">Workloads</a>
          <a href="#stack">Software stack</a>
          <a href="#support">Setup help</a>
        </div>
        <a className="nav-cta" href="#stack">
          Build my stack <Arrow />
        </a>
      </nav>

      <section className="hero setup-hero" id="top">
        <div className="hero-grid" aria-hidden="true" />
        <div className="orb orb-one" aria-hidden="true" />
        <div className="orb orb-two" aria-hidden="true" />
        <div className="hero-content">
          <p className="kicker">
            <span /> AI WORKSTATION SETUP
          </p>
          <h1>
            YOUR SYSTEM.
            <br />
            <em>READY FOR AI.</em>
          </h1>
          <p className="hero-copy">
            Choose what you want to build. We’ll assemble the right free
            software stack for your CORSAIR AI Workstation.
          </p>
          <a className="primary-cta" href="#workload">
            Start setup <Arrow />
          </a>
          <div className="owner-note">
            <span>01</span>
            <p>
              Designed for workstation owners
              <br />
              <b>No paid software required</b>
            </p>
          </div>
        </div>
        <div
          className="terminal-hero"
          aria-label="Software setup terminal preview"
        >
          <div className="terminal-bar">
            <i />
            <i />
            <i />
            <span>WORKSTATION_SETUP</span>
          </div>
          <div className="terminal-body">
            <p>
              <b>$</b> corsair-stack detect
            </p>
            <p className="terminal-muted">Checking GPU and drivers...</p>
            <p>
              <span>✓</span> NVIDIA RTX detected
            </p>
            <p>
              <span>✓</span> CUDA ready
            </p>
            <p>
              <span>✓</span> 128 GB memory available
            </p>
            <p className="terminal-prompt">
              <b>$</b> select your workload
              <span className="cursor" />
            </p>
          </div>
        </div>
        <a href="#workload" className="scroll-cue">
          BEGIN SETUP <span>↓</span>
        </a>
      </section>

      <section className="selector-section" id="workload">
        <div className="section-heading">
          <p className="kicker">
            <span /> STEP 01 / WORKLOAD
          </p>
          <h2>
            WHAT WILL YOU
            <br />
            USE IT FOR?
          </h2>
          <p>
            We’ll recommend compatible, free tools based on your primary
            workflow. You can customize the bundle later.
          </p>
        </div>
        <div className="role-grid">
          {workloads.map((item, index) => (
            <button
              type="button"
              key={item.id}
              className={`role-card ${workload === item.id ? "active" : ""}`}
              onClick={() => chooseWorkload(item.id)}
              aria-pressed={workload === item.id}
            >
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
          <p className="kicker">
            <span /> {selected.label}
          </p>
          <h2>{selected.headline}</h2>
          <p>{selected.copy}</p>
          <div className="tags">
            <span>FREE TOOLS</span>
            <span>GPU ACCELERATED</span>
            <span>LOCAL FIRST</span>
          </div>
        </div>
        <div className="software-preview">
          <div className="panel-top">
            <span>INCLUDED SOFTWARE / PREVIEW</span>
            <i />
            <i />
            <i />
          </div>
          {selected.packages.slice(0, 5).map((item, index) => (
            <div className="preview-row" key={item.name}>
              <span className="package-index">0{index + 1}</span>
              <div>
                <strong>{item.name}</strong>
                <small>{item.description}</small>
              </div>
              <span className="package-category">{item.category}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="configure" id="stack">
        <div className="config-heading">
          <p className="kicker">
            <span /> STEP 02 / SETUP DEPTH
          </p>
          <h2>
            CHOOSE YOUR
            <br />
            SOFTWARE STACK.
          </h2>
        </div>
        <div className="scale-toggle" aria-label="Choose setup depth">
          {setupOptions.map((item) => (
            <button
              type="button"
              key={item.id}
              className={setup === item.id ? "active" : ""}
              onClick={() => chooseSetup(item.id)}
              aria-pressed={setup === item.id}
            >
              <strong>{item.label}</strong>
              <small>{item.detail}</small>
            </button>
          ))}
        </div>

        <div className="stack-builder">
          <div className="stack-summary">
            <p className="kicker">
              YOUR SELECTED STACK{" "}
              {customized && <em className="custom-badge">CUSTOMIZED</em>}
            </p>
            <h3>{selected.label}</h3>
            <p>
              {packages.length} of {selected.packages.length} free tools
              selected, starting from the {setup} setup.
            </p>
            <div className="system-checks">
              <span>
                <b>✓</b> Windows 11 / Ubuntu 24.04
              </span>
              <span>
                <b>✓</b> NVIDIA GPU optimized
              </span>
              <span>
                <b>✓</b> Isolated environments
              </span>
            </div>
            <div className="install-command">
              <small>QUICK INSTALL</small>
              <code>
                {packages.length
                  ? command
                  : "Select at least one tool to install."}
              </code>
              {packages.length > 0 && (
                <button type="button" onClick={() => copy("install", command)}>
                  {copied === "install" ? "Copied" : "Copy command"}
                </button>
              )}
            </div>
            <a
              className={`primary-cta ${packages.length ? "" : "disabled"}`}
              href="#guided-setup"
              aria-disabled={!packages.length}
              onClick={(event) =>
                packages.length ? setOpenStep(null) : event.preventDefault()
              }
            >
              Open guided setup <Arrow />
            </a>
          </div>
          <div className="package-list">
            <div className="package-list-head">
              <span>SOFTWARE · TAP TO ADD OR REMOVE</span>
              <span>TYPE</span>
            </div>
            {setupOptions.map((tier) => {
              const tierPackages = selected.packages.filter(
                (item) => item.level === tier.id,
              )
              const included = levelOrder[tier.id] <= levelOrder[setup]
              return (
                <div
                  key={tier.id}
                  role="group"
                  aria-label={`${tier.label} tools`}
                >
                  <div className="tier-head">
                    <span>{tier.label}</span>
                    <small>
                      {included ? "Included in your setup" : "Optional add-ons"}
                    </small>
                  </div>
                  {tierPackages.map((item) => {
                    const on = chosen.has(item.name)
                    return (
                      <button
                        type="button"
                        role="checkbox"
                        aria-checked={on}
                        className={`package-item ${on ? "" : "off"}`}
                        key={item.name}
                        onClick={() => togglePackage(item.name)}
                      >
                        <span className="check">{on ? "✓" : "+"}</span>
                        <div>
                          <strong>{item.name}</strong>
                          <small>{item.description}</small>
                        </div>
                        <span className="package-category">
                          {item.category}
                        </span>
                      </button>
                    )
                  })}
                </div>
              )
            })}
            <button
              className="add-package"
              type="button"
              disabled={!customized}
              onClick={() => setChosen(defaults)}
            >
              {customized
                ? `Reset to ${setup} defaults`
                : `Using ${setup} defaults`}
            </button>
          </div>
        </div>
      </section>

      <section className="guided" id="guided-setup">
        <div className="section-heading">
          <p className="kicker">
            <span /> STEP 03 / GUIDED SETUP
          </p>
          <h2>
            INSTALL IT
            <br />
            STEP BY STEP.
          </h2>
          <p>
            Follow each step in order and mark it done as you go. Your progress
            updates as you change the stack above.
          </p>
        </div>
        <div className="guide-layout">
          <aside className="guide-sidebar">
            <p className="kicker">YOUR PROGRESS</p>
            <h3>
              {completed}/{steps.length}
            </h3>
            <div
              className="progress"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={steps.length}
              aria-valuenow={completed}
            >
              <span style={{ width: `${(completed / steps.length) * 100}%` }} />
            </div>
            <p>
              {selected.label} · {setup}
              {customized ? " (customized)" : ""} · {packages.length} tools
            </p>
            <div className="os-toggle" aria-label="Operating system">
              {(["windows", "ubuntu"] as Os[]).map((id) => (
                <button
                  type="button"
                  key={id}
                  className={os === id ? "active" : ""}
                  aria-pressed={os === id}
                  onClick={() => setOs(id)}
                >
                  {id === "windows" ? "Windows 11" : "Ubuntu 24.04"}
                </button>
              ))}
            </div>
            <a className="text-link" href="#stack">
              ← Edit software stack
            </a>
          </aside>
          <ol className="guide-steps">
            {steps.map((step, index) => {
              const isDone = done.has(step.id)
              const isOpen = activeStep === step.id
              return (
                <li
                  key={step.id}
                  className={`guide-step ${isDone ? "done" : ""} ${
                    isOpen ? "open" : ""
                  }`}
                >
                  <button
                    type="button"
                    className="guide-step-head"
                    aria-expanded={isOpen}
                    onClick={() => setOpenStep(isOpen ? "" : step.id)}
                  >
                    <span className="step-num">
                      {isDone ? "✓" : String(index + 1).padStart(2, "0")}
                    </span>
                    <strong>{step.title}</strong>
                    <span className="step-chevron" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="guide-step-body">
                      <p>{step.detail}</p>
                      <div className="step-command">
                        <code>{step.command}</code>
                        <button
                          type="button"
                          onClick={() => copy(step.id, step.command)}
                        >
                          {copied === step.id ? "Copied" : "Copy"}
                        </button>
                      </div>
                      <button
                        type="button"
                        className="primary-cta"
                        onClick={() => toggleDone(step.id)}
                      >
                        {isDone ? "Mark as not done" : "Mark as done"} <Arrow />
                      </button>
                    </div>
                  )}
                </li>
              )
            })}
          </ol>
        </div>
        {completed === steps.length && (
          <div className="guide-complete">
            <strong>YOUR STACK IS READY.</strong>
            <span>
              All {steps.length} steps complete. Time to build something.
            </span>
          </div>
        )}
      </section>

      <footer id="support">
        <div>
          <p className="kicker">
            <span /> NEED A HAND?
          </p>
          <h2>
            SET UP ONCE.
            <br />
            <em>BUILD ANYTHING.</em>
          </h2>
        </div>
        <a className="primary-cta" href="mailto:ai@corsair.com">
          Get setup support <Arrow />
        </a>
        <p className="copyright">CORSAIR AI WORKSTATION · SOFTWARE SETUP</p>
      </footer>
    </main>
  )
}
