// Main JavaScript for DoubleClips Homepage
// Handles template preview loading on homepage

document.addEventListener('DOMContentLoaded', () => {
    loadTemplatePreview();
});

/**
 * Load a few templates for the homepage preview section
 */
async function loadTemplatePreview() {
    const container = document.getElementById('template-preview');
    if (!container) return;

    try {
        const response = await fetch('/doubleclips/api/fetch-templates');
        const templates = await response.json();

        if (!Array.isArray(templates) || templates.length === 0) {
            container.innerHTML = '<p style="text-align: center; color: var(--color-text-muted);">No templates available yet.</p>';
            return;
        }

        // Show only first 4 templates for preview
        const previewTemplates = templates.slice(0, 4);

        container.innerHTML = previewTemplates.map(template => `
            <div class="card" style="cursor: pointer; overflow: hidden; padding: 0;" onclick="window.location.href='template/index.html?id=${template.templateId}&author=${template.templateAuthor}'">
                <img 
                    src="${template.templateSnapshotLink}" 
                    alt="${escapeHtml(template.templateTitle)}"
                    style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius-lg) var(--radius-lg) 0 0;"
                    onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%231a1a28%22 width=%22400%22 height=%22300%22/%3E%3Ctext fill=%22%237a7a92%22 font-family=%22sans-serif%22 font-size=%2218%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3ENo Image%3C/text%3E%3C/svg%3E'"
                >
                <div style="padding: var(--space-md);">
                    <h4 style="margin-bottom: 0.5rem; font-size: 1rem;">${highlightHashtags(template.templateTitle)}</h4>
                    <p style="font-size: 0.85rem; color: var(--color-text-muted); margin: 0;">by ${escapeHtml(template.templateAuthor)}</p>
                </div>
            </div>
        `).join('');

    } catch (error) {
        console.error('Error loading templates:', error);
        container.innerHTML = '<p style="text-align: center; color: var(--color-text-muted);">Failed to load templates.</p>';
    }
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
