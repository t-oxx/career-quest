const screen = document.querySelector("#screen");
const stepLabel = document.querySelector("#stepLabel");
const gameNav = document.querySelector("#gameNav");

const templates = {
  start: document.querySelector("#startTemplate"),
  goal: document.querySelector("#goalTemplate"),
  question: document.querySelector("#questionTemplate"),
  result: document.querySelector("#resultTemplate"),
};

const questions = [
  {
    key: "rhythm",
    kicker: "QUEST 02 / WORKING RHYTHM",
    title: "これから週5で働く生活を、\n続けていけそう？",
    hint: "生活リズムや体調、仕事のブランクも含めて、今の自分に近いものを選ぼう。",
    answers: {
      yes: ["続けていけそう", "週5で働く生活をイメージできる"],
      no: ["まずは整えたい", "生活リズムや働き方から準備したい"],
      maybe: ["少し不安がある", "面談で一緒に確認したい"],
    },
  },
  {
    key: "experience",
    kicker: "QUEST 03 / EXPERIENCE",
    title: "正社員として、ひとつの仕事を\n3年以上続けた経験はある？",
    hint: "3年は、仕事を覚え、任され、自分の経験として説明できるようになる一つの目安。年齢的にまだ到達前なら、それ自体がマイナスという意味ではないよ。",
    answers: {
      yes: ["ある。3年以上続けた", "任された仕事や経験を説明できる"],
      no: ["正社員経験はあるが3年未満", "これから継続経験を積んでいきたい"],
      maybe: ["年齢的にこれから／近い経験あり", "学校・アルバイトなどの経験も含めて整理したい"],
    },
  },
  {
    key: "preparation",
    kicker: "QUEST 04 / EQUIPMENT",
    title: "目指す仕事につながる経験・資格・作品を、\n人に見せて説明できる？",
    hint: "勉強したことだけでなく、できることを第三者へ具体的に伝えられるか確認しよう。",
    answers: {
      yes: ["見せて説明できる", "資格・作品・実務を具体的に伝えられる"],
      no: ["まだない。これから作りたい", "働きながら実績やスキルを増やしたい"],
      maybe: ["使えるか分からない", "今ある経験や作品を一緒に確認したい"],
    },
  },
  {
    key: "time",
    kicker: "QUEST 05 / NEXT STEP",
    title: "働きながら、目指す仕事に必要な装備を\n増やす時間を作れそう？",
    hint: "今すぐ完璧でなくて大丈夫。学ぶ・作る・続ける時間を現実的に取れるか考えよう。",
    answers: {
      yes: ["時間を作れそう", "目標に向けた準備を続けられそう"],
      no: ["今は難しそう", "まずは仕事と生活の基盤を優先したい"],
      maybe: ["続け方を相談したい", "生活と両立できる方法を一緒に考えたい"],
    },
  },
];

const revealCards = [
  { title: "販売", icon: "◇", rank: "N", gate: "n", tone: "n", delay: 0, tilt: -8 },
  { title: "接客", icon: "♡", rank: "N", gate: "n", tone: "n", delay: 120, tilt: 7 },
  { title: "一般事務", icon: "▤", rank: "N", gate: "n", tone: "n", delay: 240, tilt: -5 },
  { title: "営業", icon: "↗", rank: "R", gate: "r", tone: "r", delay: 360, tilt: 8 },
  { title: "施工管理", icon: "⚒", rank: "R", gate: "r", tone: "r", delay: 480, tilt: -7 },
  { title: "機械", icon: "⚙", rank: "R", gate: "r", tone: "r", delay: 600, tilt: 5 },
  { title: "インフラ", icon: "⌘", rank: "SR", gate: "sr", tone: "sr", delay: 720, tilt: -6 },
  { title: "CAD", icon: "△", rank: "SR", gate: "sr", tone: "sr", delay: 840, tilt: 6 },
  { title: "プログラマー", icon: "</>", rank: "SSR", gate: "ssr", tone: "ssr", delay: 960, tilt: -7 },
  { title: "WEBデザイン", icon: "✦", rank: "SSR", gate: "ssr", tone: "ssr", delay: 1080, tilt: 7 },
  { title: "動画編集", icon: "▶", rank: "SSR", gate: "ssr", tone: "ssr", delay: 1200, tilt: -5 },
  { title: "フリーランス", icon: "∞", rank: "WORK", gate: "work", tone: "work", delay: 1400, tilt: 0 },
];

