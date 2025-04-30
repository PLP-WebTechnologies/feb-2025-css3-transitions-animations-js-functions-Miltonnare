const form = document.getElementById('surveyForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const experience = document.getElementById('experience');
const comments = document.getElementById('comments');
const charCount = document.getElementById('charCount');
const progressBar = document.getElementById('progressBar');
const formStatus = document.getElementById('formStatus');
const displayDataBtn = document.getElementById('displayDataBtn');
const storedDataDisplay = document.getElementById('storedDataDisplay');
const clearDataBtn = document.getElementById('clearDataBtn');

// Character count (interactive element)
comments.addEventListener('input', () => {
  charCount.textContent = `${comments.value.length}/200 characters`;
  const percentage = (comments.value.length / 200) * 100;
  progressBar.style.width = `${percentage}%`;

  // Change color based on percentage
  if (percentage < 50) {
    progressBar.style.backgroundColor = 'green';
  } else if (percentage < 85) {
    progressBar.style.backgroundColor = 'violet';
  } else {
    progressBar.style.backgroundColor = 'red';
  }
});

// Form submission and validation
form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Clear errors
  document.getElementById('nameError').textContent = '';
  document.getElementById('emailError').textContent = '';
  document.getElementById('experienceError').textContent = '';
  document.getElementById('commentsError').textContent = '';
  formStatus.textContent = '';
  formStatus.classList.remove('success');

  let valid = true;

  if (fullName.value.trim() === '') {
    document.getElementById('nameError').textContent = 'Name is required.';
    valid = false;
  }

  if (email.value.trim() === '' || !email.value.includes('@')) {
    document.getElementById('emailError').textContent = 'Enter a valid email.';
    valid = false;
  }

  if (experience.value === '') {
    document.getElementById('experienceError').textContent = 'Please select your experience level.';
    valid = false;
  }

  if (comments.value.trim().length < 10) {
    document.getElementById('commentsError').textContent = 'Comment should be at least 10 characters.';
    valid = false;
  }
  const data = {
    fullName: fullName.value,
    email: email.value,
    experience: experience.value,
    comments: comments.value
  };
  localStorage.setItem('surveyData', JSON.stringify(data));

  if (valid) {
    formStatus.textContent = 'Survey submitted successfully! Thank you.';
    formStatus.classList.add('success');
    form.reset();
    charCount.textContent = '0/200 characters';
    progressBar.style.width = '0%';
    progressBar.style.backgroundColor = 'green';
  }
});
displayDataBtn.addEventListener('click', () => {
    const storedData = localStorage.getItem('surveyData');
  
    if (storedData) {
      const data = JSON.parse(storedData);
      storedDataDisplay.innerHTML = `
        <p><strong>Full Name:</strong> ${data.fullName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Experience:</strong> ${data.experience}</p>
        <p><strong>Comments:</strong> ${data.comments}</p>
      `;
    } else {
      storedDataDisplay.textContent = 'No data found in localStorage.';
    }
  });
  clearDataBtn.addEventListener('click', () => {
    localStorage.removeItem('surveyData'); 
    storedDataDisplay.textContent = 'Local storage cleared.';
  });