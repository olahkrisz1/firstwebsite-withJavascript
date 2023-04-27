function updateCounters() {
  // Total number of steps
  const totalCount = document.getElementById("total-count");
  const totalSteps = document.getElementsByClassName("step").length;
  totalCount.innerHTML = totalSteps;

  // Total number of completed steps
  const completedCount = document.getElementById("completed-count");
  const completedSteps = document.getElementsByClassName("completed").length;
  completedCount.innerHTML = completedSteps;

  // Total number of uncompleted steps
  const todoCount = document.getElementById("step-count");
  const uncompletedSteps = totalSteps - completedSteps;
  todoCount.innerHTML = uncompletedSteps;
}

updateCounters();

function toggleDone(event) {
  const checkbox = event.currentTarget;
  // check the checked status of the checkbox
  if (checkbox.checked) {
    // the "completed" class is set on the parent element, the <li>
    checkbox.parentElement.parentElement.className = "step completed";
  } else {
    checkbox.parentElement.parentElement.className = "step";
  }

  updateCounters();
}

const checkboxes = document.querySelectorAll(".step input");

for (let i = 0; i < checkboxes.length; i++) {
  checkboxes[i].addEventListener("change", toggleDone);
}

function createStep(title) {
  // create a label
  const label = document.createElement("label");

  // create a checkbox
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = false;
  // add the "change" event listener to the checkbox
  checkbox.addEventListener("change", toggleDone);
  // and add the checkbox to the label
  label.appendChild(checkbox);

  // create a text node with the given title
  const labelText = document.createTextNode(" " + title);
  // and add the text node to the label
  label.appendChild(labelText);

  // create a list item
  const listItem = document.createElement("li");
  listItem.className = "step";
  // and add the label to it
  listItem.appendChild(label);

  // add the list item to the todo list
  const list = document.getElementById("steplist");
  list.appendChild(listItem);
}

document
  .querySelector("form")
  .addEventListener("submit", function addNewStep(event) {
    event.preventDefault();

    const inputField = document.querySelector("#new-step");
    const newStepTitle = inputField.value;
    createStep(newStepTitle);

    // reset the value of the inputField to make it empty and
    // ready to create new steps
    inputField.value = null;

    updateCounters();
  });

function cleanUpDoneSteps() {
  // get all the "done" items
  const doneItems = document.querySelectorAll(".completed");

  // loop through the "done" step items
  for (let i = 0; i < doneItems.length; i++) {
    // and remove them from the DOM
    doneItems[i].remove();
  }

  // update the counters
  updateCounters();
}

document.getElementById("clean-up").addEventListener("click", cleanUpDoneSteps);
