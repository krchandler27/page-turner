app.get('/js/logout.js', function(req, res) {
  res.set('Content-Type', 'text/javascript');
  res.sendFile(path.join(__dirname, 'public/js/logout.js'));
});

// Login if user already has a profile
const loginForm = async (event) => {
  event.preventDefault();

  // Collect loginForm data
  const email = document.getElementById("email-login").value.trim();
  const password = document.getElementById("password-login").value.trim();

  if (email && password) {
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    //  If email and password match, go to profile
    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("🚫 Email & Password don't match 🚫");
    }
  }
};

// Create new profile
const signupForm = async (event) => {
  event.preventDefault();

  const name = document.getElementById("name-signup").value.trim();
  const email = document.getElementById("email-signup").value.trim();
  const password = document.getElementById("password-signup").value.trim();

  if (name && email && password) {
    const response = await fetch("/api/users", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/profile");
    } else {
      alert("🚫 One or more inputs are incorrect 🚫");
    }
  }
};

document.querySelector(".login-form").addEventListener("submit", loginForm);

document.querySelector(".signup-form").addEventListener("submit", signupForm);