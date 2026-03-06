window.addEventListener("load",function(){

setTimeout(function(){

document.getElementById("intro").style.display="none";

},2000);

});const quotes = [
  "Discipline is stronger than motivation.",
  "Small progress every day becomes big success.",
  "Focus on the chapter, not the pressure.",
  "Consistency beats intensity.",
  "One strong study session can change your day.",
  "Your future is built by what you do today."
];

const authScreen = document.getElementById("authScreen");
const appScreen = document.getElementById("appScreen");
const authMsg = document.getElementById("authMsg");

const tabBtns = document.querySelectorAll(".tab-btn");
const tabContents = document.querySelectorAll(".tab-content");

const loginContact = document.getElementById("loginContact");
const loginPassword = document.getElementById("loginPassword");
const signupName = document.getElementById("signupName");
const signupContact = document.getElementById("signupContact");
const signupPassword = document.getElementById("signupPassword");

const loginBtn = document.getElementById("loginBtn");
const signupBtn = document.getElementById("signupBtn");
const guestBtn = document.getElementById("guestBtn");
const logoutBtn = document.getElementById("logoutBtn");

const navBtns = document.querySelectorAll(".nav-btn");
const sections = document.querySelectorAll(".content-section");
const pageTitle = document.getElementById("pageTitle");
const todayDate = document.getElementById("todayDate");
const welcomeUser = document.getElementById("welcomeUser");

const dailyTargetText = document.getElementById("dailyTargetText");
const todayStudyText = document.getElementById("todayStudyText");
const pendingTasksText = document.getElementById("pendingTasksText");
const completedTasksText = document.getElementById("completedTasksText");
const streakCount = document.getElementById("streakCount");
const examCountdownText = document.getElementById("examCountdownText");
const progressText = document.getElementById("progressText");
const quoteText = document.getElementById("quoteText");
const subjectStats = document.getElementById("subjectStats");
const interruptionsCount = document.getElementById("interruptionsCount");

const dailyTargetInput = document.getElementById("dailyTargetInput");
const examNameInput = document.getElementById("examNameInput");
const examDateInput = document.getElementById("examDateInput");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");
const newQuoteBtn = document.getElementById("newQuoteBtn");

const planTitle = document.getElementById("planTitle");
const planSubject = document.getElementById("planSubject");
const planTopic = document.getElementById("planTopic");
const planSlot = document.getElementById("planSlot");
const planPriority = document.getElementById("planPriority");
const planMinutes = document.getElementById("planMinutes");
const addPlannerBtn = document.getElementById("addPlannerBtn");
const plannerList = document.getElementById("plannerList");

const taskTitle = document.getElementById("taskTitle");
const taskSubject = document.getElementById("taskSubject");
const taskTopic = document.getElementById("taskTopic");
const taskDeadline = document.getElementById("taskDeadline");
const taskMinutes = document.getElementById("taskMinutes");
const taskPriority = document.getElementById("taskPriority");
const taskPinned = document.getElementById("taskPinned");
const taskRevision = document.getElementById("taskRevision");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskFilter = document.getElementById("taskFilter");

const timerDisplay = document.getElementById("timerDisplay");
const customMinutes = document.getElementById("customMinutes");
const timerSubject = document.getElementById("timerSubject");
const setCustomBtn = document.getElementById("setCustomBtn");
const startTimerBtn = document.getElementById("startTimerBtn");
const pauseTimerBtn = document.getElementById("pauseTimerBtn");
const resetTimerBtn = document.getElementById("resetTimerBtn");
const presetBtns = document.querySelectorAll(".preset-btn");
const focusModeCheck = document.getElementById("focusModeCheck");
const sessionCount = document.getElementById("sessionCount");
const interruptionsBox = document.getElementById("interruptionsBox");

const noteTitle = document.getElementById("noteTitle");
const noteSubject = document.getElementById("noteSubject");
const noteText = document.getElementById("noteText");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesList = document.getElementById("notesList");

