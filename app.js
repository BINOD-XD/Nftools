// App Logic for nftools GitHub Demo
document.addEventListener('DOMContentLoaded', () => {
    // Quota state logic (Simulating the daily 3-limit feature)
    let currentQuota = localStorage.getItem('nftools_quota');
    if (currentQuota === null) {
        currentQuota = 3;
        localStorage.setItem('nftools_quota', currentQuota);
    } else {
        currentQuota = parseInt(currentQuota);
    }
    
    updateQuotaUI();

    const btnFetchFree = document.getElementById('btn-fetch-free');
    const btnConvert = document.getElementById('btn-convert');
    const btnCopy = document.getElementById('btn-copy');
    const resultBox = document.getElementById('result-box');
    const outputUrl = document.getElementById('output-url');
    const cookieInput = document.getElementById('cookie-input');

    // 1. Fetch Free Link Trigger
    btnFetchFree.addEventListener('click', () => {
        processGeneration("https://www.netflix.com/your-free-nftoken-link-xyz789");
    });

    // 2. Cookie Converter Trigger
    btnConvert.addEventListener('click', () => {
        const cookieData = cookieInput.value.trim();
        if (!cookieData) {
            alert("⚠️ Please paste valid Netflix cookies first!");
            return;
        }
        processGeneration("https://www.netflix.com/your-custom-nftoken-link-abc123");
    });

    // Core Processing & Quota Management function
    function processGeneration(fakeLink) {
        if (currentQuota <= 0) {
            alert("❌ Daily limit reached! Free users can only generate 3 accounts per day. Wait for reset or upgrade to Premium soon!");
            return;
        }

        // Simulating backend link generation delay
        const originalBtnText = event.currentTarget.innerHTML;
        const activeBtn = event.currentTarget;
        activeBtn.disabled = true;
        activeBtn.innerHTML = `<i class="fa-solid fa-spinner animate-spin"></i> Generating...`;

        setTimeout(() => {
            // Decrease Quota
            currentQuota -= 1;
            localStorage.setItem('nftools_quota', currentQuota);
            updateQuotaUI();

            // Display Link Output
            outputUrl.value = fakeLink;
            resultBox.classList.remove('hidden');
            resultBox.scrollIntoView({ behavior: 'smooth' });

            // Restore button state
            activeBtn.disabled = false;
            activeBtn.innerHTML = originalBtnText;
        }, 1200);
    }

    // Update Quota display on UI
    function updateQuotaUI() {
        document.getElementById('quota-count').innerText = currentQuota;
    }

    // 3. Copy Button Logic
    btnCopy.addEventListener('click', () => {
        outputUrl.select();
        outputUrl.setSelectionRange(0, 99999); // For mobile devices
        navigator.clipboard.writeText(outputUrl.value);
        
        const originalCopyText = btnCopy.innerHTML;
        btnCopy.innerHTML = `<i class="fa-solid fa-check text-emerald-400"></i> Copied!`;
        btnCopy.classList.add('bg-zinc-700');
        
        setTimeout(() => {
            btnCopy.innerHTML = originalCopyText;
            btnCopy.classList.remove('bg-zinc-700');
        }, 2000);
    });
});
