document.addEventListener("DOMContentLoaded", function () {
    // Fetch user role from sessionStorage or API
    fetchUserRole();
});

function fetchUserRole() {
    fetch("/Dashboard/GetUserRole") // Call API to get user role
        .then(response => response.json())
        .then(data => {
            if (data.role) {
                configureDashboard(data.role);
            } else {
                console.error("Role not found");
            }
        })
        .catch(error => console.error("Error fetching role:", error));
}

function configureDashboard(role) {
    console.log("User Role:", role);

    // Hide all icons by default
    document.querySelectorAll(".rolebased-action-btn").forEach(btn => btn.style.display = "none");

    // Show all icons for Admin
    if (role === "Admin") {
        document.querySelectorAll(".rolebased-action-btn").forEach(btn => btn.style.display = "flex");
    }
    // Show specific icons for IT
    else if (role === "IT") {
        document.getElementById("scanner-SA-AA-TO-Btn").style.display = "flex"; // Scanner
        document.getElementById("assetlog-SA-AA-TO-Btn").style.display = "flex"; // Asset Logs
        document.getElementById("addnewasset-SA-Btn").style.display = "flex"; // Add New Asset
        document.getElementById("qrgenerator-SA-AA-Btn").style.display = "flex"; // qr genrator Asset
    }
    // Show specific icons for Security
    else if (role === "Security") {
        document.getElementById("scanner-SA-AA-TO-Btn").style.display = "flex"; // Scanner
        document.getElementById("assetlog-SA-AA-TO-Btn").style.display = "flex"; // Asset Logs
    }
}
