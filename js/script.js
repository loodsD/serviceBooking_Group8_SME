document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('bookingForm');
    const timeSelect = document.getElementById('time');

    const availableTimes = [
        '09:00 AM', '10:00 AM', '11:00 AM',
        '01:00 PM', '02:00 PM', '03:00 PM',
        '04:00 PM', '05:00 PM', '06:00 PM'
    ];

    if (timeSelect) {
        availableTimes.forEach(time => {
            const option = document.createElement('option');
            option.value = time;
            option.textContent = time;
            timeSelect.appendChild(option);
        });
    }

    if (bookingForm) {
        bookingForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const service = document.getElementById('service').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;

            const bookingDetails = {
                name: name,
                email: email,
                service: service,
                date: date,
                time: time
            };

            // Get existing bookings from localStorage or initialize an empty array
            const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

            // Add new booking to the array
            bookings.push(bookingDetails);

            // Save updated bookings array to localStorage
            localStorage.setItem('bookings', JSON.stringify(bookings));

            // Redirect to confirmation page
            window.location.href = 'confirmation.html';
        });
    }

    // If on the home page, display the bookings
    if (window.location.pathname.endsWith('index.html')) {
        const bookingsTableBody = document.querySelector('#bookingsTable tbody');
        if (bookingsTableBody) {
            const bookings = JSON.parse(localStorage.getItem('bookings')) || [];

            bookings.forEach(booking => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${booking.name}</td>
                    <td>${booking.email}</td>
                    <td>${booking.service}</td>
                    <td>${booking.date}</td>
                    <td>${booking.time}</td>
                `;
                bookingsTableBody.appendChild(row);
            });
        }
    }

    if (window.location.pathname.endsWith('confirmation.html')) {
        const confirmationMessage = document.getElementById('confirmationMessage');
        const bookings = JSON.parse(localStorage.getItem('bookings')) || [];
        const latestBooking = bookings[bookings.length - 1];

        if (latestBooking) {
            confirmationMessage.textContent = `Thank you, ${latestBooking.name}! Your booking for a ${latestBooking.service} on ${latestBooking.date} at ${latestBooking.time} has been confirmed. A confirmation email has been sent to ${latestBooking.email}.`;
        } else {
            confirmationMessage.textContent = 'No booking details found.';
        }
    }
});
