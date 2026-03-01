# Render.com Static Site Deployment

Bu qovluq Render.com üzərində static site kimi deploy edilməsi üçün hazırlanıb.

## Fayllar

```
static-site/
├── index.html       # Ana səhifə (16 KB)
├── app.js          # JavaScript funksionallıq (14 KB)
├── styles.css      # CSS stilləri (7.2 KB)
├── sw.js           # Service Worker (2.2 KB)
├── manifest.json   # PWA manifest (601 bytes)
├── icon-192.png    # 192x192 ikon (7.5 KB)
└── icon-512.png    # 512x512 ikon (22 KB)
```

## Render.com-da Deploy Etmə

### Variant 1: GitHub ilə Avtomatik Deploy

1. **GitHub Repository-ni Render-ə bağlayın**
   - Render Dashboard-a gedin: https://dashboard.render.com
   - "New +" > "Static Site" seçin
   - GitHub repository seçin: `guyu6821-gif/buyuy`

2. **Build Settings**
   - **Name**: `bdu-helper`
   - **Branch**: `main`
   - **Root Directory**: `static-site`
   - **Build Command**: (boş buraxın - static fayllar artıq hazırdır)
   - **Publish Directory**: `.` (cari qovluq)

3. **Deploy edin**
   - "Create Static Site" düyməsinə basın
   - Render avtomatik deploy edəcək

### Variant 2: Manual Deploy (GitHub olmadan)

1. **Static faylları zip edin**
```bash
cd /home/user/webapp
zip -r bdu-helper-static.zip static-site/
```

2. **Render Dashboard-da Manual Deploy**
   - "New +" > "Static Site"
   - "Deploy from a Git repository" əvəzinə manual upload
   - ZIP faylını yükləyin

### Deploy Sonrası

Render sizə URL verəcək:
- **Production URL**: `https://bdu-helper.onrender.com` (və ya random URL)

## PWA Funksionallıq

Deploy olunduqdan sonra:
- ✅ Ana ekrana əlavə edilə bilər
- ✅ Offline işləyir
- ✅ Service Worker aktiv olacaq
- ✅ Push notifications dəstəyi

## Environment Variables

Bu static site-da environment variable lazım deyil.

## Custom Domain (İsteğe bağlı)

1. Render Dashboard > Settings > Custom Domain
2. Öz domain-inizi əlavə edin
3. DNS qeydlərini konfiqurasiya edin

## Yenidən Deploy

GitHub-dan yenidən deploy etmək üçün:
```bash
# Dəyişiklik edin
cd /home/user/webapp/static-site
# ... faylları dəyişin ...

# GitHub-a push edin
git add .
git commit -m "Update static site"
git push origin main

# Render avtomatik yenidən deploy edəcək
```

## Performance

- ⚡ Çox sürətli (bütün fayllar static)
- 🌍 CDN təmin edilir (Tailwind, FontAwesome)
- 📦 Minimal ölçü (toplamda ~70 KB)
- 🔒 HTTPS avtomatik
- 🚀 PWA caching ilə daha da sürətli

## Troubleshooting

### Problem: PWA quraşdırılmır
**Həll**: HTTPS-dən istifadə etdiyinizə əmin olun (Render avtomatik HTTPS verir)

### Problem: Service Worker işləmir
**Həll**: 
- Browser console-da error yoxlayın
- Hard refresh edin (Ctrl+Shift+R)
- Cache təmizləyin

### Problem: Manifest error
**Həll**: manifest.json yolunun düzgün olduğunu yoxlayın

## Test (Lokal)

Lokal test üçün sadə HTTP server:
```bash
cd /home/user/webapp/static-site
python3 -m http.server 8080
# və ya
npx serve .
```

Sonra brauzerdə: http://localhost:8080

---

**Deploy üçün hazırdır! 🚀**
