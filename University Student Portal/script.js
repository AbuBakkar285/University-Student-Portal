/* ==========================================================================
   University of Layyah (UL) - Official Student Portal JavaScript (script.js)
   Practical Lab Task #7 — Covers All 9 Mandatory Requirements of Task 4 (35 Marks)
   + Dynamically Added Courses Persist in LocalStorage across Live Server reloads!
   + Starts at 0 Applied Students (You register students yourself!)
   + Interactive Navbar Active Link Highlight (Moves with cursor & scroll/click)
   + Strict 11-Digit Phone Validation & Disability Ground-Floor Accommodation Note
   ========================================================================== */

document.addEventListener("DOMContentLoaded", function () {

    // =========================================================================
    // NAVBAR ACTIVE LINK HIGHLIGHT (Moves cleanly on click AND scroll)
    // =========================================================================
    const navLinks = document.querySelectorAll(".uol-navbar .nav-link");
    const sections = document.querySelectorAll("main section[id], footer[id]");
    let isClickScrolling = false;
    let clickScrollTimer = null;

    function setActiveNavLinkById(sectionId) {
        navLinks.forEach(function (link) {
            if (link.getAttribute("href") === "#" + sectionId) {
                link.classList.add("active");
            } else {
                link.classList.remove("active");
            }
        });
    }

    function updateActiveNavOnScroll() {
        if (isClickScrolling) return;

        const navHeader = document.getElementById("main-header");
        const headerOffset = navHeader ? navHeader.offsetHeight : 80;
        const threshold = headerOffset + 60;

        const scrollBottom = window.innerHeight + window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight;
        const isAtBottom = (scrollBottom >= docHeight - 50);

        const contactEl = document.getElementById("contact");
        const adminDashboardEl = document.getElementById("admin-dashboard");

        // 1. Check if Contact is active
        if (contactEl) {
            const contactRect = contactEl.getBoundingClientRect();
            let adminIsAtTop = false;

            if (adminDashboardEl) {
                const adminRect = adminDashboardEl.getBoundingClientRect();
                // Admin dashboard header is currently positioned near the top of viewport
                if (adminRect.top >= 0 && adminRect.top <= threshold + 40) {
                    adminIsAtTop = true;
                }
            }

            // Contact is active when:
            // User reached page bottom (and didn't just align admin-dashboard to the top)
            // OR contact footer top has scrolled up near the top threshold line
            if (!adminIsAtTop && (isAtBottom || contactRect.top <= threshold + 40)) {
                setActiveNavLinkById("contact");
                return;
            }
        }

        // 2. Check each section sequentially from top to bottom
        let currentSectionId = "home";

        sections.forEach(function (sec) {
            if (sec.id === "contact") return;
            const rect = sec.getBoundingClientRect();
            if (rect.top <= threshold) {
                currentSectionId = sec.getAttribute("id");
            }
        });

        setActiveNavLinkById(currentSectionId);
    }

    navLinks.forEach(function (link) {
        link.addEventListener("click", function (e) {
            const targetHref = link.getAttribute("href");
            if (targetHref && targetHref.startsWith("#")) {
                const targetId = targetHref.slice(1);
                const targetEl = document.getElementById(targetId);
                if (targetEl) {
                    e.preventDefault();
                    isClickScrolling = true;
                    setActiveNavLinkById(targetId);

                    const navHeader = document.getElementById("main-header");
                    const navOffset = navHeader ? navHeader.offsetHeight : 80;
                    const targetPos = targetEl.getBoundingClientRect().top + window.pageYOffset - navOffset;

                    window.scrollTo({
                        top: Math.max(0, targetPos),
                        behavior: "smooth"
                    });

                    // Auto-collapse mobile navbar if open
                    const navbarCollapse = document.getElementById("portalNavbar");
                    if (navbarCollapse && navbarCollapse.classList.contains("show")) {
                        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                        if (bsCollapse) bsCollapse.hide();
                    }

                    if (clickScrollTimer) clearTimeout(clickScrollTimer);
                    clickScrollTimer = setTimeout(function () {
                        isClickScrolling = false;
                        updateActiveNavOnScroll();
                    }, 850);
                }
            }
        });
    });

    window.addEventListener("scroll", updateActiveNavOnScroll);
    updateActiveNavOnScroll();


    // =========================================================================
    // REQUIREMENT 1: Display Current Date and Time (3 Marks)
    // =========================================================================
    const liveDateTimeEl = document.getElementById("liveDateTime");

    function updateDateTime() {
        const now = new Date();
        const options = {
            weekday: "short",
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
        };
        liveDateTimeEl.textContent = "🕒 " + now.toLocaleDateString("en-US", options);
    }

    updateDateTime();
    setInterval(updateDateTime, 1000);


    // =========================================================================
    // REQUIREMENT 2: Change the Website Heading When a Button is Clicked (4 Marks)
    // =========================================================================
    const portalMainHeading = document.getElementById("portalMainHeading");
    const changeHeadingBtn = document.getElementById("changeHeadingBtn");

    const headingOptions = [
        "Welcome to University of Layyah Student Portal",
        "Official UL Student Portal & Online Enrollment",
        "Empowering Future Graduates of University of Layyah",
        "Fall 2026 Online Course Registration & Academic Hub"
    ];
    let currentHeadingIndex = 0;

    changeHeadingBtn.addEventListener("click", function () {
        currentHeadingIndex = (currentHeadingIndex + 1) % headingOptions.length;
        portalMainHeading.textContent = headingOptions[currentHeadingIndex];
    });


    // =========================================================================
    // REQUIREMENT 3: Implement Dark / Light Mode Toggle Switch (4 Marks)
    // =========================================================================
    const themeToggleBtn = document.getElementById("themeToggleBtn");

    if (localStorage.getItem("uolPortalTheme") === "dark") {
        document.body.classList.add("dark-mode");
        themeToggleBtn.textContent = "☀️ Light Mode";
    }

    themeToggleBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        const isDark = document.body.classList.contains("dark-mode");

        if (isDark) {
            themeToggleBtn.textContent = "☀️ Light Mode";
            localStorage.setItem("uolPortalTheme", "dark");
        } else {
            themeToggleBtn.textContent = "🌙 Dark Mode";
            localStorage.setItem("uolPortalTheme", "light");
        }
    });


    // =========================================================================
    // REQUIREMENT 6, 7 & 8:
    // #6 Add a New Course Dynamically (AND save in LocalStorage so it stays on reload!)
    // #7 Implement Course Search Functionality
    // #8 Count and Display Total Available Courses
    // =========================================================================
    const coursesContainer = document.getElementById("coursesContainer");
    const courseCountBadge = document.getElementById("courseCountBadge");
    const addCourseForm = document.getElementById("addCourseForm");
    const studentCourseSelect = document.getElementById("studentCourse");
    const resetCoursesBtn = document.getElementById("resetCoursesBtn");
    const courseSearchInput = document.getElementById("courseSearchInput");
    const clearSearchBtn = document.getElementById("clearSearchBtn");
    const searchStatusText = document.getElementById("searchStatusText");

    function updateCourseCounter() {
        const allCards = coursesContainer.querySelectorAll(".course-card-item");
        let visibleCount = 0;

        allCards.forEach(function (card) {
            if (!card.classList.contains("d-none")) {
                visibleCount++;
            }
        });

        courseCountBadge.textContent = visibleCount;
    }

    // Helper function to create & append a course card in the DOM and Registration Dropdown
    function appendCourseToDOM(courseObj) {
        const newCardCol = document.createElement("div");
        newCardCol.className = "col-md-6 col-lg-4 course-card-item custom-added-course fade-in-up";

        newCardCol.innerHTML = `
            <div class="card h-100 uol-course-card">
                <div class="card-header uol-card-header d-flex justify-content-between align-items-center">
                    <span class="badge bg-white text-success fw-bold course-code">${courseObj.code}</span>
                    <span class="badge uol-badge-orange">3 Credit Hrs</span>
                </div>
                <div class="card-body d-flex flex-column">
                    <h3 class="card-title h5 fw-bold course-title">${courseObj.title}</h3>
                    <p class="text-muted small mb-2 course-dept">Department: ${courseObj.dept}</p>
                    <p class="card-text course-desc flex-grow-1">${courseObj.desc}</p>
                    <a href="#registration" class="btn uol-btn-green btn-sm mt-2">Select in Registration</a>
                </div>
            </div>
        `;

        coursesContainer.appendChild(newCardCol);

        // Also add to the Registration Form dropdown if not already present
        const optionValue = `${courseObj.code}: ${courseObj.title}`;
        const existingOption = Array.from(studentCourseSelect.options).some(function (opt) {
            return opt.value === optionValue;
        });

        if (!existingOption) {
            const newOption = document.createElement("option");
            newOption.value = optionValue;
            newOption.textContent = optionValue;
            newOption.className = "custom-course-option";
            studentCourseSelect.appendChild(newOption);
        }
    }

    // Load previously added custom courses from LocalStorage when Live Server opens
    function getSavedCustomCourses() {
        const savedJSON = localStorage.getItem("uolCustomCourses");
        if (savedJSON) {
            try {
                const parsed = JSON.parse(savedJSON);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            } catch (e) {
                console.error("Error reading saved custom courses:", e);
            }
        }
        return [];
    }

    let customCoursesList = getSavedCustomCourses();

    // Render any saved custom courses immediately on page load
    customCoursesList.forEach(function (courseObj) {
        appendCourseToDOM(courseObj);
    });
    updateCourseCounter();

    // Add New Course Form Submit Handler (Saves to LocalStorage!)
    addCourseForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const code = document.getElementById("newCourseCode").value.trim().toUpperCase();
        const title = document.getElementById("newCourseTitle").value.trim();
        const dept = document.getElementById("newCourseDept").value;
        const desc = document.getElementById("newCourseDesc").value.trim();

        if (!code || !title || !desc) {
            alert("Please enter the Course Code, Course Title, and Description.");
            return;
        }

        const newCourseObj = {
            code: code,
            title: title,
            dept: dept,
            desc: desc
        };

        // Save in LocalStorage array so it remains even after closing/reopening Live Server
        customCoursesList.push(newCourseObj);
        localStorage.setItem("uolCustomCourses", JSON.stringify(customCoursesList));

        // Append to page & update count
        appendCourseToDOM(newCourseObj);
        addCourseForm.reset();
        filterCourses();
    });

    // Reset Custom Added Courses Button (Optional cleanup button)
    if (resetCoursesBtn) {
        resetCoursesBtn.addEventListener("click", function () {
            localStorage.removeItem("uolCustomCourses");
            customCoursesList = [];

            // Remove custom added cards from DOM
            const addedCards = coursesContainer.querySelectorAll(".custom-added-course");
            addedCards.forEach(function (card) { card.remove(); });

            // Remove custom options from select dropdown
            const addedOptions = studentCourseSelect.querySelectorAll(".custom-course-option");
            addedOptions.forEach(function (opt) { opt.remove(); });

            filterCourses();
        });
    }

    // Course Search Filter Function (Requirement 7)
    function filterCourses() {
        const query = courseSearchInput.value.trim().toLowerCase();
        const allCards = coursesContainer.querySelectorAll(".course-card-item");

        allCards.forEach(function (card) {
            const cardText = card.textContent.toLowerCase();
            if (cardText.includes(query)) {
                card.classList.remove("d-none");
            } else {
                card.classList.add("d-none");
            }
        });

        updateCourseCounter();

        if (query === "") {
            searchStatusText.textContent = "Showing all available courses.";
        } else {
            searchStatusText.textContent = `Filtering courses matching: "${courseSearchInput.value}"`;
        }
    }

    courseSearchInput.addEventListener("input", filterCourses);

    clearSearchBtn.addEventListener("click", function () {
        courseSearchInput.value = "";
        filterCourses();
    });


    // =========================================================================
    // SPECIAL FEATURE: Disability Radio Toggle & Strictly 11-Digit Phone Input
    // =========================================================================
    const disabilityYesRadio = document.getElementById("disabilityYes");
    const disabilityNoRadio = document.getElementById("disabilityNo");
    const disabilityGroundFloorNote = document.getElementById("disabilityGroundFloorNote");

    function updateDisabilityBanner() {
        if (disabilityYesRadio.checked) {
            disabilityGroundFloorNote.classList.remove("d-none");
        } else {
            disabilityGroundFloorNote.classList.add("d-none");
        }
    }

    disabilityYesRadio.addEventListener("change", updateDisabilityBanner);
    disabilityNoRadio.addEventListener("change", updateDisabilityBanner);

    // Phone Input: Automatically strip non-digits (alphabets/symbols) & limit to 11 digits
    const studentPhoneInput = document.getElementById("studentPhone");
    const phoneLiveHint = document.getElementById("phoneLiveHint");

    studentPhoneInput.addEventListener("input", function () {
        const cleaned = studentPhoneInput.value.replace(/[^0-9]/g, "").slice(0, 11);
        if (studentPhoneInput.value !== cleaned) {
            studentPhoneInput.value = cleaned;
        }

        const len = cleaned.length;
        phoneLiveHint.textContent = `Digits entered: ${len}/11 (Only numbers allowed, max 11 digits).`;
        if (len === 11) {
            phoneLiveHint.className = "form-text text-success fw-semibold";
            studentPhoneInput.classList.remove("is-invalid");
            studentPhoneInput.classList.add("is-valid");
        } else {
            phoneLiveHint.className = "form-text text-muted";
            studentPhoneInput.classList.remove("is-valid");
        }
    });


    // =========================================================================
    // REQUIREMENT 4, 5 & 9 + ADMIN APPLIED STUDENTS DASHBOARD (Starts at 0!):
    // =========================================================================
    const studentRegForm = document.getElementById("studentRegForm");
    const formErrorAlert = document.getElementById("formErrorAlert");
    const formSuccessBanner = document.getElementById("formSuccessBanner");
    const registeredStudentBannerName = document.getElementById("registeredStudentBannerName");

    // Profile Inspector Elements
    const emptyProfileState = document.getElementById("emptyProfileState");
    const studentWelcomeAlert = document.getElementById("studentWelcomeAlert");
    const displayStudentName = document.getElementById("displayStudentName");
    const displayStudentProgram = document.getElementById("displayStudentProgram");
    const displayStudentEmail = document.getElementById("displayStudentEmail");
    const displayStudentPhone = document.getElementById("displayStudentPhone");
    const displayStudentRoll = document.getElementById("displayStudentRoll");
    const displayFatherName = document.getElementById("displayFatherName");
    const displayStudentDOB = document.getElementById("displayStudentDOB");
    const displayStudentCourse = document.getElementById("displayStudentCourse");
    const displayDisabilityArrangement = document.getElementById("displayDisabilityArrangement");
    const localStorageSummary = document.getElementById("localStorageSummary");

    // Admin Dashboard Counter & Table Elements
    const navAppliedCount = document.getElementById("navAppliedCount");
    const statTotalStudents = document.getElementById("statTotalStudents");
    const statShiftBreakdown = document.getElementById("statShiftBreakdown");
    const statDisabilityCount = document.getElementById("statDisabilityCount");
    const statLatestStudent = document.getElementById("statLatestStudent");
    const appliedStudentsTableBody = document.getElementById("appliedStudentsTableBody");
    const clearAllRecordsBtn = document.getElementById("clearAllRecordsBtn");
    const resetFormBtn = document.getElementById("resetFormBtn");

    // Load array of user-submitted students from LocalStorage (starts empty [])
    function getAppliedStudentsList() {
        const savedListJSON = localStorage.getItem("uolSubmittedStudents");
        if (savedListJSON) {
            try {
                const parsed = JSON.parse(savedListJSON);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            } catch (e) {
                console.error("Error parsing saved students list:", e);
            }
        }
        return [];
    }

    let appliedStudents = getAppliedStudentsList();

    // Inspect a specific student's profile in the right-side Profile Inspector Card
    function inspectStudentProfile(studentData) {
        if (!studentData) {
            emptyProfileState.classList.remove("d-none");
            studentWelcomeAlert.classList.add("d-none");
            return;
        }

        emptyProfileState.classList.add("d-none");
        studentWelcomeAlert.classList.remove("d-none");

        displayStudentName.textContent = studentData.name;
        displayStudentProgram.textContent = `Semester ${studentData.semester} — ${studentData.shift} Shift`;
        displayStudentEmail.textContent = studentData.email;
        displayStudentPhone.textContent = studentData.phone;
        displayStudentRoll.textContent = "Roll No: " + studentData.roll;
        displayFatherName.textContent = studentData.father;
        displayStudentDOB.textContent = studentData.dob;
        displayStudentCourse.textContent = studentData.course;

        if (studentData.disability === "Yes") {
            displayDisabilityArrangement.innerHTML = `<span class="badge bg-info text-dark">♿ Ground Floor Classroom Arranged (Disability: Yes)</span>`;
        } else {
            displayDisabilityArrangement.textContent = "Standard Classroom Allocation (Disability: No)";
        }
    }

    // Render the entire Admin Dashboard (Counters + Table + Profile Inspector)
    function renderAdminDashboard(selectedIndex) {
        const total = appliedStudents.length;
        const morningCount = appliedStudents.filter(function (s) { return s.shift === "Morning"; }).length;
        const eveningCount = total - morningCount;
        const disabilityCount = appliedStudents.filter(function (s) { return s.disability === "Yes"; }).length;
        const latest = total > 0 ? appliedStudents[total - 1] : null;

        // Update Top Navbar & Dashboard Counters
        navAppliedCount.textContent = total;
        statTotalStudents.textContent = total;
        statShiftBreakdown.textContent = `${morningCount} M / ${eveningCount} E`;
        statDisabilityCount.textContent = disabilityCount;
        statLatestStudent.textContent = latest ? latest.name : "None Yet";

        if (total === 0) {
            localStorageSummary.innerHTML = `No students registered yet (<strong>0 Applied</strong>). Fill out the Registration Form to add a student!`;
            appliedStudentsTableBody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center text-muted py-4">
                        No student applications submitted yet. Please fill out the <strong>Student Course Registration Form</strong> above.
                    </td>
                </tr>
            `;
            inspectStudentProfile(null);
            return;
        }

        // Update LocalStorage Summary Box when students exist
        localStorageSummary.innerHTML = `
            <strong>Total Students Applied:</strong> <span class="badge bg-success">${total}</span><br>
            <strong>Latest Applicant:</strong> ${latest.name} (${latest.roll})<br>
            <strong>Ground-Floor Requests:</strong> ${disabilityCount} Student(s)
        `;

        // Populate Applied Students Table
        appliedStudentsTableBody.innerHTML = "";
        appliedStudents.forEach(function (student, index) {
            const tr = document.createElement("tr");
            const floorBadge = student.disability === "Yes"
                ? `<span class="badge bg-info text-dark">♿ Ground Floor</span>`
                : `<span class="badge bg-light text-secondary border">Standard Room</span>`;

            tr.innerHTML = `
                <td class="fw-bold">${index + 1}</td>
                <td>
                    <div class="fw-bold text-success">${student.name}</div>
                    <small class="text-muted">${student.roll} | Sem ${student.semester} (${student.shift})</small>
                </td>
                <td>${student.course}</td>
                <td>${floorBadge}</td>
                <td>
                    <div class="d-flex flex-wrap gap-1">
                        <button type="button" class="btn btn-sm uol-btn-green view-profile-btn" data-index="${index}">
                            👤 View
                        </button>
                        <button type="button" class="btn btn-sm btn-outline-danger delete-student-btn" data-index="${index}" title="Delete Record">
                            🗑️ Delete
                        </button>
                    </div>
                </td>
            `;
            appliedStudentsTableBody.appendChild(tr);
        });

        // Attach click listeners to "View Profile" buttons
        const viewBtns = appliedStudentsTableBody.querySelectorAll(".view-profile-btn");
        viewBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                const idx = Number(btn.getAttribute("data-index"));
                inspectStudentProfile(appliedStudents[idx]);
            });
        });

        // Attach click listeners to individual "Delete Record" buttons
        const deleteBtns = appliedStudentsTableBody.querySelectorAll(".delete-student-btn");
        deleteBtns.forEach(function (btn) {
            btn.addEventListener("click", function () {
                const idx = Number(btn.getAttribute("data-index"));
                const targetStudent = appliedStudents[idx];
                const studentName = targetStudent ? targetStudent.name : "this student";

                if (confirm(`Are you sure you want to delete the registration record for "${studentName}"?`)) {
                    appliedStudents.splice(idx, 1);
                    localStorage.setItem("uolSubmittedStudents", JSON.stringify(appliedStudents));

                    if (appliedStudents.length === 0) {
                        localStorage.removeItem("uolRegisteredStudent");
                        formSuccessBanner.classList.add("d-none");
                    } else {
                        localStorage.setItem("uolRegisteredStudent", JSON.stringify(appliedStudents[appliedStudents.length - 1]));
                    }

                    renderAdminDashboard(Math.max(0, idx - 1));
                    setActiveNavLinkById("admin-dashboard");
                    updateActiveNavOnScroll();
                }
            });
        });

        const targetIndex = (typeof selectedIndex === "number" && appliedStudents[selectedIndex])
            ? selectedIndex
            : appliedStudents.length - 1;
        inspectStudentProfile(appliedStudents[targetIndex]);
    }

    // Initial render on page load
    renderAdminDashboard();


    // Helper function to mark a form input as valid or invalid with a custom message
    function setFieldValidationState(inputId, errorId, isValid, errorMsg) {
        const inputEl = document.getElementById(inputId);
        const errorEl = document.getElementById(errorId);
        if (!inputEl) return;

        if (!isValid) {
            inputEl.classList.add("is-invalid");
            inputEl.classList.remove("is-valid");
            if (errorEl) {
                if (errorMsg) errorEl.textContent = errorMsg;
                errorEl.classList.add("d-block");
            }
        } else {
            inputEl.classList.remove("is-invalid");
            inputEl.classList.add("is-valid");
            if (errorEl) {
                errorEl.classList.remove("d-block");
            }
        }
    }

    function clearAllValidationStates() {
        const inputs = studentRegForm.querySelectorAll(".form-control, .form-select, .form-check-input");
        inputs.forEach(function (el) {
            el.classList.remove("is-invalid", "is-valid");
        });
        const feedbacks = studentRegForm.querySelectorAll(".invalid-feedback");
        feedbacks.forEach(function (fb) {
            fb.classList.remove("d-block");
        });
        formErrorAlert.classList.add("d-none");
    }

    // Individual Field Validator Function (Used on live input/change AND on submit)
    function validateSingleField(fieldId) {
        const namePattern = /^[A-Za-z\s.]{3,60}$/;
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phonePattern = /^[0-9]{11}$/;

        if (fieldId === "studentName") {
            const val = document.getElementById("studentName").value.trim();
            if (!val) {
                setFieldValidationState("studentName", "err-studentName", false, "Student Full Name is required.");
                return "Student Full Name is required.";
            } else if (!namePattern.test(val)) {
                setFieldValidationState("studentName", "err-studentName", false, "Use letters only (minimum 3 characters, no numbers).");
                return "Student Full Name must contain only letters (at least 3 characters, no numbers).";
            }
            setFieldValidationState("studentName", "err-studentName", true);
            return null;
        }

        if (fieldId === "fatherName") {
            const val = document.getElementById("fatherName").value.trim();
            if (!val) {
                setFieldValidationState("fatherName", "err-fatherName", false, "Father / Guardian Name is required.");
                return "Father / Guardian Name is required.";
            } else if (!namePattern.test(val)) {
                setFieldValidationState("fatherName", "err-fatherName", false, "Use letters only (minimum 3 characters, no numbers).");
                return "Father / Guardian Name must contain only letters (at least 3 characters).";
            }
            setFieldValidationState("fatherName", "err-fatherName", true);
            return null;
        }

        if (fieldId === "studentRoll") {
            const val = document.getElementById("studentRoll").value.trim();
            if (!val || val.length < 4) {
                setFieldValidationState("studentRoll", "err-studentRoll", false, "Please enter a valid University Roll No (min 4 characters).");
                return "University Roll No is required (e.g., BSCSM-A-24-46).";
            }
            setFieldValidationState("studentRoll", "err-studentRoll", true);
            return null;
        }

        if (fieldId === "studentEmail") {
            const val = document.getElementById("studentEmail").value.trim();
            if (!val) {
                setFieldValidationState("studentEmail", "err-studentEmail", false, "Official Email Address is required.");
                return "Official Email Address is required.";
            } else if (!emailPattern.test(val)) {
                setFieldValidationState("studentEmail", "err-studentEmail", false, "Invalid email format (must include @ and domain, e.g. student@ul.edu.pk).");
                return "Please enter a valid Email Address (e.g., student@ul.edu.pk).";
            }
            setFieldValidationState("studentEmail", "err-studentEmail", true);
            return null;
        }

        if (fieldId === "studentPhone") {
            const val = document.getElementById("studentPhone").value.trim();
            if (!val) {
                setFieldValidationState("studentPhone", "err-studentPhone", false, "Phone Number is required (11 digits).");
                return "Phone Number is required.";
            } else if (!phonePattern.test(val)) {
                setFieldValidationState("studentPhone", "err-studentPhone", false, `Must be strictly 11 digits (currently ${val.length}/11 digits).`);
                return `Phone Number must be strictly 11 digits (you entered ${val.length} digits).`;
            }
            setFieldValidationState("studentPhone", "err-studentPhone", true);
            return null;
        }

        if (fieldId === "studentDOB") {
            const val = document.getElementById("studentDOB").value;
            if (!val) {
                setFieldValidationState("studentDOB", "err-studentDOB", false, "Please select your Date of Birth.");
                return "Date of Birth is required.";
            }
            setFieldValidationState("studentDOB", "err-studentDOB", true);
            return null;
        }

        if (fieldId === "studentSemester") {
            const val = document.getElementById("studentSemester").value.trim();
            const semNum = Number(val);
            if (!val || isNaN(semNum) || semNum < 1 || semNum > 8) {
                setFieldValidationState("studentSemester", "err-studentSemester", false, "Enter a valid semester number between 1 and 8.");
                return "Current Semester must be a number between 1 and 8.";
            }
            setFieldValidationState("studentSemester", "err-studentSemester", true);
            return null;
        }

        if (fieldId === "studentCourse") {
            const val = document.getElementById("studentCourse").value;
            if (!val) {
                setFieldValidationState("studentCourse", "err-studentCourse", false, "Please choose a course from the dropdown.");
                return "Please select a Course to enroll in.";
            }
            setFieldValidationState("studentCourse", "err-studentCourse", true);
            return null;
        }

        if (fieldId === "agreeTerms") {
            const checked = document.getElementById("agreeTerms").checked;
            if (!checked) {
                setFieldValidationState("agreeTerms", "err-agreeTerms", false, "You must check this box to confirm UOL academic rules.");
                return "You must confirm the UOL CMS academic rules checkbox.";
            }
            setFieldValidationState("agreeTerms", "err-agreeTerms", true);
            return null;
        }

        return null;
    }

    // Update top error summary box dynamically: if all fields become valid, hide the top red alert automatically!
    const allValidatedFieldIds = [
        "studentName",
        "fatherName",
        "studentRoll",
        "studentEmail",
        "studentPhone",
        "studentDOB",
        "studentSemester",
        "studentCourse",
        "agreeTerms"
    ];

    function refreshTopErrorSummaryIfVisible() {
        if (formErrorAlert.classList.contains("d-none")) return;

        const remainingErrors = [];
        allValidatedFieldIds.forEach(function (id) {
            const el = document.getElementById(id);
            if (el && el.classList.contains("is-invalid")) {
                const errText = document.getElementById("err-" + id);
                if (errText) remainingErrors.push(errText.textContent);
            }
        });

        if (remainingErrors.length === 0) {
            formErrorAlert.classList.add("d-none");
        } else {
            formErrorAlert.innerHTML = "<strong>⚠️ Please fix the remaining fields:</strong><ul class='mb-0 mt-1'>" +
                remainingErrors.map(function (err) { return `<li>${err}</li>`; }).join("") +
                "</ul>";
        }
    }

    // Attach Real-Time Live Validation Listeners (Error disappears immediately when user enters valid data!)
    allValidatedFieldIds.forEach(function (fieldId) {
        const el = document.getElementById(fieldId);
        if (!el) return;

        const eventType = (el.tagName === "SELECT" || el.type === "checkbox" || el.type === "date") ? "change" : "input";

        el.addEventListener(eventType, function () {
            validateSingleField(fieldId);
            refreshTopErrorSummaryIfVisible();
        });

        el.addEventListener("blur", function () {
            validateSingleField(fieldId);
            refreshTopErrorSummaryIfVisible();
        });
    });

    resetFormBtn.addEventListener("click", function () {
        clearAllValidationStates();
        disabilityGroundFloorNote.classList.add("d-none");
        phoneLiveHint.textContent = "Digits only (03XXXXXXXXX — 11/11 digits).";
        phoneLiveHint.className = "form-text text-muted";
    });

    // Clear All Saved Records in Admin Dashboard (Resets back to 0 & keeps Applied Students active)
    clearAllRecordsBtn.addEventListener("click", function () {
        if (appliedStudents.length > 0 && !confirm("Are you sure you want to clear all student records? This will reset the applied count back to 0.")) {
            return;
        }

        localStorage.removeItem("uolSubmittedStudents");
        localStorage.removeItem("uolRegisteredStudent");
        appliedStudents = [];
        renderAdminDashboard();
        formSuccessBanner.classList.add("d-none");

        // Keep "Applied Students" cleanly highlighted
        isClickScrolling = true;
        setActiveNavLinkById("admin-dashboard");
        if (clickScrollTimer) clearTimeout(clickScrollTimer);
        clickScrollTimer = setTimeout(function () {
            isClickScrolling = false;
            updateActiveNavOnScroll();
        }, 400);
    });

    // Modal "Go to Admin Dashboard" Button Handler (Closes modal & smoothly scrolls to #admin-dashboard)
    const modalElement = document.getElementById("registrationConfirmModal");
    const modalGoToDashboardBtn = document.getElementById("modalGoToDashboardBtn");

    function smoothScrollToAdminDashboard() {
        const dashboardSec = document.getElementById("admin-dashboard");
        if (dashboardSec) {
            isClickScrolling = true;
            setActiveNavLinkById("admin-dashboard");

            const navHeader = document.getElementById("main-header");
            const navOffset = navHeader ? navHeader.offsetHeight : 80;
            const targetPos = dashboardSec.getBoundingClientRect().top + window.pageYOffset - navOffset;

            window.scrollTo({
                top: Math.max(0, targetPos),
                behavior: "smooth"
            });

            if (clickScrollTimer) clearTimeout(clickScrollTimer);
            clickScrollTimer = setTimeout(function () {
                isClickScrolling = false;
                updateActiveNavOnScroll();
            }, 850);
        }
    }

    if (modalGoToDashboardBtn && modalElement) {
        modalGoToDashboardBtn.addEventListener("click", function () {
            // Dismiss modal cleanly via Bootstrap API
            const modalInstance = bootstrap.Modal.getInstance(modalElement) || bootstrap.Modal.getOrCreateInstance(modalElement);
            if (modalInstance) {
                modalInstance.hide();
            }

            // Scroll to dashboard after modal begins dismissal & body overflow unlocks
            setTimeout(smoothScrollToAdminDashboard, 180);
        });

        // Ensure body scrolling is never locked after modal closes
        modalElement.addEventListener("hidden.bs.modal", function () {
            document.body.classList.remove("modal-open");
            document.body.style.removeProperty("overflow");
            document.body.style.removeProperty("padding-right");
        });
    }

    // Registration Form Submit Handler (Requirement 4, 5 & 9)
    studentRegForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const errors = [];
        allValidatedFieldIds.forEach(function (fieldId) {
            const errMsg = validateSingleField(fieldId);
            if (errMsg) {
                errors.push(errMsg);
            }
        });

        if (errors.length > 0) {
            formErrorAlert.innerHTML = "<strong>⚠️ Form Validation Failed — Please fix the following fields:</strong><ul class='mb-0 mt-1'>" +
                errors.map(function (err) { return `<li>${err}</li>`; }).join("") +
                "</ul>";
            formErrorAlert.classList.remove("d-none");
            formSuccessBanner.classList.add("d-none");
            return;
        }

        formErrorAlert.classList.add("d-none");

        const name = document.getElementById("studentName").value.trim();
        const father = document.getElementById("fatherName").value.trim();
        const roll = document.getElementById("studentRoll").value.trim();
        const email = document.getElementById("studentEmail").value.trim();
        const phone = document.getElementById("studentPhone").value.trim();
        const dob = document.getElementById("studentDOB").value;
        const semNum = Number(document.getElementById("studentSemester").value.trim());
        const course = document.getElementById("studentCourse").value;
        const shiftEl = document.querySelector('input[name="studyShift"]:checked');
        const shift = shiftEl ? shiftEl.value : "Morning";
        const disabilityEl = document.querySelector('input[name="disabilityStatus"]:checked');
        const disability = disabilityEl ? disabilityEl.value : "No";
        const notes = document.getElementById("studentNotes").value.trim();

        const roomArrangement = disability === "Yes"
            ? "♿ Ground Floor Classroom Arranged (Accessible Ramp & Ground Floor Lab)"
            : "Standard Classroom Allocation";

        const studentRecord = {
            id: appliedStudents.length + 1,
            name: name,
            father: father,
            roll: roll,
            email: email,
            phone: phone,
            dob: dob,
            semester: semNum,
            course: course,
            shift: shift,
            disability: disability,
            roomNote: roomArrangement,
            notes: notes,
            registeredAt: new Date().toLocaleString()
        };

        // Save in LocalStorage (Requirement 9)
        appliedStudents.push(studentRecord);
        localStorage.setItem("uolSubmittedStudents", JSON.stringify(appliedStudents));
        localStorage.setItem("uolRegisteredStudent", JSON.stringify(studentRecord));

        // Requirement 5: Display the student name after successful registration
        registeredStudentBannerName.textContent = studentRecord.name;
        formSuccessBanner.classList.remove("d-none");

        // Update Admin Applied Students Dashboard & show the newly registered student's profile
        renderAdminDashboard(appliedStudents.length - 1);

        // Populate and trigger the Bootstrap 5 Confirmation Modal (Task 3)
        document.getElementById("modalStudentName").textContent = studentRecord.name;
        document.getElementById("modalStudentRoll").textContent = studentRecord.roll;
        document.getElementById("modalFatherName").textContent = studentRecord.father;
        document.getElementById("modalStudentEmail").textContent = `${studentRecord.email} | ${studentRecord.phone}`;
        document.getElementById("modalStudentCourse").textContent = studentRecord.course;
        document.getElementById("modalStudentMeta").textContent = `Semester ${studentRecord.semester} (${studentRecord.shift} Shift)`;
        document.getElementById("modalDisabilityNote").innerHTML = disability === "Yes"
            ? `<strong class="text-primary">♿ Yes — For disabled students, class will be arranged on the Ground Floor.</strong>`
            : `No (Standard Classroom Allocation)`;

        const confirmModal = bootstrap.Modal.getOrCreateInstance(modalElement);
        confirmModal.show();

        studentRegForm.reset();
        clearAllValidationStates();
        disabilityGroundFloorNote.classList.add("d-none");
        phoneLiveHint.textContent = "Digits only (03XXXXXXXXX — 11/11 digits).";
        phoneLiveHint.className = "form-text text-muted";
    });

});
