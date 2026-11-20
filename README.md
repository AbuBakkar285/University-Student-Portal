# 🏛️ University of Layyah (UL) — Official Student Portal & Academic CMS

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![Bootstrap 5](https://img.shields.io/badge/Bootstrap_5.3-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)](https://getbootstrap.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript_ES6+-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

A fully responsive, modern, and accessible **University Student Portal and Academic Management System (CMS)** developed for the **University of Layyah (UL)** (Government of Punjab — Chartered Public University, Est. 2022, HEC Recognized). 

The application is engineered strictly using vanilla web standards (**HTML5, CSS3, JavaScript ES6+**) alongside **Bootstrap 5.3**, strictly adhering to the official campus color palette: **Deep Forest Green (`#1f7a38`)**, **Warm Amber/Orange (`#f39019`)**, and **Off-White/Warm Cream (`#fdfbf7`)**.

---

## 📌 Repository Description (for GitHub "About" Section)

> **Official University of Layyah Student Portal & Academic CMS — Features real-time student registration with strict 11-digit phone validation, ground-floor accessibility notices, interactive weekly timetable (colspan/rowspan), dynamic course search & LocalStorage persistence, Admin Dashboard with profile inspection, FAQ accordion, live clock, and dark/light mode.**

---

## 🌟 Key Features & Architectural Highlights

### 1. 🏛️ About University of Layyah & Academic Overview
- **Charter & Recognition:** Government of Punjab chartered public university, established in 2022, fully recognized by the Higher Education Commission (HEC) of Pakistan.
- **Key Campus Metrics:** Highlights 14+ Academic Departments, 4,800+ Enrolled Students, 160+ PhD & MPhil Faculty members, and state-of-the-art campus infrastructure.
- **Vision & Facilities:** Detailed presentation of smart computing labs connected via PERN fiber optic internet, central digital library (IEEE, Springer, HEC resources), and one-window student facilitation desks.

### 2. 📅 Interactive Weekly Timetable & Class Schedule Table
- Demonstrates advanced semantic HTML5 table construction combining **both `rowspan` and `colspan`**:
  - `rowspan="3"`: Merges the Faculty of Computing & IT across Monday, Tuesday, and Wednesday.
  - `rowspan="2"`: Merges the Faculty of Management & Sciences across Thursday and Friday.
  - `colspan="2"`: Merges time slots to represent continuous 3-hour practical programming labs and joint research seminars.
  - `colspan="6"`: Full-width footer note clarifying lecture attendance rules and ground-floor accessibility requirements.

### 3. 📚 Dynamic Course Catalog & Management
- **Instant Live Search & Filtering:** Real-time search bar that immediately filters courses by code (e.g., `CS-301`), title (e.g., `Web Technologies`), or department without page reloads.
- **Dynamic Course Creation:** Allows adding custom course cards on the fly with custom codes, credit hours, instructors, and departments.
- **Persistent Storage:** Custom added courses are saved to `localStorage` (`uolCustomCourses`) so they remain intact even after browser reloads or Live Server restarts.
- **Live Course Counter:** Real-time badge that automatically calculates and displays the current number of available courses.

### 4. 📝 Robust Student Registration Form & Real-Time Validation
- **Real-Time Live Validation:** Input fields actively validate on `input`, `change`, and `blur`. Red invalid warnings disappear instantly the moment valid data is entered.
- **Strict 11-Digit Phone Number Lock:** Enforces strictly numeric characters (`0-9`), automatically stripping any letters or symbols, with a real-time counter (`X/11 digits`) and strict 11-digit requirement (e.g., `03023385400`).
- **Comprehensive Fields:** Student Full Name, Father/Guardian Name, University Roll Number, Official Email, Date of Birth, Current Semester (1-8), Course Enrollment Selection, and Study Shift (Morning / Evening).
- **Exact Input Casing Preservation:** Names and profile details maintain the exact casing entered by the student (no forced uppercase conversions).
- **Terms Agreement Confirmation:** Mandatory checkbox validating compliance with official UOL CMS regulations.

### 5. ♿ Special Needs & Disability Accessibility Accommodation Notice
- **Accessible Design Philosophy:** Built-in toggle for special accommodation (`Special Needs / Disability: Yes / No`).
- **Dynamic Ground-Floor Alert:** When a student selects `Yes`, a dedicated notice dynamically appears in real-time informing them:
  > *♿ Special Accommodation Notice: For disabled students, all classes and practical labs will be arranged on the Ground Floor (GF) with dedicated ramp access.*
- The ground-floor preference is stored in the database, displayed in the confirmation modal, highlighted with an accessibility badge (`♿ Ground Floor`) in the Admin Dashboard, and reflected in the profile inspector.

### 6. 🔔 Confirmation Modal & Seamless Dashboard Navigation
- **Bootstrap 5 Interactive Modal:** On valid registration, pops up an official confirmation dialog summarizing the student's complete academic enrollment details.
- **"Go to Admin Dashboard ↓" Action:** One-click navigation button that dismisses the modal, cleans up any body scroll locks, and smoothly scrolls directly to the Admin Dashboard while illuminating the **"Applied Students"** navigation link in warm yellow.

### 7. 🛡️ Admin Dashboard & Student Profile Inspector
- **Dual User / Admin Perspectives:**
  - **User Perspective:** Browse schedules, review courses, register for semesters, and inspect FAQs.
  - **Admin / Registrar Perspective:** Monitor real-time application metrics and review applicant records.
- **Live Metric Counter Cards:**
  - *Total Students Applied* (starts cleanly at 0 until registrations occur).
  - *Shift Breakdown* (Morning vs. Evening counts).
  - *Ground-Floor Accessibility Requests* (Total students requiring ground-floor arrangements).
  - *Latest Applicant Name & Roll Number*.
- **Interactive Applications Table:**
  - Displays registered students with roll numbers, shifts, and ground-floor room badges.
  - **"👤 View" Button:** Loads the student's full profile card into the Profile Inspector.
  - **"🗑️ Delete" Button:** Deletes individual student records with a confirmation prompt.
  - **"Clear All Records (Reset to 0)" Button:** Resets all stored student records back to zero.
- **Student Profile Inspector Card (CMS Record):**
  - Displays student name in exact input case, official UL CMS ID badge, semester, shift, contact details, enrolled course, and room/floor accommodations.

### 8. ❓ Student FAQ (Frequently Asked Questions Accordion)
- Structured collapsible Bootstrap 5 accordion answering essential student inquiries:
  1. **Faculty Qualifications:** Details the university's 160+ PhD doctors, HEC-approved supervisors, and MS/MPhil scholars.
  2. **Scholarships & Financial Aid:** Guidelines for the Chief Minister Honhaar Merit Scholarship, PEEF, and HEC Need-Based aid.
  3. **Attendance & Disability Rules:** Explains the mandatory 75% attendance policy and ground-floor classroom accommodations.

### 9. 🕒 Live Real-Time Clock & Heading Switcher
- **Live Digital Clock:** Dynamically updates every second in the top utility bar displaying current day, month, date, and 12-hour/24-hour time.
- **Interactive Heading Switcher:** A button in the Hero section that cycles dynamically through official portal slogans and titles.

### 10. 🌙 Dark / Light Mode Switcher
- One-click toggle switch in the top bar.
- Seamlessly transitions background, panels, cards, tables, and typography to an eye-friendly dark palette.
- Remembers user theme preferences across page refreshes via `localStorage.getItem("uolPortalTheme")`.

### 11. 🧭 Sticky Navbar & Intelligent Active Link Tracking (Scroll-Spy)
- `position: sticky; top: 0;` navbar with university emblem.
- Intelligent scroll tracking that smoothly highlights the corresponding section in warm amber/orange as the user scrolls or clicks:
  - `Home` → `About` → `Courses` → `Registration` → `Applied Students` → `Contact`.
- Accurately highlights **"Applied Students"** when viewing the Admin Dashboard, and transitions smoothly to **"Contact"** when reaching the footer.

---

## 🎨 Official Campus Color Palette

| Color Role | Hex Code | Preview | Purpose |
| :--- | :--- | :--- | :--- |
| **UL Forest Green** | `#1f7a38` | `■` | Primary headers, navbar background, primary badges, table headers |
| **Deep Campus Green** | `#145926` | `■` | Top utility bar, footer background, hover accent |
| **Warm Amber / Orange** | `#f39019` | `■` | Action buttons, active navbar links, badges, highlights |
| **Deep Amber** | `#d97706` | `■` | Button hover transitions and shadows |
| **Off-White / Cream** | `#fdfbf7` | `■` | Main page background (reduces eye strain) |
| **Soft Sage / Sand** | `#f5f2eb` | `■` | Alternating section backgrounds |

---

## 📂 File Architecture & Project Structure

```text
University Student Portal/
├── index.html          # Semantic HTML5 structure (Header, Main, Sections, Modal, Footer)
├── style.css           # Custom CSS3 stylesheet (Selectors, Flexbox, Grid, Animations, Dark Mode)
├── script.js           # JavaScript ES6+ (Live Clock, Validation, LocalStorage, Scroll-Spy, Admin Logic)
├── images/             # Vector assets & campus imagery
│   └── uol-logo.svg    # Official University of Layyah vector emblem logo
└── README.md           # Comprehensive project documentation
```

---

## 🚀 Getting Started & Local Setup

### Option 1: Direct File Launch (No Server Needed)
1. Clone or download this repository:
   ```bash
   git clone https://github.com/<your-username>/university-student-portal.git
   ```
2. Navigate into the project folder:
   ```bash
   cd university-student-portal
   ```
3. Double-click `index.html` to open it in any modern browser (Chrome, Edge, Firefox, Safari).

### Option 2: Live Server (VS Code Extension)
1. Open the project folder in **Visual Studio Code**.
2. Install the **Live Server** extension by *Ritwick Dey*.
3. Right-click `index.html` and select **"Open with Live Server"**.
4. The site will launch automatically at `http://127.0.0.1:5500/index.html`.

---

## 🧪 Testing User & Admin Workflows

1. **Verify Clock & Dark Mode:**
   - Observe the live digital clock ticking in the top bar.
   - Click **"🌙 Dark Mode"** to toggle between dark and light themes.
2. **Explore Timetable & Courses:**
   - Review the weekly class schedule table showing `rowspan` and `colspan` merges.
   - Type in the **Course Search Bar** (e.g., `CS-301` or `AI`) to filter courses instantly.
   - Use the **"Add a New Course"** form to create a custom course; verify it appears in the catalog and persists after refreshing.
3. **Submit a Registration:**
   - Fill out the registration form. Test the phone input by trying to type letters (letters will be blocked).
   - Select **Disability: Yes** and notice the ground-floor accessibility alert appears.
   - Click **"Submit Registration"**.
4. **Modal & Admin Dashboard Navigation:**
   - Confirm your details inside the **Enrollment Confirmed** modal.
   - Click **"Go to Admin Dashboard ↓"**.
   - Watch the modal close cleanly and the viewport smoothly scroll to the **Admin Dashboard**, lighting up **"Applied Students"** in orange.
   - Click **"👤 View"** to inspect the profile card, or **"🗑️ Delete"** / **"Clear All Records"** to test record removal.
5. **Scroll-Spy & Contact Link:**
   - Scroll down to the bottom footer; verify the **"Contact"** link turns active/yellow.
   - Scroll back up to verify it smoothly transitions back to **"Applied Students"** and earlier sections.

---

## 📜 Academic Integrity & Credits

- **Institution:** University of Layyah (UL), Punjab, Pakistan.
- **Course / Module:** Web Technologies & Portal Design.
- **Developed by:** Muhammad Abu Bakkar Nadeem (BS Computer Science).
- **License:** Open for academic demonstration and learning under the [MIT License](LICENSE).
