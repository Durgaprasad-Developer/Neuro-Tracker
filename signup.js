document.addEventListener("DOMContentLoaded", () => {
    // Get elements for Step 1 and Step 2
    const step1 = document.getElementById("form-step-1");
    const step2 = document.getElementById("form-step-2");
  
    // Get buttons
    const nextBtn1 = document.getElementById("next-btn-1");
    const submitBtn = document.getElementById("submit-btn");
  
    // Step 1: Navigate to Step 2
    nextBtn1.addEventListener("click", () => {
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
  
      // Validate Step 1 inputs
      if (name && email && password) {
        step1.classList.add("hidden");
        step2.classList.remove("hidden");
      } else {
        alert("Please fill out all fields in Step 1.");
      }
    });
  
    // Step 2: Submit Form
    submitBtn.addEventListener("click", () => {
      // Collect form data
      const goals = document.getElementById("goals").value.trim();
      const hobbies = document.getElementById("hobbies").value.trim();
      const howCanHelp = document.getElementById("how-can-help").value.trim();
      const productivity = document.getElementById("productivity").value;
      const biggestChallenge = document.getElementById("biggest-challenge").value.trim();
      const learningPreference = document.getElementById("learning-preference").value;
      const improveFocus = document.getElementById("improve-focus").value.trim();
      const motivationLevel = document.getElementById("motivation-level").value;
      const timeManagement = document.getElementById("time-management").value;
  
      // Validate Step 2 inputs
      if (goals && hobbies && howCanHelp && biggestChallenge && improveFocus) {
        // Log data or send it to a server
        console.log({
          goals,
          hobbies,
          howCanHelp,
          productivity,
          biggestChallenge,
          learningPreference,
          improveFocus,
          motivationLevel,
          timeManagement,
        });
        window.location.href = "index.html";
      } else {
        alert("Please fill out all fields in Step 2.");
      }

    });
  });
  
  