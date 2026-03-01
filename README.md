# BDU Tələbə Köməkçisi

## Layihə Haqqında
**BDU Tələbə Köməkçisi** - Bakı Dövlət Universiteti tələbələri üçün hazırlanmış Progressive Web App (PWA) tətbiqi.

## 🌐 URL-lər
- **Sandbox Test URL**: https://3000-i2ebzaym400x0dmbepa2t-2e77fc33.sandbox.novita.ai
- **GitHub**: https://github.com/guyu6821-gif/buyuy
- **Production**: (Cloudflare API key lazımdır - Deploy tab-da konfiqurasiya edin)

## ✨ Xüsusiyyətlər

### Tamamlanmış Funksionallıqlar
1. ✅ **Semestr Balı Hesablama**
   - Seminar balları (1-9 ədəd, 0-10 aralığı)
   - Kollekvium balları (1-4 ədəd, 0-10 aralığı)
   - Sərbəst iş balı (0-10)
   - Davamiyyət balı (30, 45, 60, 75, 90, 105 saat üzrə avtomatik hesablama)
   - Düstur: `(seminar_orta × 0.4 + kollekvium_orta × 0.6) × 3 + davamiyyət + sərbəst_iş`

2. ✅ **ÜOMG Hesablama**
   - Çoxlu fənn üzrə kredit və bal daxil edilməsi
   - Düstur: `(bal₁ × kredit₁ + bal₂ × kredit₂ + ... + balₙ × kreditₙ) / (kredit₁ + kredit₂ + ... + kreditₙ)`

3. ✅ **25% İmtahan Pulu (Kəsr Pulu)**
   - İllik ödəniş və fənn krediti əsasında hesablama
   - Düstur: `[((illik_ödəniş / 60) × kredit) / 4] + 1`

4. ✅ **Yaş Hesablayıcı**
   - Dəqiq yaş hesablaması (il, ay, gün)
   - Ümumi yaşanan gün sayı
   - Növbəti ad gününə qalan gün

5. ✅ **Akademik Lüğət**
   - Akademik terminlərin izahı

6. ✅ **Faydalı Məlumatlar**
   - Akademik məlumat bazası

7. ✅ **Sürətli Linklər**
   - BDU rəsmi web saytı
   - SemsLogin (Akademik Portal)
   - BDU WhatsApp kanalı
   - BDU Instagram
   - BDU Telegram
   - Sayt sahibinin Instagram profili
   - Tələbə chat qrupu

### PWA Xüsusiyyətləri
- ✅ Offline işləmə qabiliyyəti
- ✅ Ana ekrana əlavə edilə bilmə
- ✅ Service Worker ilə cache
- ✅ Manifest.json konfiqurasiyası
- ✅ Quraşdırma düyməsi
- ✅ Avtomatik cache yeniləməsi

### UI/UX Xüsusiyyətləri
- ✅ Responsive dizayn (mobil və desktop)
- ✅ Sabit top banner (WhatsApp ilə əlaqə)
- ✅ Gradient rəng palitrası
- ✅ FontAwesome ikonları
- ✅ Tailwind CSS stilləri
- ✅ Animasiyalı keçidlər
- ✅ "O, boşluq yaradır" info məlumatı (yalnız ana səhifədə)

## 📱 Funksional Entry URIs

### Ana Səhifə
- **GET** `/` - Ana səhifə, bütün menyu elementləri

### Statik Fayllar
- **GET** `/static/app.js` - JavaScript funksionallığı
- **GET** `/static/styles.css` - CSS stilləri
- **GET** `/manifest.json` - PWA manifest
- **GET** `/sw.js` - Service Worker
- **GET** `/icon-192.png` - 192x192 ikon
- **GET** `/icon-512.png` - 512x512 ikon

### JavaScript Funksiyaları
- `showPage(pageId)` - Səhifə göstərmə
- `showHome()` - Ana səhifəyə qayıt
- `calculateSemester()` - Semestr balı hesablama
- `calculateGPA()` - ÜOMG hesablama
- `calculateExamFee()` - Kəsr pulu hesablama
- `calculateAge()` - Yaş hesablama
- `toggleInfo()` - Info məlumatını göstər/gizlə

## 🗄️ Data Strukturu

### Davamiyyət Qaydaları (Object)
```javascript
{
  30: { 0: 10, 1: 9, 2: 9, 3: 8, 4: 'kəsr' },
  45: { 0: 10, 1: 10, 2: 9, 3: 9, 4: 9, 5: 8, 6: 'kəsr' },
  60: { 0: 10, 1: 10, 2: 9, 3: 9, 4: 9, 5: 8, 6: 8, 7: 8, 8: 'kəsr' },
  75: { 0: 10, 1: 10, 2: 9, 3: 9, 4: 9, 5: 9, 6: 8, 7: 8, 8: 8, 9: 8, 10: 'kəsr' },
  90: { 0: 10, 1: 10, 2: 10, 3: 9, 4: 9, 5: 9, 6: 9, 7: 8, 8: 8, 9: 8, 10: 8, 11: 8, 12: 'kəsr' },
  105: { 0: 10, 1: 10, 2: 10, 3: 9, 4: 9, 5: 9, 6: 9, 7: 9, 8: 8, 9: 8, 10: 8, 11: 8, 12: 8, 13: 8, 14: 'kəsr' }
}
```

