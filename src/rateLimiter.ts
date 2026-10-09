/**
 * High-Performance Form & API Rate Limiter
 * Protects form submissions and API endpoints from spam & flood attacks (Max 5 req/s).
 * Zero impact on UI clicks, navigation, or scrolling performance.
 */

const MAX_REQUESTS_PER_SECOND = 5;
const WINDOW_MS = 1000;
const BLOCK_DURATION_SECONDS = 30;

class RateLimiter {
  private timestamps: number[] = [];
  private blockedUntil: number = 0;
  private modalEl: HTMLElement | null = null;
  private timerInterval: number | null = null;

  constructor() {
    // Light UI initialization deferred
    if (typeof window !== 'undefined') {
      window.requestIdleCallback
        ? window.requestIdleCallback(() => this.createDDoSProtectionUI())
        : setTimeout(() => this.createDDoSProtectionUI(), 500);
    }
  }

  /**
   * Fast, in-memory rate limit check for form submits and data actions
   */
  public checkRateLimit(): boolean {
    const now = Date.now();

    // Check if currently blocked
    if (this.blockedUntil > now) {
      this.showBlockModal(Math.ceil((this.blockedUntil - now) / 1000));
      return false;
    }

    // Clean old timestamps outside 1s window (O(n) where n <= 5)
    this.timestamps = this.timestamps.filter((t) => now - t < WINDOW_MS);

    // Check threshold (5 requests per second)
    if (this.timestamps.length >= MAX_REQUESTS_PER_SECOND) {
      this.blockedUntil = now + BLOCK_DURATION_SECONDS * 1000;
      this.showBlockModal(BLOCK_DURATION_SECONDS);
      return false;
    }

    this.timestamps.push(now);
    return true;
  }

  /**
   * Create security warning modal in DOM
   */
  private createDDoSProtectionUI(): void {
    if (document.getElementById('ddos-shield-modal')) return;

    const modal = document.createElement('div');
    modal.id = 'ddos-shield-modal';
    modal.className =
      'hidden fixed inset-0 z-[9999] bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 transition-all duration-300';

    modal.innerHTML = `
      <div class="bg-white dark:bg-slate-900 border-2 border-rose-500/80 rounded-3xl p-6 sm:p-8 max-w-lg w-full text-center shadow-2xl animate-fade-in relative overflow-hidden">
        <div class="w-16 h-16 mx-auto rounded-2xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 dark:text-rose-400 flex items-center justify-center text-3xl mb-4">
          🛡️
        </div>

        <div class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-300 text-xs font-bold uppercase mb-3">
          <span>DDoS & Rate Limit Protection</span>
        </div>

        <h3 class="text-xl font-bold text-slate-900 dark:text-white mb-2">
          ប្រព័ន្ធការពារសុវត្ថិភាពសាលា
        </h3>

        <p class="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
          សំណើរបស់អ្នកបានលើសកម្រិតកំណត់សុវត្ថិភាព <strong class="text-rose-600 dark:text-rose-400">(លើសពី 5 ដង ក្នុង 1 វិនាទី)</strong>។ ប្រព័ន្ធបានផ្អាកការផ្ញើសារជាបណ្តោះអាសន្ន។
        </p>

        <div class="bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl p-4 mb-4">
          <span class="text-xs text-slate-500 dark:text-slate-400 block mb-1">
            នឹងដំណើរការឡើងវិញក្នុងរយៈពេល៖
          </span>
          <div class="text-3xl font-extrabold text-rose-600 dark:text-rose-400">
            <span id="ddos-countdown">30</span> វិនាទី
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    this.modalEl = modal;
  }

  private showBlockModal(seconds: number): void {
    if (!this.modalEl) this.createDDoSProtectionUI();
    if (!this.modalEl) return;

    this.modalEl.classList.remove('hidden');
    const countdownEl = document.getElementById('ddos-countdown');
    let current = seconds;

    if (countdownEl) countdownEl.textContent = current.toString();
    if (this.timerInterval) clearInterval(this.timerInterval);

    this.timerInterval = window.setInterval(() => {
      current -= 1;
      if (countdownEl) countdownEl.textContent = Math.max(0, current).toString();
      if (current <= 0) {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.blockedUntil = 0;
        this.timestamps = [];
        this.modalEl?.classList.add('hidden');
      }
    }, 1000);
  }
}

export const rateLimiter = new RateLimiter();
