(function () {
  // 1. Cek apakah panel sudah ada? Kalau ada, jangan buat lagi.
  if (document.getElementById('ghoodev-panel')) {
    alert('Panel sudah aktif, cek pojok kanan bawah!');
    return;
  }

  // 2. Buat Element Container Panel
  const panel = document.createElement('div');
  panel.id = 'ghoodev-panel';
  panel.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 300px;
        background-color: #1e1e2e; /* Catppuccin like dark */
        color: #cdd6f4;
        border: 1px solid #fab387;
        border-radius: 12px;
        padding: 20px;
        z-index: 99999;
        font-family: 'Segoe UI', sans-serif;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    `;

  // 3. Isi HTML Panel
  panel.innerHTML = `
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:15px;">
            <h3 style="margin:0; font-size:18px; font-weight:bold; color:#fab387;">🤖 Auto Kuesioner</h3>
            <button id="ghoodev-close" style="background:none; border:none; color:#f38ba8; cursor:pointer; font-weight:bold;">✕</button>
        </div>
        
        <div style="margin-bottom: 15px;">
            <label style="display:block; margin-bottom:8px; cursor:pointer;">
                <input type="radio" name="ghoodev-mode" value="safe" checked> 
                🛡️ <strong>Mode Aman</strong> <br>
                <small style="color:#a6adc8; margin-left: 22px;">Random nilai 3 (Baik) & 4 (Sangat Baik)</small>
            </label>
            <label style="display:block; cursor:pointer;">
                <input type="radio" name="ghoodev-mode" value="perfect"> 
                🚀 <strong>Mode Cari Muka</strong> <br>
                <small style="color:#a6adc8; margin-left: 22px;">Rata kanan (Semua nilai 4)</small>
            </label>
        </div>

        <button id="ghoodev-run" style="
            width: 100%;
            padding: 10px;
            background-color: #89b4fa;
            color: #11111b;
            border: none;
            border-radius: 6px;
            font-weight: bold;
            cursor: pointer;
            transition: 0.2s;
        ">JALANKAN ISI OTOMATIS</button>
        
        <div id="ghoodev-status" style="margin-top:10px; font-size:12px; text-align:center; color:#a6adc8;">Siap dieksekusi...</div>
    `;

  document.body.appendChild(panel);

  // 4. Logic Utama (Fungsi Pengisi)
  function runAutomation() {
    const mode = document.querySelector('input[name="ghoodev-mode"]:checked').value;
    const statusEl = document.getElementById('ghoodev-status');

    // Ambil semua grup radio
    const radioGroups = [...new Set(Array.from(document.querySelectorAll('input[type="radio"]')).map(el => el.name))];
    let filledCount = 0;

    radioGroups.forEach(groupName => {
      const inputs = Array.from(document.querySelectorAll(`input[name="${groupName}"]`));

      // Filter target berdasarkan mode
      let targetInputs = [];

      if (mode === 'safe') {
        // Ambil yg poin 3 atau 4
        targetInputs = inputs.filter(input => input.value.includes('"poin":3') || input.value.includes('"poin":4'));
      } else {
        // Ambil yg poin 4 saja
        targetInputs = inputs.filter(input => input.value.includes('"poin":4'));
      }

      // Eksekusi Klik
      if (targetInputs.length > 0) {
        const randomIndex = Math.floor(Math.random() * targetInputs.length);
        targetInputs[randomIndex].click();
        filledCount++;
      }
    });

    statusEl.innerHTML = `✅ Sukses mengisi <b>${filledCount}</b> pertanyaan!`;
    statusEl.style.color = "#a6e3a1";
  }

  // 5. Event Listeners
  document.getElementById('ghoodev-run').onclick = runAutomation;
  document.getElementById('ghoodev-close').onclick = function () {
    panel.remove();
  };

})();