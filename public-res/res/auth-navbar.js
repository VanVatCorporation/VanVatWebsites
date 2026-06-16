// Global Authentication Navbar Component
// Dynamically updates navbar to show login/register buttons OR user profile based on authentication
// Uses JWT cookie-based authentication

(function () {
    'use strict';

    /**
     * Initialize authentication navbar
     * Call this function when the page loads to inject authentication UI into navbar
     */
    window.initAuthNavbar = async function () {
        const authPlaceholder = document.getElementById('auth-navbar-placeholder');

        if (!authPlaceholder) {
            console.warn('Auth navbar placeholder not found. Add <div id="auth-navbar-placeholder"></div> to your navbar.');
            return;
        }

        try {
            // Check authentication status
            const response = await fetch('https://account.vanvatcorp.com/api/verify-token', {
                credentials: 'include'
            });

            if (response.ok) {
                // User is authenticated, fetch profile
                const profileResponse = await fetch('https://account.vanvatcorp.com/api/profile', {
                    credentials: 'include'
                });

                if (profileResponse.ok) {
                    const data = await profileResponse.json();
                    if (data.success && data.user) {
                        renderAuthenticatedNav(authPlaceholder, data.user);
                        return;
                    }
                }
            }

            // User is not authenticated
            renderUnauthenticatedNav(authPlaceholder);
        } catch (error) {
            console.error('Error checking authentication:', error);
            // Default to unauthenticated state
            renderUnauthenticatedNav(authPlaceholder);
        }
    };

    /**
     * Render navbar for unauthenticated users (Login + Register buttons)
     */
    function renderUnauthenticatedNav(container) {
        container.innerHTML = `
            <div class="flex space-x-4">
                <a class="inline-block px-5 py-2 rounded-md bg-gray-700 text-white font-semibold hover:bg-gray-800 transition"
                    href="https://account.vanvatcorp.com/login/">
                    Đăng nhập
                </a>
                <a class="inline-block px-5 py-2 rounded-md bg-blue-700 text-white font-semibold hover:bg-blue-800 transition"
                    href="https://account.vanvatcorp.com/register/">
                    Đăng ký
                </a>
            </div>
        `;
    }

    /**
     * Render navbar for authenticated users (Avatar + Username + Reputation)
     */
    function renderAuthenticatedNav(container, user) {
        // const avatarUrl = user.avatarUrl || `https://account.vanvatcorp.com/api/avatar/${user.id}`;
        const avatarUrl = `https://account.vanvatcorp.com/api/avatar/${user.id}`;
        const reputation = user.reputation || 0;

        container.innerHTML = `
            <div class="flex items-center space-x-4">
                <a href="https://account.vanvatcorp.com/account-center/" 
                   class="flex items-center space-x-3 hover:opacity-80 transition">
                    <img src="${avatarUrl}" 
                         alt="${user.username}" 
                         class="w-10 h-10 rounded-full object-cover border-2 border-blue-700"
                         onerror="this.src='https://www.vanvatcorp.com/public-res/default-avatar.png'" />
                    <div class="text-left">
                        <div class="font-semibold text-gray-900">@${user.username}</div>
                        <div class="text-sm text-gray-600 flex items-center gap-1">
                            <i class="fas fa-star text-yellow-500 text-xs"></i>
                            <span>${reputation}</span>
                        </div>
                    </div>
                </a>
            </div>
        `;
    }

    /**
     * Initialize mobile authentication navbar
     * Call this function for mobile menu
     */
    window.initAuthNavbarMobile = async function () {
        const authPlaceholderMobile = document.getElementById('auth-navbar-mobile-placeholder');

        if (!authPlaceholderMobile) {
            return;
        }

        try {
            // Check authentication status
            const response = await fetch('https://account.vanvatcorp.com/api/verify-token', {
                credentials: 'include'
            });

            if (response.ok) {
                // User is authenticated, fetch profile
                const profileResponse = await fetch('https://account.vanvatcorp.com/api/profile', {
                    credentials: 'include'
                });

                if (profileResponse.ok) {
                    const data = await profileResponse.json();
                    if (data.success && data.user) {
                        renderAuthenticatedNavMobile(authPlaceholderMobile, data.user);
                        return;
                    }
                }
            }

            // User is not authenticated
            renderUnauthenticatedNavMobile(authPlaceholderMobile);
        } catch (error) {
            console.error('Error checking authentication for mobile:', error);
            renderUnauthenticatedNavMobile(authPlaceholderMobile);
        }
    };

    /**
     * Render mobile navbar for unauthenticated users
     */
    function renderUnauthenticatedNavMobile(container) {
        container.innerHTML = `
            <a class="block mx-6 my-3 px-5 py-2 rounded-md bg-gray-700 text-white font-semibold text-center hover:bg-gray-800 transition"
                href="https://account.vanvatcorp.com/login/">
                Đăng nhập
            </a>
            <a class="block mx-6 my-3 px-5 py-2 rounded-md bg-blue-700 text-white font-semibold text-center hover:bg-blue-800 transition"
                href="https://account.vanvatcorp.com/register/">
                Đăng ký
            </a>
        `;
    }

    /**
     * Render mobile navbar for authenticated users
     */
    function renderAuthenticatedNavMobile(container, user) {
        // const avatarUrl = user.avatarUrl || `https://account.vanvatcorp.com/api/avatar/${user.id}`;
        const avatarUrl = `https://account.vanvatcorp.com/api/avatar/${user.id}`;
        const reputation = user.reputation || 0;

        container.innerHTML = `
            <a href="https://account.vanvatcorp.com/account-center/" 
               class="block mx-6 my-3 px-5 py-2 bg-blue-50 rounded-md">
                <div class="flex items-center space-x-3">
                    <img src="${avatarUrl}" 
                         alt="${user.username}" 
                         class="w-10 h-10 rounded-full object-cover border-2 border-blue-700"
                         onerror="this.src='https://www.vanvatcorp.com/public-res/default-avatar.png'" />
                    <div>
                        <div class="font-semibold text-gray-900">@${user.username}</div>
                        <div class="text-sm text-gray-600 flex items-center gap-1">
                            <i class="fas fa-star text-yellow-500 text-xs"></i>
                            <span>${reputation}</span>
                        </div>
                    </div>
                </div>
            </a>
        `;
    }

    // Auto-initialize on DOM load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            window.initAuthNavbar();
            window.initAuthNavbarMobile();
        });
    } else {
        window.initAuthNavbar();
        window.initAuthNavbarMobile();
    }
})();
