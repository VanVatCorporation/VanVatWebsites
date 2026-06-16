// Terms Modal Onboarding Logic
let currentCard = 0;
const cardData = [
    {
        title: "Xin chào bạn! 🥰",
        description: "Lời đầu tiên, cảm ơn bạn đã đặt vé cắm trại trên Vạn Vật CampSite! ❤️"
    },
    {
        title: "Đây là vài thông tin nho nhỏ ℹ️",
        description: "Các lưu ý trước khi check in (bạn có thể hủy đặt vé nếu không chấp nhận)"
    },
    {
        title: "Đây là tóm tắt ý chính trong điều khoản, vui lòng đọc kỹ ⚠️",
        description: "1. Hiện tại dịch vụ còn sơ khai, quý khách vui lòng tự chuẩn bị tư trang cá nhân như lều trại, đồ ăn, thức uống, đồ dùng vệ sinh cá nhân, sạc năng lượng mặt trời và các đồ dùng thiết yếu khác."
    },
    {
        title: "Đây là tóm tắt ý chính trong điều khoản, vui lòng đọc kỹ ⚠️",
        description: "2. Do yếu tố môi trường hoang dã, Vạn Vật CampSite không đảm bảo việc quý khách sẽ an toàn 100% với thể loại thiên nhiên này, nếu quý khách bị rắn cắn, vắt hút máu, hay những sự cố nguy hiểm đến tính mạng, Vạn Vật CampSite có thể hỗ trợ nhân đạo để cứu sống quý khách khỏi cơn nguy kịch, trên tinh thần thiện chí, và không chịu trách nhiệm hay nghĩa vụ pháp lý."
    },
    {
        title: "Đây là tóm tắt ý chính trong điều khoản, vui lòng đọc kỹ ⚠️",
        description: "3. Dịch vụ cứu hộ có thể còn chưa đảm bảo, do đó nếu quý khách đi quá xa trong vùng kiểm soát của Vạn Vật CampSite thì mọi hậu quả quý khách sẽ là người chịu trách nhiệm."
    },
    {
        title: "Đây là tóm tắt ý chính trong điều khoản, vui lòng đọc kỹ ⚠️",
        description: "4. Trại cá tư nhân không thuộc sở hữu của Vạn Vật CampSite, do đó quý khách vui lòng không tương tác với cá dưới bất kì hình thức nào, bao gồm việc cho ăn và cầm nắm. Mọi tổn thất quý khách sẽ là người chịu trách nhiệm. Tất nhiên quý khách có thể xem và quay video tùy ý."
    },
    {
        title: "Đã đọc xong và đồng ý? 😲",
        description: "Vậy thì...Chúc quý khách có một chuyến đi vui vẻ và bổ ích với trải nghiệm hòa mình vào thiên nhiên cùng Vạn Vật CampSite nhé! 💖"
    }
];

/*
    {
        title: "Đây là tóm tắt ý chính trong điều khoản, vui lòng đọc kỹ ⚠️",
        description: "Nói ngắn gọn trong điều thứ 2 là...bạn bị thương thì bạn chịu, nhưng tui sẽ cố hết sức để vớt bạn, như việc sơ cứu vết thương và đưa bạn đến cơ sở y tế gần nhất, và tui không có trách nhiệm đền bù tổn thất cho bạn, gia đình bạn,... Bạn mong chờ điều gì ở một nơi hoang vu với cơ sở hạ tầng và nhà dân còn chưa tốt huống chi là cơ sở y tế? Đẹp nhưng nguy hiểm. Tất nhiên muốn đi phượt bạn cũng phải chuẩn bị đúng không nào?"
    },
*/
const totalCards = cardData.length;

const termsModalCard = document.getElementById('terms-modal-card');
const titleSection = document.getElementById('title-section');
const descriptionSection = document.getElementById('description-section');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const cardIndicator = document.getElementById('card-indicator');
let countdownTimer = null;

