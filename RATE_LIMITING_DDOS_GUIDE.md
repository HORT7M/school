# 🛡️ ការកំណត់ Rate Limiting (5 req/s) & ការពារ DDoS (DDoS Protection)

ឯកសារនេះណែនាំអំពីរបៀបការពារប្រព័ន្ធគេហទំព័រ **អនុវិទ្យាល័យអូរត្នោត** ពីការវាយប្រហារ DDoS និងការ Spam សំណើលឿនពេក (លើសពី 5 ដង/វិនាទី)។

---

## ១. ការការពារនៅក្នុង Code (Client-Side Shield & Auto Block)
នៅក្នុងគម្រោង កូដ `src/rateLimiter.ts` ត្រូវបានភ្ជាប់ដំណើរការដោយស្វ័យប្រវត្ត៖
- **លក្ខខណ្ឌកំណត់ (Rule)**: អនុញ្ញាតអតិបរមា **5 ដង ក្នុង 1 វិនាទី** (Sliding Window 1000ms)។
- **សកម្មភាពពេលលើសកម្រិត (Auto-Block)**:
  - ប្រព័ន្ធនឹងចាក់សោ (Block) អតិថិជនរយៈពេល **30 វិនាទី** ដោយស្វ័យប្រវត្តិ។
  - បង្ហាញផ្ទាំង Alert / Modal ការពារសុវត្ថិភាព **«DDoS & Rate Limit Protection»** ជាមួយនាឡិការាប់ថយក្រោយ (Countdown Timer)។
  - ផ្អាកការ Submit Contact Form, ការចុចប៊ូតុងស្ទួនៗ និងការ Spam រហូតដល់ផុតពេល Cooldown។

---

## ២. ការការពារកម្រិតបណ្តាញ Network / Edge តាមរយៈ Cloudflare (ឥតគិតថ្លៃ ១០០%)
នៅពេលលោកអ្នកដាក់ដំណើរការគេហទំព័រលើ Domain ពិតប្រាកដ សូមប្រើប្រាស់ **Cloudflare (Free Tier)** ដើម្បីការពារ DDoS កម្រិត Layer 3, 4 និង Layer 7៖

### ជំហានកំណត់លើ Cloudflare Dashboard៖
1. ចូលទៅកាន់ **Cloudflare Dashboard** -> ជ្រើសរើស Domain របស់អ្នក។
2. ចូលទៅកាន់ម៉ឺនុយ **Security** -> **WAF (Web Application Firewall)** -> **Rate limiting rules**។
3. ចុច **Create rule**៖
   - **Rule name**: `School 5 Req per Sec Rate Limit`
   - **If incoming requests match**: `All incoming requests`
   - **Rate limit settings**:
     - When rate exceeds: **5 requests**
     - Period: **1 second**
   - **Action**: ជ្រើសរើស **Block** (ឬ **Managed Challenge / Captcha**)
   - **Duration**: **10 seconds** ឬ **1 minute**
4. ចុច **Deploy**។

👉 រាល់ Request ដែលផ្ញើលើសពី 5 ដង/វិនាទី ពី IP តែមួយ នឹងត្រូវ Cloudflare ទប់ស្កាត់មុនពេលមកដល់ Server របស់អ្នក!

---

## ៣. ការកំណត់លើ Nginx Web Server (ប្រសិនបើប្រើ VPS / Linux Server)
ប្រសិនបើលោកអ្នកដាក់ Host លើ Nginx Server ផ្ទាល់ខ្លួន សូមបន្ថែមការកំណត់ខាងក្រោមក្នុង `nginx.conf`៖

```nginx
http {
    # កំណត់ដែនកំណត់ 5 requests ក្នុង 1 វិនាទី ផ្អែកលើ IP Address
    limit_req_zone $binary_remote_addr zone=ddos_limit:10m rate=5r/s;

    server {
        listen 80;
        server_name your-domain.com;

        location / {
            # អនុវត្តកម្រិត 5r/s ប្រសិនបើលើស auto-block ជាមួយ HTTP 429 Too Many Requests
            limit_req zone=ddos_limit burst=5 nodelay;
            limit_req_status 429;

            root /var/www/school-dist;
            index index.html;
            try_files $uri $uri/ /index.html;
        }
    }
}
```

---

## ៤. ការកំណត់លើ Vercel Edge (ប្រសិនបើ Deploy លើ Vercel)
ក្នុង `vercel.json`៖
```json
{
  "crons": [],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-RateLimit-Limit",
          "value": "5"
        }
      ]
    }
  ]
}
```
