// app.js
const navButtons = [...document.querySelectorAll('.nav-btn')];
const sectionLabel = document.getElementById('section-label');
const modeBadge = document.getElementById('mode-badge');
const problemStepsEl = document.getElementById('problem-steps');
const optionsEl = document.getElementById('options');
const statusText = document.getElementById('status-text');
const nextProblemButton = document.getElementById('next-problem');

const STATE = {
  section: 'arithmetic',
  problem: null,
  currentStepIndex: 0,
  customSelections: [],
};

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(arr) {
  return arr
    .map((value) => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
}

function pickDistinctWrongAnswers(correct, count = 3) {
  const set = new Set();
  while (set.size < count) {
    const delta = randInt(-8, 8) || 1;
    const wrong = correct + delta;
    if (wrong !== correct) {
      set.add(wrong);
    }
  }
  return [...set];
}

function formatCoeffX(coeff) {
  return coeff === 1 ? 'x' : `${coeff}x`;
}

function makeOperationOptions(answer) {
  const m = String(answer).match(/^([+\-*/])(\d+)(x?)$/);
  if (!m) {
    return shuffle([String(answer)]);
  }

  const op = m[1];
  const n = Number(m[2]);
  const xSuffix = m[3] || '';
  let options;

  if (op === '-') {
    options = [
      `-${n}${xSuffix}`,
      `+${n}${xSuffix}`,
      `-${n + randInt(1, 4)}${xSuffix}`,
      `+${n + randInt(1, 4)}${xSuffix}`,
    ];
  } else if (op === '+') {
    options = [
      `+${n}${xSuffix}`,
      `-${n}${xSuffix}`,
      `+${n + randInt(1, 4)}${xSuffix}`,
      `-${n + randInt(1, 4)}${xSuffix}`,
    ];
  } else if (op === '/') {
    options = [
      `/${n}`,
      `*${n}`,
      `/${n + 1}`,
      `*${n + 1}`,
    ];
  } else {
    options = [
      `*${n}`,
      `/${n}`,
      `*${n + 1}`,
      `/${n + 1}`,
    ];
  }

  return shuffle(options);
}

function arithmeticProblem() {
  const op = ['+', '-', 'x', '/'][randInt(0, 3)];
  let a;
  let b;
  let answer;

  if (op === '+') {
    a = randInt(3, 30);
    b = randInt(2, 20);
    answer = a + b;
  } else if (op === '-') {
    a = randInt(10, 40);
    b = randInt(2, a - 1);
    answer = a - b;
  } else if (op === 'x') {
    a = randInt(2, 12);
    b = randInt(2, 12);
    answer = a * b;
  } else {
    b = randInt(2, 12);
    answer = randInt(2, 12);
    a = b * answer;
  }

  return {
    mode: 'single',
    steps: [
      {
        text: `${a} ${op} ${b} = `,
        answer: String(answer),
      },
    ],
  };
}

function algebraTemplateAxPlusB() {
  const x = randInt(2, 12);
  const a = randInt(2, 8);
  const b = randInt(2, 12);
  const rhs = a * x + b;

  return {
    lines: [
      `${formatCoeffX(a)} + ${b} = ${rhs}`,
      `${formatCoeffX(a)} = ${rhs - b}`,
      `x = ${x}`,
    ],
    steps: [
      { answer: `-${b}` },
      { answer: `/${a}` },
    ],
  };
}

function algebraTemplateAxMinusB() {
  const x = randInt(2, 12);
  const a = randInt(2, 8);
  const b = randInt(2, 12);
  const rhs = a * x - b;

  return {
    lines: [
      `${formatCoeffX(a)} - ${b} = ${rhs}`,
      `${formatCoeffX(a)} = ${rhs + b}`,
      `x = ${x}`,
    ],
    steps: [
      { answer: `+${b}` },
      { answer: `/${a}` },
    ],
  };
}

function algebraTemplateXOverAPlusB() {
  const a = randInt(2, 6);
  const q = randInt(2, 10);
  const x = a * q;
  const b = randInt(2, 10);
  const rhs = q + b;

  return {
    lines: [
      `x/${a} + ${b} = ${rhs}`,
      `x/${a} = ${q}`,
      `x = ${x}`,
    ],
    steps: [
      { answer: `-${b}` },
      { answer: `*${a}` },
    ],
  };
}

function algebraTemplateGrouped() {
  const a = randInt(2, 6);
  const b = randInt(2, 9);
  const rhs = randInt(3, 10);
  const x = a * rhs - b;

  return {
    lines: [
      `(x + ${b})/${a} = ${rhs}`,
      `x + ${b} = ${a * rhs}`,
      `x = ${x}`,
    ],
    steps: [
      { answer: `*${a}` },
      { answer: `-${b}` },
    ],
  };
}

function algebraTemplateBothSides() {
  const x = randInt(2, 10);
  const c = randInt(1, 4);
  const diff = randInt(1, 5);
  const a = c + diff;
  const b = randInt(2, 10);
  const d = (a - c) * x + b;

  return {
    lines: [
      `${formatCoeffX(a)} + ${b} = ${formatCoeffX(c)} + ${d}`,
      `${formatCoeffX(a - c)} + ${b} = ${d}`,
      `${formatCoeffX(a - c)} = ${d - b}`,
      `x = ${x}`,
    ],
    steps: [
      { answer: `-${c}x` },
      { answer: `-${b}` },
      { answer: `/${a - c}` },
    ],
  };
}

function algebraTemplateSecondVariable() {
  const x = randInt(2, 9);
  const y = randInt(1, 6);
  const a = randInt(2, 6);
  const b = randInt(2, 5);
  const c = a * x + b * y;
  const by = b * y;

  return {
    lines: [
      `${formatCoeffX(a)} + ${b}y = ${c}   (y = ${y})`,
      `${formatCoeffX(a)} = ${c - by}`,
      `x = ${x}`,
    ],
    steps: [
      { answer: `-${by}` },
      { answer: `/${a}` },
    ],
  };
}

function algebraProblem() {
  const templates = [
    algebraTemplateAxPlusB,
    algebraTemplateAxMinusB,
    algebraTemplateXOverAPlusB,
    algebraTemplateGrouped,
    algebraTemplateBothSides,
    algebraTemplateSecondVariable,
  ];

  const chosen = templates[randInt(0, templates.length - 1)]();
  const steps = chosen.steps.map((step) => ({
    answer: step.answer,
    options: makeOperationOptions(step.answer),
  }));

  return {
    mode: 'multi',
    customType: 'algebra-sequence',
    lines: chosen.lines,
    steps,
  };
}

function geometryProblem() {
  if (Math.random() < 0.5) {
    const l = randInt(3, 15);
    const w = randInt(3, 12);
    return {
      mode: 'single',
      steps: [
        {
          text: `Rectangle area: ${l} x ${w} = `,
          answer: String(l * w),
        },
      ],
    };
  }

  const base = randInt(4, 14);
  const height = randInt(4, 14);
  const product = base * height;
  return {
    mode: 'multi',
    steps: [
      {
        text: `Triangle area: A = 1/2bh, first compute b x h = `,
        answer: String(product),
      },
      {
        text: `Now A = 1/2 x ${product} = `,
        answer: String(product / 2),
      },
    ],
  };
}

function generateProblem(section) {
  if (section === 'algebra') return algebraProblem();
  if (section === 'geometry') return geometryProblem();
  return arithmeticProblem();
}

function sectionTitle(section) {
  return section.charAt(0).toUpperCase() + section.slice(1);
}

function buildOptions(correctValue) {
  const numeric = Number(correctValue);
  if (Number.isNaN(numeric)) {
    return shuffle([String(correctValue)]);
  }

  const wrong = pickDistinctWrongAnswers(numeric, 3);
  return shuffle([numeric, ...wrong]).map((value) => String(value));
}

function addEquationLine(text, hidden = false, green = false) {
  const line = document.createElement('div');
  line.className = `equation-line${hidden ? ' step-hidden' : ''}${green ? ' correct' : ''}`;
  line.textContent = text;
  problemStepsEl.appendChild(line);
}

function addDualBlankLine(stepIndex, hidden = false) {
  const line = document.createElement('div');
  line.className = `equation-line${hidden ? ' step-hidden' : ''}`;

  const blankA = document.createElement('span');
  blankA.className = 'blank';
  blankA.dataset.blankIndex = String(stepIndex);
  blankA.dataset.slot = '0';

  const spacer = document.createElement('span');
  spacer.textContent = '   ';

  const blankB = document.createElement('span');
  blankB.className = 'blank';
  blankB.dataset.blankIndex = String(stepIndex);
  blankB.dataset.slot = '1';

  const selected = STATE.customSelections[stepIndex];
  if (selected) {
    blankA.textContent = selected;
    blankB.textContent = selected;
    blankA.classList.add('filled', 'correct');
    blankB.classList.add('filled', 'correct');
  } else {
    blankA.textContent = '';
    blankB.textContent = '';
  }

  line.append(blankA, spacer, blankB);
  problemStepsEl.appendChild(line);
}

function renderAlgebraSequence() {
  const { lines, steps } = STATE.problem;

  for (let i = 0; i < steps.length; i += 1) {
    const showStage = STATE.currentStepIndex >= i;
    addEquationLine(lines[i], !showStage);
    addDualBlankLine(i, !showStage);
  }

  const showFinal = STATE.currentStepIndex >= steps.length;
  addEquationLine(lines[lines.length - 1], !showFinal, showFinal);
}

function renderStandardProblem() {
  const { steps } = STATE.problem;

  steps.forEach((step, index) => {
    const line = document.createElement('div');
    line.className = `equation-line${index > STATE.currentStepIndex ? ' step-hidden' : ''}`;
    line.dataset.index = String(index);

    const textSpan = document.createElement('span');
    textSpan.textContent = step.text;

    const blank = document.createElement('span');
    blank.className = 'blank';
    blank.dataset.blankIndex = String(index);
    blank.textContent = '';

    line.append(textSpan, blank);
    problemStepsEl.appendChild(line);
  });
}

function renderProblem() {
  const { mode, customType } = STATE.problem;

  sectionLabel.textContent = sectionTitle(STATE.section);
  modeBadge.textContent = mode === 'multi' ? 'Multi Step' : 'Single Step';

  problemStepsEl.innerHTML = '';

  if (customType === 'algebra-sequence') {
    renderAlgebraSequence();
  } else {
    renderStandardProblem();
  }

  renderOptions();
}

function getCurrentStep() {
  return STATE.problem.steps[STATE.currentStepIndex] || null;
}

function renderOptions() {
  const step = getCurrentStep();

  optionsEl.innerHTML = '';
  if (!step) {
    return;
  }

  const options = step.options || buildOptions(step.answer);
  options.forEach((opt) => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'option-btn';
    btn.textContent = String(opt);
    btn.dataset.value = String(opt);
    btn.setAttribute('role', 'listitem');
    btn.addEventListener('click', () => handleOptionSelect(btn, step));
    optionsEl.appendChild(btn);
  });
}

