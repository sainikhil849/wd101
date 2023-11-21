const inputForm = document.getElementById("user-form");
const enteredDOB = document.getElementById("dob");
const dateToday = new Date().toISOString().slice(4, 10);
const currentYear = new Date().getFullYear();
enteredDOB.min = `${currentYear - 55}${dateToday}`;
enteredDOB.max = `${currentYear - 18}${dateToday}`;

const getEntries = () => {
  let inputData = localStorage.getItem("user-entries");
  return inputData ? JSON.parse(inputData) : [];
};

let inputEntries = getEntries();

const displayEntries = () => {
  const tableEntries = inputEntries
    .map((entry) => {
      const { name, email, password, dob, acceptTermsAndConditions } = entry;
      return `<tr>
                <td>${name}</td>
                <td>${email}</td>
                <td>${password}</td>
                <td>${dob}</td>
                <td>${acceptTermsAndConditions}</td>
              </tr>`;
    })
    .join("\n");

  const table = `<table border="1">
                    <tr>
                      <th>Name</th>
                      <th>Email Address</th>
                      <th>Password</th>
                      <th>Dob</th>
                      <th>Accepted terms?</th>
                    </tr>
                    ${tableEntries}
                </table>`;

  let details = document.getElementById("show_the_date");
  details.innerHTML = table;
};

const saveInputForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptTermsAndConditions = document.getElementById("tick_mark").checked;

  const inputData = {
    name,
    email,
    password,
    dob,
    acceptTermsAndConditions,
  };

  inputEntries.push(inputData);
  localStorage.setItem("user-entries", JSON.stringify(inputEntries));
  displayEntries();
};

inputForm.addEventListener("submit", saveInputForm);
displayEntries();
