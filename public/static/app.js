// PWA Installation
let deferredPrompt;
const installContainer = document.getElementById('install-container');
const installBtn = document.getElementById('install-btn');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  if (installContainer) {
    installContainer.classList.add('show');
  }
});

if (installBtn) {
  installBtn.addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`User response: ${outcome}`);
      deferredPrompt = null;
      if (installContainer) {
        installContainer.classList.remove('show');
      }
    }
  });
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('ServiceWorker registered:', registration);
      })
      .catch((error) => {
        console.log('ServiceWorker registration failed:', error);
      });
  });
}

// Page Navigation
function showPage(pageId) {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Hide home
  const home = document.getElementById('home');
  if (home) home.style.display = 'none';
  
  // Hide info footer on other pages
  const infoFooter = document.getElementById('info-footer');
  if (infoFooter) infoFooter.style.display = 'none';
  
  // Hide install container on other pages
  if (installContainer) installContainer.style.display = 'none';
  
  // Show selected page
  const page = document.getElementById(pageId);
  if (page) page.classList.add('active');
}

function showHome() {
  // Hide all pages
  document.querySelectorAll('.page').forEach(page => {
    page.classList.remove('active');
  });
  
  // Show home
  const home = document.getElementById('home');
  if (home) home.style.display = 'block';
  
  // Show info footer
  const infoFooter = document.getElementById('info-footer');
  if (infoFooter) infoFooter.style.display = 'block';
  
  // Show install container
  if (installContainer && deferredPrompt) {
    installContainer.style.display = 'block';
  }
  
  // Reset all calculators
  resetAllCalculators();
}

// Info Button Toggle
function toggleInfo() {
  const infoText = document.getElementById('info-text');
  if (infoText) {
    infoText.classList.toggle('show');
  }
}

// Reset Functions
function resetAllCalculators() {
  // Reset semester calculator
  if (document.getElementById('seminar-inputs')) {
    document.getElementById('seminar-inputs').innerHTML = '';
  }
  if (document.getElementById('kollekvium-inputs')) {
    document.getElementById('kollekvium-inputs').innerHTML = '';
  }
  if (document.getElementById('semester-result')) {
    document.getElementById('semester-result').style.display = 'none';
  }
  
  // Reset GPA calculator
  if (document.getElementById('fenn-sayisi')) {
    document.getElementById('fenn-sayisi').value = '';
  }
  if (document.getElementById('gpa-fenn-inputs')) {
    document.getElementById('gpa-fenn-inputs').innerHTML = '';
  }
  if (document.getElementById('gpa-result')) {
    document.getElementById('gpa-result').style.display = 'none';
  }
  
  // Reset exam fee calculator
  if (document.getElementById('exam-fee-result')) {
    document.getElementById('exam-fee-result').style.display = 'none';
  }
  
  // Reset age calculator
  if (document.getElementById('age-result')) {
    document.getElementById('age-result').style.display = 'none';
  }
}

// 1. SEMESTER CALCULATOR
function createSeminarInputs() {
  const count = parseInt(document.getElementById('seminar-count').value);
  const container = document.getElementById('seminar-inputs');
  
  if (!count || count < 1 || count > 9) {
    alert('Seminar sayı 1-9 arasında olmalıdır');
    return;
  }
  
  container.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.max = '10';
    input.step = '0.01';
    input.placeholder = `Seminar ${i}`;
    input.className = 'seminar-input';
    container.appendChild(input);
  }
}

function createKollekviumInputs() {
  const count = parseInt(document.getElementById('kollekvium-count').value);
  const container = document.getElementById('kollekvium-inputs');
  
  if (!count || count < 1 || count > 4) {
    alert('Kollekvium sayı 1-4 arasında olmalıdır');
    return;
  }
  
  container.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const input = document.createElement('input');
    input.type = 'number';
    input.min = '0';
    input.max = '10';
    input.step = '0.01';
    input.placeholder = `Kollekvium ${i}`;
    input.className = 'kollekvium-input';
    container.appendChild(input);
  }
}