// Show terms modal with initial animation sequence
function showTermsCardModal() {
    termsModal.classList.add('hidden');
    currentCard = 0;
    termsModalCard.classList.remove('hidden', 'scale-75', 'opacity-0'); // Trigger scale-up animation
    updateCardContent();

    // After scale-up (0.75s), fade in title and description (0.75s -> 1.5s)
    setTimeout(() => {
        titleSection.classList.remove('opacity-0');
        titleSection.classList.add('title-fade-in');
        descriptionSection.classList.remove('opacity-0');
        descriptionSection.classList.add('title-fade-in'); // Reuse fade-in for description initial show
        startCountdown();
    }, 750);
}

// Update card content (called after animations)
function updateCardContent() {
    cardIndicator.textContent = `Card ${currentCard + 1}/${totalCards}`;
    prevBtn.disabled = currentCard === 0;
    //nextBtn.disabled = false; // Will be managed by countdown

    // Set description
    titleSection.querySelector('h2').textContent = cardData[currentCard].title;
    descriptionSection.innerHTML = `<p>${cardData[currentCard].description}</p>`;
}

// Animate title fade (common for next/prev)
function animateTitleFade() {
    titleSection.classList.remove('title-fade-in');
    titleSection.classList.add('title-fade-out');
    setTimeout(() => {
        titleSection.classList.remove('title-fade-out');
        titleSection.classList.add('title-fade-in');
    }, 500);
}

// Animate description transition
function animateDescription(direction) {
    // Remove old animation classes
    descriptionSection.classList.remove(
        'desc-slide-in-left', 'desc-slide-out-right',
        'desc-slide-in-right', 'desc-slide-out-left'
    );

    // Apply new animations based on direction
    if (direction === 'next') {
        descriptionSection.classList.add('desc-slide-out-right');
        setTimeout(() => {
            updateCardContent();
            descriptionSection.classList.remove('desc-slide-out-right');
            descriptionSection.classList.add('desc-slide-in-left');
        }, 300); // Halfway through slide-out
    } else { // previous
        descriptionSection.classList.add('desc-slide-out-left');
        setTimeout(() => {
            updateCardContent();
            descriptionSection.classList.remove('desc-slide-out-left');
            descriptionSection.classList.add('desc-slide-in-right');
        }, 300);
    }

    // Fade title during transition
    animateTitleFade();
}

// Countdown for Next button (3s cooldown)
function startCountdown() {
    let timeLeft = 3;
    nextBtn.disabled = true;
    nextBtn.textContent = `Tiếp tục (${timeLeft}s)`;

    countdownTimer = setInterval(() => {
        timeLeft--;
        if (timeLeft > 0) {
            nextBtn.textContent = `Tiếp tục (${timeLeft}s)`;
        } else {
            clearInterval(countdownTimer);
            nextBtn.textContent = 'Tiếp tục';
            nextBtn.disabled = false;
        }
    }, 1000);
}

// Reset countdown (e.g., on card change)
function resetCountdown() {
    if (countdownTimer) clearInterval(countdownTimer);
    startCountdown();
}

// Event Listeners
nextBtn.addEventListener('click', () => {
    if (!nextBtn.disabled && currentCard < totalCards - 1) {
        currentCard++;
        animateDescription('next');
        resetCountdown(); // Restart cooldown on new card
    } else if (currentCard === totalCards - 1) {
        // Last card: Proceed to loading → payment
        hideAllModalsCard(); // Or just hide terms modal
        showLoadingThenPayment(); // Your existing function
    }
});

prevBtn.addEventListener('click', () => {
    if (!prevBtn.disabled && currentCard > 0) {
        currentCard--;
        animateDescription('previous');
        resetCountdown();
    }
});

// Hide modal resets
function hideAllModalsCard() {
    // ... your existing code ...
    if (countdownTimer) clearInterval(countdownTimer);
    currentCard = 0;
    termsModalCard.classList.add('hidden', 'scale-75', 'opacity-0');
    titleSection.classList.remove('title-fade-in', 'title-fade-out');
    titleSection.classList.add('opacity-0');
    descriptionSection.classList.remove(
        'title-fade-in', 'desc-slide-in-left', 'desc-slide-out-right',
        'desc-slide-in-right', 'desc-slide-out-left'
    );
    descriptionSection.classList.add('opacity-0');
    nextBtn.textContent = 'Tiếp tục (5s)';
    nextBtn.disabled = true;
    prevBtn.disabled = true;
}
