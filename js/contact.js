// Get the contact form
const contactForm = document.getElementById("contact-form");

// Get the form fields
const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const phoneInput = document.getElementById("phone");
const messageInput = document.getElementById("message");

// Get the feedback element
const formFeedback = document.getElementById("form-feedback");


// Listen for form submission
contactForm.addEventListener("submit", function(event) {

    // Prevent automatic page refresh
    event.preventDefault();

    // Clear previous errors
    clearErrors();

    // Get user input
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    const phone = phoneInput.value.trim();
    const message = messageInput.value.trim();

    let isValid = true;


    // Validate name
    if (name === "") {
        showError("name", "Please enter your full name.");
        isValid = false;
    }


    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        showError("email", "Please enter your email address.");
        isValid = false;

    } else if (!emailPattern.test(email)) {
        showError("email", "Please enter a valid email address.");
        isValid = false;
    }


    // Validate phone number
    const phonePattern = /^\d+$/;

    if (phone === "") {
        showError("phone", "Please enter your phone number.");
        isValid = false;

    } else if (!phonePattern.test(phone)) {
        showError("phone", "Phone number must contain digits only.");
        isValid = false;
    }


    // Validate message
    if (message === "") {
        showError("message", "Please enter your message.");
        isValid = false;
    }


    // Display result
    if (isValid) {

        formFeedback.textContent =
            "Your form has passed validation successfully!";

        formFeedback.style.color = "#16a34a";

        // Reset the form
        contactForm.reset();

    } else {

        formFeedback.textContent =
            "Please correct the errors before submitting.";

        formFeedback.style.color = "#dc2626";

    }

});


// Function to display validation errors
function showError(field, errorText) {

    const errorElement = document.getElementById(field + "-error");

    const inputElement = document.getElementById(field);

    errorElement.textContent = errorText;

    inputElement.classList.add("input-error");

}


// Function to clear previous validation errors
function clearErrors() {

    const errorMessages = document.querySelectorAll(".error-message");

    const inputFields = document.querySelectorAll(
        "#contact-form input, #contact-form textarea"
    );

    errorMessages.forEach(function(error) {
        error.textContent = "";
    });

    inputFields.forEach(function(input) {
        input.classList.remove("input-error");
    });

    formFeedback.textContent = "";

}