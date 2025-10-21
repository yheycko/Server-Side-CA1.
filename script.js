document.getElementById('userForm').addEventListener('submit', function (e) {
  const form = e.target;
  const firstName = form.first_name.value.trim();
  const lastName = form.last_name.value.trim();
  const email = form.email.value.trim();
  const phone = form.phone_number.value.trim();
  const eircode = form.eircode.value.trim();

  const nameRegex = /^[a-zA-Z0-9]{1,20}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\d{10}$/;
  const eircodeRegex = /^[0-9][a-zA-Z0-9]{5}$/;

  if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
    alert("First and Last Name must be alphanumeric and max 20 characters.");
    e.preventDefault();
  } else if (!emailRegex.test(email)) {
    alert("Invalid email format.");
    e.preventDefault();
  } else if (!phoneRegex.test(phone)) {
    alert("Phone number must be exactly 10 digits.");
    e.preventDefault();
  } else if (!eircodeRegex.test(eircode)) {
    alert("Eircode must start with a number, be alphanumeric, and exactly 6 characters.");
    e.preventDefault();
  }
});