const goals = {
  creative: {
    rank: "SSR",
    targetLevel: "SSR",
    name: "SSR｜クリエイティブの世界",
    destinationJobs: "WEBデザイナー・動画クリエイターなど",
    guide: "作品やスキルを見せられる形にして、仕事へつなげる世界。好きという気持ちに、制作実績を足して扉を開こう。",
    requirements: ["作品・ポートフォリオ", "制作ツールの基礎", "学習と制作を続ける時間"],
    entryJob: "営業・施工管理など、対人力と段取りを積める正社員求人",
  },
  it: {
    rank: "SR",
    targetLevel: "SR",
    name: "SR｜IT・デジタルの世界",
    destinationJobs: "インフラエンジニア・CADオペレーターなど",
    guide: "PCの基礎や学習実績を積み重ね、できる仕事を広げていく世界。学んだ証を装備に変えよう。",
    requirements: ["IT・PCの基礎知識", "資格や学習記録", "学び続ける時間"],
    entryJob: "インフラ・CADの学習を続けながら挑める未経験求人",
  },
  craft: {
    rank: "R",
    targetLevel: "R",
    name: "R｜ものづくりの世界",
    destinationJobs: "施工管理・機械エンジニアなど",
    guide: "未経験から実戦で学び、段取り・調整力・専門知識を身につける世界。働いた経験がそのまま装備になる。",
    requirements: ["勤怠・継続", "人と連携する力", "段取り・安全への意識"],
    entryJob: "施工管理・機械エンジニアなど、実戦で技術を学べる仕事",
  },
  people: {
    rank: "N",
    targetLevel: "N",
    name: "N｜人と仕事の世界",
    destinationJobs: "販売・接客・事務など",
    guide: "社会人としての基本装備を、仕事の中で増やしていく世界。ここで積む経験が次の扉にもつながる。",
    requirements: ["生活リズムと勤怠", "基本的な対人対応", "報告・連絡・相談"],
    entryJob: "販売・接客・事務など、働く経験を積める仕事",
  },
};

const results = {
  SSR: {
    chip: "SSR｜直接挑戦ルート",
    routeName: "SSRルート｜実績を武器に直接挑戦",
    lead: "見せられる実績と準備がそろっているなら、目標の扉へ直接挑戦できる可能性がある。作品や経験が求人の基準に届いているか、最後に一緒に確認しよう。",
    quest: "作品・実績・応募書類を確認し、目標求人へ挑戦する準備を整える",
    art: "assets/ssr-guide.webp",
    color: "#743a91",
  },
  SR: {
    chip: "SR｜準備を活かすルート",
    routeName: "SRルート｜準備と経験を活かして挑戦",
    lead: "基礎知識や資格、これまでの経験を使って、準備型の求人へ挑戦する段階。今ある装備が選考でどう評価されるかを整理しよう。",
    quest: "今ある資格・学習・経験を整理し、応募できる求人の範囲を確認する",
    art: "assets/sr-guide.webp",
    color: "#205e9a",
  },
  R: {
    chip: "R｜実戦経験ルート",
    routeName: "Rルート｜働きながら経験値を積む",
    lead: "資格や作品がまだなくても、未経験から入れる仕事で経験値を集められる。勤怠・報連相・段取りは、次の扉へ進むための強い装備になる。",
    quest: "未経験から挑める正社員求人を一つ選び、働きながら目標の装備を育てる",
    art: "assets/r-guide.webp",
    color: "#1f6549",
  },
  N_BASE: {
    chip: "N｜土台づくりルート",
    routeName: "Nルート｜働く土台から整える",
    lead: "いまは、生活リズムと働き続ける土台を整える段階。ここで積む継続経験も、次の扉へ進むための大事な装備になる。",
    quest: "続けられる働き方を一緒に決め、次のルートへ進む土台をつくる",
    art: "assets/n-guide.webp",
    color: "#875a2a",
  },
  N_READY: {
    chip: "N｜今すぐ挑戦ルート",
    routeName: "Nルート｜まずは実戦へ",
    lead: "働くための土台があるなら、Nの扉は今から挑戦できる。仕事の中で勤怠・対人対応・報連相を経験値に変え、次の選択肢を増やそう。",
    quest: "挑戦する仕事を一つ選び、働きながら次の扉につながる経験値を集める",
    art: "assets/n-guide.webp",
    color: "#875a2a",
  },
};

