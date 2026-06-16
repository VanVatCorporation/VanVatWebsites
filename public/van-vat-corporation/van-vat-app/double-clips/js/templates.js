// Templates Gallery Page JavaScript
// Handles staggered grid layout, search, and filtering

let allTemplates = [];
let filteredTemplates = [];

document.addEventListener('DOMContentLoaded', () => {
    initializeTemplatesPage();
});

/**
 * Initialize the templates page
 */
async function initializeTemplatesPage() {
    await loadAllTemplates();
    setupSearchAndFilters();
}

/**
 * Load all templates from the API
 */
async function loadAllTemplates() {
    const container = document.getElementById('templates-container');

    try {
        const response = await fetch('/doubleclips/api/fetch-templates');
        const templates = await response.json();

        if (!Array.isArray(templates) || templates.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--color-text-muted); grid-column: 1 / -1;">No templates available yet.</p>';
            return;
        }

        allTemplates = templates;
        filteredTemplates = templates;
        renderTemplates(templates);

    } catch (error) {
        console.error('Error loading templates:', error);
        container.innerHTML = '<p style="text-align: center; color: var(--color-text-muted); grid-column: 1 / -1;">Failed to load templates.</p>';
    }
}

/**
 * Render templates in staggered grid layout
 * @param {Array} templates - Array of template objects
 */
function renderTemplates(templates) {
    const container = document.getElementById('templates-container');

    if (templates.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--color-text-muted); grid-column: 1 / -1;">No templates found.</p>';
        return;
    }

    container.innerHTML = templates.map(template => `
        <div class="staggered-grid-item template-card" onclick="navigateToTemplate('${template.templateId}', '${template.templateAuthor}')">
            <img 
                src="${template.templateSnapshotLink}" 
                alt="${escapeHtml(template.templateTitle)}"
                loading="lazy"
                onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22600%22%3E%3Crect fill=%22%231a1a28%22 width=%22400%22 height=%22600%22/%3E%3Ctext fill=%22%237a7a92%22 font-family=%22sans-serif%22 font-size=%2218%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3ENo Image%3C/text%3E%3C/svg%3E'"
            >
            <div class="template-stats-overlay">
                <div class="stat-item">
                    <span>👁️</span>
                    <span>${formatCount(template.viewCount || 0)}</span>
                </div>
                <div class="stat-item">
                    <span>❤️</span>
                    <span>${formatCount(template.heartCount || 0)}</span>
                </div>
                <div class="stat-item">
                    <span>🎬</span>
                    <span>${formatCount(template.useCount || 0)}</span>
                </div>
            </div>
            <div class="template-overlay">
                <div class="template-title">${highlightHashtags(template.templateTitle)}</div>
                <div class="template-author">by ${escapeHtml(template.templateAuthor)}</div>
            </div>
        </div>
    `).join('');
}

/**
 * Navigate to template detail page
 * @param {string} templateId - Template ID
 * @param {string} author - Template author
 */
function navigateToTemplate(templateId, author) {
    window.location.href = `../template/index.html?id=${templateId}&author=${author}`;
}

/**
 * Setup search and filter functionality
 */
function setupSearchAndFilters() {
    // Search functionality
    const searchInput = document.getElementById('search-input');
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        filteredTemplates = allTemplates.filter(template =>
            template.templateTitle.toLowerCase().includes(searchTerm) ||
            template.templateDescription.toLowerCase().includes(searchTerm) ||
            template.templateAuthor.toLowerCase().includes(searchTerm)
        );
        renderTemplates(filteredTemplates);
    });

    // Filter tabs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active state
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Filter templates
            const filter = tab.dataset.filter;
            filterTemplates(filter);
        });
    });
}

/**
 * Filter templates based on category
 * @param {string} filter - Filter type (all, trending, new, popular)
 */
function filterTemplates(filter) {
    const searchInput = document.getElementById('search-input');
    searchInput.value = ''; // Clear search

    switch (filter) {
        case 'all':
            filteredTemplates = allTemplates;
            break;
        case 'trending':
            // Sort by recent and popular (simplified)
            filteredTemplates = [...allTemplates].sort((a, b) => b.templateTimestamp - a.templateTimestamp);
            break;
        case 'new':
            // Sort by newest first
            filteredTemplates = [...allTemplates].sort((a, b) => b.templateTimestamp - a.templateTimestamp);
            break;
        case 'popular':
            // Sort by oldest (as a placeholder for popularity)
            filteredTemplates = [...allTemplates].sort((a, b) => a.templateTimestamp - b.templateTimestamp);
            break;
        default:
            filteredTemplates = allTemplates;
    }

    renderTemplates(filteredTemplates);
}

/**
 * Highlight hashtags in text by wrapping them in <strong> tags
 * @param {string} text - Text containing hashtags
 * @returns {string} HTML with hashtags highlighted
 */
function highlightHashtags(text) {
    if (!text) return '';
    // Match hashtags (# followed by alphanumeric characters)
    return escapeHtml(text).replace(/#(\w+)/g, '<strong class="hashtag">#$1</strong>');
}

/**
 * Escape HTML to prevent XSS
 * @param {string} text - Text to escape
 * @returns {string} Escaped text
 */
function escapeHtml(text) {
    if (!text) return '';
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

/**
 * Format large numbers with K/M suffix
 * @param {number} count - Number to format
 * @returns {string} Formatted number
 */
function formatCount(count) {
    if (count >= 1000000) return (count / 1000000).toFixed(1) + 'M';
    if (count >= 1000) return (count / 1000).toFixed(1) + 'K';
    return count.toString();
}
