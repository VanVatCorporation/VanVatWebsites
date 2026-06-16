document.addEventListener('DOMContentLoaded', () => {
    const detectedContainer = document.getElementById('detected-platform-container');
    const releasesTbody = document.getElementById('releases-tbody');
    const filterButtons = document.querySelectorAll('#platform-filter button');
    
    let allReleases = {};

    // 1. Detect Platform
    const platform = detectPlatform();
    
    // 2. Fetch Releases
    fetchReleases(platform);

    // 3. Event Listeners for Filters
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderOlderReleases(btn.dataset.filter);
        });
    });

    function detectPlatform() {
        const ua = navigator.userAgent;
        if (ua.indexOf('Mac') !== -1) return 'macOS';
        if (ua.indexOf('Win') !== -1) return 'Windows';
        if (ua.indexOf('Android') !== -1) return 'Android';
        return 'unknown';
    }

    async function fetchReleases(currentPlatform) {
        try {
            const response = await fetch('/doubleclips/api/fetch-releases');
            const data = await response.json();
            allReleases = data;

            updateLatestButtons(data);
            renderDetectedPlatform(currentPlatform, data);
            renderOlderReleases('all');
        } catch (error) {
            console.error('Error fetching releases:', error);
            releasesTbody.innerHTML = '<tr><td colspan="5" class="text-center">Error loading releases. Please try again later.</td></tr>';
        }
    }

    function updateLatestButtons(data) {
        // macOS
        if (data.macOS?.latest) {
            document.getElementById('mac-version').textContent = `Latest: ${data.macOS.latest.filename}`;
            document.getElementById('mac-download-btn').href = `/doubleclips/api/download/macOS/${data.macOS.latest.filename}`;
        }
        
        // Windows
        if (data.Windows?.latest) {
            document.getElementById('win-version').textContent = `Latest: ${data.Windows.latest.filename}`;
            document.getElementById('win-download-btn').href = `/doubleclips/api/download/Windows/${data.Windows.latest.filename}`;
        }

        // Android
        if (data.Android?.latest) {
            document.getElementById('android-version').textContent = `Latest: ${data.Android.latest.filename}`;
            document.getElementById('android-download-btn').href = `/doubleclips/api/download/Android/${data.Android.latest.filename}`;
        }
    }

    function renderDetectedPlatform(platform, data) {
        if (platform === 'unknown') {
            detectedContainer.innerHTML = `
                <div class="platform-badge">System Detection</div>
                <h2>Ready to Download</h2>
                <p>Choose your platform below to get started with DoubleClips.</p>
            `;
            return;
        }

        const platformData = data[platform];
        const icon = getPlatformIcon(platform);
        
        if (platformData?.latest) {
            detectedContainer.innerHTML = `
                <div class="platform-badge">Recommended for You</div>
                <div class="flex flex-col items-center gap-md">
                    <span style="font-size: 4rem;">${icon}</span>
                    <div>
                        <h2>DoubleClips for ${platform}</h2>
                        <p class="version-info">Version: ${platformData.latest.filename} • Released: ${new Date(platformData.latest.date).toLocaleDateString()}</p>
                    </div>
                    <a href="/doubleclips/api/download/${platform}/${platformData.latest.filename}" class="btn btn-primary btn-large">
                        Download for ${platform}
                    </a>
                </div>
            `;
        } else {
             detectedContainer.innerHTML = `
                <div class="platform-badge">Recommended for You</div>
                <h2>DoubleClips for ${platform}</h2>
                <p>Latest version coming soon for ${platform}. Check other platforms below.</p>
            `;
        }
    }

    function renderOlderReleases(filter) {
        let releases = [];
        
        if (filter === 'all') {
            Object.keys(allReleases).forEach(p => {
                if (allReleases[p].latest) releases.push({ ...allReleases[p].latest, platform: p, isLatest: true });
                allReleases[p].older.forEach(r => releases.push({ ...r, platform: p, isLatest: false }));
            });
        } else {
            const p = filter;
            if (allReleases[p]?.latest) releases.push({ ...allReleases[p].latest, platform: p, isLatest: true });
            if (allReleases[p]?.older) {
                allReleases[p].older.forEach(r => releases.push({ ...r, platform: p, isLatest: false }));
            }
        }

        // Sort by date newest first
        releases.sort((a, b) => new Date(b.date) - new Date(a.date));

        if (releases.length === 0) {
            releasesTbody.innerHTML = '<tr><td colspan="5" class="text-center">No releases found.</td></tr>';
            return;
        }

        releasesTbody.innerHTML = releases.map(r => `
            <tr>
                <td>
                    ${r.filename}
                    ${r.isLatest ? '<span class="tag-latest">Latest</span>' : ''}
                </td>
                <td>${r.platform}</td>
                <td>${new Date(r.date).toLocaleDateString()}</td>
                <td>${formatBytes(r.size)}</td>
                <td>
                    <a href="/doubleclips/api/download/${r.platform}/${r.filename}" class="btn btn-secondary btn-sm">Download</a>
                </td>
            </tr>
        `).join('');
    }

    function getPlatformIcon(platform) {
        switch (platform) {
            case 'macOS': return '🍎';
            case 'Windows': return '🪟';
            case 'Android': return '🤖';
            default: return '💻';
        }
    }

    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return '0 Bytes';
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
    }
});