function lockOptions() {
  [...optionsEl.querySelectorAll('.option-btn')].forEach((btn) => {
    btn.disabled = true;
  });
}

function unlockOptions() {
  [...optionsEl.querySelectorAll('.option-btn')].forEach((btn) => {
    btn.disabled = false;
  });
}

function getBlanks(stepIndex) {
  return [...problemStepsEl.querySelectorAll(`.blank[data-blank-index="${stepIndex}"]`)];
}

function revealNextStep() {
  const nextLine = problemStepsEl.querySelector(`.equation-line[data-index="${STATE.currentStepIndex}"]`);
  if (nextLine) {
    nextLine.classList.remove('step-hidden');
  }
}

function handleAlgebraSequenceSelection(button, step) {
  const selected = button.dataset.value;
  const isCorrect = selected === String(step.answer);
  const blanks = getBlanks(STATE.currentStepIndex);

  lockOptions();

  blanks.forEach((blank) => {
    blank.textContent = selected;
    blank.classList.add('filled');
  });

  if (isCorrect) {
    blanks.forEach((blank) => blank.classList.add('correct'));
    button.classList.add('correct');
    statusText.textContent = 'Correct.';
    STATE.customSelections[STATE.currentStepIndex] = selected;

    setTimeout(() => {
      const hasMore = STATE.currentStepIndex < STATE.problem.steps.length - 1;
      if (hasMore) {
        STATE.currentStepIndex += 1;
        renderProblem();
        statusText.textContent = 'Nice. Solve the next step.';
      } else {
        STATE.currentStepIndex = STATE.problem.steps.length;
        renderProblem();
        statusText.textContent = 'Great work. Tap "New Problem" for another one.';
      }
    }, 650);
  } else {
    blanks.forEach((blank) => blank.classList.add('wrong'));
    button.classList.add('wrong');
    statusText.textContent = 'Not quite. Try again.';

    setTimeout(() => {
      blanks.forEach((blank) => {
        blank.textContent = '';
        blank.classList.remove('filled', 'wrong');
      });
      button.classList.remove('wrong');
      unlockOptions();
    }, 700);
  }
}