const goalTitle = document.getElementById("goalTitle");
const goalType = document.getElementById("goalType");
const goalDate = document.getElementById("goalDate");
const addGoalBtn = document.getElementById("addGoalBtn");
const goalsList = document.getElementById("goalsList");

const habitChecks = document.querySelectorAll(".habitCheck");
const habitSummary = document.getElementById("habitSummary");

const adminUsers = document.getElementById("adminUsers");
const adminTasks = document.getElementById("adminTasks");
const adminNotes = document.getElementById("adminNotes");
const adminMinutes = document.getElementById("adminMinutes");
const usersList = document.getElementById("usersList");

const themeToggle = document.getElementById("themeToggle");

let timerInterval = null;
let totalSeconds = 25 * 60;
let initialSeconds = 25 * 60;

const todayKey = new Date().toISOString().slice(0, 10);

function getUsers() {
  return JSON.parse(localStorage.getItem("studyAppUsers")) || [];
}

function saveUsers(users) {
  localStorage.setItem("studyAppUsers", JSON.stringify(users));
}

function getCurrentSession() {
  return JSON.parse(localStorage.getItem("studyAppSession")) || null;
}

function setCurrentSession(session) {
  localStorage.setItem("studyAppSession", JSON.stringify(session));
}

function clearCurrentSession() {
  localStorage.removeItem("studyAppSession");
}

function createUserData() {
  return {
    settings: {
      dailyTarget: 5,
      examName: "",
      examDate: ""
    },
    planner: [],
    tasks: [],
    notes: [],
    goals: [],
    habits: {},
    studyLog: {},
    sessionCount: 0,
    interruptions: 0,
    streak: 0,
    lastStudyDate: "",
    theme: "dark"
  };
}

function getActiveUser() {
  const session = getCurrentSession();
  if (!session) return null;

  if (session.type === "guest") {
    return {
      type: "guest",
      name: "Guest User",
      contact: "guest",
      password: "",
      data: createUserData()
    };
  }

  const users = getUsers();
  return users.find(u => u.contact === session.contact) || null;
}

function saveActiveUser(updatedUser) {
  const session = getCurrentSession();
  if (!session || session.type === "guest") return;

  const users = getUsers();
  const index = users.findIndex(u => u.contact === updatedUser.contact);
  if (index !== -1) {
    users[index] = updatedUser;
    saveUsers(users);
  }
}

function showAuthMessage(msg, isError = true) {
  authMsg.style.color = isError ? "#ffd57c" : "#8effbf";
  authMsg.textContent = msg;
}

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    tabContents.forEach(c => c.classList.remove("active"));
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
    showAuthMessage("");
  });
});

signupBtn.addEventListener("click", () => {
  const name = signupName.value.trim();
  const contact = signupContact.value.trim();
  const password = signupPassword.value.trim();

  if (!name || !contact || !password) {
    showAuthMessage("Sab fields fill karo.");
    return;
  }

  const users = getUsers();
  const exists = users.some(u => u.contact === contact);

  if (exists) {
    showAuthMessage("Ye account already bana hua hai.");
    return;
  }

  const newUser = {
    name,
    contact,
    password,
    data: createUserData()
  };

  users.push(newUser);
  saveUsers(users);
  showAuthMessage("Signup successful. Ab login karo.", false);

  signupName.value = "";
  signupContact.value = "";
  signupPassword.value = "";
});

loginBtn.addEventListener("click", () => {
  const contact = loginContact.value.trim();
  const password = loginPassword.value.trim();

  if (!contact || !password) {
    showAuthMessage("Login details fill karo.");
    return;
  }

  const users = getUsers();
  const user = users.find(u => u.contact === contact && u.password === password);

  if (!user) {
    showAuthMessage("Wrong email/mobile ya password.");
    return;
  }

  setCurrentSession({ type: "user", contact: user.contact });
  openApp();
});

guestBtn.addEventListener("click", () => {
  setCurrentSession({ type: "guest" });
  openApp();
});

