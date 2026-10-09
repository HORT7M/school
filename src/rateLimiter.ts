/**
 * DDoS & Rapid Request Protection (Rate Limiter)
 * Rule: Maximum 5 requests / second (5 req/s).
 * Action on Exceed: Auto-block client for 30 seconds with countdown UI.
 */

const MAX_REQUESTS_PER_SECOND = 5;
const WINDOW_MS = 1000;
const BLOCK_DURATION_SECONDS = 30;
const STORAGE_KEY_BLOCK = 'sandan_security_blocked_until';

class RateLimiter {
  private timestamps: number[] = [];
  private modalEl: HTMLElement | null = null;
  private timerInterval: number | null = null;

  constructor() {
    this.createDDoSProtectionUI();
    this.checkInitialBlock();
    this.attachGlobalInterceptor();
  }

  /**
   * Check if current action is allowed or exceeds 5 req/s
   */
  public checkRateLimit(): boolean {
    const now = Date.now();
    const blockedUntil = parseInt(sessionStorage.getItem(STORAGE_KEY_BLOCK) || '0', 10);

    // If currently blocked
    if (blockedUntil > now) {
      this.showBlockModal(Math.ceil((blockedUntil - now) / 1000));
      return false;
    }

    // Clean old timestamps outside 1s window
    this.timestamps = this.timestamps.filter((t) => now - t < WINDOW_MS);

    // Check threshold (5 times per second)
    if (this.timestamps.length >= MAX_REQUESTS_PER_SECOND) {
      // Exceeded! Auto-block client
      const newBlockUntil = now + BLOCK_DURATION_SECONDS * 1000;
      sessionStorage.setItem(STORAGE_KEY_BLOCK, newBlockUntil.toString());
      this.showBlockModal(BLOCK_DURATION_SECONDS);
      return false;
    }

    // Allow and record
    this.timestamps.push(now);
    return true;
  }

  /**
   * Check if client was already blocked from previous refresh
   */
  private checkInitialBlock(): void {
    const blockedUntil = parseInt(sessionStorage.getItem(STORAGE_KEY_BLOCK) || '0', 10);
    const remaining = Math.ceil((blockedUntil - Date.now()) / 1000);
    if (remaining > 0) {
      this.showBlockModal(remaining);
    }
  }

  /**
   * Global interceptor for rapid clicks on buttons, forms, and links
   */
  private attachGlobalInterceptor(): void {
    window.addEventListener(
      'click',
      (e: MouseEvent) => {
        const target = e.target as HTMLElement;
        const clickable = target.closest('button, a, input[type="submit"]');
        if (clickable) {
          const allowed = this.checkRateLimit();
          if (!allowed) {
            e.preventDefault();
            e.stopPropagation();
          }
        }
      },
      true // Capture phase to intercept before handlers execute
    );
  }

  /**
   * Create modern security barrier modal in DOM
   */
  private createDDoSProtectionUI(): void {
    if (document.getElementById('ddos-shield-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'ddos-shield-modal';
    modal.className =
      'hidden fixed inset-0 z-[9999] bg-slate-950/90 backdrop-blur-xl flex items-center justify-center p-4 transition-all duration-300';

    modal.innerHTML = `
      <div class="bg-white dark:bg-slate-900 border-2 border-rose-500/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl shadow-rose-900/30 animate-fade-in relative overflow-hidden">
        <!-- Top Security Glow -->
        <div class="absolute -top-12 -left-12 w-32 h-32 bg-rose-500/20 rounded-full blur-2xl pointer-events-none"></div>
        <div class="absolute -bottom-12 -right-12 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl pointer-events-none"></div>

        <!-- Shield Icon -->
        <div class="w-20 h-20 mx-auto rounded-3xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center text-4xl shadow-inner mb-5 ring-8 ring-rose-500/10">
          🛡️
        </div>

        <!-- Title -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase tracking-wider mb-3 border border-rose-200 dark:border-rose-800">
          <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
          <span>DDoS & Rate Limit Protection</span>
        </div>

        <h3 class="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mb-2 leading-snug">
          ប្រព័ន្ធការពារសុវត្ថិភាពសាលា
        </h3>

        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          សំណើរបស់អ្នកបានលើសកម្រិតកំណត់សុវត្ថិភាព <strong class="text-rose-600 dark:text-rose-400">(លើសពី 5 ដង ក្នុង 1 វិនាទី)</strong>។ ដើម្បីការពារគេហទំព័រពីការវាយប្រហារ DDoS និងការ Spam ប្រព័ន្ធបានធ្វើការផ្អាកជាបណ្តោះអាសន្ន។
        </p>

        <!-- Countdown Timer Box -->
        <div class="bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 mb-6">
          <span class="text-xs text-slate-500 dark:text-slate-400 font-medium block mb-1">
            នឹងដំណើរការឡើងវិញដោយស្វ័យប្រវត្តិក្នុ​ងរយៈពេល៖
          </span>
          <div class="text-4xl font-extrabold text-rose-600 dark:text-rose-400 tracking-wider">
            <span id="ddos-countdown">30</span> <span class="text-base font-medium">វិនាទី</span>
          </div>
          <div class="w-full bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
            <div id="ddos-progress-bar" class="bg-rose-500 h-full transition-all duration-1000" style="width: 100%;"></div>
          </div>
        </div>

        <div class="flex items-center justify-center gap-2 text-xs text-slate-400 dark:text-slate-500">
          <span>🔒 កម្រិតសុវត្ថិភាព៖ 5 Requests / Second Rate Limit</span>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.modalEl = modal;
  }

  /**
   * Show modal with active countdown
   */
  private showBlockModal(seconds: number): void {
    if (!this.modalEl) {
      this.createDDoSProtectionUI();
    }

    if (!this.modalEl) return;
    this.modalEl.classList.remove('hidden');

    const countdownEl = document.getElementById('ddos-countdown');
    const progressEl = document.getElementById('ddos-progress-bar');
    let current = seconds;
    const initialSeconds = BLOCK_DURATION_SECONDS;

    if (countdownEl) countdownEl.textContent = current.toString();

    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }

    this.timerInterval = window.setInterval(() => {
      current -= 1;
      if (countdownEl) countdownEl.textContent = Math.max(0, current).toString();
      if (progressEl) {
        const percent = Math.max(0, (current / initialSeconds) * 100);
        progressEl.style.width = `${percent}%`;
      }

      if (current <= 0) {
        if (this.timerInterval) clearInterval(this.timerInterval);
        sessionStorage.removeItem(STORAGE_KEY_BLOCK);
        this.timestamps = [];
        this.modalEl?.classList.add('hidden');
      }
    }, 1000);
  }
}

// Export singleton instance
export const rateLimiter = new RateLimiter();
