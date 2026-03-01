import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

// Serve static files
app.use('/static/*', serveStatic({ root: './public' }))
app.use('/manifest.json', serveStatic({ path: '/manifest.json', root: './public' }))
app.use('/sw.js', serveStatic({ path: '/sw.js', root: './public' }))
app.use('/icon-192.png', serveStatic({ path: '/icon-192.png', root: './public' }))
app.use('/icon-512.png', serveStatic({ path: '/icon-512.png', root: './public' }))

// Main page
app.get('/', (c) => {
  return c.html(`<!DOCTYPE html>
<html lang="az">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Bakı Dövlət Universiteti tələbələri üçün hesablama və məlumat sistemi">
    <meta name="theme-color" content="#1e40af">
    <title>BDU Tələbə Köməkçisi</title>
    
    <!-- PWA -->
    <link rel="manifest" href="/manifest.json">
    <link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png">
    <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png">
    <link rel="apple-touch-icon" href="/icon-192.png">
    
    <!-- CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
    <link href="/static/styles.css" rel="stylesheet">
</head>
<body>
    <!-- Top Banner -->
    <div class="top-banner">
        <div class="banner-text">
            ✨ ən ucuz sərbəst iş hazırlanması
        </div>
        <a href="https://wa.me/994559406018" class="whatsapp-btn" target="_blank" rel="noopener">
            <i class="fab fa-whatsapp"></i>
        </a>
    </div>

    <div class="container">
        <!-- HOME PAGE -->
        <div id="home">
            <div class="home-header">
                <h1><i class="fas fa-university"></i> BDU Tələbə Köməkçisi</h1>
                <p>Bakı Dövlət Universiteti tələbələri üçün hesablama və məlumat sistemi</p>
            </div>

            <!-- Install PWA Button -->
            <div id="install-container" class="install-container">
                <button id="install-btn" class="install-btn">
                    <i class="fas fa-download"></i>
                    Tətbiqi Quraşdır
                </button>
            </div>

            <!-- Menu Grid -->
            <div class="menu-grid">
                <a href="javascript:void(0)" onclick="showPage('semester-page')" class="menu-item">
                    <i class="fas fa-calculator"></i>
                    <h3>Semestr Balı</h3>
                    <p>Semestr balınızı hesablayın</p>
                </a>

                <a href="javascript:void(0)" onclick="showPage('gpa-page')" class="menu-item">
                    <i class="fas fa-chart-line"></i>
                    <h3>ÜOMG Hesablama</h3>
                    <p>Ümumi orta balınızı hesablayın</p>
                </a>

                <a href="javascript:void(0)" onclick="showPage('exam-fee-page')" class="menu-item">
                    <i class="fas fa-money-bill-wave"></i>
                    <h3>25% İmtahan Pulu</h3>
                    <p>Kəsr pulunu hesablayın</p>
                </a>

                <a href="javascript:void(0)" onclick="showPage('age-page')" class="menu-item">
                    <i class="fas fa-birthday-cake"></i>
                    <h3>Yaş Hesablayıcı</h3>
                    <p>Yaşınızı və ad gününüzü hesablayın</p>
                </a>

                <a href="javascript:void(0)" onclick="showPage('dictionary-page')" class="menu-item">
                    <i class="fas fa-book"></i>
                    <h3>Lüğət</h3>
                    <p>Akademik terminlər</p>
                </a>

                <a href="javascript:void(0)" onclick="showPage('info-page')" class="menu-item">
                    <i class="fas fa-info-circle"></i>
                    <h3>Məlumat</h3>
                    <p>Faydalı akademik məlumatlar</p>
                </a>

                <a href="javascript:void(0)" onclick="showPage('links-page')" class="menu-item">
                    <i class="fas fa-link"></i>
                    <h3>Sürətli Linklər</h3>
                    <p>Faydalı keçidlər</p>
                </a>
            </div>

            <!-- Info Footer -->
            <div id="info-footer" class="info-footer">
                <button class="info-btn" onclick="toggleInfo()">
                    <i class="fas fa-info"></i>
                </button>
                <div id="info-text" class="info-text">
                    O, boşluq yaradır.
                </div>
            </div>
        </div>

        <!-- SEMESTER CALCULATOR PAGE -->
        <div id="semester-page" class="page">
            <div class="page-header">
                <h2><i class="fas fa-calculator"></i> Semestr Balı Hesablama</h2>
                <button class="back-btn" onclick="showHome()">
                    <i class="fas fa-arrow-left"></i> Geri
                </button>
            </div>

            <div class="card">
                <h3><i class="fas fa-chalkboard-teacher"></i> Seminar</h3>
                <div class="form-group">
                    <label>Seminar sayı (1-9)</label>
                    <input type="number" id="seminar-count" min="1" max="9" placeholder="Seminar sayını daxil edin">
                </div>
                <button class="btn" onclick="createSeminarInputs()">Yarat</button>
                <div id="seminar-inputs" class="dynamic-inputs"></div>
            </div>

            <div class="card">
                <h3><i class="fas fa-file-alt"></i> Kollekvium</h3>
                <div class="form-group">
                    <label>Kollekvium sayı (1-4)</label>
                    <input type="number" id="kollekvium-count" min="1" max="4" placeholder="Kollekvium sayını daxil edin">
                </div>
                <button class="btn" onclick="createKollekviumInputs()">Yarat</button>
                <div id="kollekvium-inputs" class="dynamic-inputs"></div>
            </div>

            <div class="card">
                <h3><i class="fas fa-laptop-code"></i> Sərbəst İş</h3>
                <div class="form-group">
                    <label>Bal (0-10)</label>
                    <input type="number" id="serbest-is" min="0" max="10" step="0.01" placeholder="Sərbəst iş balını daxil edin">
                </div>
            </div>

            <div class="card">
                <h3><i class="fas fa-user-check"></i> Davamiyyət</h3>
                <div class="form-group">
                    <label>Saat seçin</label>
                    <select id="saat">
                        <option value="">Saat seçin</option>
                        <option value="30">30 saat</option>
                        <option value="45">45 saat</option>
                        <option value="60">60 saat</option>
                        <option value="75">75 saat</option>
                        <option value="90">90 saat</option>
                        <option value="105">105 saat</option>
                    </select>
                </div>
                <div class="form-group">
                    <label>Qayıb sayı</label>
                    <input type="number" id="qayib" min="0" placeholder="Qayıb sayını daxil edin">
                </div>
            </div>

            <div style="text-align: center; margin: 20px 0;">
                <button class="btn btn-secondary" onclick="calculateSemester()" style="font-size: 18px; padding: 15px 40px;">
                    <i class="fas fa-check-circle"></i> Hesabla
                </button>
            </div>

            <div id="semester-result" class="result" style="display: none;">
                <h3>Semestr Balınız</h3>
                <div class="score" id="semester-score">0</div>
                <div class="status" id="semester-status">-</div>
            </div>
        </div>

        <!-- GPA CALCULATOR PAGE -->
        <div id="gpa-page" class="page">
            <div class="page-header">
                <h2><i class="fas fa-chart-line"></i> ÜOMG Hesablama</h2>
                <button class="back-btn" onclick="showHome()">
                    <i class="fas fa-arrow-left"></i> Geri
                </button>
            </div>

            <div class="card">
                <h3><i class="fas fa-list-ol"></i> Fənn Sayı</h3>
                <div class="form-group">
                    <label>Neçə fənn var?</label>
                    <input type="number" id="fenn-sayisi" min="1" placeholder="Fənn sayını daxil edin">
                </div>
                <button class="btn" onclick="createGPAFennInputs()">Yarat</button>
            </div>

            <div id="gpa-fenn-inputs"></div>

            <div style="text-align: center; margin: 20px 0;">
                <button class="btn btn-secondary" onclick="calculateGPA()" style="font-size: 18px; padding: 15px 40px;">
                    <i class="fas fa-check-circle"></i> Hesabla
                </button>
            </div>

            <div id="gpa-result" class="result" style="display: none;">
                <h3>ÜOMG Nəticəniz</h3>
                <div class="score" id="gpa-score">0</div>
                <div class="status" id="gpa-status">-</div>
            </div>
        </div>

        <!-- EXAM FEE CALCULATOR PAGE -->
        <div id="exam-fee-page" class="page">
            <div class="page-header">
                <h2><i class="fas fa-money-bill-wave"></i> 25% İmtahan Pulu</h2>
                <button class="back-btn" onclick="showHome()">
                    <i class="fas fa-arrow-left"></i> Geri
                </button>
            </div>

            <div class="card">
                <h3><i class="fas fa-calculator"></i> Kəsr Pulu Hesablama</h3>
                <div class="form-group">
                    <label>İllik ödəniş (AZN)</label>
                    <input type="number" id="illik-odenis" min="0" step="0.01" placeholder="İllik ödənişi daxil edin">
                </div>
                <div class="form-group">
                    <label>Fənnin kredit sayı</label>
                    <input type="number" id="fenn-kredit" min="1" placeholder="Kredit sayını daxil edin">
                </div>
                <button class="btn btn-secondary" onclick="calculateExamFee()" style="font-size: 18px; padding: 15px 40px;">
                    <i class="fas fa-check-circle"></i> Hesabla
                </button>
            </div>

            <div id="exam-fee-result" class="result" style="display: none;">
                <h3>25% İmtahan Pulu</h3>
                <div class="score" id="exam-fee-amount">0</div>
                <div class="status">AZN</div>
            </div>
        </div>

        <!-- AGE CALCULATOR PAGE -->
        <div id="age-page" class="page">
            <div class="page-header">
                <h2><i class="fas fa-birthday-cake"></i> Yaş Hesablayıcı</h2>
                <button class="back-btn" onclick="showHome()">
                    <i class="fas fa-arrow-left"></i> Geri
                </button>
            </div>

            <div class="card">
                <h3><i class="fas fa-calendar-alt"></i> Doğum Tarixi</h3>
                <div class="form-group">
                    <label>Doğum tarixinizi seçin</label>
                    <input type="date" id="birth-date">
                </div>
                <button class="btn btn-secondary" onclick="calculateAge()" style="font-size: 18px; padding: 15px 40px;">
                    <i class="fas fa-check-circle"></i> Hesabla
                </button>
            </div>

            <div id="age-result" class="result" style="display: none;">
                <h3>Yaş Məlumatları</h3>
                <div style="margin: 20px 0;">
                    <p style="font-size: 18px; margin: 10px 0;">
                        <i class="fas fa-hourglass-half"></i> Yaşınız: <strong id="age-years">-</strong>
                    </p>
                    <p style="font-size: 18px; margin: 10px 0;">
                        <i class="fas fa-sun"></i> Yaşadığınız gün: <strong id="age-days">-</strong> gün
                    </p>
                    <p style="font-size: 18px; margin: 10px 0;">
                        <i class="fas fa-gift"></i> Ad gününə qalan: <strong id="age-next">-</strong> gün
                    </p>
                </div>
            </div>
        </div>

        <!-- DICTIONARY PAGE -->
        <div id="dictionary-page" class="page">
            <div class="page-header">
                <h2><i class="fas fa-book"></i> Akademik Lüğət</h2>
                <button class="back-btn" onclick="showHome()">
                    <i class="fas fa-arrow-left"></i> Geri
                </button>
            </div>

            <div class="card">
                <ul class="info-list">
                    <li><strong>Mühazirə</strong> – müəllimin keçdiyi dərs.</li>
                </ul>
            </div>
        </div>

        <!-- INFO PAGE -->
        <div id="info-page" class="page">
            <div class="page-header">
                <h2><i class="fas fa-info-circle"></i> Faydalı Məlumatlar</h2>
                <button class="back-btn" onclick="showHome()">
                    <i class="fas fa-arrow-left"></i> Geri
                </button>
            </div>

            <div class="card">
                <ul class="info-list">
                    <li><strong>Əlaçı olmaq üçün</strong> bütün fənlər 91+ olmalıdır.</li>
                </ul>
            </div>
        </div>

        <!-- LINKS PAGE -->
        <div id="links-page" class="page">
            <div class="page-header">
                <h2><i class="fas fa-link"></i> Sürətli Linklər</h2>
                <button class="back-btn" onclick="showHome()">
                    <i class="fas fa-arrow-left"></i> Geri
                </button>
            </div>

            <div class="card">
                <ul class="link-list">
                    <li>
                        <a href="https://bdu.edu.az" target="_blank" rel="noopener" class="link-item">
                            <i class="fas fa-university"></i>
                            <span>BDU Rəsmi Web Saytı</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://semslogin.bdu.edu.az" target="_blank" rel="noopener" class="link-item">
                            <i class="fas fa-graduation-cap"></i>
                            <span>SemsLogin (Akademik Portal)</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://whatsapp.com/channel/0029Va85Ls85q08WyYoGeJ3r" target="_blank" rel="noopener" class="link-item">
                            <i class="fab fa-whatsapp"></i>
                            <span>BDU WhatsApp Kanalı</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/bdu_eduaz" target="_blank" rel="noopener" class="link-item">
                            <i class="fab fa-instagram"></i>
                            <span>BDU Instagram</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://t.me/bdu_eduaz" target="_blank" rel="noopener" class="link-item">
                            <i class="fab fa-telegram"></i>
                            <span>BDU Telegram</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.instagram.com/desespere_etoile" target="_blank" rel="noopener" class="link-item">
                            <i class="fab fa-instagram"></i>
                            <span>Sayt Sahibinin Instagram</span>
                        </a>
                    </li>
                    <li>
                        <a href="https://t.me/+WUKxtnDjo2E5YTcy" target="_blank" rel="noopener" class="link-item">
                            <i class="fab fa-telegram"></i>
                            <span>Tələbə Chat Qrupu</span>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </div>

    <script src="/static/app.js"></script>
</body>
</html>`)
})

export default app
