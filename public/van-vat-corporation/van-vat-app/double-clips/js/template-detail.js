// Template Detail Page JavaScript
// Handles loading and displaying individual template details

document.addEventListener('DOMContentLoaded', () => {
    loadTemplateDetail();
});

/**
 * Load template detail from URL parameters
 */
async function loadTemplateDetail() {
    // Get template ID and author from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const templateId = urlParams.get('id');
    const author = urlParams.get('author');

    if (!templateId || !author) {
        showError('Template not found. Missing ID or author.');
        return;
    }

    try {
        // Fetch all templates (we could optimize this with a specific endpoint)
        const response = await fetch('/doubleclips/api/fetch-templates');
        const templates = await response.json();

        if (!Array.isArray(templates)) {
            showError('Failed to load template data.');
            return;
        }

        // Find the specific template
        const template = templates.find(t => t.templateId === templateId && t.templateAuthor === author);

        if (!template) {
            showError('Template not found.');
            return;
        }

        // Display template
        displayTemplate(template);

        // Load related templates
        loadRelatedTemplates(templates, template);

    } catch (error) {
        console.error('Error loading template:', error);
        showError('Failed to load template.');
    }
}

/**
 * Display template information
 * @param {Object} template - Template object
 */
function displayTemplate(template) {
    // Hide loading state
    document.getElementById('loading-state').style.display = 'none';
    document.getElementById('template-content').style.display = 'block';

    // Update page title
    document.getElementById('page-title').textContent = `${template.templateTitle} - DoubleClips`;

    // Set video source
    const video = document.getElementById('template-video');
    video.src = template.templateVideoLink;

    // Set title with hashtag highlighting
    document.getElementById('template-title').innerHTML = highlightHashtags(template.templateTitle);

    // Set description with hashtag highlighting
    document.getElementById('template-description').innerHTML = highlightHashtags(template.templateDescription);

    // Set metadata
    document.getElementById('template-author').textContent = template.templateAuthor;
    document.getElementById('template-clips').textContent = template.templateTotalClip || 'N/A';

    // Format date
    const date = new Date(template.templateTimestamp);
    const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    document.getElementById('template-date').textContent = formattedDate;

    // Display stats
    displayStats(template);

    // Track view
    incrementViewCount(template.templateId, template.templateAuthor);

    // Load comments
    loadComments(template.templateId, template.templateAuthor);
}

/**
 * Load related templates (excluding current template)
 * @param {Array} allTemplates - All templates
 * @param {Object} currentTemplate - Current template
 */
function loadRelatedTemplates(allTemplates, currentTemplate) {
    const container = document.getElementById('related-templates-grid');

    // Filter out current template and get random 4 templates
    const relatedTemplates = allTemplates
        .filter(t => t.templateId !== currentTemplate.templateId)
        .sort(() => Math.random() - 0.5)
        .slice(0, 4);

    if (relatedTemplates.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--color-text-muted); grid-column: 1 / -1;">No related templates found.</p>';
        return;
    }

    container.innerHTML = relatedTemplates.map(template => `
        <div class="related-template-card" onclick="navigateToTemplate('${template.templateId}', '${template.templateAuthor}')">
            <img 
                src="${template.templateSnapshotLink}" 
                alt="${escapeHtml(template.templateTitle)}"
                loading="lazy"
                onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22600%22%3E%3Crect fill=%22%231a1a28%22 width=%22400%22 height=%22600%22/%3E%3Ctext fill=%22%237a7a92%22 font-family=%22sans-serif%22 font-size=%2218%22 x=%2250%25%22 y=%2250%25%22 text-anchor=%22middle%22 dominant-baseline=%22middle%22%3ENo Image%3C/text%3E%3C/svg%3E'"
            >
            <div style="position: absolute; bottom: 0; left: 0; right: 0; background: var(--gradient-overlay); padding: var(--space-sm);">
                <div style="font-size: 0.9rem; font-weight: 600; color: white;">${highlightHashtags(template.templateTitle)}</div>
            </div>
        </div>
    `).join('');
}

/**
 * Navigate to another template
 * @param {string} templateId - Template ID
 * @param {string} author - Template author
 */
