# Deployment Guide - BDU Tələbə Köməkçisi

## 🚀 Cloudflare Pages-ə Deploy Etmə

### Addım 1: Cloudflare API Key Konfiqurasiyası

1. **Deploy Tab-a keçin**
   - Sidebar-da "Deploy" tab-ına klikləyin

2. **Cloudflare API Token yaradın**
   - Cloudflare Dashboard-a gedin: https://dash.cloudflare.com/
   - Profile > API Tokens
   - "Create Token" düyməsinə basın
   - "Edit Cloudflare Workers" şablonunu seçin
   - Token-u kopyalayın

3. **API Key-i əlavə edin**
   - Deploy tab-da API Key sahəsinə token-u yapışdırın
   - "Save" düyməsinə basın

### Addım 2: Cloudflare API Key Environment Setup

Sandbox-da bu komutu işlədin:
```bash
# Bu tool API key-i environment variable olaraq konfiqurasiya edəcək
setup_cloudflare_api_key
```

### Addım 3: Cloudflare Pages Project Yaradın

```bash
cd /home/user/webapp

# Wrangler authentication-u yoxlayın
npx wrangler whoami

# Cloudflare Pages project yaradın (main branch ilə)
npx wrangler pages project create webapp \
  --production-branch main \
  --compatibility-date 2026-03-01
```

### Addım 4: Deploy Edin

```bash
# Build edin
npm run build

# Deploy edin
npx wrangler pages deploy dist --project-name webapp
```

### Addım 5: Nəticəni Yoxlayın

Deploy uğurlu olarsa, iki URL alacaqsınız:
- **Production**: `https://random-id.webapp.pages.dev`
- **Branch**: `https://main.webapp.pages.dev`

### Addım 6: Meta Info-nu Yeniləyin

```bash
# Final project name-i meta_info-ya yazın
meta_info(action="write", key="cloudflare_project_name", value="webapp")
```

## 🔄 Yenidən Deploy Etmə

Dəyişikliklər etdikdən sonra:

```bash
cd /home/user/webapp

# Dəyişiklikləri commit edin
git add .
git commit -m "Description of changes"
git push origin main

# Build və deploy
npm run build
npx wrangler pages deploy dist --project-name webapp
```

## 🌐 Custom Domain Əlavə Etmə (İsteğe bağlı)

```bash
# Custom domain əlavə edin
npx wrangler pages domain add yourdomain.com --project-name webapp

# DNS qeydlərini konfiqurasiya edin (Cloudflare Dashboard-dan)
```

## 🔐 Environment Variables (Lazım olarsa)

```bash
# Secret əlavə edin
npx wrangler pages secret put SECRET_NAME --project-name webapp

# Secret-ləri siyahıya alın
npx wrangler pages secret list --project-name webapp
```

## 📊 Monitoring

```bash
# Deployment-ləri yoxlayın
npx wrangler pages deployments list --project-name webapp

# Logs-ları yoxlayın
npx wrangler pages deployment tail
```

## 🐛 Troubleshooting

### Problem: "Authentication failed"
**Həll**: 
```bash
setup_cloudflare_api_key
npx wrangler whoami
```

### Problem: "Project already exists"
**Həll**: 
```bash
# meta_info-dan oxuyun və mövcud project name-i istifadə edin
meta_info(action="read", key="cloudflare_project_name")

# Və ya rəqəm əlavə edin: webapp-2, webapp-3
npx wrangler pages deploy dist --project-name webapp-2
```

### Problem: "Build failed"
**Həll**:
```bash
# node_modules-u təmizləyin və yenidən install edin
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Problem: "Service Worker not working"
**Həll**:
- Browser cache-ni təmizləyin (Ctrl+Shift+Delete)
- Hard refresh edin (Ctrl+Shift+R)
- Service Worker-i unregister edin:
  - DevTools > Application > Service Workers > Unregister

## 📱 PWA Test

### Desktop (Chrome/Edge)
1. Saytı açın
2. Address bar-da Install (+) ikonuna basın
3. "Install" düyməsinə basın

### Mobile (Chrome Android)
1. Saytı açın
2. Menu (⋮) > "Add to Home screen"
3. "Add" düyməsinə basın

### iOS (Safari)
1. Saytı açın
2. Share düyməsinə basın
3. "Add to Home Screen" seçin

## 🎯 Performance Tips

1. **CDN Optimization**
   - Tailwind CSS və FontAwesome CDN-dən yüklənir
   - Cloudflare Pages avtomatik CDN təmin edir

2. **Cache Strategy**
   - Service Worker bütün static asset-ləri cache edir
   - Version-based cache invalidation

3. **Size Optimization**
   - Bütün kod minified olur (Vite)
   - Gzip compression avtomatik

## 📞 Yardım

Problem yaşayırsınızsa:
1. README.md faylını oxuyun
2. PM2 logs yoxlayın: `pm2 logs --nostream`
3. Browser console yoxlayın (F12)
4. Cloudflare Dashboard-da logs yoxlayın

---

**Müvəffəqiyyətlər! 🚀**