logoutBtn.addEventListener("click", () => {
  clearCurrentSession();
  authScreen.classList.add("active");
  appScreen.classList.remove("active");
});

navBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    navBtns.forEach(b => b.classList.remove("active"));
    sections.forEach(s => s.classList.remove("active"));

    btn.classList.add("active");
    document.getElementById(btn.dataset.section).classList.add("active");
    pageTitle.textContent = btn.textContent.trim();
  });
});

function openApp() {
  authScreen.classList.remove("active");
  appScreen.classList.add("active");
  renderAll();
}

function renderAll() {
  const user = getActiveUser();
  if (!user) return;

  welcomeUser.textContent = `Welcome, ${user.name}`;
  todayDate.textContent = new Date().toDateString();

  applyTheme(user.data.theme || "dark");
  renderDashboard(user);
  renderPlanner(user);
  renderTasks(user);
  renderNotes(user);
  renderGoals(user);
  renderHabits(user);
  renderAdmin();
  updateTimerBoxes(user);
}

function renderDashboard(user) {
  const data = user.data;
  const studyToday = data.studyLog[todayKey] || { minutes: 0, subjects: {} };
  const totalTodayMinutes = studyToday.minutes || 0;
  const completed = data.tasks.filter(t => t.status === "completed").length;
  const pending = data.tasks.filter(t => t.status !== "completed").length;
  const progress = data.tasks.length ? Math.round((completed / data.tasks.length) * 100) : 0;

  dailyTargetText.textContent = `${data.settings.dailyTarget || 0} hrs`;
  todayStudyText.textContent = `${totalTodayMinutes} min`;
  pendingTasksText.textContent = pending;
  completedTasksText.textContent = completed;
  streakCount.textContent = data.streak || 0;
  progressText.textContent = `${progress}%`;
  interruptionsCount.textContent = data.interruptions || 0;

  quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];

  dailyTargetInput.value = data.settings.dailyTarget || "";
  examNameInput.value = data.settings.examName || "";
  examDateInput.value = data.settings.examDate || "";

  if (data.settings.examName && data.settings.examDate) {
    examCountdownText.textContent = getCountdownText(data.settings.examName, data.settings.examDate);
  } else {
    examCountdownText.textContent = "Not set";
  }

  renderSubjectStats(studyToday.subjects || {});
}

function renderSubjectStats(subjects) {
  const entries = Object.entries(subjects);
  subjectStats.innerHTML = "";

  if (!entries.length) {
    subjectStats.innerHTML = `<div class="empty-state">Aaj abhi koi subject study log nahi hua.</div>`;
    return;
  }

  const maxVal = Math.max(...entries.map(([, mins]) => mins), 1);

  entries.forEach(([subject, mins]) => {
    const percent = Math.round((mins / maxVal) * 100);
    const item = document.createElement("div");
    item.className = "subject-item";
    item.innerHTML = `
      <strong>${escapeHtml(subject)} - ${mins} min</strong>
      <div class="subject-bar">
        <div class="subject-fill" style="width:${percent}%"></div>
      </div>
    `;
    subjectStats.appendChild(item);
  });
}

saveSettingsBtn.addEventListener("click", () => {
  const user = getActiveUser();
  if (!user) return;

  user.data.settings.dailyTarget = Number(dailyTargetInput.value) || 0;
  user.data.settings.examName = examNameInput.value.trim();
  user.data.settings.examDate = examDateInput.value;
  saveActiveUser(user);
  renderAll();
});

newQuoteBtn.addEventListener("click", () => {
  quoteText.textContent = quotes[Math.floor(Math.random() * quotes.length)];
});

addPlannerBtn.addEventListener("click", () => {
  const user = getActiveUser();
  if (!user) return;

  const title = planTitle.value.trim();
  const subject = planSubject.value.trim();
  const topic = planTopic.value.trim();
  const slot = planSlot.value;
  const priority = planPriority.value;
  const minutes = Number(planMinutes.value) || 0;

  if (!title || !subject || !topic || !minutes) {
    alert("Planner ke sab important fields fill karo.");
    return;
  }

  user.data.planner.unshift({
    id: Date.now(),
    title,
    subject,
    topic,
    slot,
    priority,
    minutes
  });

  saveActiveUser(user);
  clearPlannerInputs();
  renderPlanner(user);
});

