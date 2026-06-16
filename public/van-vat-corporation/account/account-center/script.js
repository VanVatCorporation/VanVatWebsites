// Account Center JavaScript
// Handles profile display, editing, and avatar upload with JWT cookie authentication

document.addEventListener('DOMContentLoaded', async () => {
    const loadingState = document.getElementById('loadingState');
    const profileDisplay = document.getElementById('profileDisplay');
    const editProfileForm = document.getElementById('editProfileForm');
    const editProfileBtn = document.getElementById('editProfileBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const logoutBtn = document.getElementById('logoutBtn');
    const changeAvatarBtn = document.getElementById('changeAvatarBtn');
    const avatarInput = document.getElementById('avatarInput');
    const profileUpdateForm = document.getElementById('profileUpdateForm');

    let currentUser = null;

    // Load user profile on page load
    await loadProfile();

    // Logout handler
    logoutBtn.addEventListener('click', async () => {
        try {
            await fetch('https://account.vanvatcorp.com/api/logout', {
                method: 'POST',
                credentials: 'include'
            });
            window.location.href = 'https://account.vanvatcorp.com/login/';
        } catch (error) {
            console.error('Log out error:', error);
            // Redirect anyway
            window.location.href = 'https://account.vanvatcorp.com/login/';
        }
    });

    // Edit profile button
    editProfileBtn.addEventListener('click', () => {
        // Populate form with current data
        document.getElementById('editFirstName').value = currentUser.firstName || '';
        document.getElementById('editLastName').value = currentUser.lastName || '';
        document.getElementById('editGender').value = (currentUser.gender !== null && currentUser.gender !== undefined) ? currentUser.gender : '';
        document.getElementById('editBirthdate').value = currentUser.birthdate ? currentUser.birthdate.split('T')[0] : '';
        document.getElementById('editLocation').value = currentUser.location || '';
        document.getElementById('editBio').value = currentUser.bio || '';
        document.getElementById('editNationalID').value = ''; // Always clear, write-only

        profileDisplay.classList.add('hidden');
        editProfileForm.classList.remove('hidden');
    });

    // Cancel edit button
    cancelEditBtn.addEventListener('click', () => {
        editProfileForm.classList.add('hidden');
        profileDisplay.classList.remove('hidden');

        // Clear error/success messages
        document.getElementById('updateError').classList.add('hidden');
        document.getElementById('updateSuccess').classList.add('hidden');
    });

    // Avatar upload button
    changeAvatarBtn.addEventListener('click', () => {
        avatarInput.click();
    });

    // Avatar file change handler
    avatarInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file size (5MB max)
        if (file.size > 5 * 1024 * 1024) {
            alert('File size must be less than 5MB');
            return;
        }

        // Upload avatar
        const formData = new FormData();
        formData.append('avatar', file);

        try {
            const response = await fetch('https://account.vanvatcorp.com/api/avatar', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });

            const data = await response.json();

            if (response.ok && data.success) {
                // Reload profile to show new avatar
                await loadProfile();
            } else {
                alert(data.error || 'Failed to upload avatar');
            }
        } catch (error) {
            console.error('Avatar upload error:', error);
            alert('Network error. Please try again.');
        }
    });

    // Profile update form submission
    profileUpdateForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const errorDiv = document.getElementById('updateError');
        const successDiv = document.getElementById('updateSuccess');

        errorDiv.classList.add('hidden');
        successDiv.classList.add('hidden');

        const formData = new FormData(profileUpdateForm);
        const data = {};
        formData.forEach((value, key) => {
            if (value !== "") { // Only include non-empty values
                data[key] = value;
            }
        });

        // Ensure gender is sent as integer if present
        if (data.gender) {
            data.gender = parseInt(data.gender);
        }

        try {
            const response = await fetch('https://account.vanvatcorp.com/api/profile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data),
                credentials: 'include'
            });

            const result = await response.json();

            if (response.ok && result.success) {
                successDiv.textContent = 'Profile updated successfully!';
                successDiv.classList.remove('hidden');

                // Reload profile after a short delay
                setTimeout(async () => {
                    await loadProfile();
                    editProfileForm.classList.add('hidden');
                    profileDisplay.classList.remove('hidden');
                }, 1500);
            } else {
                errorDiv.textContent = result.error || 'Failed to update profile';
                errorDiv.classList.remove('hidden');
            }
        } catch (error) {
            console.error('Profile update error:', error);
            errorDiv.textContent = 'Network error. Please try again.';
            errorDiv.classList.remove('hidden');
        }
    });

    // Function to load user profile
    async function loadProfile() {
        try {
            const response = await fetch('https://account.vanvatcorp.com/api/profile', {
                credentials: 'include'
            });

            if (!response.ok) {
                // Not authenticated, redirect to login
                window.location.href = 'https://account.vanvatcorp.com/login/';
                return;
            }

            const data = await response.json();

            if (data.success && data.user) {
                currentUser = data.user;
                displayProfile(data.user);
            } else {
                // Error getting profile, redirect to login
                window.location.href = 'https://account.vanvatcorp.com/login/';
            }
        } catch (error) {
            console.error('Error loading profile:', error);
            window.location.href = 'https://account.vanvatcorp.com/login/';
        }
    }

    // Function to display user profile
    function displayProfile(user) {
        // Update avatar
        const avatarUrl = user.avatarUrl || 'https://account.vanvatcorp.com/api/avatar/' + user.id;
        document.getElementById('profileAvatar').src = avatarUrl;

        // Update username
        document.getElementById('profileUsername').textContent = '@' + user.username;

        // Update Full Name
        const fullName = `${user.firstName || ''} ${user.lastName || ''}`.trim();
        document.getElementById('profileFullName').textContent = fullName;

        // Update Account Metadata
        document.getElementById('profileReputation').textContent = user.reputation || 0;
        // Mock tier for now (logic could be expanded based on globalTierID)
        const tiers = { 1: 'Standard', 2: 'Premium', 3: 'Elite' };
        document.getElementById('profileTier').textContent = tiers[user.globalTierID] || 'Standard';

        // Update Email
        document.getElementById('profileEmail').textContent = user.email;

        // Update Location
        const locationMap = { 'US': 'USA', 'EN': 'England', 'AU': 'Australia', 'VN': 'Vietnam' };
        const locationText = locationMap[user.location] || user.location || 'Unknown';
        document.getElementById('profileLocation').textContent = locationText;

        // Update Gender
        const genderMap = { 0: 'Male', 1: 'Female', 2: 'Other' };
        const genderText = (user.gender !== null && user.gender !== undefined) ? (genderMap[user.gender] || 'Unspecified') : 'Unspecified';
        document.getElementById('profileGender').textContent = genderText;

        // Update Birthday
        if (user.birthdate) {
            const date = new Date(user.birthdate);
            document.getElementById('profileBirthday').textContent = date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' });
        } else {
            document.getElementById('profileBirthday').textContent = 'Not set';
        }

        // Update bio
        const bioElem = document.getElementById('profileBio');
        if (user.bio) {
            bioElem.textContent = user.bio;
            bioElem.classList.remove('italic', 'text-gray-500');
        } else {
            bioElem.textContent = 'No bio yet. Click "Edit Profile" to add one!';
            bioElem.classList.add('italic', 'text-gray-500');
        }

        // Update member since
        if (user.createdAt) {
            const date = new Date(user.createdAt);
            document.getElementById('profileMemberSince').textContent = date.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
        }

        // Hide loading, show profile
        loadingState.classList.add('hidden');
        profileDisplay.classList.remove('hidden');
    }
});
