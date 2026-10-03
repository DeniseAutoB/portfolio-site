import './portfolio.css';
import { useEffect, useState } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Asterisk,
  Check,
  ChevronDown,
  Command,
  Database,
  GitBranch,
  Layers3,
  Mail,
  Menu,
  MoveUpRight,
  Workflow,
  X,
} from 'lucide-react';

type Work = {
  id: string;
  number: string;
  title: string;
  summary: string;
  category: string;
  tags: string[];
  accent: string;
  kind: 'map' | 'pipeline' | 'loop' | 'score';
  context: string;
  approach: string;
  artifacts: string[];
};

const work: Work[] = [
  {
    id: 'lifecycle',
    number: '01',
    title: 'A lifecycle that knows where it is',
    summary: 'A shared language for the moments between first touch, qualified demand, and a real sales conversation.',
    category: 'Lifecycle design',
    tags: ['Lifecycle', 'Handoff', 'CRM'],
    accent: 'orange',
    kind: 'map',
    context: 'Illustrative work sample · B2B SaaS',
    approach: 'Start with observable buyer and seller actions, not a ladder of abstract labels. Define what changes state, what evidence is required, and who owns the next move.',
    artifacts: ['Lifecycle state map', 'Entry / exit criteria', 'Ownership and SLA matrix'],
  },
  {
    id: 'routing',
    number: '02',
    title: 'Routing with a reason',
    summary: 'A lead assignment model that makes territory logic legible, exceptions intentional, and every handoff inspectable.',
    category: 'Revenue operations',
    tags: ['Routing', 'Data model', 'Automation'],
    accent: 'mint',
    kind: 'pipeline',
    context: 'Illustrative work sample · systems architecture',
    approach: 'Separate identity resolution, eligibility, prioritization, and assignment. Give each decision a reason code, preserve a safe fallback, and make exceptions visible instead of silently magical.',
    artifacts: ['Decision tree', 'Field contract', 'Exception queue design'],
  },
  {
    id: 'signals',
    number: '03',
    title: 'Signals worth acting on',
    summary: 'A practical signal framework: distinguish interesting activity from the evidence that should change a team’s next action.',
    category: 'Signal architecture',
    tags: ['Intent', 'Scoring', 'Sales enablement'],
    accent: 'blue',
    kind: 'score',
    context: 'Illustrative work sample · operating model',
    approach: 'Combine fit, recency, and meaningful behavior without collapsing them into an opaque score. Connect each signal to a specific play, owner, and expiry window.',
    artifacts: ['Signal taxonomy', 'Action matrix', 'Decay and suppression rules'],
  },
  {
    id: 'feedback',
    number: '04',
    title: 'Close the loop, not just the deal',
    summary: 'A feedback path from sales outcomes back to the programs, segments, and assumptions that shaped demand.',
    category: 'Measurement',
    tags: ['Attribution', 'Feedback loop', 'Analytics'],
    accent: 'ink',
    kind: 'loop',
    context: 'Illustrative work sample · measurement design',
    approach: 'Make feedback usable before making it comprehensive. Establish a small set of outcomes, capture context at the point of work, and review patterns across teams on a reliable cadence.',
    artifacts: ['Outcome taxonomy', 'Reporting spec', 'Review ritual'],
  },
];

const navItems = [
  ['Point of view', '#point-of-view'],
  ['Selected work', '#work'],
  ['How I work', '#method'],
  ['About', '#about'],
] as const;