function calculateDavamiyyetBali(saat, qayib) {
  const rules = {
    30: { 0: 10, 1: 9, 2: 9, 3: 8, 4: 'kəsr' },
    45: { 0: 10, 1: 10, 2: 9, 3: 9, 4: 9, 5: 8, 6: 'kəsr' },
    60: { 0: 10, 1: 10, 2: 9, 3: 9, 4: 9, 5: 8, 6: 8, 7: 8, 8: 'kəsr' },
    75: { 0: 10, 1: 10, 2: 9, 3: 9, 4: 9, 5: 9, 6: 8, 7: 8, 8: 8, 9: 8, 10: 'kəsr' },
    90: { 0: 10, 1: 10, 2: 10, 3: 9, 4: 9, 5: 9, 6: 9, 7: 8, 8: 8, 9: 8, 10: 8, 11: 8, 12: 'kəsr' },
    105: { 0: 10, 1: 10, 2: 10, 3: 9, 4: 9, 5: 9, 6: 9, 7: 9, 8: 8, 9: 8, 10: 8, 11: 8, 12: 8, 13: 8, 14: 'kəsr' }
  };
  
  if (rules[saat] && rules[saat][qayib] !== undefined) {
    return rules[saat][qayib];
  }
  
  // If more absences than maximum, it's "kəsr"
  return 'kəsr';
}

function calculateSemester() {
  // Get seminar values
  const seminarInputs = document.querySelectorAll('.seminar-input');
  const seminarValues = Array.from(seminarInputs).map(input => parseFloat(input.value) || 0);
  
  if (seminarValues.length === 0) {
    alert('Seminar ballarını daxil edin');
    return;
  }
  
  // Get kollekvium values
  const kollekviumInputs = document.querySelectorAll('.kollekvium-input');
  const kollekviumValues = Array.from(kollekviumInputs).map(input => parseFloat(input.value) || 0);
  
  if (kollekviumValues.length === 0) {
    alert('Kollekvium ballarını daxil edin');
    return;
  }
  
  // Get sərbəst iş
  const serbest = parseFloat(document.getElementById('serbest-is').value) || 0;
  if (serbest < 0 || serbest > 10) {
    alert('Sərbəst iş balı 0-10 arasında olmalıdır');
    return;
  }
  
  // Get davamiyyət
  const saat = parseInt(document.getElementById('saat').value);
  const qayib = parseInt(document.getElementById('qayib').value) || 0;
  
  if (!saat) {
    alert('Saat seçin');
    return;
  }
  
  const davamiyyetBal = calculateDavamiyyetBali(saat, qayib);
  
  if (davamiyyetBal === 'kəsr') {
    displaySemesterResult(0, 'KƏSR - Davamiyyət balı itirilib', true);
    return;
  }
  
  // Calculate averages
  const seminarOrta = seminarValues.reduce((a, b) => a + b, 0) / seminarValues.length;
  const kollekviumOrta = kollekviumValues.reduce((a, b) => a + b, 0) / kollekviumValues.length;
  
  // Calculate semester score
  const semesterBali = (seminarOrta * 0.4 + kollekviumOrta * 0.6) * 3 + davamiyyetBal + serbest;
  const finalScore = Math.min(semesterBali, 50); // Maximum 50
  
  // Determine status
  let status = '';
  if (finalScore === 0) {
    status = '0 BAL';
  } else if (finalScore >= 50) {
    status = 'MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ';
  } else if (finalScore >= 45) {
    status = 'ÇOX YAXŞI';
  } else if (finalScore >= 41) {
    status = 'YAXŞI';
  } else if (finalScore >= 36) {
    status = 'KAFİ';
  } else if (finalScore >= 26) {
    status = 'ZƏİF';
  } else {
    status = 'YAXŞI OLACAQ';
  }
  
  displaySemesterResult(finalScore.toFixed(2), status);
}

