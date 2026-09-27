# Lotus Gallery

وب‌سایت نمایشی گالری لوتوس؛ یک تجربه‌ی RTL و فارسی برای معرفی جواهرات فاخر، با تمرکز بر روایت بصری، نمایش کالکشن و رزرو مشاوره‌ی خصوصی.

این پروژه یک اپلیکیشن استاتیک Vite + React است. داده‌های کاتالوگ و تصاویر داخل مخزن نگهداری می‌شوند و برای اجرای فعلی به API یا سرویس سمت‌سرور وابسته نیست.

## ویژگی‌های تعاملی

- Hero سینمایی مبتنی بر فریم‌های متوالی JPEG و Canvas، با fallback تصویری برای شروع سریع و دستگاه‌های کم‌توان.
- انیمیشن‌های ورود و خروج و parallax با GSAP و ScrollTrigger.
- رعایت `prefers-reduced-motion` برای کاهش یا توقف حرکت‌های غیرضروری.
- هدر شیشه‌ای، تیکر پیوسته، کارت‌های کالکشن، بخش Showcase تصویری و فرم رزرو مشاوره‌ی واتساپ.
- رابط فارسی RTL با فونت‌های محلی فارسی و لاتین و مسیرهای asset سازگار با `BASE_URL`.

## استک فنی

- React 19 و React DOM
- Vite 8 و `@vitejs/plugin-react`
- GSAP 3 به‌همراه `@gsap/react` و ScrollTrigger
- ESLint 10
- Tailwind CSS و `@tailwindcss/vite` برای توکن‌ها و استایل‌های پروژه

## پیش‌نیازها

- Node.js نسخه‌ی LTS (ترجیحاً ۲۰ یا جدیدتر)
- npm نسخه‌ی همراه Node.js

## نصب و راه‌اندازی

```bash
npm ci
npm run dev
```

سرور توسعه معمولاً در `http://localhost:5173` اجرا می‌شود. برای تست مسیرهای زیرمسیر، مقدار `base` در `vite.config.js` و تنظیم fallback سرویس استقرار باید هماهنگ باشند.

## اسکریپت‌ها

```bash
npm run dev      # اجرای Vite در حالت توسعه
npm run build    # ساخت bundle تولیدی در dist/
npm run preview  # سرو فایل‌های dist با سرور محلی Vite
npm run lint     # بررسی ESLint
```

پیش از انتشار، اجرای `npm run lint` و `npm run build` هر دو الزامی است.

## ساختار دایرکتوری

```text
src/
  components/     بخش‌های صفحه و کامپوننت‌های قابل استفاده‌ی مجدد
  lib/            asset helper و orchestration انیمیشن‌های GSAP
  assets/         فونت‌ها و برندینگ محلی
  App.jsx         ترکیب صفحه و نقطه‌ی اتصال motion
  App.css         استایل‌های اصلی رابط
public/
  assets/hero/    فریم‌های desktop/mobile برای Hero sequence
  assets/products/ تصاویر کاتالوگ محصولات
docs/
  assets-manifest.json  فهرست و provenance دارایی‌های محلی
```

## داده و دارایی‌ها

فریم‌های Hero و تصاویر محصول عمداً در `public/` هستند تا با URL ثابت و قابل cache سرو شوند. از خواندن یا import کردن مسیر خام `/src/...` در رابط استفاده نکنید؛ برای assetهای داخل `src` از import باندلر و برای دارایی‌های public از helper موجود در `src/lib/asset.js` استفاده کنید.

مقادیر قیمت و ادعاهای گواهی، snapshot محتوایی‌اند و نباید بدون منبع معتبر به قیمت زنده، ضمانت حقوقی یا اتصال پرداخت تبدیل شوند. جزئیات منشأ دارایی‌ها در `docs/assets-manifest.json` نگهداری می‌شود.

## استقرار

### Vercel

پروژه را به‌عنوان یک پروژه‌ی Vite متصل کنید:

- Build command: `npm run build`
- Output directory: `dist`
- Install command: `npm ci`

### Netlify

در تنظیمات سایت همین build و publish directory را وارد کنید. اگر در آینده route سمت‌کلاینت اضافه شد، fallback زیر را در `public/_redirects` قرار دهید:

```text
/* /index.html 200
```

### Nginx

پس از اجرای `npm run build`، محتوای `dist/` را deploy کنید و fallback مسیرهای SPA را فعال کنید:

```nginx
root /var/www/lotus-gallery/dist;

location / {
    try_files $uri $uri/ /index.html;
}
```

برای assetهای تصویری cache طولانی‌مدت و برای `index.html` cache کوتاه یا `no-cache` در نظر بگیرید. TLS، فشرده‌سازی Brotli/Gzip و هدرهای امنیتی باید در لایه‌ی وب‌سرور یا CDN تنظیم شوند.

## وضعیت انتشار

این repository فرایند CI/CD یا secrets runtime ندارد. قبل از انتشار واقعی، دامنه، هدرهای امنیتی، سیاست cache، تست مرورگر روی desktop/mobile و مالکیت محتوای تجاری باید جداگانه تأیید شوند. موفقیت build به‌تنهایی صحت motion، دسترس‌پذیری یا عملکرد شبکه را ثابت نمی‌کند.
