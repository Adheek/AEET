document.addEventListener("DOMContentLoaded", function () {
    const manageUserButton = document.getElementById("manageuser-SA-Btn");
    const userManagementModal = document.getElementById("userManagementModal");
    const closeModalButton = document.querySelector(".close-btn");
    const tabButtons = document.querySelectorAll(".tab-button");
    const tabContents = document.querySelectorAll(".tab-content");
    const searchUserInput = document.getElementById("searchUser");
    const userTableBody = document.getElementById("userTableBody");
    const addUserForm = document.getElementById("addUserForm");
    const togglePasswordButton = document.querySelector(".toggle-password");
    const passwordInput = document.getElementById("password");

    /** Open User Management Modal */
    if (manageUserButton) {
        manageUserButton.addEventListener("click", function () {
            userManagementModal.style.display = "block";
        });
    }

    /** Close User Management Modal */
    if (closeModalButton) {
        closeModalButton.addEventListener("click", function () {
            userManagementModal.style.display = "none";
        });
    }

    /** Close modal when clicking outside of it */
    window.addEventListener("click", function (event) {
        if (event.target === userManagementModal) {
            userManagementModal.style.display = "none";
        }
    });

    /** Switch Tabs */
    tabButtons.forEach(button => {
        button.addEventListener("click", function () {
            const targetTab = this.getAttribute("data-tab");

            tabButtons.forEach(btn => btn.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            this.classList.add("active");
            document.getElementById(targetTab).classList.add("active");
        });
    });

    /** Search Functionality for User List */
    if (searchUserInput) {
        searchUserInput.addEventListener("input", function () {
            const searchTerm = searchUserInput.value.toLowerCase();
            const rows = userTableBody.getElementsByTagName("tr");

            for (let row of rows) {
                const usernameCell = row.cells[0]?.textContent.toLowerCase() || "";
                row.style.display = usernameCell.includes(searchTerm) ? "" : "none";
            }
        });
    }

    /** Toggle Password Visibility */
    if (togglePasswordButton) {
        togglePasswordButton.addEventListener("click", function () {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                this.innerHTML = `<i class="fas fa-eye-slash"></i>`;
            } else {
                passwordInput.type = "password";
                this.innerHTML = `<i class="fas fa-eye"></i>`;
            }
        });
    }

    /** Handle Add User Form Submission */
    if (addUserForm) {
        addUserForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const newUser = {
                username: document.getElementById("Newusername").value.trim(),
                password: document.getElementById("password").value.trim(),
                fullName: document.getElementById("fullName").value.trim(),
                email: document.getElementById("email").value.trim(),
                role: document.getElementById("role").value,
                department: document.getElementById("Rdepartment").value.trim()
            };

            if (Object.values(newUser).some(value => value === "")) {
                alert("Please fill in all required fields.");
                return;
            }

            addUserToTable(newUser);
            addUserForm.reset();
            alert("User added successfully!");
            switchTab("userList");
        });
    }

    /** Add User to Table */
    function addUserToTable(user) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${user.username}</td>
            <td>${user.fullName}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.department}</td>
            <td>
                <button class="edit-btn"><i class="fas fa-edit"></i></button>
                <button class="delete-btn"><i class="fas fa-trash-alt"></i></button>
            </td>
        `;
        userTableBody.appendChild(row);
    }

    /** Switch Tabs Function */
    function switchTab(tabId) {
        tabButtons.forEach(btn => btn.classList.remove("active"));
        tabContents.forEach(content => content.classList.remove("active"));

        document.querySelector(`.tab-button[data-tab="${tabId}"]`).classList.add("active");
        document.getElementById(tabId).classList.add("active");
    }
});
