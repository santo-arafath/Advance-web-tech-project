// utils/validation.js
const validateExpertSignUpForm = (formData) => {
    const errors = {};
  
    // Custom validation rules for Expert Signup
  if (!formData.name) {
    errors.name = 'Name is required';
  }

  if (!formData.username) {
    errors.username = 'Username is required';
  }

  if (!formData.password || formData.password.length < 8) {
    errors.password = 'Password must be at least 8 characters long';
  }

  if (!formData.address) {
    errors.address = 'Address is required';
  }

  if (!formData.email) {
    errors.email = 'Email is required';
  } else if (!isValidEmail(formData.email)) {
    errors.email = 'Invalid email address';
  } 
  
    return errors;
  };
  
  const isValidEmail = (email) => {
    const emailPattern = /^\S+@\S+\.\S+$/;
    return emailPattern.test(email);
  };
  
  export { validateExpertSignUpForm };
  