### Qiymətləndirmə Sistemi
```
91-100 / 50+ → MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ
81-90 / 45-49 → ÇOX YAXŞI
71-80 / 41-44 → YAXŞI
61-70 / 36-40 → KAFİ
51-60 / 26-35 → ZƏİF
0-50 / 0-25 → YAXŞI OLACAQ
0 → 0 BAL
```

## 🚀 İstifadə Qaydası

1. **Saytı Açın**: Brauzerinizdə URL-i açın
2. **Quraşdırın** (isteğe bağlı): "Tətbiqi Quraşdır" düyməsinə basın
3. **Bölmə Seçin**: Ana səhifədən istədiyiniz bölməni seçin
4. **Məlumat Daxil Edin**: Lazımi məlumatları daxil edin
5. **Hesablayın**: "Hesabla" düyməsinə basın
6. **Nəticə**: Avtomatik hesablanan nəticəni görün

### Semestr Balı Hesablama Addımları
1. Seminar sayını daxil edin → "Yarat" düyməsinə basın
2. Hər seminar üçün balı daxil edin
3. Kollekvium sayını daxil edin → "Yarat" düyməsinə basın
4. Hər kollekvium üçün balı daxil edin
5. Sərbəst iş balını daxil edin
6. Saat seçin və qayıb sayını daxil edin
7. "Hesabla" düyməsinə basın

## 🛠️ Texnologiyalar

### Frontend
- HTML5
- CSS3 (Custom + Tailwind CSS)
- Vanilla JavaScript (ES6+)

### Backend
- Hono Framework (Edge Runtime)
- TypeScript

### PWA
- Service Worker
- Web App Manifest
- Cache API

### Deployment
- Cloudflare Pages (Production)
- Cloudflare Workers (Edge Runtime)
- Wrangler CLI

## 📦 Qovluq Strukturu

```
webapp/
├── src/
│   └── index.tsx          # Hono backend + HTML
├── public/
│   ├── static/
│   │   ├── app.js        # JavaScript funksionallığı
│   │   └── styles.css    # CSS stilləri
│   ├── manifest.json     # PWA manifest
│   ├── sw.js            # Service Worker
│   ├── icon-192.png     # 192x192 ikon
│   └── icon-512.png     # 512x512 ikon
├── dist/                # Build output
├── ecosystem.config.cjs # PM2 konfiqurasiyası
├── package.json
├── vite.config.ts
├── wrangler.jsonc
└── README.md
```

## 🔧 Development

### Lokal İşə Salma
```bash
cd /home/user/webapp
npm run build
pm2 start ecosystem.config.cjs
```

### Test
```bash
curl http://localhost:3000
pm2 logs --nostream
```

### Deploy (Cloudflare Pages)
```bash
# Setup Cloudflare API key first
# Call setup_cloudflare_api_key tool

# Deploy
npm run deploy:prod
```

## 📋 Deployment Status

- ✅ **Sandbox**: Aktiv (PM2 ilə işləyir) - https://3000-i2ebzaym400x0dmbepa2t-2e77fc33.sandbox.novita.ai
- ✅ **GitHub**: Push edilib - https://github.com/guyu6821-gif/buyuy
- ⏳ **Cloudflare Pages**: Deploy üçün API key lazımdır (Deploy tab-da setup edin)

## 🔄 Növbəti Addımlar

1. **GitHub Push**
   - `setup_github_environment` tool-u çağır
   - Repository seç və ya yarat
   - Kodu push et

2. **Cloudflare Pages Deploy**
   - `setup_cloudflare_api_key` tool-u çağır
   - `meta_info` ilə project name idarə et
   - Production-a deploy et

3. **Custom Domain** (isteğe bağlı)
   - Cloudflare Pages-də custom domain əlavə et

## 📝 Qeydlər

- Backend yoxdur - tam frontend tətbiqi
- Bütün hesablamalar client-side aparılır
- Offline tam işləyir (PWA)
- Cache avtomatik yenilənir (version control)
- Mobil-first responsive dizayn

## 👨‍💻 Developer

**Sayt Sahibi**: [@desespere_etoile](https://www.instagram.com/desespere_etoile)

**WhatsApp Əlaqə**: +994559406018

## 📅 Son Yeniləmə

**Tarix**: 2026-03-01

**Version**: 1.0.0

**Status**: ✅ Hazır və işlək

---

*BDU tələbələri üçün hazırlanmışdır. Uğurlar! 🎓*
