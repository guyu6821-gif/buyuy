# Deployment Guide - BDU Tələbə Köməkçisi

## 🚀 Render.com Static Site Deploy

### Addım 1: Render.com Hesab Yaradın

1. **Render.com-a gedin**: https://render.com
2. **Sign Up** düyməsinə basın
3. GitHub hesabınızla giriş edin (tövsiyə olunur)

### Addım 2: GitHub Repository Bağlantısı

Render.com avtomatik olaraq GitHub hesabınıza çıxış istəyəcək.

### Addım 3: Static Site Yaradın

1. **Render Dashboard-a gedin**: https://dashboard.render.com
2. **"New +"** düyməsinə basın
3. **"Static Site"** seçin
4. Repository seçin: **`guyu6821-gif/buyuy`**

### Addım 4: Build Settings Konfiqurasiyası

```
Name: bdu-helper
Branch: main
Root Directory: static-site
Build Command: (boş buraxın - static fayllar hazırdır)
Publish Directory: .
Auto-Deploy: Yes
```

### Addım 5: Deploy Edin

1. **"Create Static Site"** düyməsinə basın
2. Render avtomatik deploy prosesini başladacaq
3. 1-2 dəqiqədə deploy tamamlanacaq

### Addım 6: URL-i Əldə Edin

Deploy tamamlandıqdan sonra sizə URL veriləcək:
- **Production URL**: `https://bdu-helper.onrender.com` və ya
- **Random URL**: `https://bdu-helper-xxxx.onrender.com`

## ✅ Deploy Sonrası Yoxlama

### PWA Funksionallığı Test Edin

1. **Browser-də açın**: Verilən Render URL-i açın
2. **Install düyməsi**: "Tətbiqi Quraşdır" düyməsi görünməlidir
3. **Offline test**: 
   - DevTools açın (F12)
   - Application > Service Workers
   - Service Worker-in "activated" statusunda olduğunu yoxlayın
   - Network > Offline checkbox-u aktivləşdirin
   - Səhifəni yeniləyin - işləməlidir

4. **Ana ekrana əlavə**:
   - Desktop Chrome: Address bar-da Install (+) ikonu
   - Mobile Chrome: Menu > "Add to Home screen"
   - iOS Safari: Share > "Add to Home Screen"

### Funksionallıq Testi

- ✅ Semestr balı hesablama
- ✅ ÜOMG hesablama
- ✅ Kəsr pulu hesablama
- ✅ Yaş hesablayıcı
- ✅ Lüğət və məlumat bölmələri
- ✅ Sürətli linklər
- ✅ WhatsApp əlaqə düyməsi
- ✅ "O, boşluq yaradır" info məlumatı

## 🔄 Yenidən Deploy (Dəyişiklik Etdikdə)

### Variant 1: Hono Backend Dəyişiklikləri

Əgər Hono backend-də (src/index.tsx) dəyişiklik edirsinizsə:

```bash
cd /home/user/webapp

# Server-i işə salın (əgər işə salınmayıbsa)
npm run build
pm2 start ecosystem.config.cjs

# Yeni HTML-i extract edin
curl -s http://localhost:3000 > static-site/index.html

# URL-ləri düzəldin
cd static-site
sed -i 's|/static/styles.css|/styles.css|g' index.html
sed -i 's|/static/app.js|/app.js|g' index.html

# Git commit və push
cd /home/user/webapp
git add .
git commit -m "Update static site"
git push origin main
```

### Variant 2: Static Fayllar Dəyişiklikləri

Əgər yalnız `static-site/` qovluğunda dəyişiklik edirsinizsə:

```bash
cd /home/user/webapp

# Dəyişiklik edin (məsələn: app.js, styles.css)
# ... faylları redaktə edin ...

# Git commit və push
git add static-site/
git commit -m "Update static files"
git push origin main
```

Render avtomatik yenidən deploy edəcək (Auto-Deploy aktiv olduğu üçün).

## 🌐 Custom Domain Əlavə Etmə

### Addım 1: Render Dashboard-da Domain Əlavə Edin

1. Render Dashboard > Static Site seçin
2. **Settings** tab-ına keçin
3. **Custom Domain** bölməsində **"Add Custom Domain"** düyməsinə basın
4. Domain adınızı daxil edin (məsələn: `bduhelper.com`)

### Addım 2: DNS Qeydlərini Konfiqurasiya Edin

Render sizə DNS qeydləri verəcək:

```
Type: CNAME
Name: www (və ya @)
Value: bdu-helper.onrender.com
```

Domain registrar-ınızda (Namecheap, GoDaddy, və s.) bu qeydləri əlavə edin.

### Addım 3: SSL Sertifikatı