function navigateToTemplate(templateId, author) {
    window.location.href = `index.html?id=${templateId}&author=${author}`;
}

/**
 * Show error message
 * @param {string} message - Error message
 */
function showError(message) {
    const loadingState = document.getElementById('loading-state');
    loadingState.innerHTML = `
        <div style="text-align: center; padding: var(--space-3xl);">
            <h2 style="color: var(--color-text-secondary); margin-bottom: var(--space-md);">⚠️ ${escapeHtml(message)}</h2>
            <a href="../templates/index.html" class="btn btn-primary">Back to Templates</a>
        </div>
    `;
}

/**
 * Highlight hashtags in text by wrapping them in <strong> tags
 * @param {string} text - Text containing hashtags
 * @returns {string} HTML with hashtags highlighted
 */
function highlightHashtags(text) {
    if (!text) return '';
    // Match hashtags (# followed by alphanumeric characters and underscores)
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

/**
 * Display template statistics
 * @param {Object} template - Template object
 */
function displayStats(template) {
    document.getElementById('stat-views').textContent = formatCount(template.viewCount || 0);
    document.getElementById('stat-hearts').textContent = formatCount(template.heartCount || 0);
    document.getElementById('stat-uses').textContent = formatCount(template.useCount || 0);
    document.getElementById('stat-bookmarks').textContent = formatCount(template.bookmarkCount || 0);
    document.getElementById('stat-comments').textContent = formatCount(template.commentCount || 0);
}

/**
 * Increment view count for template
 * @param {string} templateId - Template ID
 * @param {string} author - Template author
 */
async function incrementViewCount(templateId, author) {
    try {
        const response = await fetch('/doubleclips/api/increment-view', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ templateId })
        });
        const data = await response.json();
        if (data.newViewCount !== undefined) {
            document.getElementById('stat-views').textContent = formatCount(data.newViewCount);
        }
    } catch (error) {
        console.error('Error incrementing view count:', error);
    }
}

// Global variables for comments
let currentTemplateId = '';
let currentTemplateAuthor = '';
let currentUsername = 'Guest'; // TODO: Get from authentication

/**
 * Load comments for a template
 * @param {string} templateId - Template ID
 * @param {string} author - Template author
 */
async function loadComments(templateId, author) {
    currentTemplateId = templateId;
    currentTemplateAuthor = author;

    try {
        const response = await fetch(`/doubleclips/api/fetch-comments/${templateId}`);
        const data = await response.json();

        if (data.returnResult === 'Success') {
            renderComments(data.comments);
        } else {
            document.getElementById('comments-list').innerHTML = '<p style="text-align: center; color: var(--color-text-muted);">No comments yet. Be the first to comment!</p>';
        }
    } catch (error) {
        console.error('Error loading comments:', error);
        document.getElementById('comments-list').innerHTML = '<p style="text-align: center; color: var(--color-text-muted);">Failed to load comments.</p>';
    }
}

/**
 * Render comments list
 * @param {Array} comments - Array of comment objects
 */
function renderComments(comments) {
    const container = document.getElementById('comments-list');

    if (!comments || comments.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--color-text-muted);">No comments yet. Be the first to comment!</p>';
        return;
    }

    // Separate root comments and replies
    const rootComments = comments.filter(c => !c.replyToCommentId);
    const replies = comments.filter(c => c.replyToCommentId);

    container.innerHTML = rootComments.map(comment => {
        const commentReplies = replies.filter(r => r.replyToCommentId === comment.commentId);
        return renderCommentItem(comment, commentReplies);
    }).join('');
}

/**
 * Render a single comment item
 * @param {Object} comment - Comment object
 * @param {Array} replies - Array of reply comments
 * @returns {string} HTML string
 */