function displaySemesterResult(score, status, isKəsr = false) {
  const resultDiv = document.getElementById('semester-result');
  const scoreSpan = document.getElementById('semester-score');
  const statusSpan = document.getElementById('semester-status');
  
  scoreSpan.textContent = isKəsr ? '-' : score;
  statusSpan.textContent = status;
  resultDiv.style.display = 'block';
  
  // Scroll to result
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 2. GPA CALCULATOR (ÜOMG)
function createGPAFennInputs() {
  const count = parseInt(document.getElementById('fenn-sayisi').value);
  const container = document.getElementById('gpa-fenn-inputs');
  
  if (!count || count < 1) {
    alert('Fənn sayını daxil edin (minimum 1)');
    return;
  }
  
  container.innerHTML = '';
  for (let i = 1; i <= count; i++) {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = `
      <h3>Fənn ${i}</h3>
      <div class="form-group">
        <label>Bal (0-100)</label>
        <input type="number" class="gpa-bal" min="0" max="100" step="0.01" placeholder="Bal daxil edin">
      </div>
      <div class="form-group">
        <label>Kredit</label>
        <input type="number" class="gpa-kredit" min="1" step="1" placeholder="Kredit daxil edin">
      </div>
    `;
    container.appendChild(div);
  }
}

function calculateGPA() {
  const balInputs = document.querySelectorAll('.gpa-bal');
  const kreditInputs = document.querySelectorAll('.gpa-kredit');
  
  if (balInputs.length === 0) {
    alert('Fənn məlumatlarını daxil edin');
    return;
  }
  
  let totalWeighted = 0;
  let totalKredit = 0;
  
  for (let i = 0; i < balInputs.length; i++) {
    const bal = parseFloat(balInputs[i].value) || 0;
    const kredit = parseFloat(kreditInputs[i].value) || 0;
    
    if (bal < 0 || bal > 100) {
      alert(`Fənn ${i + 1}: Bal 0-100 arasında olmalıdır`);
      return;
    }
    
    if (kredit < 1) {
      alert(`Fənn ${i + 1}: Kredit minimum 1 olmalıdır`);
      return;
    }
    
    totalWeighted += bal * kredit;
    totalKredit += kredit;
  }
  
  if (totalKredit === 0) {
    alert('Kredit məlumatları düzgün deyil');
    return;
  }
  
  const gpa = totalWeighted / totalKredit;
  
  // Determine status
  let status = '';
  if (gpa === 0) {
    status = '0 BAL';
  } else if (gpa >= 91) {
    status = 'MÜVƏFFƏQİYYƏTLƏ KEÇDİNİZ';
  } else if (gpa >= 81) {
    status = 'ÇOX YAXŞI';
  } else if (gpa >= 71) {
    status = 'YAXŞI';
  } else if (gpa >= 61) {
    status = 'KAFİ';
  } else if (gpa >= 51) {
    status = 'ZƏİF';
  } else {
    status = 'YAXŞI OLACAQ';
  }
  
  displayGPAResult(gpa.toFixed(2), status);
}

function displayGPAResult(score, status) {
  const resultDiv = document.getElementById('gpa-result');
  const scoreSpan = document.getElementById('gpa-score');
  const statusSpan = document.getElementById('gpa-status');
  
  scoreSpan.textContent = score;
  statusSpan.textContent = status;
  resultDiv.style.display = 'block';
  
  // Scroll to result
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 3. EXAM FEE CALCULATOR (25 faiz - kəsr pulu)
function calculateExamFee() {
  const illikOdenis = parseFloat(document.getElementById('illik-odenis').value);
  const kredit = parseFloat(document.getElementById('fenn-kredit').value);
  
  if (!illikOdenis || illikOdenis <= 0) {
    alert('İllik ödənişi daxil edin');
    return;
  }
  
  if (!kredit || kredit <= 0) {
    alert('Fənnin kredit sayını daxil edin');
    return;
  }
  
  const fee = ((illikOdenis / 60) * kredit) / 4 + 1;
  
  displayExamFeeResult(fee.toFixed(2));
}

function displayExamFeeResult(fee) {
  const resultDiv = document.getElementById('exam-fee-result');
  const feeSpan = document.getElementById('exam-fee-amount');
  
  feeSpan.textContent = fee;
  resultDiv.style.display = 'block';
  
  // Scroll to result
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// 4. AGE CALCULATOR
function calculateAge() {
  const dateInput = document.getElementById('birth-date').value;
  
  if (!dateInput) {
    alert('Doğum tarixini daxil edin');
    return;
  }
  
  const birthDate = new Date(dateInput);
  const today = new Date();
  
  // Validate date
  if (birthDate > today) {
    alert('Doğum tarixi gələcəkdə ola bilməz');
    return;
  }
  
  // Calculate age
  let years = today.getFullYear() - birthDate.getFullYear();
  let months = today.getMonth() - birthDate.getMonth();
  let days = today.getDate() - birthDate.getDate();
  
  if (days < 0) {
    months--;
    const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += prevMonth.getDate();
  }
  
  if (months < 0) {
    years--;
    months += 12;
  }
  
  // Calculate total days lived
  const oneDay = 24 * 60 * 60 * 1000;
  const totalDays = Math.floor((today - birthDate) / oneDay);
  
  // Calculate next birthday
  let nextBirthday = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }
  const daysToNextBirthday = Math.ceil((nextBirthday - today) / oneDay);
  
  displayAgeResult(years, months, days, totalDays, daysToNextBirthday);
}

function displayAgeResult(years, months, days, totalDays, daysToNext) {
  const resultDiv = document.getElementById('age-result');
  
  document.getElementById('age-years').textContent = `${years} il, ${months} ay, ${days} gün`;
  document.getElementById('age-days').textContent = totalDays.toLocaleString();
  document.getElementById('age-next').textContent = daysToNext;
  
  resultDiv.style.display = 'block';
  
  // Scroll to result
  resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}