function ProjectVisual({ kind }: { kind: Work['kind'] }) {
  if (kind === 'map') {
    return (
      <div className="visual visual-map" aria-label="Illustrative lifecycle state map">
        <div className="map-rail"><span>01 / SIGNAL</span><span>02 / QUALIFY</span><span>03 / ACCEPT</span><span>04 / LEARN</span></div>
        <div className="map-nodes">
          <div className="map-node"><i />Known</div><b /><div className="map-node active"><i />Engaged</div><b /><div className="map-node"><i />Qualified</div><b /><div className="map-node"><i />Accepted</div>
        </div>
        <div className="map-foot"><span>ENTRY: OBSERVED INTENT</span><span>OWNER: SHARED → SALES</span></div>
      </div>
    );
  }
  if (kind === 'pipeline') {
    return (
      <div className="visual visual-pipeline" aria-label="Illustrative routing decision flow">
        <div className="flow-chip"><Database size={13} /> ENRICHED RECORD</div>
        <div className="flow-stem" />
        <div className="flow-question">ICP fit<br /><small>verified?</small></div>
        <div className="flow-branches"><div><span>YES</span><i /><strong>Territory match</strong><small>assign + reason</small></div><div><span>NO</span><i /><strong>Review queue</strong><small>no silent discard</small></div></div>
      </div>
    );
  }
  if (kind === 'score') {
    return (
      <div className="visual visual-score" aria-label="Illustrative signal prioritization">
        <div className="score-head"><span>SIGNAL / CONFIDENCE</span><span>WINDOW</span></div>
        {[['Pricing page revisit', 'HIGH', '24h'], ['Role change detected', 'MED', '7d'], ['Newsletter click', 'LOW', '—']].map((row, i) => (
          <div className="score-row" key={row[0]}><span className={`score-dot d${i}`} /><strong>{row[0]}</strong><em>{row[1]}</em><small>{row[2]}</small></div>
        ))}
        <div className="score-note"><Asterisk size={12} /> Signal ≠ action until context agrees.</div>
      </div>
    );
  }
  return (
    <div className="visual visual-loop" aria-label="Illustrative revenue feedback loop">
      <div className="loop-ring"><span className="loop-label l1">PROGRAMS</span><span className="loop-label l2">PIPELINE</span><span className="loop-label l3">OUTCOMES</span><span className="loop-label l4">LEARNING</span><div className="loop-center"><GitBranch size={23} /><small>FEEDBACK<br />BY DESIGN</small></div><div className="loop-arrow a1">↗</div><div className="loop-arrow a2">↗</div><div className="loop-arrow a3">↗</div></div>
    </div>
  );
}

