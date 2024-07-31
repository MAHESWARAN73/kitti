document.getElementById('enquiryForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // Get form values
    var name = document.getElementById('name').value;
    var contact = document.getElementById('contact').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;
    
    // Validate form fields
    if (name === '' || contact === '' || email === '' || message === '') {
        alert('Please fill in all fields.');
        return;
    }
    
    // Additional validation for email format
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    
    // Additional validation for phone number format
    var phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(contact)) {
        alert('Please enter a valid 10-digit phone number.');
        return;
    }
    
    // If all validations pass, submit the form (you can replace this with AJAX request if needed)
    alert('Form submitted successfully.');
    this.submit();
});