function handleStandardSelection(button, step) {
  const selected = button.dataset.value;
  const isCorrect = selected === String(step.answer);
  const blank = getBlanks(STATE.currentStepIndex)[0];

  lockOptions();

  blank.textContent = selected;
  blank.classList.add('filled');

  if (isCorrect) {
    blank.classList.add('correct');
    button.classList.add('correct');
    statusText.textContent = 'Correct.';

    setTimeout(() => {
      const hasMore = STATE.currentStepIndex < STATE.problem.steps.length - 1;
      if (hasMore) {
        STATE.currentStepIndex += 1;
        revealNextStep();
        renderOptions();
        statusText.textContent = 'Nice. Solve the next step.';
      } else {
        statusText.textContent = 'Great work. Tap "New Problem" for another one.';
      }
    }, 650);
  } else {
    blank.classList.add('wrong');
    button.classList.add('wrong');
    statusText.textContent = 'Not quite. Try again.';

    setTimeout(() => {
      blank.textContent = '';
      blank.classList.remove('filled', 'wrong');
      button.classList.remove('wrong');
      unlockOptions();
    }, 700);
  }
}

function handleOptionSelect(button, step) {
  if (STATE.problem.customType === 'algebra-sequence') {
    handleAlgebraSequenceSelection(button, step);
  } else {
    handleStandardSelection(button, step);
  }
}

function startNewProblem() {
  STATE.problem = generateProblem(STATE.section);
  STATE.currentStepIndex = 0;
  STATE.customSelections = [];
  renderProblem();
  statusText.textContent = 'Choose an option to fill the blank.';
}

navButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    navButtons.forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    STATE.section = btn.dataset.section;
    startNewProblem();
  });
});

nextProblemButton.addEventListener('click', startNewProblem);

startNewProblem();