function renderCommentItem(comment, replies = []) {
    const date = new Date(comment.created_at);
    const timeAgo = getTimeAgo(date);

    const mediaHtml = comment.media && comment.media.length > 0 ? `
        <div class="comment-media-grid">
            ${comment.media.map(m => {
        if (m.mediaType === 'image') {
            return `<div class="comment-media-item"><img src="${m.mediaUrl}" alt="Comment image" loading="lazy"></div>`;
        } else if (m.mediaType === 'video') {
            return `<div class="comment-media-item"><video src="${m.mediaUrl}" controls></video></div>`;
        } else if (m.mediaType === 'audio') {
            return `<div class="comment-media-item"><audio src="${m.mediaUrl}" controls style="width: 100%;"></audio></div>`;
        }
        return '';
    }).join('')}
        </div>
    ` : '';

    const repliesHtml = replies.length > 0 ? `
        <div style="margin-left: var(--space-xl); margin-top: var(--space-md); border-left: 2px solid rgba(255, 255, 255, 0.1); padding-left: var(--space-md);">
            ${replies.map(reply => renderCommentItem(reply)).join('')}
        </div>
    ` : '';

    return `
        <div class="comment-item" id="comment-${comment.commentId}">
            <div class="comment-header">
                <div>
                    <div class="comment-author">${escapeHtml(comment.username)}</div>
                    <div class="comment-date">${timeAgo}</div>
                </div>
            </div>
            <div class="comment-text">${escapeHtml(comment.commentText)}</div>
            ${mediaHtml}
            <div class="comment-actions">
                <button class="comment-action-btn" onclick="toggleCommentLike('${comment.commentId}')">
                    ❤️ <span id="like-count-${comment.commentId}">${comment.likeCount || 0}</span>
                </button>
                <button class="comment-action-btn" onclick="showReplyForm('${comment.commentId}')">
                    💬 Reply
                </button>
            </div>
            <div id="reply-form-${comment.commentId}" class="reply-form" style="display: none;">
                <textarea id="reply-text-${comment.commentId}" placeholder="Write a reply..." 
                          style="width: 100%; min-height: 60px; padding: var(--space-sm); 
                                 background: var(--color-bg-secondary); border: 2px solid rgba(255, 255, 255, 0.1); 
                                 border-radius: var(--radius-md); color: var(--color-text-primary); 
                                 font-family: inherit; resize: vertical;"></textarea>
                <div style="margin-top: var(--space-sm); display: flex; gap: var(--space-sm);">
                    <button class="btn btn-primary btn-small" onclick="postReply('${comment.commentId}')">Post Reply</button>
                    <button class="btn btn-secondary btn-small" onclick="hideReplyForm('${comment.commentId}')">Cancel</button>
                </div>
            </div>
            ${repliesHtml}
        </div>
    `;
}

/**
 * Get time ago string
 * @param {Date} date - Date object
 * @returns {string} Time ago string
 */
function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    const intervals = {
        year: 31536000,
        month: 2592000,
        week: 604800,
        day: 86400,
        hour: 3600,
        minute: 60
    };

    for (const [name, secondsInInterval] of Object.entries(intervals)) {
        const interval = Math.floor(seconds / secondsInInterval);
        if (interval >= 1) {
            return interval === 1 ? `1 ${name} ago` : `${interval} ${name}s ago`;
        }
    }
    return 'just now';
}

/**
 * Preview selected media files
 */
function previewMedia() {
    const input = document.getElementById('comment-media-input');
    const preview = document.getElementById('media-preview');
    const mediaCount = document.getElementById('media-count');

    if (input.files.length === 0) {
        preview.style.display = 'none';
        mediaCount.textContent = '';
        return;
    }

    preview.style.display = 'flex';
    preview.innerHTML = '';
    mediaCount.textContent = `${input.files.length} file(s) selected`;

    Array.from(input.files).forEach((file, index) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const container = document.createElement('div');
            container.className = 'media-preview-item';

            if (file.type.startsWith('image/')) {
                container.innerHTML = `
                    <img src="${e.target.result}" alt="Preview">
                    <button class="media-preview-remove" onclick="removeMediaFile(${index})">×</button>
                `;
            } else if (file.type.startsWith('video/')) {
                container.innerHTML = `
                    <video src="${e.target.result}"></video>
                    <button class="media-preview-remove" onclick="removeMediaFile(${index})">×</button>
                `;
            } else if (file.type.startsWith('audio/')) {
                container.innerHTML = `
                    <div style="padding: var(--space-md); background: var(--color-bg-secondary); border-radius: var(--radius-md);">
                        🎵 ${file.name}
                </div>
                    <button class="media-preview-remove" onclick="removeMediaFile(${index})">×</button>
                `;
            }

            preview.appendChild(container);
        };
        reader.readAsDataURL(file);
    });
}

