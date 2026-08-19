/**
 * Interactive Terminal CLI Shell Engine (Theme-Responsive)
 * Harsh Kushwaha - Senior Software Developer
 */

class TerminalEngine {
  constructor() {
    this.outputContainer = document.getElementById('terminal-cli-output');
    this.inputElement = document.getElementById('terminal-cli-input');
    this.formElement = document.getElementById('terminal-cli-form');

    this.history = [];
    this.historyIndex = -1;

    this.commands = {
      help: () => this.printHelp(),
      whoami: () => this.printWhoAmI(),
      about: () => this.printAbout(),
      exp: () => this.printExperience(),
      skills: () => this.printSkills(),
      projects: () => this.printProjects(),
      blog: () => this.printBlog(),
      posts: () => this.printBlog(),
      ls: () => this.printBlog(),
      contact: () => this.printContact(),
      clear: () => this.clearTerminal(),
      date: () => this.printOutput(`CURRENT SYSTEM TIME: ${new Date().toString()}`),
    };

    this.init();
  }

  init() {
    if (!this.formElement || !this.inputElement) return;

    this.formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      const commandText = this.inputElement.value.trim();
      if (commandText) {
        this.executeCommand(commandText);
        this.history.push(commandText);
        this.historyIndex = this.history.length;
        this.inputElement.value = '';
      }
    });

    this.inputElement.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        if (this.historyIndex > 0) {
          this.historyIndex--;
          this.inputElement.value = this.history[this.historyIndex];
        }
      } else if (e.key === 'ArrowDown') {
        if (this.historyIndex < this.history.length - 1) {
          this.historyIndex++;
          this.inputElement.value = this.history[this.historyIndex];
        } else {
          this.historyIndex = this.history.length;
          this.inputElement.value = '';
        }
      }
    });

    // Initial greeting
    this.printOutput('<span class="text-zinc-950 dark:text-white font-bold">Harsh Kushwaha Terminal OS v5.2.0 (zsh-x86_64)</span>');
    this.printOutput('Type <span class="text-zinc-700 dark:text-zinc-300 font-bold">"help"</span> for interactive CLI commands.');
    this.printOutput('');
  }

  executeCommand(cmdRaw) {
    const cmdClean = cmdRaw.toLowerCase();
    this.printOutput(`<span class="text-zinc-600 dark:text-zinc-400 font-bold">harsh@dev:~$</span> <span class="text-zinc-950 dark:text-white font-semibold">${cmdRaw}</span>`);

    if (this.commands[cmdClean]) {
      this.commands[cmdClean]();
    } else if (cmdClean.startsWith('cat ')) {
      const file = cmdClean.replace('cat ', '').trim();
      if (file === 'about.txt' || file === 'bio.txt') this.printAbout();
      else if (file === 'skills.json') this.printSkills();
      else this.printOutput(`<span class="text-zinc-500 font-bold">cat: ${file}: No such file or directory</span>`);
    } else {
      this.printOutput(`<span class="text-zinc-500 font-bold">zsh: command not found: ${cmdRaw}. Type "help" for available commands.</span>`);
    }

    this.scrollToBottom();
  }

  printOutput(htmlContent) {
    if (!this.outputContainer) return;
    const line = document.createElement('div');
    line.className = 'terminal-line leading-relaxed';
    line.innerHTML = htmlContent;
    this.outputContainer.appendChild(line);
  }

  clearTerminal() {
    if (this.outputContainer) {
      this.outputContainer.innerHTML = '';
    }
  }

  scrollToBottom() {
    if (this.outputContainer) {
      this.outputContainer.scrollTop = this.outputContainer.scrollHeight;
    }
  }

  printHelp() {
    this.printOutput('<span class="text-zinc-950 dark:text-white font-bold">AVAILABLE COMMANDS:</span>');
    this.printOutput('  <span class="text-zinc-700 dark:text-zinc-300 font-bold">whoami</span>    - Print engineer identity & credentials');
    this.printOutput('  <span class="text-zinc-700 dark:text-zinc-300 font-bold">about</span>     - Read professional summary & engineering background');
    this.printOutput('  <span class="text-zinc-700 dark:text-zinc-300 font-bold">exp</span>       - Print career trajectory & company logs');
    this.printOutput('  <span class="text-zinc-700 dark:text-zinc-300 font-bold">skills</span>    - Output technical skills matrix with progress');
    this.printOutput('  <span class="text-zinc-700 dark:text-zinc-300 font-bold">projects</span>  - List deployed enterprise platforms');
    this.printOutput('  <span class="text-zinc-700 dark:text-zinc-300 font-bold">blog</span>      - List published technical engineering articles');
    this.printOutput('  <span class="text-zinc-700 dark:text-zinc-300 font-bold">contact</span>   - Print email & social endpoints');
    this.printOutput('  <span class="text-zinc-700 dark:text-zinc-300 font-bold">clear</span>     - Clear terminal buffer screen');
    this.printOutput('  <span class="text-zinc-700 dark:text-zinc-300 font-bold">date</span>      - Output current system clock');
  }

  printBlog() {
    this.printOutput('<span class="text-zinc-950 dark:text-white font-bold">TECHNICAL PUBLICATIONS:</span>');
    this.printOutput('  01. <a href="blog-hrms-saas.html" class="underline text-zinc-950 dark:text-white font-bold">Engineering High-Scale HRMS SaaS Platforms (React 18 & TS)</a> [8 MIN]');
    this.printOutput('  02. <a href="blog-core-web-vitals.html" class="underline text-zinc-950 dark:text-white font-bold">Optimizing Core Web Vitals for 10M+ Readers (3.2s to 1.1s LCP)</a> [7 MIN]');
    this.printOutput('  03. <a href="blog-realtime-telemetry.html" class="underline text-zinc-950 dark:text-white font-bold">Real-Time Telemetry at 60 FPS (50K+ Sensor Points with WebGL)</a> [9 MIN]');
  }

  printWhoAmI() {
    this.printOutput('<span class="text-zinc-950 dark:text-white font-bold">Harsh Kushwaha</span> • Senior Software Engineer II');
    this.printOutput('Location: Noida, Uttar Pradesh, India');
    this.printOutput('Experience: 5+ Years in Scalable SaaS & High-Traffic Media Platforms');
  }

  printAbout() {
    this.printOutput('<span class="text-zinc-950 dark:text-white font-bold">SUMMARY:</span> Senior Software Engineer with 5+ years of experience building scalable SaaS, enterprise, media, and e-commerce applications using React.js, TypeScript, Redux, JavaScript, and Tailwind CSS.');
    this.printOutput('Engineered React/Redux modules for HRMS SaaS platforms serving 2,500+ active users & led third-party vendor migrations.');
    this.printOutput('Engineered high-volume media frontend features for <span class="text-zinc-950 dark:text-white font-bold">Hindustan Times, LiveMint, & HT Auto</span>.');
  }

  printExperience() {
    this.printOutput('<span class="text-zinc-950 dark:text-white font-bold">CAREER LOGS:</span>');
    this.printOutput('  [Dec 2024 - Present] <span class="text-zinc-950 dark:text-white font-bold">INTELEGENCIA ANALYTICS PVT. LTD.</span> (Senior Software Engineer II)');
    this.printOutput('    - 2,500+ HRMS SaaS active users & vendor migration.');
    this.printOutput('  [Apr 2024 - Dec 2024] <span class="text-zinc-950 dark:text-white font-bold">KLOUDRAC SOFTWARES PVT. LTD.</span> (Software Engineer)');
    this.printOutput('    - Clients: Hindustan Times, LiveMint, HT Auto.');
    this.printOutput('  [Aug 2023 - Apr 2024] <span class="text-zinc-950 dark:text-white font-bold">ALETHE LABS INDIA PVT. LTD.</span> (Software Engineer)');
    this.printOutput('    - AI/ML data visualizers & government infrastructure telemetry.');
    this.printOutput('  [Aug 2021 - Aug 2023] <span class="text-zinc-950 dark:text-white font-bold">EGLOBAL SOFT SOLUTIONS</span> (Software Engineer)');
    this.printOutput('    - Multi-industry React web apps & +40% SEO traffic surge.');
  }

  printSkills() {
    this.printOutput('<span class="text-zinc-950 dark:text-white font-bold">TECHNICAL MATRIX (27 NODES):</span>');
    this.printOutput('  React.js (v18+)  <span class="text-zinc-950 dark:text-white">[█████████████████░] 95%</span>');
    this.printOutput('  TypeScript       <span class="text-zinc-800 dark:text-zinc-300">[████████████████░░] 92%</span>');
    this.printOutput('  Python (3.11+)   <span class="text-zinc-800 dark:text-zinc-300">[████████████████░░] 92%</span>');
    this.printOutput('  FastAPI          <span class="text-zinc-800 dark:text-zinc-300">[████████████████░░] 90%</span>');
    this.printOutput('  LangChain & Graph<span class="text-zinc-800 dark:text-zinc-300">[████████████████░░] 91%</span>');
    this.printOutput('  RAG & Vector DBs <span class="text-zinc-800 dark:text-zinc-300">[█████████████████░] 93%</span>');
    this.printOutput('  LLM APIs & GenAI <span class="text-zinc-800 dark:text-zinc-300">[█████████████████░] 94%</span>');
    this.printOutput('  Redux Toolkit    <span class="text-zinc-800 dark:text-zinc-300">[█████████████████░] 94%</span>');
    this.printOutput('  Tailwind / GSAP  <span class="text-zinc-950 dark:text-white">[█████████████████░] 96%</span>');
    this.printOutput('  Node.js / Express<span class="text-zinc-700 dark:text-zinc-400">[███████████████░░░] 85%</span>');
  }

  printProjects() {
    this.printOutput('<span class="text-zinc-950 dark:text-white font-bold">FEATURED PROJECTS:</span>');
    this.printOutput('  01. Enterprise HRMS SaaS Engine (2,500+ Active Users)');
    this.printOutput('  02. Hindustan Times & LiveMint High-Traffic Digital Suite');
    this.printOutput('  03. AI/ML Pipeline Telemetry Dashboard (Govt Infra)');
    this.printOutput('  04. High-Conversion SEO Web Platform (+40% Traffic Lift)');
  }

  printContact() {
    this.printOutput('<span class="text-zinc-950 dark:text-white font-bold">CONTACT ENDPOINTS:</span>');
    this.printOutput('  Email:    <span class="text-zinc-800 dark:text-zinc-200">knp.harsh@gmail.com</span>');
    this.printOutput('  LinkedIn: <span class="text-zinc-800 dark:text-zinc-200">linkedin.com/in/theharshdev</span>');
    this.printOutput('  Website:  <span class="text-zinc-800 dark:text-zinc-200">theharsh.vercel.app</span>');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.terminalCLI = new TerminalEngine();
});
