// ─── DB LAYER ────────────────────────────────────────────────────────────────
// Simulates a db.json with "users" and "todos" arrays in localStorage

const DB_KEYS = { users: 'users', todos: 'todos', currentUser: 'currentUser' };

const db = {
  getUsers:       () => JSON.parse(localStorage.getItem(DB_KEYS.users)  || '[]'),
  getTodos:       () => JSON.parse(localStorage.getItem(DB_KEYS.todos)  || '[]'),
  getCurrentUser: () => JSON.parse(localStorage.getItem(DB_KEYS.currentUser) || 'null'),

  saveUsers:  (users)  => localStorage.setItem(DB_KEYS.users,       JSON.stringify(users)),
  saveTodos:  (todos)  => localStorage.setItem(DB_KEYS.todos,       JSON.stringify(todos)),
  setSession: (user)   => localStorage.setItem(DB_KEYS.currentUser, JSON.stringify(user)),
  clearSession:        () => localStorage.removeItem(DB_KEYS.currentUser),
};


// ─── DOM REFS ─────────────────────────────────────────────────────────────────
const $ = (id) => document.getElementById(id);

const viewAuth      = $('view-auth');
const viewDashboard = $('view-dashboard');
const cardLogin     = $('card-login');
const cardRegister  = $('card-register');

const formLogin    = $('form-login');
const formRegister = $('form-register');
const formTask     = $('form-task');

const headerUsername = $('header-username');
const taskList       = $('task-list');
const emptyState     = $('empty-state');

const statTotal   = $('stat-total');
const statPending = $('stat-pending');
const statDone    = $('stat-done');


// ─── UTILS ────────────────────────────────────────────────────────────────────
function clearErrors(...ids) {
  ids.forEach((id) => {
    const el = $(id);
    if (!el) return;
    el.textContent = '';
    el.classList.add('hidden');
  });
}

function showError(id, msg) {
  const el = $(id);
  if (!el) return;
  el.textContent = msg;
  el.classList.remove('hidden');
}

function markInputError(inputId, hasError) {
  const el = $(inputId);
  if (!el) return;
  el.classList.toggle('input-error', hasError);
}


// ─── ROUTER / VIEWS ───────────────────────────────────────────────────────────
function showView(view) {
  viewAuth.classList.toggle('hidden', view !== 'auth');
  viewDashboard.classList.toggle('hidden', view !== 'dashboard');
}

function showCard(card) {
  cardLogin.classList.toggle('hidden', card !== 'login');
  cardRegister.classList.toggle('hidden', card !== 'register');
  clearErrors(
    'err-login-email', 'err-login-password', 'err-login-general',
    'err-reg-name', 'err-reg-email', 'err-reg-password', 'err-reg-general'
  );
}

function bootstrap() {
  const user = db.getCurrentUser();
  if (user) {
    openDashboard(user);
  } else {
    showView('auth');
    showCard('login');
  }
}

function openDashboard(user) {
  headerUsername.textContent = user.name;
  showView('dashboard');
  renderTasks();
}


// ─── AUTH – LOGIN ─────────────────────────────────────────────────────────────
formLogin.addEventListener('submit', (e) => {
  e.preventDefault();

  const email    = $('login-email').value.trim();
  const password = $('login-password').value;

  clearErrors('err-login-email', 'err-login-password', 'err-login-general');
  markInputError('login-email', false);
  markInputError('login-password', false);

  let valid = true;

  if (!email) {
    showError('err-login-email', 'Informe o e-mail.');
    markInputError('login-email', true);
    valid = false;
  }
  if (!password) {
    showError('err-login-password', 'Informe a senha.');
    markInputError('login-password', true);
    valid = false;
  }
  if (!valid) return;

  const users = db.getUsers();
  const user  = users.find((u) => u.email === email);

  if (!user) {
    showError('err-login-general', 'E-mail não encontrado. Cadastre-se primeiro.');
    markInputError('login-email', true);
    return;
  }
  if (user.password !== password) {
    showError('err-login-general', 'Senha incorreta. Tente novamente.');
    markInputError('login-password', true);
    return;
  }

  db.setSession(user);
  formLogin.reset();
  openDashboard(user);
});


// ─── AUTH – REGISTER ──────────────────────────────────────────────────────────
formRegister.addEventListener('submit', (e) => {
  e.preventDefault();

  const name     = $('reg-name').value.trim();
  const email    = $('reg-email').value.trim();
  const password = $('reg-password').value;

  clearErrors('err-reg-name', 'err-reg-email', 'err-reg-password', 'err-reg-general');
  ['reg-name', 'reg-email', 'reg-password'].forEach((id) => markInputError(id, false));

  let valid = true;

  if (!name) {
    showError('err-reg-name', 'Informe seu nome.');
    markInputError('reg-name', true);
    valid = false;
  }
  if (!email) {
    showError('err-reg-email', 'Informe o e-mail.');
    markInputError('reg-email', true);
    valid = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showError('err-reg-email', 'E-mail inválido.');
    markInputError('reg-email', true);
    valid = false;
  }
  if (!password) {
    showError('err-reg-password', 'Informe a senha.');
    markInputError('reg-password', true);
    valid = false;
  } else if (password.length < 6) {
    showError('err-reg-password', 'A senha deve ter ao menos 6 caracteres.');
    markInputError('reg-password', true);
    valid = false;
  }
  if (!valid) return;

  const users = db.getUsers();
  if (users.some((u) => u.email === email)) {
    showError('err-reg-general', 'Este e-mail já está cadastrado.');
    markInputError('reg-email', true);
    return;
  }

  const newUser = { id: Date.now().toString(), name, email, password };
  users.push(newUser);
  db.saveUsers(users);
  db.setSession(newUser);

  formRegister.reset();
  openDashboard(newUser);
});