function clearPlannerInputs() {
  planTitle.value = "";
  planSubject.value = "";
  planTopic.value = "";
  planMinutes.value = "";
}

function renderPlanner(user) {
  plannerList.innerHTML = "";
  const planner = user.data.planner || [];

  if (!planner.length) {
    plannerList.innerHTML = `<div class="empty-state">Planner empty hai.</div>`;
    return;
  }

  planner.forEach(item => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `
      <h4>${escapeHtml(item.title)}</h4>
      <p>${escapeHtml(item.subject)} | ${escapeHtml(item.topic)} | ${item.minutes} min</p>
      <div class="badge-row">
        <span class="badge slot">${item.slot}</span>
        <span class="badge ${item.priority.toLowerCase()}">${item.priority}</span>
      </div>
      <div class="item-actions">
        <button class="ghost-btn" onclick="plannerToTask(${item.id})">Move To Tasks</button>
        <button class="danger-btn" onclick="deletePlanner(${item.id})">Delete</button>
      </div>
    `;
    plannerList.appendChild(div);
  });
}

window.plannerToTask = function(id) {
  const user = getActiveUser();
  if (!user) return;

  const index = user.data.planner.findIndex(p => p.id === id);
  if (index === -1) return;

  const item = user.data.planner[index];
  user.data.tasks.unshift({
    id: Date.now(),
    title: item.title,
    subject: item.subject,
    topic: item.topic,
    deadline: "",
    minutes: item.minutes,
    priority: item.priority,
    pinned: false,
    revision: false,
    status: "pending"
  });

  user.data.planner.splice(index, 1);
  saveActiveUser(user);
  renderAll();
};

window.deletePlanner = function(id) {
  const user = getActiveUser();
  if (!user) return;
  user.data.planner = user.data.planner.filter(p => p.id !== id);
  saveActiveUser(user);
  renderPlanner(user);
};

addTaskBtn.addEventListener("click", () => {
  const user = getActiveUser();
  if (!user) return;

  const title = taskTitle.value.trim();
  const subject = taskSubject.value.trim();
  const topic = taskTopic.value.trim();
  const deadline = taskDeadline.value;
  const minutes = Number(taskMinutes.value) || 0;
  const priority = taskPriority.value;

  if (!title || !subject || !topic || !minutes) {
    alert("Task ke required fields fill karo.");
    return;
  }

  user.data.tasks.unshift({
    id: Date.now(),
    title,
    subject,
    topic,
    deadline,
    minutes,
    priority,
    pinned: taskPinned.checked,
    revision: taskRevision.checked,
    status: "pending"
  });

  saveActiveUser(user);
  clearTaskInputs();
  renderAll();
});

function clearTaskInputs() {
  taskTitle.value = "";
  taskSubject.value = "";
  taskTopic.value = "";
  taskDeadline.value = "";
  taskMinutes.value = "";
  taskPinned.checked = false;
  taskRevision.checked = false;
}

taskFilter.addEventListener("change", () => {
  const user = getActiveUser();
  if (!user) return;
  renderTasks(user);
});