/**
 * Remove a media file from selection
 * @param {number} index - Index of file to remove
 */
function removeMediaFile(index) {
    const input = document.getElementById('comment-media-input');
    const dt = new DataTransfer();

    Array.from(input.files).forEach((file, i) => {
        if (i !== index) dt.items.add(file);
    });

    input.files = dt.files;
    previewMedia();
}

/**
 * Post a new comment
 */
async function postComment() {
    const text = document.getElementById('comment-text').value.trim();
    const mediaInput = document.getElementById('comment-media-input');

    if (!text && mediaInput.files.length === 0) {
        alert('Please enter a comment or attach media.');
        return;
    }

    const formData = new FormData();
    formData.append('templateId', currentTemplateId);
    formData.append('username', currentUsername);
    formData.append('commentText', text);

    Array.from(mediaInput.files).forEach(file => {
        formData.append('mediaFiles', file);
    });

    try {
        const response = await fetch('/doubleclips/api/post-comment', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if (data.returnResult === 'Comment posted') {
            // Clear form
            document.getElementById('comment-text').value = '';
            mediaInput.value = '';
            document.getElementById('media-preview').style.display = 'none';
            document.getElementById('media-count').textContent = '';

            // Reload comments
            await loadComments(currentTemplateId, currentTemplateAuthor);

            // Update comment count
            const currentCount = parseInt(document.getElementById('stat-comments').textContent.replace(/[KM]/g, '')) || 0;
            document.getElementById('stat-comments').textContent = formatCount(currentCount + 1);
        } else {
            alert('Failed to post comment: ' + data.returnResult);
        }
    } catch (error) {
        console.error('Error posting comment:', error);
        alert('Failed to post comment.');
    }
}

/**
 * Show reply form for a comment
 * @param {string} commentId - Comment ID
 */
function showReplyForm(commentId) {
    document.getElementById(`reply-form-${commentId}`).style.display = 'block';
}

/**
 * Hide reply form for a comment
 * @param {string} commentId - Comment ID
 */
function hideReplyForm(commentId) {
    document.getElementById(`reply-form-${commentId}`).style.display = 'none';
    document.getElementById(`reply-text-${commentId}`).value = '';
}

/**
 * Post a reply to a comment
 * @param {string} parentCommentId - Parent comment ID
 */
async function postReply(parentCommentId) {
    const text = document.getElementById(`reply-text-${parentCommentId}`).value.trim();

    if (!text) {
        alert('Please enter a reply.');
        return;
    }

    const formData = new FormData();
    formData.append('templateId', currentTemplateId);
    formData.append('username', currentUsername);
    formData.append('commentText', text);
    formData.append('replyToCommentId', parentCommentId);

    try {
        const response = await fetch('/doubleclips/api/post-comment', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();

        if (data.returnResult === 'Comment posted') {
            hideReplyForm(parentCommentId);
            await loadComments(currentTemplateId, currentTemplateAuthor);

            const currentCount = parseInt(document.getElementById('stat-comments').textContent.replace(/[KM]/g, '')) || 0;
            document.getElementById('stat-comments').textContent = formatCount(currentCount + 1);
        } else {
            alert('Failed to post reply: ' + data.returnResult);
        }
    } catch (error) {
        console.error('Error posting reply:', error);
        alert('Failed to post reply.');
    }
}

/**
 * Toggle like on a comment
 * @param {string} commentId - Comment ID
 */
async function toggleCommentLike(commentId) {
    try {
        const response = await fetch('/doubleclips/api/toggle-comment-like', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: currentUsername, commentId })
        });
        const data = await response.json();

        // Reload comments to update like count
        await loadComments(currentTemplateId, currentTemplateAuthor);
    } catch (error) {
        console.error('Error toggling comment like:', error);
    }
}