const state = {
  view: "start",
  goal: "",
  answers: {},
  questionIndex: 0,
  guideOpen: false,
};

let revealTimers = [];
let revealFrame = null;

function stopRevealAnimation() {
  if (revealFrame) {
    cancelAnimationFrame(revealFrame);
    revealFrame = null;
  }
}

function clearRevealTimers() {
  revealTimers.forEach((timer) => clearTimeout(timer));
  revealTimers = [];
  stopRevealAnimation();
}

function setNavVisibility() {
  gameNav.hidden = state.view === "start";
}

function show(template, view) {
  clearRevealTimers();
  state.view = view;
  state.guideOpen = false;
  screen.replaceChildren(template.content.cloneNode(true));
  setNavVisibility();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function start() {
  state.goal = "";
  state.answers = {};
  state.questionIndex = 0;
  stepLabel.textContent = "START";
  show(templates.start, "start");
}

function easeOutCubic(t) {
  return 1 - Math.pow(1 - t, 3);
}

function easeInOutCubic(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function getGateTarget(gate, width, height) {
  const points = {
    ssr: { x: width * 0.22, y: height * 0.31 },
    sr: { x: width * 0.78, y: height * 0.31 },
    r: { x: width * 0.22, y: height * 0.72 },
    n: { x: width * 0.78, y: height * 0.72 },
    work: { x: width * 0.5, y: height * 0.16 },
  };
  return points[gate] || points.work;
}

function runReveal() {
  const overlay = document.querySelector("#careerReveal");
  const container = document.querySelector("#revealCards");
  if (!overlay || !container) return;

  stepLabel.textContent = "00 / MAP";
  overlay.hidden = false;
  overlay.classList.remove("is-gathering", "is-complete");
  overlay.classList.add("is-playing");
  container.replaceChildren();

  const items = revealCards.map((card, index) => {
    const element = document.createElement("div");
    element.className = `career-card career-card--${card.tone}`;
    element.innerHTML = `
      <span class="career-card__frame"></span>
      <span class="career-card__rank">${card.rank}</span>
      <span class="career-card__icon">${card.icon}</span>
      <strong>${card.title}</strong>
      <span class="career-card__stars">✦✦✦</span>
    `;
    container.appendChild(element);
    return { element, card, index };
  });

  const startAt = performance.now();
  const riseDuration = 900;
  const gatherStart = 3500;
  const gatherDuration = 900;
  const totalDuration = 5000;
  const spinSpeed = 2.45;

  const frame = (now) => {
    if (!document.body.contains(overlay)) return;

    const elapsed = now - startAt;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = width * 0.5;
    const centerY = height * 0.56;
    const radiusX = width * 0.28;
    const radiusY = height * 0.18;

    if (elapsed >= gatherStart) {
      overlay.classList.add("is-gathering");
    }
    if (elapsed >= gatherStart + gatherDuration * 0.8) {
      overlay.classList.add("is-complete");
    }

    items.forEach(({ element, card, index }) => {
      const baseAngle = -Math.PI / 2 + (index / items.length) * Math.PI * 2;
      const appearAt = card.delay;
      let x = centerX;
      let y = height + 150;
      let scale = 0.45;
      let opacity = 0;
      let rotation = card.tilt;
      let zIndex = 1;

      if (elapsed >= appearAt) {
        const orbitElapsed = Math.max(0, elapsed - appearAt - riseDuration);
        const orbitAngle = baseAngle + orbitElapsed * spinSpeed / 1000;
        const orbitDepth = (Math.sin(orbitAngle) + 1) / 2;
        const orbitX = centerX + radiusX * Math.cos(orbitAngle);
        const orbitY = centerY + radiusY * Math.sin(orbitAngle);
        const orbitScale = 0.68 + orbitDepth * 0.50;
        const orbitOpacity = 0.22 + orbitDepth * 0.78;
        const orbitRotation = card.tilt + (orbitDepth - 0.5) * 6;

        if (elapsed < appearAt + riseDuration) {
          const p = easeOutCubic((elapsed - appearAt) / riseDuration);
          x = lerp(centerX + (index - items.length / 2) * 10, orbitX, p);
          y = lerp(height + 145, orbitY, p);
          scale = lerp(0.35, orbitScale, p);
          opacity = lerp(0, orbitOpacity, p);
          rotation = lerp(card.tilt * 2.5, orbitRotation, p);
          zIndex = Math.round(60 + orbitDepth * 120);
        } else if (elapsed < gatherStart) {
          x = orbitX;
          y = orbitY;
          scale = orbitScale;
          opacity = orbitOpacity;
          rotation = orbitRotation;
          zIndex = Math.round(60 + orbitDepth * 120);
        } else if (elapsed < gatherStart + gatherDuration) {
          const orbitElapsedAtGather = Math.max(0, gatherStart - appearAt - riseDuration);
          const gatherAngle = baseAngle + orbitElapsedAtGather * spinSpeed / 1000;
          const gatherDepth = (Math.sin(gatherAngle) + 1) / 2;
          const fromX = centerX + radiusX * Math.cos(gatherAngle);
          const fromY = centerY + radiusY * Math.sin(gatherAngle);
          const fromScale = 0.68 + gatherDepth * 0.50;
          const fromOpacity = 0.22 + gatherDepth * 0.78;
          const target = getGateTarget(card.gate, width, height);
          const p = easeInOutCubic((elapsed - gatherStart) / gatherDuration);
          x = lerp(fromX, target.x, p);
          y = lerp(fromY, target.y, p);
          scale = lerp(fromScale, 0.12, p);
          opacity = lerp(fromOpacity, 0, p);
          rotation = lerp(orbitRotation, 0, p);
          zIndex = Math.round(50 - p * 10);
        }
      }

      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.opacity = opacity;
      element.style.zIndex = zIndex;
      element.style.transform = `translate(-50%, -50%) scale(${scale}) rotate(${rotation}deg)`;
    });

    if (elapsed < totalDuration) {
      revealFrame = requestAnimationFrame(frame);
    }
  };

  revealFrame = requestAnimationFrame(frame);
  revealTimers.push(setTimeout(showGoals, totalDuration + 120));
}

function showGoals() {
  stepLabel.textContent = "01 / GATE";
  show(templates.goal, "goal");
}

function showGuide(goalKey) {
  const goal = goals[goalKey];
  const dialog = document.querySelector("#guideDialog");
  state.guideOpen = true;
  document.querySelector("#guideKicker").textContent = `${goal.rank} GATE / REQUIRED EQUIPMENT`;
  document.querySelector("#guideTitle").textContent = `${goal.rank}の扉を開くための装備`;
  document.querySelector("#guideCopy").textContent = goal.guide;
  document.querySelector("#guideEquipment").replaceChildren(
    ...goal.requirements.map((item) => {
      const li = document.createElement("li");
      li.textContent = item;
      return li;
    }),
  );
  dialog.hidden = false;
}

function closeGuide() {
  const dialog = document.querySelector("#guideDialog");
  if (dialog) dialog.hidden = true;
  state.guideOpen = false;
  state.goal = "";
}

function showQuestion() {
  const question = questions[state.questionIndex];
  if (!question) {
    showResult();
    return;
  }

  stepLabel.textContent = `${String(state.questionIndex + 2).padStart(2, "0")} / 05`;
  show(templates.question, "question");
  document.querySelector("#questionKicker").textContent = question.kicker;
  document.querySelector("#questionTitle").innerHTML = question.title.replace("\n", "<br />");
  document.querySelector("#questionHint").textContent = question.hint;
  document.querySelector("#progressFill").style.width = `${((state.questionIndex + 1) / questions.length) * 100}%`;

  Object.entries(question.answers).forEach(([answer, [title, description]]) => {
    document.querySelector(`[data-answer="${answer}"]`).innerHTML = `<strong>${title}</strong><small>${description}</small>`;
  });
}

function routeForAnswers() {
  const goal = goals[state.goal];
  if (state.answers.rhythm === "no") return "N_BASE";
  if (goal.targetLevel === "N") return "N_READY";
  if (goal.targetLevel === "R") return "R";

  const fullyPrepared =
    state.answers.rhythm === "yes" &&
    state.answers.experience === "yes" &&
    state.answers.preparation === "yes" &&
    state.answers.time === "yes";

  if (fullyPrepared && goal.targetLevel === "SSR") return "SSR";
  if (fullyPrepared && goal.targetLevel === "SR") return "SR";
  return "R";
}

function nextJobFor(route, goal) {
  if (route === "N_BASE") return "生活と両立しながら、継続経験をつくれる仕事";
  if (route === "N_READY" || route === "SSR" || route === "SR") return goal.destinationJobs;
  return goal.entryJob;
}

function showResult() {
  const route = routeForAnswers();
  const result = results[route];
  const goal = goals[state.goal];

  stepLabel.textContent = "RESULT";
  show(templates.result, "result");

  const resultArt = document.querySelector("#resultArt");
  resultArt.src = result.art;
  resultArt.alt = `${result.routeName}の案内`;

  const chip = document.querySelector("#routeChip");
  chip.textContent = result.chip;
  chip.style.background = result.color;

  document.querySelector("#resultLead").textContent = result.lead;
  document.querySelector("#goalName").textContent = goal.name;
  document.querySelector("#startingRoute").textContent = result.routeName;
  document.querySelector("#nextJob").textContent = nextJobFor(route, goal);
  document.querySelector("#firstQuest").textContent = result.quest;

  const scrollHint = document.querySelector(".result-scroll-hint");
  const resultCopy = document.querySelector(".result-copy");
  const observer = new IntersectionObserver(([entry]) => {
    scrollHint.hidden = entry.isIntersecting;
  }, { threshold: 0.05 });
  observer.observe(resultCopy);
}

function goBack() {
  if (state.view === "goal") {
    if (state.guideOpen) {
      closeGuide();
    } else {
      start();
    }
    return;
  }

  if (state.view === "question") {
    if (state.questionIndex === 0) {
      showGoals();
    } else {
      state.questionIndex -= 1;
      delete state.answers[questions[state.questionIndex].key];
      showQuestion();
    }
    return;
  }

  if (state.view === "result") {
    state.questionIndex = questions.length - 1;
    delete state.answers[questions[state.questionIndex].key];
    showQuestion();
  }
}

gameNav.addEventListener("click", (event) => {
  const action = event.target.closest("[data-global-action]")?.dataset.globalAction;
  if (action === "back") goBack();
  if (action === "top") start();
});

screen.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;

  if (action === "start-quest") {
    runReveal();
    return;
  }

  if (action === "skip-reveal") {
    showGoals();
    return;
  }

  if (action === "restart") {
    start();
    return;
  }

  if (action === "close-guide") {
    closeGuide();
    return;
  }

  if (action === "choose-selected-goal") {
    state.answers = {};
    state.questionIndex = 0;
    showQuestion();
    return;
  }

  const goal = event.target.closest("[data-goal]")?.dataset.goal;
  if (goal) {
    state.goal = goal;
    showGuide(goal);
    return;
  }

  const answer = event.target.closest("[data-answer]")?.dataset.answer;
  if (answer) {
    state.answers[questions[state.questionIndex].key] = answer;
    state.questionIndex += 1;
    showQuestion();
  }
});

start();