function renderTasks(user) {
  taskList.innerHTML = "";
  const filter = taskFilter.value;
  let tasks = user.data.tasks || [];

  if (filter !== "all") {
    tasks = tasks.filter(t => t.status === filter);
  }

  if (!tasks.length) {
    taskList.innerHTML = `<div class="empty-state">Koi task nahi mila.</div>`;
    return;
  }

  tasks.sort((a, b) => Number(b.pinned) - Number(a.pinned));

  tasks.forEach(task => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `
      <h4>${escapeHtml(task.title)}</h4>
      <p>${escapeHtml(task.subject)} | ${escapeHtml(task.topic)} | ${task.minutes} min ${task.deadline ? "| Due: " + task.deadline : ""}</p>
      <div class="badge-row">
        <span class="badge ${task.priority.toLowerCase()}">${task.priority}</span>
        <span class="badge ${task.status === "completed" ? "done" : "pending"}">${task.status}</span>
        ${task.pinned ? `<span class="badge slot">Pinned</span>` : ""}
        ${task.revision ? `<span class="badge slot">Revision</span>` : ""}
      </div>
      <div class="item-actions">
        ${task.status !== "completed" ? `<button class="primary-btn" onclick="completeTask(${task.id})">Complete</button>` : ""}
        <button class="ghost-btn" onclick="fillTimerSubject('${escapeForJs(task.subject)}', ${task.minutes})">Use In Timer</button>
        <button class="danger-btn" onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;
    taskList.appendChild(div);
  });
}

window.completeTask = function(id) {
  const user = getActiveUser();
  if (!user) return;

  const task = user.data.tasks.find(t => t.id === id);
  if (!task) return;

  task.status = "completed";
  updateStreak(user);
  saveActiveUser(user);
  renderAll();
};

window.deleteTask = function(id) {
  const user = getActiveUser();
  if (!user) return;

  user.data.tasks = user.data.tasks.filter(t => t.id !== id);
  saveActiveUser(user);
  renderAll();
};

window.fillTimerSubject = function(subject, minutes) {
  pageTitle.textContent = "Timer";
  navBtns.forEach(b => b.classList.remove("active"));
  sections.forEach(s => s.classList.remove("active"));
  document.querySelector('[data-section="timerSection"]').classList.add("active");
  document.getElementById("timerSection").classList.add("active");

  timerSubject.value = subject;
  initialSeconds = minutes * 60;
  totalSeconds = initialSeconds;
  updateTimerDisplay();
};

function updateTimerDisplay() {
  const mins = Math.floor(totalSeconds / 60).toString().padStart(2, "0");
  const secs = (totalSeconds % 60).toString().padStart(2, "0");
  timerDisplay.textContent = `${mins}:${secs}`;
}

presetBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    const mins = Number(btn.dataset.minutes);
    initialSeconds = mins * 60;
    totalSeconds = initialSeconds;
    updateTimerDisplay();
  });
});

setCustomBtn.addEventListener("click", () => {
  const mins = Number(customMinutes.value);
  if (!mins || mins < 1) {
    alert("Valid custom minutes dalo.");
    return;
  }
  initialSeconds = mins * 60;
  totalSeconds = initialSeconds;
  updateTimerDisplay();
});

startTimerBtn.addEventListener("click", () => {
  if (timerInterval) return;

  timerInterval = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateTimerDisplay();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      handleSessionComplete();
      alert("Session complete!");
    }
  }, 1000);
});

pauseTimerBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
});

resetTimerBtn.addEventListener("click", () => {
  clearInterval(timerInterval);
  timerInterval = null;
  totalSeconds = initialSeconds;
  updateTimerDisplay();
});

function handleSessionComplete() {
  const user = getActiveUser();
  if (!user) return;

  const studiedMinutes = Math.floor(initialSeconds / 60);
  if (!user.data.studyLog[todayKey]) {
    user.data.studyLog[todayKey] = { minutes: 0, subjects: {} };
  }

  user.data.studyLog[todayKey].minutes += studiedMinutes;

  const sub = timerSubject.value.trim() || "General";
  if (!user.data.studyLog[todayKey].subjects[sub]) {
    user.data.studyLog[todayKey].subjects[sub] = 0;
  }
  user.data.studyLog[todayKey].subjects[sub] += studiedMinutes;

  user.data.sessionCount += 1;
  updateStreak(user);
  saveActiveUser(user);
  renderAll();
}

function updateStreak(user) {
  const today = new Date(todayKey);
  const last = user.data.lastStudyDate;

  if (!last) {
    user.data.streak = 1;
  } else {
    const lastDate = new Date(last);
    const diff = Math.round((today - lastDate) / (1000 * 60 * 60 * 24));

    if (diff === 0) {
      // same day, keep streak
    } else if (diff === 1) {
      user.data.streak += 1;
    } else {
      user.data.streak = 1;
    }
  }

  user.data.lastStudyDate = todayKey;
}

function updateTimerBoxes(user) {
  sessionCount.textContent = user.data.sessionCount || 0;
  interruptionsBox.textContent = user.data.interruptions || 0;
  interruptionsCount.textContent = user.data.interruptions || 0;
}

document.addEventListener("visibilitychange", () => {
  const user = getActiveUser();
  if (!user) return;
  if (!focusModeCheck.checked) return;

  if (document.hidden) {
    user.data.interruptions += 1;
    saveActiveUser(user);
    updateTimerBoxes(user);
  }
});

addNoteBtn.addEventListener("click", () => {
  const user = getActiveUser();
  if (!user) return;

  const title = noteTitle.value.trim();
  const subject = noteSubject.value.trim();
  const text = noteText.value.trim();

  if (!title || !subject || !text) {
    alert("Note ke fields fill karo.");
    return;
  }

  user.data.notes.unshift({
    id: Date.now(),
    title,
    subject,
    text
  });

  saveActiveUser(user);
  noteTitle.value = "";
  noteSubject.value = "";
  noteText.value = "";
  renderNotes(user);
  renderAdmin();
});

function renderNotes(user) {
  notesList.innerHTML = "";
  const notes = user.data.notes || [];

  if (!notes.length) {
    notesList.innerHTML = `<div class="empty-state">Abhi notes nahi hain.</div>`;
    return;
  }

  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `
      <h4>${escapeHtml(note.title)}</h4>
      <p><b>${escapeHtml(note.subject)}</b></p>
      <p>${escapeHtml(note.text)}</p>
      <div class="item-actions">
        <button class="danger-btn" onclick="deleteNote(${note.id})">Delete</button>
      </div>
    `;
    notesList.appendChild(div);
  });
}

window.deleteNote = function(id) {
  const user = getActiveUser();
  if (!user) return;

  user.data.notes = user.data.notes.filter(n => n.id !== id);
  saveActiveUser(user);
  renderNotes(user);
  renderAdmin();
};

addGoalBtn.addEventListener("click", () => {
  const user = getActiveUser();
  if (!user) return;

  const title = goalTitle.value.trim();
  const type = goalType.value;
  const date = goalDate.value;

  if (!title || !date) {
    alert("Goal title aur date fill karo.");
    return;
  }

  user.data.goals.unshift({
    id: Date.now(),
    title,
    type,
    date
  });

  saveActiveUser(user);
  goalTitle.value = "";
  goalDate.value = "";
  renderGoals(user);
});

function renderGoals(user) {
  goalsList.innerHTML = "";
  const goals = user.data.goals || [];

  if (!goals.length) {
    goalsList.innerHTML = `<div class="empty-state">Koi goal add nahi hua.</div>`;
    return;
  }

  goals.forEach(goal => {
    const div = document.createElement("div");
    div.className = "list-item";
    div.innerHTML = `
      <h4>${escapeHtml(goal.title)}</h4>
      <p>${goal.type} Goal | Target Date: ${goal.date}</p>
      <div class="item-actions">
        <button class="danger-btn" onclick="deleteGoal(${goal.id})">Delete</button>
      </div>
    `;
    goalsList.appendChild(div);
  });
}

window.deleteGoal = function(id) {
  const user = getActiveUser();
  if (!user) return;

  user.data.goals = user.data.goals.filter(g => g.id !== id);
  saveActiveUser(user);
  renderGoals(user);
};

habitChecks.forEach(check => {
  check.addEventListener("change", () => {
    const user = getActiveUser();
    if (!user) return;

    const habitName = check.dataset.habit;
    user.data.habits[habitName] = check.checked;
    saveActiveUser(user);
    renderHabits(user);
  });
});

function renderHabits(user) {
  const habits = user.data.habits || {};
  let completed = 0;

  habitChecks.forEach(check => {
    const habitName = check.dataset.habit;
    check.checked = !!habits[habitName];
    if (check.checked) completed++;
  });

  habitSummary.textContent = `${completed} habits completed today.`;
}

function renderAdmin() {
  const users = getUsers();
  adminUsers.textContent = users.length;

  let totalTasks = 0;
  let totalNotesCount = 0;
  let totalMinutesCount = 0;

  usersList.innerHTML = "";

  if (!users.length) {
    usersList.innerHTML = `<div class="empty-state">No registered users.</div>`;
  } else {
    users.forEach(user => {
      totalTasks += user.data.tasks.length;
      totalNotesCount += user.data.notes.length;
      const logs = Object.values(user.data.studyLog || {});
      logs.forEach(log => {
        totalMinutesCount += log.minutes || 0;
      });

      const div = document.createElement("div");
      div.className = "list-item";
      div.innerHTML = `
        <h4>${escapeHtml(user.name)}</h4>
        <p>${escapeHtml(user.contact)}</p>
        <div class="badge-row">
          <span class="badge slot">Tasks: ${user.data.tasks.length}</span>
          <span class="badge slot">Notes: ${user.data.notes.length}</span>
          <span class="badge slot">Streak: ${user.data.streak}</span>
        </div>
      `;
      usersList.appendChild(div);
    });
  }

  adminTasks.textContent = totalTasks;
  adminNotes.textContent = totalNotesCount;
  adminMinutes.textContent = totalMinutesCount;
}

themeToggle.addEventListener("click", () => {
  const user = getActiveUser();
  if (!user) return;

  user.data.theme = user.data.theme === "light" ? "dark" : "light";
  saveActiveUser(user);
  applyTheme(user.data.theme);
});

function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.add("light");
  } else {
    document.body.classList.remove("light");
  }
}

function getCountdownText(name, dateString) {
  const today = new Date(todayKey);
  const examDate = new Date(dateString);

  const diff = Math.ceil((examDate - today) / (1000 * 60 * 60 * 24));

  if (diff < 0) return `${name} exam date passed`;
  if (diff === 0) return `${name} is today`;
  return `${name} in ${diff} days`;
}

function escapeHtml(text) {
  return String(text)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeForJs(text) {
  return String(text).replaceAll("'", "\\'");
}

(function init() {
  updateTimerDisplay();
  const session = getCurrentSession();
  if (session) {
    openApp();
  }const dailyTargetInput = document.getElementById("dailyTarget");
const examNameInput = document.getElementById("examName");
const examDateInput = document.getElementById("examDate");
const saveSettingsBtn = document.getElementById("saveSettingsBtn");

const upcomingExamText = document.getElementById("upcomingExamText");
const progressText = document.getElementById("progressText");
const completedTasksText = document.getElementById("completedTasksText");

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return dateString;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function updateDashboard() {
  const savedTarget = localStorage.getItem("dailyTarget") || "0";
  const savedExamName = localStorage.getItem("examName") || "Not set";
  const savedExamDate = localStorage.getItem("examDate") || "";
  const completedTasks = localStorage.getItem("completedTasks") || "0";

  // input boxes me purani value dikhane ke liye
  if (dailyTargetInput) dailyTargetInput.value = savedTarget !== "0" ? savedTarget : "";
  if (examNameInput) examNameInput.value = savedExamName !== "Not set" ? savedExamName : "";
  if (examDateInput) examDateInput.value = savedExamDate;

  // Upcoming Exam card update
  if (upcomingExamText) {
    if (savedExamName !== "Not set" && savedExamDate) {
      upcomingExamText.textContent = `${savedExamName} - ${formatDate(savedExamDate)}`;
    } else if (savedExamName !== "Not set") {
      upcomingExamText.textContent = savedExamName;
    } else {
      upcomingExamText.textContent = "Not set";
    }
  }

  // Completed Tasks card update
  if (completedTasksText) {
    completedTasksText.textContent = completedTasks;
  }

  // Progress card update
  let progress = 0;
  const target = Number(savedTarget);
  const done = Number(completedTasks);

  if (target > 0) {
    progress = Math.min(Math.round((done / target) * 100), 100);
  }

  if (progressText) {
    progressText.textContent = `${progress}%`;
  }
}

if (saveSettingsBtn) {
  saveSettingsBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const dailyTargetValue = dailyTargetInput ? dailyTargetInput.value.trim() : "";
    const examNameValue = examNameInput ? examNameInput.value.trim() : "";
    const examDateValue = examDateInput ? examDateInput.value : "";

    localStorage.setItem("dailyTarget", dailyTargetValue || "0");
    localStorage.setItem("examName", examNameValue || "Not set");
    localStorage.setItem("examDate", examDateValue || "");

    updateDashboard();
    alert("Settings saved successfully");
  });
}

window.addEventListener("load", updateDashboard);

})();
document.addEventListener("DOMContentLoaded", function () {
  const dailyTargetInput = document.getElementById("dailyTarget");
  const examNameInput = document.getElementById("examName");
  const examDateInput = document.getElementById("examDate");
  const saveSettingsBtn = document.getElementById("saveSettingsBtn");

  const upcomingExamText = document.getElementById("upcomingExamText");
  const progressText = document.getElementById("progressText");
  const completedTasksText = document.getElementById("completedTasksText");

  function formatDate(dateString) {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;

    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  function updateDashboard() {
    const savedTarget = localStorage.getItem("dailyTarget") || "0";
    const savedExamName = localStorage.getItem("examName") || "Not set";
    const savedExamDate = localStorage.getItem("examDate") || "";
    const completedTasks = localStorage.getItem("completedTasks") || "0";

    if (dailyTargetInput) {
      dailyTargetInput.value = savedTarget !== "0" ? savedTarget : "";
    }

    if (examNameInput) {
      examNameInput.value = savedExamName !== "Not set" ? savedExamName : "";
    }

    if (examDateInput) {
      examDateInput.value = savedExamDate;
    }

    if (upcomingExamText) {
      if (savedExamName !== "Not set" && savedExamDate) {
        upcomingExamText.textContent = `${savedExamName} - ${formatDate(savedExamDate)}`;
      } else if (savedExamName !== "Not set") {
        upcomingExamText.textContent = savedExamName;
      } else {
        upcomingExamText.textContent = "Not set";
      }
    }

    if (completedTasksText) {
      completedTasksText.textContent = completedTasks;
    }

    let progress = 0;
    const target = Number(savedTarget);
    const done = Number(completedTasks);

    if (target > 0) {
      progress = Math.min(Math.round((done / target) * 100), 100);
    }

    if (progressText) {
      progressText.textContent = `${progress}%`;
    }
  }

  if (saveSettingsBtn) {
    saveSettingsBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const dailyTargetValue = dailyTargetInput ? dailyTargetInput.value.trim() : "";
      const examNameValue = examNameInput ? examNameInput.value.trim() : "";
      const examDateValue = examDateInput ? examDateInput.value : "";

      localStorage.setItem("dailyTarget", dailyTargetValue || "0");
      localStorage.setItem("examName", examNameValue || "Not set");
      localStorage.setItem("examDate", examDateValue || "");

      updateDashboard();
      alert("Settings saved successfully");
    });
  }

  updateDashboard();
});

function showDashboard(){
document.getElementById("dashboardUI").classList.remove("hidden");
}

function showSection(name){
console.log("Open section:",name);
}

function saveTarget(){

const val=document.getElementById("targetInput").value;

localStorage.setItem("dailyTarget",val);

document.getElementById("dailyTarget").innerText=val+" hrs";

alert("Target saved");

}

function loadTarget(){

const saved=localStorage.getItem("dailyTarget");

if(saved){

document.getElementById("dailyTarget").innerText=saved+" hrs";

}

}

window.addEventListener("load",loadTarget);
