document.addEventListener('DOMContentLoaded', function () {
    // Set minimum date to today
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const todayStr = `${yyyy}-${mm}-${dd}`;
    document.getElementById('booking-date').setAttribute('min', todayStr);

    // Area selection
    const areaCards = document.querySelectorAll('.area-card');
    let selectedArea = null;

    areaCards.forEach(card => {
        card.addEventListener('click', function () {
            areaCards.forEach(c => c.classList.remove('border-blue-500', 'bg-blue-50'));
            this.classList.add('border-blue-500', 'bg-blue-50');
            selectedArea = this.getAttribute('data-area');
        });
    });

    // Time slot selection
    const timeSlots = document.querySelectorAll('.slot.available');
    let selectedTime = null;

    timeSlots.forEach(slot => {
        slot.addEventListener('click', function () {
            if (!this.classList.contains('unavailable')) {
                document.querySelectorAll('.slot').forEach(s => s.classList.remove('selected'));
                this.classList.add('selected');
                selectedTime = this.getAttribute('data-time');
            }
        });
    });

    // Booking form submission
    document.getElementById('book-now').addEventListener('click', function () {
        const date = document.getElementById('booking-date').value;
        const guests = document.getElementById('guests').value;
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const email = document.getElementById('email').value;

        // Simple validation
        if (!date || !selectedArea || !selectedTime || !guests || !name || !phone || !email) {
            alert('Vui lòng điền đầy đủ thông tin đặt chỗ.');
            return;
        }

        // Show success message
        document.getElementById('success-message').style.display = 'block';

        // You would normally send this data to a server here
        console.log('Booking details:', {
            date,
            area: selectedArea,
            time: selectedTime,
            guests,
            name,
            phone,
            email
        });
    });
});