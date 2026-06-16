document.addEventListener('DOMContentLoaded', () => {
    const cardNumber = document.getElementById('card-number');
    const cardName = document.getElementById('card-name');
    const cardExpiry = document.getElementById('card-expiry');
    const cardCvv = document.getElementById('card-cvv');
    const cardLogo = document.getElementById('card-logo');

    let pollingInterval = null;

    // VietQR Dynamic Update
    window.updateVietQR = async function () {
        const areaCard = document.querySelector('.area-card.bg-blue-50');
        const area = areaCard ? areaCard.getAttribute('data-area') : 'A';
        const locationSelect = document.getElementById('location');
        const locationText = locationSelect ? locationSelect.options[locationSelect.selectedIndex].text : '';

        let amount = 100000;
        if (area === 'A') amount = 200000;
        else if (area === 'B') amount = 150000;

        function removeAccents(str) {
            return str.normalize('NFD')
                .replace(/[\u0300-\u036f]/g, '')
                .replace(/đ/g, 'd').replace(/Đ/g, 'D');
        }

        // Create order on the backend
        try {
            const response = await fetch('/camping/api/create-order', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ amount, info: `Khu ${area} - ${locationText}` })
            });
            const { orderId } = await response.json();

            // Store orderId for polling
            window.currentOrderId = orderId;

            const info = `Thanh toan Van Vat CampSite ${orderId} (Khu ${area} - ${removeAccents(locationText)})`;
            const encodedInfo = encodeURIComponent(info);
            const qrUrl = `https://api.vietqr.io/image/970418-1490405352-ciJYY4d.jpg?accountName=NGUYEN%20QUOC%20VIET&amount=${amount}&addInfo=${encodedInfo}`;

            const qrImg = document.querySelector('#payment-qr-section img');
            if (qrImg) {
                qrImg.src = qrUrl;
                startPolling(orderId);
            }
        } catch (error) {
            console.error('Failed to create order:', error);
        }
    };

    function startPolling(orderId) {
        if (pollingInterval) clearInterval(pollingInterval);

        pollingInterval = setInterval(async () => {
            try {
                const response = await fetch(`/camping/api/order-status/${orderId}`);
                const { status } = await response.json();

                if (status === 'completed') {
                    clearInterval(pollingInterval);
                    if (window.paymentSuccess) {
                        window.paymentSuccess();
                    }
                }
            } catch (error) {
                console.error('Polling error:', error);
            }
        }, 3000);
    }

    // Stop polling if modal closed
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const modal = document.getElementById('payment-modal');
                if (modal.classList.contains('hidden')) {
                    if (pollingInterval) clearInterval(pollingInterval);
                }
            }
        });
    });
    const paymentModalElem = document.getElementById('payment-modal');
    if (paymentModalElem) {
        observer.observe(paymentModalElem, { attributes: true });
    }

    // Card Type Detection
    const getCardType = (number) => {
        const patterns = {
            visa: /^4/,
            mastercard: /^5[1-5]/,
            amex: /^3[47]/,
            discover: /^6(?:011|5)/,
            napas: /^9704/
        };
        for (const [card, pattern] of Object.entries(patterns)) {
            if (pattern.test(number)) return card;
        }
        return null;
    };

    const updateCardLogo = (type) => {
        if (type) {
            const logos = {
                visa: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Visa_Inc._logo_%282005–2014%29.svg',
                mastercard: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg',
                amex: 'https://upload.wikimedia.org/wikipedia/commons/3/30/American_Express_logo.svg',
                discover: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Discover_Card_logo.svg',
                napas: 'https://upload.wikimedia.org/wikipedia/vi/7/72/Logo_Napas.png'
            };
            cardLogo.src = logos[type];
            cardLogo.classList.remove('hidden');
        } else {
            cardLogo.classList.add('hidden');
        }
    };

    if (cardNumber) {
        cardNumber.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
            const cardType = getCardType(value);
            updateCardLogo(cardType);

            // Format with spaces
            let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
            e.target.value = formattedValue.substring(0, 19);
        });
    }

    // Name field validation (no digits or symbols except whitespace)
    if (cardName) {
        cardName.addEventListener('input', (e) => {
            // Remove digits and special characters, allow only letters and spaces
            e.target.value = e.target.value.replace(/[^a-zA-Z\sÀ-ỹ]/g, '').toUpperCase();
        });
    }

    // Expiration date formatting (MM/YY)
    if (cardExpiry) {
        cardExpiry.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });

        cardExpiry.addEventListener('keydown', (e) => {
            if (e.key === 'Backspace') {
                const value = e.target.value;
                // If cursor is at or after the slash and we backspace, delete the last digit before the slash too
                if (value.length === 3 && value.endsWith('/')) {
                    e.preventDefault();
                    e.target.value = value.substring(0, 1);
                }
            }
        });
    }

    // CVV validation (3 digits)
    if (cardCvv) {
        cardCvv.addEventListener('input', (e) => {
            e.target.value = e.target.value.replace(/\D/g, '').substring(0, 3);
        });
    }
});




const failureReasons = {
    "insufficient_funds": "Số dư không đủ để thực hiện giao dịch.",
    "expired_card": "Thẻ đã hết hạn sử dụng.",
    "invalid_cvv": "Mã CVV không chính xác.",
    "invalid_card_number": "Số thẻ không hợp lệ.",
    "invalid_expiry_date": "Ngày hết hạn không hợp lệ.",
    "card_declined": "Thẻ bị từ chối bởi ngân hàng phát hành.",
    "transaction_failed": "Giao dịch thất bại.",
    "unknown_error": "Lỗi không xác định."
}