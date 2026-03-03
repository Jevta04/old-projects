const form = document.getElementById('form-container');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordRetry = document.getElementById('password-retry');


form.addEventListener('submit', e => {
    e.preventDefault();

    validateInputs();
})
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success');
}
const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = "";
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
}

const validateInputs = () => {
    const usernameValue = username.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const passwordRetryValue = password.value.trim();

    if (usernameValue === '') {
        setError(username, 'Username is required.');
    }
    else {
        setSuccess(username);
    }
    if (emailValue === '') {
        setError(email, 'Email is required.');
    }
    else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address.')
    }
    else {
        setSuccess(email);
    }
    if (passwordValue === '') {
        setError(password, 'Username is required.');
    }
    else if (passwordValue.length < 8) {
        setError(password, 'Password must be longer than 8 characters.')
    }
    else {
        setSuccess(password);
    }
    if (passwordRetryValue === '') {
        setError(passwordRetry, "Please confirm your password.")
    }
    if (passwordRetryValue !== passwordValue) {
        setError(passwordRetry, "Password doesn't match.")
    }
    else {
        setSuccess(passwordRetry);
    }

}