// ─── AUTH – LOGOUT ────────────────────────────────────────────────────────────
$('btn-logout').addEventListener('click', () => {
  db.clearSession();
  showView('auth');
  showCard('login');
});


// ─── NAVIGATION TOGGLES ───────────────────────────────────────────────────────
$('go-register').addEventListener('click', () => showCard('register'));
$('go-login').addEventListener('click',    () => showCard('login'));


// ─── TASKS – ADD ─────────────────────────────────────────────────────────────
formTask.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = $('task-title').value.trim();
  const type  = $('task-type').value;
  const desc  = $('task-desc').value.trim();

  clearErrors('err-task-title');
  markInputError('task-title', false);

  if (!title) {
    showError('err-task-title', 'O título da tarefa é obrigatório.');
    markInputError('task-title', true);
    return;
  }

  const currentUser = db.getCurrentUser();
  const todos = db.getTodos();

  const newTodo = {
    id:          Date.now().toString(),
    userId:      currentUser.email,
    title,
    type,
    description: desc,
    done:        false,
  };

  todos.push(newTodo);
  db.saveTodos(todos);

  formTask.reset();
  $('task-type').value = 'Trabalho'; // reset select to default
  renderTasks();
});


// ─── TASKS – COMPLETE ─────────────────────────────────────────────────────────
function completeTask(id) {
  const todos = db.getTodos();
  const idx   = todos.findIndex((t) => t.id === id);
  if (idx === -1) return;

  todos[idx].done = true;
  db.saveTodos(todos);
  renderTasks();
}


// ─── TASKS – DELETE ───────────────────────────────────────────────────────────
function deleteTask(id) {
  const todos = db.getTodos().filter((t) => t.id !== id);
  db.saveTodos(todos);
  renderTasks();
}


// ─── TASKS – BADGE CONFIG ─────────────────────────────────────────────────────
const TYPE_CONFIG = {
  Trabalho: { label: '💼 Trabalho', cls: 'bg-blue-500/20 text-blue-300 border border-blue-500/30' },
  Pessoal:  { label: '🏠 Pessoal',  cls: 'bg-violet-500/20 text-violet-300 border border-violet-500/30' },
  Estudos:  { label: '📚 Estudos',  cls: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' },
};


// ─── TASKS – RENDER ───────────────────────────────────────────────────────────
function renderTasks() {
  const currentUser = db.getCurrentUser();
  if (!currentUser) return;

  const all     = db.getTodos().filter((t) => t.userId === currentUser.email);
  const pending = all.filter((t) => !t.done);
  const done    = all.filter((t) =>  t.done);
  const sorted  = [...pending, ...done]; // pending first, done at the bottom

  // update stats
  statTotal.textContent   = all.length;
  statPending.textContent = pending.length;
  statDone.textContent    = done.length;

  // empty state
  const isEmpty = all.length === 0;
  emptyState.classList.toggle('hidden', !isEmpty);
  taskList.classList.toggle('hidden',   isEmpty);

  if (isEmpty) {
    taskList.innerHTML = '';
    return;
  }

  taskList.innerHTML = sorted.map((task) => {
    const cfg   = TYPE_CONFIG[task.type] || TYPE_CONFIG.Trabalho;
    const isDone = task.done;

    return `
      <div class="glass rounded-xl p-4 shadow-md transition-all duration-300 animate-slideup ${isDone ? 'task-done' : ''}">
        <div class="flex items-start justify-between gap-3">
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2 flex-wrap mb-1">
              <h4 class="task-title text-sm font-semibold text-white truncate">${escapeHtml(task.title)}</h4>
              <span class="badge ${cfg.cls}">${cfg.label}</span>
              ${isDone ? '<span class="badge bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">✓ Concluída</span>' : ''}
            </div>
            ${task.description ? `<p class="text-slate-400 text-xs mt-1 leading-relaxed">${escapeHtml(task.description)}</p>` : ''}
          </div>
          <div class="flex items-center gap-2 shrink-0">
            ${!isDone ? `
              <button onclick="completeTask('${task.id}')"
                class="text-xs px-3 py-1.5 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 hover:border-emerald-500/60 transition-all duration-200 font-medium">
                Concluir
              </button>
            ` : ''}
            <button onclick="deleteTask('${task.id}')"
              class="text-xs px-2 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/25 text-red-400 border border-red-500/20 hover:border-red-500/50 transition-all duration-200"
              title="Excluir tarefa">
              <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');
}


// ─── SECURITY HELPER ─────────────────────────────────────────────────────────
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}


// ─── INIT ────────────────────────────────────────────────────────────────────
bootstrap();