function App() {
  const [activeWork, setActiveWork] = useState<Work | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const email = 'your.email@example.com';

  useEffect(() => {
    if (!activeWork) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveWork(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeWork]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="page-grain min-h-[100dvh]">
      <header className="site-header">
        <a href="#top" className="brand" aria-label="Back to top" data-testid="link-home">
          <span className="brand-mark"><span /><span /><span /></span>
          <span className="brand-name">[YOUR NAME]<small>GTM SYSTEMS / OPERATOR</small></span>
        </a>
        <nav className="desktop-nav" aria-label="Main navigation">
          {navItems.map(([label, href]) => <a key={href} href={href} data-testid={`link-nav-${href.slice(1)}`}>{label}</a>)}
        </nav>
        <a href="#contact" className="header-contact" data-testid="link-header-contact">Let’s talk <ArrowUpRight size={14} /></a>
        <button className="mobile-menu" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} data-testid="button-mobile-menu">
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
        {mobileOpen && <nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map(([label, href]) => <a key={href} href={href} onClick={() => setMobileOpen(false)}>{label}<ArrowUpRight size={15} /></a>)}<a href="#contact" onClick={() => setMobileOpen(false)}>Let’s talk<ArrowUpRight size={15} /></a></nav>}
      </header>

      <main id="top" tabIndex={-1}>
        <section className="hero shell">
          <div className="hero-topline mono reveal"><span><i className="live-dot" /> OPEN TO THE RIGHT NEXT THING</span><span>INDEPENDENT BY DESIGN <span className="topline-mark">↘</span></span></div>
          <div className="hero-content">
            <div className="hero-copy">
              <p className="eyebrow reveal reveal-delay-1">THE PERSON BETWEEN THE PLAN & THE PLATFORM</p>
              <h1 className="display reveal reveal-delay-1">Revenue works<br />better when<br /><span>the system</span><br /><span className="outline-word">makes sense.</span></h1>
              <p className="hero-description reveal reveal-delay-2">I connect go-to-market strategy to the data, automation, and operating habits that make it real.</p>
              <div className="hero-actions reveal reveal-delay-3">
                <a className="button-primary" href="#work">Explore the work <ArrowDownRight size={17} /></a>
                <a className="text-link" href="#about">A little about me <ArrowRight size={15} /></a>
              </div>
            </div>
            <div className="hero-art reveal reveal-delay-2">
              <div className="art-index mono">SYSTEM STUDY / 001</div>
              <div className="diagram">
                <div className="diagram-orbit orbit-a" /><div className="diagram-orbit orbit-b" />
                <div className="diagram-core"><Command size={26} strokeWidth={1.4} /><span>GTM<br />ENGINE</span></div>
                <div className="diagram-point p1"><span>MARKETING</span><i /></div>
                <div className="diagram-point p2"><i /><span>SALES</span></div>
                <div className="diagram-point p3"><span>CUSTOMER<br />SUCCESS</span><i /></div>
                <div className="diagram-point p4"><i /><span>DATA + OPS</span></div>
                <div className="diagram-cross c1">+</div><div className="diagram-cross c2">+</div><div className="diagram-cross c3">+</div>
              </div>
              <p className="art-caption mono">CONNECT THE SIGNAL.<br />MAKE THE HANDOFF COUNT.</p>
              <div className="art-coordinate mono">37°46'49.0"N &nbsp; 122°25'09.0"W<br /><span>OPERATING MODE: CURIOUS</span></div>
            </div>
          </div>
          <div className="hero-footer mono"><span>STRATEGY <b>+</b> SYSTEMS <b>+</b> HUMAN JUDGMENT</span><a href="#point-of-view">SCROLL TO THINK <ArrowDownRight size={13} /></a></div>
        </section>

        <section className="signal-band" id="point-of-view">
          <div className="shell signal-inner">
            <div className="section-kicker mono"><span>01</span><span>POINT OF VIEW</span></div>
            <div className="signal-copy">
              <h2 className="display">The best GTM system<br />doesn’t feel like a system.</h2>
              <p>It feels like the right person has the right context at the right moment. My work is the connective tissue behind that feeling: clear definitions, trusted data, useful automation, and handoffs people actually want to use.</p>
            </div>
            <div className="signal-stamp"><span>GOOD SYSTEMS</span><Asterisk size={23} /><span>MAKE ROOM<br />FOR GOOD WORK</span></div>
          </div>
        </section>

        <section className="work-section shell" id="work">
          <div className="section-heading">
            <div><div className="section-kicker mono"><span>02</span><span>SELECTED WORK</span></div><h2 className="display">Built to connect<br /><em>the dots.</em></h2></div>
            <p>Four lenses on the same problem: how do we make a complex revenue motion easier to see, trust, and improve?</p>
          </div>
          <div className="work-note mono"><span><i /> CONCEPT PROJECTS</span><span>ILLUSTRATIVE WORK SAMPLES · NOT VERIFIED CLIENT RESULTS</span></div>
          <div className="work-grid">
            {work.map((item) => (
              <article className={`work-card ${item.accent}`} key={item.id} data-testid={`card-work-${item.id}`}>
                <div className="work-card-top mono"><span>FIELD NOTE / {item.number}</span><span>{item.category}</span></div>
                <ProjectVisual kind={item.kind} />
                <div className="work-card-copy">
                  <div className="work-title-row"><h3 className="display">{item.title}</h3><button aria-label={`Read ${item.title}`} onClick={() => setActiveWork(item)} className="round-arrow" data-testid={`button-open-${item.id}`}><ArrowUpRight size={18} /></button></div>
                  <p>{item.summary}</p>
                  <div className="tag-list">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
                </div>
                <button className="card-hit" onClick={() => setActiveWork(item)} aria-label={`Open work sample: ${item.title}`} />
              </article>
            ))}
          </div>
          <p className="work-footnote mono"><Asterisk size={13} /> These are illustrative systems exercises. Replace, expand, or remove with your own verified work.</p>
        </section>

        <section className="method-section" id="method">
          <div className="shell method-shell">
            <div className="method-head">
              <div className="section-kicker mono"><span>03</span><span>HOW I WORK</span></div>
              <h2 className="display">Clarity first.<br /><span>Then the clever bit.</span></h2>
              <p>Good infrastructure is not the most elaborate version. It is the simplest one that people trust enough to use.</p>
            </div>
            <div className="method-steps">
              {[
                { n: '01', icon: <Layers3 size={17} />, title: 'Map the real motion', copy: 'Listen for how work actually moves across teams. Make the invisible assumptions visible before encoding them.' },
                { n: '02', icon: <Database size={17} />, title: 'Give data a contract', copy: 'Define the fields, definitions, ownership, and quality checks that make a shared source of truth worth trusting.' },
                { n: '03', icon: <Workflow size={17} />, title: 'Automate with intent', copy: 'Use automation to remove avoidable friction—not to make a broken process happen faster. Keep decisions inspectable.' },
                { n: '04', icon: <Check size={17} />, title: 'Close the loop', copy: 'Agree on the handoff, observe what happened, and return the learning to the people who can improve the system.' },
              ].map(step => <div className="method-step" key={step.n}><span className="step-number mono">{step.n}</span><span className="step-icon">{step.icon}</span><div><h3>{step.title}</h3><p>{step.copy}</p></div><MoveUpRight size={15} className="step-arrow" /></div>)}
            </div>
          </div>
          <div className="method-ticker mono"><div>TRUST THE DATA <span>✳</span> RESPECT THE OPERATOR <span>✳</span> MEASURE THE HANDOFF <span>✳</span> TRUST THE DATA <span>✳</span> RESPECT THE OPERATOR <span>✳</span> MEASURE THE HANDOFF <span>✳</span></div></div>
        </section>

        <section className="about-section shell" id="about">
          <div className="about-top">
            <div className="section-kicker mono"><span>04</span><span>ABOUT THE OPERATOR</span></div>
            <div className="about-grid">
              <div className="about-marker">
                <div className="portrait-placeholder"><span className="portrait-initial">[Y]</span><span className="portrait-caption mono">A HUMAN<br />BEHIND THE<br />WORKFLOWS</span><Asterisk size={30} /></div>
                <span className="caption mono">[ADD A PHOTO OR KEEP THE ABSTRACT MARK]</span>
              </div>
              <div className="about-copy">
                <p className="about-lede display">I’m <span>[Your Name]</span> — a systems-minded GTM operator who likes the work between the org chart boxes.</p>
                <p className="about-body">The messy middle is where strategy meets reality: a campaign becomes a conversation, a conversation becomes an opportunity, and a customer’s experience becomes the next team’s signal.</p>
                <p className="about-body">I’m interested in the practical craft of making those transitions clearer. That might mean a better lifecycle model, a more considered CRM, an automation with a human escape hatch, or simply getting three teams to agree what a word means.</p>
                <div className="about-callout"><span className="mono">A USEFUL DEFAULT</span><p>Be rigorous about the system.<br /><em>Be generous with the people in it.</em></p></div>
              </div>
            </div>
          </div>
          <div className="toolkit">
            <div className="toolkit-head"><span className="mono">THE TOOLKIT, NOT THE IDENTITY</span><ChevronDown size={15} /></div>
            <div className="toolkit-list">
              <div><span>01</span><strong>Revenue architecture</strong><small>Lifecycle · routing · ownership · handoffs</small></div>
              <div><span>02</span><strong>Data &amp; measurement</strong><small>Definitions · governance · attribution · feedback</small></div>
              <div><span>03</span><strong>Automation &amp; systems</strong><small>CRM workflows · integrations · QA · documentation</small></div>
              <div><span>04</span><strong>Operating with people</strong><small>Discovery · enablement · change · iteration</small></div>
            </div>
            <p className="toolkit-note mono">[EDIT THIS LIST TO REFLECT YOUR ACTUAL EXPERIENCE AND TOOLS]</p>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="shell contact-shell">
            <div className="section-kicker mono"><span>05</span><span>THE NEXT CONVERSATION</span></div>
            <div className="contact-main"><div><p className="contact-pre mono">HAVE A SYSTEM THAT COULD WORK HARDER?</p><h2 className="display">Let’s make<br /><em>it make sense.</em></h2></div><a className="contact-button" href={`mailto:${email}`} data-testid="link-email"><Mail size={17} /><span>Start a conversation</span><ArrowUpRight size={17} /></a></div>
            <div className="contact-bottom"><p>Open to thoughtful conversations about GTM systems, revenue infrastructure, and the teams behind them.</p><button className="copy-email mono" onClick={copyEmail} data-testid="button-copy-email">{copied ? <><Check size={13} /> COPIED</> : <><span>[{email}]</span><ArrowUpRight size={13} /></>}</button></div>
          </div>
        </section>
      </main>

      <footer className="site-footer shell"><a href="#top" className="footer-brand"><span className="brand-mark"><span /><span /><span /></span>[YOUR NAME]</a><span className="mono">BUILT AROUND HOW WORK REALLY WORKS.</span><a href="#top" className="back-top mono">BACK TO TOP ↑</a><span className="footer-edit mono">© [YEAR] · EDITABLE PORTFOLIO STARTER</span></footer>

      {activeWork && <div className="modal-backdrop" role="presentation" onClick={(event) => { if (event.target === event.currentTarget) setActiveWork(null); }}>
        <section className="work-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
          <button className="modal-close" onClick={() => setActiveWork(null)} aria-label="Close work sample" data-testid="button-close-modal"><X size={19} /></button>
          <p className="section-kicker mono"><span>FIELD NOTE / {activeWork.number}</span><span>{activeWork.category}</span></p>
          <p className="modal-context mono">{activeWork.context}</p>
          <h2 className="display" id="modal-title">{activeWork.title}</h2>
          <p className="modal-summary">{activeWork.summary}</p>
          <div className="modal-rule" />
          <p className="modal-label mono">THE THINKING</p><p className="modal-approach">{activeWork.approach}</p>
          <p className="modal-label mono">POSSIBLE ARTIFACTS</p><ul className="artifact-list">{activeWork.artifacts.map(artifact => <li key={artifact}><Check size={14} />{artifact}</li>)}</ul>
          <p className="modal-disclaimer mono">ILLUSTRATIVE EXERCISE — NOT A CLAIM OF COMPLETED CLIENT WORK OR MEASURED IMPACT.</p>
        </section>
      </div>}
      <a className="screenreader-skip" href="#top">Skip to content</a>
    </div>
  );
}

export default App;