Render avtomatik SSL sertifikatı təmin edir (Let's Encrypt).
DNS yayıldıqdan sonra (15-30 dəqiqə) HTTPS avtomatik aktivləşəcək.

## 📊 Monitoring və Logs

### Render Dashboard-da Logs

1. Render Dashboard > Static Site seçin
2. **Logs** tab-ına keçin
3. Real-time deploy və server loglarını görəcəksiniz

### Deploy History

1. **Deploy** tab-ında bütün deploy tarixçəsini görə bilərsiniz
2. Əvvəlki deploy-lara rollback edə bilərsiniz

## 🐛 Troubleshooting

### Problem: Deploy uğursuz olur

**Həll**:
1. Render logs-u yoxlayın
2. `static-site/` qovluğunun mövcud olduğunu yoxlayın
3. Root Directory düzgün konfiqurasiya edildiyini yoxlayın

```bash
# Lokal test
cd /home/user/webapp/static-site
python3 -m http.server 8080
# http://localhost:8080 açın
```

### Problem: PWA quraşdırılmır

**Həll**:
1. HTTPS aktiv olduğunu yoxlayın (Render avtomatik HTTPS verir)
2. manifest.json faylının düzgün yükləndiğini yoxlayın
3. Service Worker error-u yoxlayın (F12 > Console)

```bash
# manifest.json yoxla
curl https://your-site.onrender.com/manifest.json

# Service Worker yoxla
curl https://your-site.onrender.com/sw.js
```

### Problem: Static fayllar yüklənmir (404)

**Həll**:
1. Fayl path-larını yoxlayın (`index.html`-də)
2. Publish Directory-nin `.` olduğunu yoxlayın

```bash
# Faylların olduğunu yoxlayın
cd /home/user/webapp/static-site
ls -la
```

### Problem: Service Worker cache problemi

**Həll**:
1. Browser cache-ni təmizləyin (Ctrl+Shift+Delete)
2. Hard refresh edin (Ctrl+Shift+R)
3. Service Worker-i unregister edin:
   - F12 > Application > Service Workers > Unregister
   - Səhifəni yeniləyin

### Problem: Dəyişikliklər görünmür

**Həll**:
1. Service Worker cache version-u yoxlayın (`sw.js`-də)
2. Cache version-u artırın:

```javascript
// sw.js
const CACHE_VERSION = 'v1.0.1'; // v1.0.0-dan v1.0.1-ə dəyişin
```

3. Git commit və push edin

## 🎯 Performance Optimization

### CDN və Caching

Render avtomatik:
- ✅ Global CDN təmin edir
- ✅ Gzip compression
- ✅ HTTP/2 support
- ✅ Auto SSL/TLS

### PWA Caching Strategy

Service Worker bu faylları cache edir:
- Ana səhifə (`/`)
- JavaScript (`/app.js`)
- CSS (`/styles.css`)
- PWA faylları (`manifest.json`, ikonlar)
- Service Worker özü (`/sw.js`)
- External CDN-lər (Tailwind, FontAwesome)

### Lighthouse Score

Test edin:
1. Chrome DevTools > Lighthouse
2. "Generate report" düyməsinə basın
3. PWA kriteriyalarını yoxlayın

Gözlənilən nəticələr:
- Performance: 90+
- Accessibility: 90+
- Best Practices: 90+
- SEO: 80+
- PWA: ✅ Installable

## 📱 Mobile Testing

### Android Chrome

1. URL açın
2. Menu (⋮) > "Add to Home screen"
3. Tətbiqi ana ekrandan açın
4. Offline mode test edin (uçuş rejimi)

### iOS Safari

1. URL açın
2. Share düyməsinə basın (aşağıda)
3. "Add to Home Screen" seçin
4. Tətbiqi ana ekrandan açın
5. Offline mode test edin (uçuş rejimi)

### Desktop Chrome/Edge

1. URL açın
2. Address bar-da Install (+) ikonuna basın
3. "Install" düyməsinə basın
4. Tətbiq ayrı pəncərədə açılacaq

## 📞 Dəstək və Yardım

### Render.com Dokumentasiyası

- Static Sites: https://render.com/docs/static-sites
- Custom Domains: https://render.com/docs/custom-domains
- Deploy Hooks: https://render.com/docs/deploy-hooks

### Layihə Dəstəyi

Problem yaşayırsınızsa:
1. GitHub Issues: https://github.com/guyu6821-gif/buyuy/issues
2. README.md faylını oxuyun
3. `static-site/README.md` faylını yoxlayın

## 🎉 Uğurlar!

Deploy prosesi tamamlandı! Tətbiqiniz indi:
- ✅ Global CDN üzərində
- ✅ HTTPS ilə təhlükəsiz
- ✅ PWA kimi quraşdırıla bilər
- ✅ Offline işləyir
- ✅ Mobil və desktop-da işləyir

**Production URL-i paylaşın və istifadə edin! 🚀**

---

**Hazırlanıb**: BDU tələbələri üçün  
**Sayt Sahibi**: [@desespere_etoile](https://www.instagram.com/desespere_etoile)  
**WhatsApp**: +994559406018
