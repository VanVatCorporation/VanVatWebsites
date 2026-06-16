document.addEventListener("DOMContentLoaded", () => {
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthDisplay = document.getElementById('current-month');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    const eventDetails = document.getElementById('event-details');
    const eventDateDisplay = document.getElementById('event-date-display');
    const eventList = document.getElementById('event-list');

    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    let eventsData = [];

    async function fetchMemorialDays() {
        try {
            const response = await fetch('https://api.vanvatcorp.com/family-api/memorial-days');
            if (response.ok) {
                eventsData = await response.json();
            } else {
                console.error('Failed to fetch:', response.status);
            }
            renderCalendar();
        } catch (error) {
            console.error('Error fetching memorial days:', error);
            renderCalendar(); // Render empty if failed
        }
    }

    function renderCalendar() {
        calendarGrid.innerHTML = '';
        currentMonthDisplay.textContent = new Date(currentYear, currentMonth).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

        const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
        const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

        // Add empty slots before
        for (let i = 0; i < firstDayOfMonth; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'p-2 sm:p-4 rounded-lg bg-gray-50 border border-transparent opacity-50 text-center min-h-[60px] sm:min-h-[100px] hidden sm:block';
            calendarGrid.appendChild(emptyDiv);
        }

        const isCurrentMonthYear = currentMonth === new Date().getMonth() && currentYear === new Date().getFullYear();
        const todayDate = new Date().getDate();

        // Render days
        for (let day = 1; day <= daysInMonth; day++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'p-2 sm:p-3 rounded-lg bg-white border border-gray-200 text-center relative cursor-pointer hover:bg-blue-50 transition min-h-[60px] sm:min-h-[100px] flex flex-col items-center justify-center';

            const isToday = isCurrentMonthYear && day === todayDate;
            if (isToday) {
                dayDiv.classList.add('bg-blue-50', 'border-blue-400');
            }

            dayDiv.innerHTML = `<span class="font-semibold ${isToday ? 'text-blue-700' : 'text-gray-700'} text-base sm:text-lg">${day}</span>`;

            // Check for events
            const dayEvents = eventsData.filter(e => e.solar.day === day && e.solar.month === (currentMonth + 1) && e.solar.year === currentYear);

            if (dayEvents.length > 0) {
                dayDiv.classList.add('bg-red-50', 'border-red-300');
                dayDiv.classList.remove('bg-white', 'border-gray-200');
                if (!isToday) {
                    dayDiv.classList.remove('bg-blue-50');
                }

                const badgeContainer = document.createElement('div');
                badgeContainer.className = 'absolute bottom-1 sm:bottom-2 flex space-x-1 justify-center w-full';

                // Limit to display 3 dots max
                dayEvents.slice(0, 3).forEach(() => {
                    const badge = document.createElement('div');
                    badge.className = 'w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full shadow-sm';
                    badgeContainer.appendChild(badge);
                });

                dayDiv.appendChild(badgeContainer);
            }

            dayDiv.addEventListener('click', () => {
                showEvents(day, currentMonth, currentYear, dayEvents);

                // Highlight selection visually
                document.querySelectorAll('#calendar-grid > div').forEach(el => el.classList.remove('ring-2', 'ring-blue-500', 'ring-offset-1', 'z-10'));
                dayDiv.classList.add('ring-2', 'ring-blue-500', 'ring-offset-1', 'z-10');
            });

            calendarGrid.appendChild(dayDiv);
        }
    }

    function showEvents(day, month, year, events) {
        eventDateDisplay.textContent = `${new Date(year, month, day).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}`;
        eventList.innerHTML = '';

        if (events.length === 0) {
            const li = document.createElement('li');
            li.className = 'text-gray-500 italic text-center py-4 bg-white rounded-md border border-gray-100 shadow-sm';
            li.textContent = 'No memorial days marked for this date.';
            eventList.appendChild(li);
        } else {
            events.forEach(e => {
                const li = document.createElement('li');
                li.className = 'bg-white p-4 rounded-md shadow-sm border-l-4 border-l-red-500 border-y border-r border-gray-100';
                li.innerHTML = `
                    <div class="font-bold text-gray-800 text-lg flex items-center justify-between">
                        <span>${e.ancestorInfo.name}</span>
                        <span class="text-xs font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded shadow-sm border border-blue-200">🌕 ${e.lunar.day}/${e.lunar.month}/${e.lunar.year}</span>
                    </div>
                    <div class="text-sm text-gray-600 mt-2"><span class="font-semibold text-gray-700">Relationship:</span> ${e.ancestorInfo.relationship || 'N/A'}</div>
                    ${e.ancestorInfo.buryLocation ? `<div class="text-sm text-gray-600 mt-1"><span class="font-semibold text-gray-700">Bury Location:</span> ${e.ancestorInfo.buryLocation}</div>` : ''}
                    ${e.ancestorInfo.additionalNote ? `<div class="text-sm text-gray-600 italic bg-gray-50 p-2 rounded mt-2 border border-gray-100">Note: ${e.ancestorInfo.additionalNote}</div>` : ''}
                `;
                eventList.appendChild(li);
            });
        }

        eventDetails.classList.remove('hidden');
        // Allow some small delay for rendering then scroll into view smoothly
        setTimeout(() => {
            eventDetails.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 50);
    }

    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar();
        eventDetails.classList.add('hidden');
    });

    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar();
        eventDetails.classList.add('hidden');
    });

    fetchMemorialDays(); // Initialize
});
