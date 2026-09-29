// Grab DOM elements
const monthYearDisplay = document.getElementById("month-year-display");
const calendarDays = document.getElementById("calendar-days");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// Array of Month Names
const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Initialize tracking variables with the current date
let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

function renderCalendar() {
  // Get the first day of the selected month (0 = Sunday, 1 = Monday, etc.)
  const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();

  // Get the last day of the selected month (e.g., 30, 31)
  const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

  // Clear previous dates inside the grid container
  calendarDays.innerHTML = "";

  // Set the display heading text (e.g., "September 2026")
  monthYearDisplay.innerText = `${months[currentMonth]} ${currentYear}`;

  // 1. Fill empty spacer slots for the days of the week prior to the 1st day of the month
  for (let x = 0; x < firstDayIndex; x++) {
    const emptyDiv = document.createElement("div");
    emptyDiv.classList.add("empty-day");
    calendarDays.appendChild(emptyDiv);
  }

  // 2. Loop through and print the actual days of the month
  for (let day = 1; day <= totalDays; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.innerText = day;

    // Highlight the cell if it matches today's exact date
    const today = new Date();
    if (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    ) {
      dayDiv.classList.add("today");
    }

    calendarDays.appendChild(dayDiv);
  }
}

// Event Listeners for Navigation Buttons
prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

// Initial boot logic run
renderCalendar();
