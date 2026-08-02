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

const freelanceQuestions = [
  {
    key: "selfManagement",
    kicker: "QUEST 02 / SELF MANAGEMENT",
    title: "予定・納期・収入を、\n自分で管理し続けられそう？",
    hint: "フリーランスは、仕事を待つだけでは続かない。体調や予定、締切まで自分で整える働き方だよ。",
    answers: {
      yes: ["管理して続けられそう", "予定と締切を自分で守れる"],
      no: ["まずは経験を積みたい", "先に仕事の型を身につけたい"],
      maybe: ["面談で整理したい", "続け方を一緒に考えたい"],
    },
  },
  {
    key: "customerAcquisition",
    kicker: "QUEST 03 / CLIENT QUEST",
    title: "仕事を取りに行く行動を、\n続けられそう？",
    hint: "顧客探し・提案・見積もり・納品までが仕事。実績や紹介がない時期も、自分で動く必要がある。",
    answers: {
      yes: ["自分から動けそう", "提案や営業も仕事の一部だと考えられる"],
      no: ["まずは会社で学びたい", "仕事の進め方を実務で身につけたい"],
      maybe: ["不安がある", "営業や顧客対応を一緒に整理したい"],
    },
  },
  {
    key: "preparation",
    kicker: "QUEST 04 / VALUE",
    title: "お金を払う価値を、\n作品や実績で見せられる？",
    hint: "「できる」だけでは仕事にならない。相手が任せたいと思える専門性と実績が必要。",
    answers: {
      yes: ["見せて説明できる", "作品・実績・専門性を具体的に伝えられる"],
      no: ["まだない。これから作りたい", "働きながら実績やスキルを増やしたい"],
      maybe: ["使えるか分からない", "今ある作品や経験を一緒に確認したい"],
    },
  },
  {
    key: "workStyle",
    kicker: "QUEST 05 / WORK STYLE",
    title: "休み・収入・保障を、\n自分で整える働き方を選べそう？",
    hint: "案件や納期次第で、好きな日に休めるとは限らない。福利厚生も原則として自分で備える。",
    answers: {
      yes: ["理解して選べる", "自由と責任をセットで受け止められる"],
      no: ["まずは会社で経験を積みたい", "収入と保障を整えながら力をつけたい"],
      maybe: ["話を聞いて考えたい", "働き方の現実を一緒に確認したい"],
    },
  },
];

const revealCards = [
  { title: "販売・接客", subtitle: "PEOPLE GATE", crest: "SHOP", rank: "N", goal: "people", tone: "n", art: "retail-tcg", embeddedTitle: true, delay: 0, tilt: -7,
    copy: "お客様の希望を聞き、商品やサービスとの出会いをつくる。", fit: "人の話を聞く・明るく対応する", gear: "あいさつ・商品知識・勤怠", xp: "対人対応・提案力・売場感覚", challenge: "立ち仕事や、忙しい時間帯への対応がある。" },
  { title: "一般事務", subtitle: "SKILL GATE", crest: "DESK", rank: "SR", goal: "it", tone: "sr", art: "office-tcg", embeddedTitle: true, delay: 630, tilt: -4,
    copy: "書類・データ・連絡を整え、職場を支える。", fit: "丁寧に確認する・支える", gear: "PC操作・正確さ・事務経験・安定した就業歴", xp: "事務処理・調整力・段取り", challenge: "未経験求人は人気が高い。入力ができるだけでは選ばれにくい。" },
  { title: "営業", subtitle: "R ROUTE", crest: "SALES", rank: "R", goal: "craft", tone: "r", art: "sales-tcg", embeddedTitle: true, delay: 180, tilt: 7,
    copy: "相手の課題を聞き、提案して成果につなげる。", fit: "明るく話せる・断られても動ける・目標から逃げない", gear: "行動量・ヒアリング・振り返り・普通免許（求人による）", xp: "提案力・数字を追う経験・自己管理・成果実績", challenge: "話の上手さより、継続と数字への向き合い方が問われる。" },
  { title: "施工管理", subtitle: "CRAFT GATE", crest: "BUILD", rank: "R", goal: "craft", tone: "r", art: "construction-tcg", embeddedTitle: true, delay: 270, tilt: -6,
    copy: "人・時間・安全を整え、工事を完成へ導く。", fit: "朝の出発・外で働くこと・人と話すことに大きな抵抗がない", gear: "勤怠・報連相・段取り・確認力", xp: "現場理解・調整力・国家資格・高給与を狙える市場価値", challenge: "職人ではなく管理役。会社で休日や教育が大きく変わる。" },
  { title: "機械エンジニア", subtitle: "CRAFT GATE", crest: "MECH", rank: "R", goal: "craft", tone: "r", art: "mechanical-tcg", embeddedTitle: true, delay: 360, tilt: 5,
    copy: "機械をつくる・動かす・直す。", fit: "ものづくりが好き・もくもく作業に取り組める", gear: "安全意識・工具の扱い・図面の基礎", xp: "技術力・改善力・設備知識", challenge: "組立・点検・保全などは会社で異なる。交替勤務もある。" },
  { title: "インフラエンジニア", subtitle: "DIGITAL GATE", crest: "INFRA", rank: "SR", goal: "it", tone: "sr", art: "infrastructure-tcg", embeddedTitle: true, delay: 450, tilt: -5,
    copy: "ネットワークやサーバーを守り、ITを止めない。", fit: "調べる・コツコツ学ぶ", gear: "PC基礎・IT用語・資格学習・正確さ", xp: "IT基礎・障害対応・運用力", challenge: "最初は監視や運用が中心。夜勤・シフト勤務もある。資格や学習実績が必要。" },
  { title: "CADオペレーター", subtitle: "DIGITAL GATE", crest: "CAD", rank: "SR", goal: "it", tone: "sr", art: "cad-tcg", embeddedTitle: true, delay: 540, tilt: 5,
    copy: "設計者の指示を、正確な図面にする。", fit: "細部を見る・正確に作る", gear: "PC操作・CAD学習・正確さ・空間把握", xp: "作図力・設計理解・修正力", challenge: "未経験求人は多くない。操作経験や作品がないと選考で弱い。" },
  { title: "プログラマー", subtitle: "CREATIVE GATE", crest: "CODE", rank: "SSR", goal: "creative", tone: "ssr", art: "programmer-tcg", embeddedTitle: true, delay: 720, tilt: -6,
    copy: "仕組みをコードでつくり、動かす。", fit: "考える・試して直す", gear: "基礎学習・制作物・エラーを調べる力", xp: "開発力・論理思考・改善力", challenge: "未経験枠は狭い。勉強中ではなく、作ったものを見せる必要がある。" },
  { title: "WEBデザイン", subtitle: "CREATIVE GATE", crest: "WEB", rank: "SSR", goal: "creative", tone: "ssr", art: "web-design-tcg", embeddedTitle: true, delay: 810, tilt: 6,
    copy: "目的に合わせて、見た目と使いやすさを設計する。", fit: "見せ方を考える・作る", gear: "デザイン基礎・制作ツール・ポートフォリオ", xp: "構成力・表現力・改善力", challenge: "学んだだけでは仕事にならない。作品の質と改善経験が必要。" },
  { title: "動画編集", subtitle: "CREATIVE GATE", crest: "MOVIE", rank: "SSR", goal: "creative", tone: "ssr", art: "video-tcg", embeddedTitle: true, delay: 900, tilt: -4,
    copy: "映像を整え、伝わる流れに仕上げる。", fit: "集中して作る・魅せ方を考える", gear: "編集技術・構成力・作品・納期管理", xp: "編集力・演出力・構成力", challenge: "切ってつなぐだけでは単価が上がらない。企画力と実績が必要。" },
  { title: "フリーランス", subtitle: "WORK STYLE", crest: "SOLO", rank: "SSR", goal: "freelance", tone: "ssr", art: "freelance-tcg", embeddedTitle: true, delay: 990, tilt: 0,
    copy: "自分で仕事を取り、納品し、報酬を得る働き方。", fit: "自分で決める・動き続ける", gear: "顧客・実績・営業力・専門スキル・自己管理", xp: "自己管理・提案力・事業感覚", challenge: "顧客探し、納期、収入、休みを自分で管理する。福利厚生も原則、自分で備える。" },
];

const goals = {
  creative: {
    rank: "SSR",
    targetLevel: "SSR",
    name: "SSR｜クリエイティブの世界",
    destinationJobs: "WEBデザイン・動画編集・プログラマー",
    guide: "作品やスキルを見せられる形にして、仕事へつなげる世界。好きという気持ちに、制作実績を足して扉を開こう。",
    requirements: ["作品・ポートフォリオ", "制作ツールの基礎", "学習と制作を続ける時間"],
    entryJob: "営業・施工管理など、対人力と段取りを積める正社員求人",
  },
  freelance: {
    rank: "SSR",
    targetLevel: "SSR",
    name: "SSR｜フリーランスという働き方",
    destinationJobs: "自分で顧客を得て、仕事を続ける働き方",
    guide: "技術があるだけでは続かない世界。顧客を増やす力、納期を守る力、収入と休みを自分で整える力までが装備になる。",
    requirements: ["売れる専門スキルと実績", "顧客をつくる営業力", "納期・収入・休みを管理する力"],
    entryJob: "正社員で実務経験と、顧客に見せられる実績を積める仕事",
  },
  it: {
    rank: "SR",
    targetLevel: "SR",
    name: "SR｜IT・PCスキルの世界",
    destinationJobs: "インフラエンジニア・CADオペレーター・一般事務",
    guide: "PCの基礎や学習実績を積み重ね、できる仕事を広げていく世界。学んだ証を装備に変えよう。",
    requirements: ["IT・PCの基礎知識", "資格や学習記録", "学び続ける時間"],
    entryJob: "インフラ・CADの学習を続けながら挑める未経験求人",
  },
  craft: {
    rank: "R",
    targetLevel: "R",
    name: "R｜ものづくりの世界",
    destinationJobs: "営業・施工管理・機械エンジニア",
    guide: "未経験から実戦で学び、段取り・調整力・専門知識を身につける世界。働いた経験がそのまま装備になる。",
    requirements: ["勤怠・継続", "人と連携する力", "段取り・安全への意識"],
    entryJob: "施工管理・機械エンジニアなど、実戦で技術を学べる仕事",
  },
  people: {
    rank: "N",
    targetLevel: "N",
    name: "N｜人と仕事の世界",
    destinationJobs: "販売・接客",
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
    lead: "Rで選べるのは、営業・施工管理・機械エンジニア。未経験から入れる仕事で経験値を集め、勤怠・報連相・段取りを次の扉へ進む装備に変えよう。",
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
let guidePoseIndex = 0;

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

function setGuideMood(mood = state.view, advancePose = false) {
  const guide = document.querySelector("#persistentGuide");
  if (!guide) return;
  if (advancePose) {
    guidePoseIndex = (guidePoseIndex + 1) % 4;
  }
  guide.className = `persistent-guide is-pose-${guidePoseIndex}${mood === "question" ? " is-question" : ""}${mood === "result" ? " is-result" : ""}${mood === "cards" ? " is-cards" : ""}${mood === "guide" ? " is-guide" : ""}`;
}

async function tickleGuide() {
  const guide = document.querySelector("#persistentGuide");
  if (!guide) return;
  const image = guide.querySelector("img");
  await guideTickleReady;
  if (!guideTickleComposite) return;
  guide.classList.remove("is-tickled");
  if (image) image.src = guideTickleComposite;
  void guide.offsetWidth;
  guide.classList.add("is-tickled");
}

function show(template, view) {
  clearRevealTimers();
  state.view = view;
  state.guideOpen = false;
  screen.replaceChildren(template.content.cloneNode(true));
  setNavVisibility();
  setGuideMood(undefined, true);
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

function getGateTarget(goal, containerRect) {
  const hotspot = document.querySelector(`.door-hotspot[data-goal="${goal}"]`);
  if (!hotspot) {
    return { x: containerRect.width * 0.5, y: containerRect.height * 0.54 };
  }
  const rect = hotspot.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2 - containerRect.left,
    y: rect.top + rect.height / 2 - containerRect.top,
  };
}

function careerCardInner(card) {
  const titlePlate = card.embeddedTitle
    ? ""
    : `<span class="career-card__nameplate" aria-label="${card.subtitle} ${card.title}"><strong>${card.title}</strong></span>`;
  return `
    <span class="career-card__face career-card__face--back"><img src="assets/card-back-${card.tone}.png" alt="" /></span>
    <span class="career-card__face career-card__face--front"><img src="assets/card-front-${card.art}.png" alt="" /></span>
    ${titlePlate}
  `;
}

function runReveal() {
  const overlay = document.querySelector("#careerReveal");
  const container = document.querySelector("#revealCards");
  if (!overlay || !container) return;

  overlay.hidden = false;
  setGuideMood("cards");
  overlay.classList.remove("is-sending", "is-leaving");
  container.replaceChildren();

  const items = revealCards.map((card, index) => {
    const element = document.createElement("div");
    element.className = `career-card career-card--${card.tone}`;
    element.dataset.cardIndex = String(index);
    element.setAttribute("role", "button");
    element.setAttribute("tabindex", "0");
    element.setAttribute("aria-label", `${card.title}のカードを見る`);
    element.innerHTML = careerCardInner(card);
    container.appendChild(element);
    return { element, card, index };
  });

  const motion = {
    startAt: performance.now(),
    rotation: 0,
    targetRotation: 0,
    vertical: 0,
    targetVertical: 0,
    pointerX: 0,
    pointerY: 0,
    dragging: false,
    dragStartX: 0,
    dragStartY: 0,
    dragStartRotation: 0,
    dragStartVertical: 0,
    dragDistance: 0,
    sending: false,
    sendAt: 0,
    selectedIndex: null,
  };

  const pointerDown = (event) => {
    if (motion.sending) return;
    motion.dragging = true;
    motion.dragStartX = event.clientX;
    motion.dragStartY = event.clientY;
    motion.dragStartRotation = motion.targetRotation;
    motion.dragStartVertical = motion.targetVertical;
    motion.dragDistance = 0;
    container.setPointerCapture?.(event.pointerId);
  };

  const pointerMove = (event) => {
    const rect = container.getBoundingClientRect();
    motion.pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    motion.pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    if (!motion.dragging || motion.sending) return;
    motion.dragDistance = Math.max(motion.dragDistance, Math.hypot(event.clientX - motion.dragStartX, event.clientY - motion.dragStartY));
    motion.targetRotation = motion.dragStartRotation + (event.clientX - motion.dragStartX) * 0.008;
    motion.targetVertical = Math.max(-54, Math.min(54, motion.dragStartVertical + (event.clientY - motion.dragStartY) * 0.22));
  };

  const pointerUp = (event) => {
    const wasTap = motion.dragDistance < 8;
    motion.dragging = false;
    if (!wasTap || motion.sending || motion.selectedIndex !== null) return;
    const hit = document.elementFromPoint(event.clientX, event.clientY);
    const cardElement = hit?.closest(".career-card[data-card-index]");
    if (cardElement) showCardDetail(Number(cardElement.dataset.cardIndex));
  };

  container.addEventListener("pointerdown", pointerDown);
  container.addEventListener("pointermove", pointerMove);
  container.addEventListener("pointerup", pointerUp);
  container.addEventListener("pointercancel", pointerUp);
  container.addEventListener("pointerleave", (event) => {
    if (event.buttons === 0) pointerUp();
  });

  overlay._careerMotion = motion;
  overlay._careerItems = items;

  const frame = (now) => {
    if (!document.body.contains(overlay)) return;

    const elapsed = now - motion.startAt;
    const rect = container.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const centerX = width * 0.5;
    const centerY = height * 0.51 + motion.vertical;
    const radiusX = width * 0.31;
    const radiusY = Math.min(height * 0.23, 140);

    if (!motion.dragging && !motion.sending && motion.selectedIndex === null) {
      motion.targetRotation += 0.00022 * Math.min(32, Math.max(8, now - (motion.lastAt || now)));
      motion.targetRotation += motion.pointerX * 0.0008;
      motion.targetVertical = motion.pointerY * 12;
    }
    motion.lastAt = now;
    motion.rotation += (motion.targetRotation - motion.rotation) * 0.075;
    motion.vertical += (motion.targetVertical - motion.vertical) * 0.07;

    items.forEach(({ element, card, index }) => {
      const appearProgress = Math.max(0, Math.min(1, (elapsed - card.delay) / 720));
      const easedAppear = easeOutCubic(appearProgress);
      const angle = -Math.PI / 2 + (index / items.length) * Math.PI * 2 + motion.rotation;
      const depth = (Math.sin(angle) + 1) / 2;
      let x = centerX + radiusX * Math.cos(angle);
      let y = centerY + radiusY * Math.sin(angle);
      let scale = (0.62 + depth * 0.44) * easedAppear;
      let opacity = (0.28 + depth * 0.72) * easedAppear;
      let rotate = card.tilt + Math.cos(angle) * 5 + motion.pointerX * 2;
      let rotateY = Math.cos(angle) * -16 + motion.pointerX * 5;
      let zIndex = Math.round(50 + depth * 120);
      let blur = (1 - depth) * 0.8;

      if (motion.sending) {
        const stagger = index * 42;
        const p = Math.max(0, Math.min(1, (now - motion.sendAt - stagger) / 1150));
        const eased = easeInOutCubic(p);
        const target = getGateTarget(card.goal, rect);
        x = lerp(x, target.x, eased);
        y = lerp(y, target.y, eased);
        scale = lerp(scale, 0.06, eased);
        opacity = lerp(opacity, 0, Math.max(0, (eased - 0.52) / 0.48));
        rotate = lerp(rotate, 0, eased);
        rotateY = lerp(rotateY, 0, eased);
        blur = lerp(blur, 2.4, eased);
        zIndex = 140 - index;
      }

      element.style.left = `${x}px`;
      element.style.top = `${y}px`;
      element.style.opacity = opacity;
      element.style.zIndex = zIndex;
      element.style.filter = `blur(${blur}px)`;
      element.style.transform = `translate(-50%, -50%) perspective(700px) rotateY(${rotateY}deg) rotate(${rotate}deg) scale(${scale})`;
    });

    revealFrame = requestAnimationFrame(frame);
  };

  revealFrame = requestAnimationFrame(frame);
}

function cardMarkup(card) {
  return `
    <div class="career-card career-card--${card.tone} card-detail__card is-revealed">
      ${careerCardInner(card)}
    </div>`;
}

function showCardDetail(index) {
  const overlay = document.querySelector("#careerReveal");
  const detail = document.querySelector("#cardDetail");
  if (!overlay || !detail || !overlay._careerMotion) return;

  const normalized = (index + revealCards.length) % revealCards.length;
  const card = revealCards[normalized];
  overlay._careerMotion.selectedIndex = normalized;
  overlay.classList.add("is-detail-open");
  detail.hidden = false;

  document.querySelector("#cardDetailVisual").innerHTML = cardMarkup(card);
  document.querySelector("#cardDetailCopy").textContent = card.copy;
  document.querySelector("#cardDetailGear").textContent = card.gear;
  document.querySelector("#cardDetailChallenge").textContent = card.challenge;
}

function closeCardDetail() {
  const overlay = document.querySelector("#careerReveal");
  const detail = document.querySelector("#cardDetail");
  if (overlay?._careerMotion) overlay._careerMotion.selectedIndex = null;
  overlay?.classList.remove("is-detail-open");
  if (detail) detail.hidden = true;
}

function moveCardDetail(step) {
  const overlay = document.querySelector("#careerReveal");
  if (!overlay?._careerMotion || overlay._careerMotion.selectedIndex === null) return;
  showCardDetail(overlay._careerMotion.selectedIndex + step);
}

function chooseCardGate() {
  const overlay = document.querySelector("#careerReveal");
  if (!overlay?._careerMotion || overlay._careerMotion.selectedIndex === null) return;
  const card = revealCards[overlay._careerMotion.selectedIndex];
  stopRevealAnimation();
  overlay.hidden = true;
  overlay.classList.remove("is-detail-open");
  setGuideMood("goal");
  state.goal = card.goal;
  showGuide(card.goal);
}

function sendCardsToDoors() {
  const overlay = document.querySelector("#careerReveal");
  if (!overlay || !overlay._careerMotion || overlay._careerMotion.sending) return;
  overlay._careerMotion.sending = true;
  overlay._careerMotion.sendAt = performance.now();
  overlay.classList.add("is-sending");
  revealTimers.push(setTimeout(() => overlay.classList.add("is-leaving"), 1250));
  revealTimers.push(setTimeout(() => {
    stopRevealAnimation();
    overlay.hidden = true;
    overlay.classList.remove("is-sending", "is-leaving");
    setGuideMood("goal");
  }, 2150));
}

function showGoals(withReveal = false) {
  stepLabel.textContent = "01 / GATE";
  show(templates.goal, "goal");
  if (withReveal) {
    requestAnimationFrame(() => {
      const doorMap = document.querySelector(".door-map");
      doorMap?.scrollIntoView({ block: "center", behavior: "instant" });
      runReveal();
    });
  }
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
  setGuideMood("guide");
}

function closeGuide() {
  const dialog = document.querySelector("#guideDialog");
  if (dialog) dialog.hidden = true;
  state.guideOpen = false;
  state.goal = "";
  setGuideMood("goal");
}

function showQuestion() {
  const activeQuestions = questionsForCurrentGoal();
  const question = activeQuestions[state.questionIndex];
  if (!question) {
    showResult();
    return;
  }

  stepLabel.textContent = `${String(state.questionIndex + 2).padStart(2, "0")} / 05`;
  show(templates.question, "question");
  document.querySelector("#questionKicker").textContent = question.kicker;
  document.querySelector("#questionTitle").innerHTML = question.title.replace("\n", "<br />");
  document.querySelector("#questionHint").textContent = question.hint;
  document.querySelector("#progressFill").style.width = `${((state.questionIndex + 1) / activeQuestions.length) * 100}%`;

  Object.entries(question.answers).forEach(([answer, [title, description]]) => {
    document.querySelector(`[data-answer="${answer}"]`).innerHTML = `<strong>${title}</strong><small>${description}</small>`;
  });
}

function questionsForCurrentGoal() {
  return state.goal === "freelance" ? freelanceQuestions : questions;
}

function routeForAnswers() {
  const goal = goals[state.goal];

  if (state.goal === "freelance") {
    const hasSelfManagement = state.answers.selfManagement === "yes";
    const canFindCustomers = state.answers.customerAcquisition === "yes";
    const hasProof = state.answers.preparation === "yes";
    const understandsWorkStyle = state.answers.workStyle === "yes";

    if (hasSelfManagement && canFindCustomers && hasProof && understandsWorkStyle) return "SSR";
    return "R";
  }

  const stableBase = state.answers.rhythm !== "no";
  const hasThreeYears = state.answers.experience === "yes";
  const hasProof = state.answers.preparation === "yes";
  const canKeepPreparing = state.answers.time === "yes";

  if (!stableBase) return "N_BASE";

  if (goal.targetLevel === "N") {
    return hasThreeYears ? "R" : "N_READY";
  }

  if (goal.targetLevel === "SR" && hasThreeYears && hasProof && canKeepPreparing) return "SR";
  if (goal.targetLevel === "SSR" && hasThreeYears && hasProof && canKeepPreparing) return "SSR";

  return "R";
}

function nextJobFor(route, goal) {
  if (route === "R") return goals.craft.destinationJobs;
  if (route === "N_BASE" || route === "N_READY") return goals.people.destinationJobs;

  if (goal === goals.freelance) {
    return route === "SSR" ? "フリーランス" : goals.craft.destinationJobs;
  }

  return goal.destinationJobs;
}

function showResult() {
  const route = routeForAnswers();
  const goal = goals[state.goal];
  const result = resultForGoal(route, goal);

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

function resultForGoal(route, goal) {
  if (goal !== goals.freelance) return results[route];

  if (route === "SSR") {
    return {
      ...results.SSR,
      lead: "実績を見せる力、仕事を取る力、自己管理までそろっているなら、フリーランスへ挑戦する土台がある。収入と案件を安定させる動き方は、最後に一緒に確認しよう。",
      quest: "実績を整理し、顧客へ提案する導線と受注後の管理方法を整える",
    };
  }

  return {
    ...results.R,
    lead: "フリーランスを急がず、まず会社で実務・納期・顧客対応を学ぶルートが現実的。正社員で積む経験と実績が、後から自分の仕事を選べる装備になる。",
    quest: "正社員で実務経験を積み、働きながら専門スキルと見せられる実績を育てる",
  };
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
      delete state.answers[questionsForCurrentGoal()[state.questionIndex].key];
      showQuestion();
    }
    return;
  }

  if (state.view === "result") {
    const activeQuestions = questionsForCurrentGoal();
    state.questionIndex = activeQuestions.length - 1;
    delete state.answers[activeQuestions[state.questionIndex].key];
    showQuestion();
  }
}

gameNav.addEventListener("click", (event) => {
  const action = event.target.closest("[data-global-action]")?.dataset.globalAction;
  if (action === "back") goBack();
  if (action === "top") start();
});

const persistentGuide = document.querySelector("#persistentGuide");
const guideImage = persistentGuide?.querySelector("img");
const guideTickleSource = "assets/rabbit-tickle.png";
const guideDefaultSource = "assets/rabbit-guide.webp";
let guideTickleComposite = "";

function removeBlackBackdrop(source) {
  return new Promise((resolve) => {
    const reaction = new Image();
    reaction.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = reaction.naturalWidth;
      canvas.height = reaction.naturalHeight;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      context.drawImage(reaction, 0, 0);
      const pixels = context.getImageData(0, 0, canvas.width, canvas.height);
      const seen = new Uint8Array(canvas.width * canvas.height);
      const stack = [];
      const isBackdrop = (point) => {
        const offset = point * 4;
        return pixels.data[offset] < 14 && pixels.data[offset + 1] < 14 && pixels.data[offset + 2] < 14;
      };
      const add = (point) => {
        if (!seen[point] && isBackdrop(point)) {
          seen[point] = 1;
          stack.push(point);
        }
      };

      for (let x = 0; x < canvas.width; x += 1) {
        add(x);
        add((canvas.height - 1) * canvas.width + x);
      }
      for (let y = 0; y < canvas.height; y += 1) {
        add(y * canvas.width);
        add(y * canvas.width + canvas.width - 1);
      }
      while (stack.length) {
        const point = stack.pop();
        const x = point % canvas.width;
        const y = Math.floor(point / canvas.width);
        pixels.data[point * 4 + 3] = 0;
        if (x > 0) add(point - 1);
        if (x < canvas.width - 1) add(point + 1);
        if (y > 0) add(point - canvas.width);
        if (y < canvas.height - 1) add(point + canvas.width);
      }
      context.putImageData(pixels, 0, 0);
      resolve(canvas.toDataURL("image/png"));
    };
    reaction.onerror = () => resolve("");
    reaction.src = source;
  });
}

const guideTickleReady = removeBlackBackdrop(guideTickleSource).then((image) => {
  guideTickleComposite = image;
});
persistentGuide?.addEventListener("click", tickleGuide);
persistentGuide?.querySelector("img")?.addEventListener("animationend", (event) => {
  if (event.animationName === "guide-tickle") {
    persistentGuide.classList.remove("is-tickled");
    if (guideImage) guideImage.src = guideDefaultSource;
  }
});

screen.addEventListener("click", (event) => {
  const action = event.target.closest("[data-action]")?.dataset.action;

  if (action === "start-quest") {
    showGoals(true);
    return;
  }

  const selectedCard = event.target.closest(".career-card[data-card-index]");
  const overlay = document.querySelector("#careerReveal");
  if (selectedCard && overlay?._careerMotion && overlay._careerMotion.dragDistance < 8) {
    showCardDetail(Number(selectedCard.dataset.cardIndex));
    return;
  }

  if (action === "close-card-detail") {
    closeCardDetail();
    return;
  }

  if (action === "prev-card") {
    moveCardDetail(-1);
    return;
  }

  if (action === "next-card") {
    moveCardDetail(1);
    return;
  }

  if (action === "choose-card-gate") {
    chooseCardGate();
    return;
  }

  if (action === "skip-reveal") {
    sendCardsToDoors();
    return;
  }

  if (action === "send-cards") {
    sendCardsToDoors();
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
    state.answers[questionsForCurrentGoal()[state.questionIndex].key] = answer;
    state.questionIndex += 1;
    showQuestion();
  }
});

start();


document.addEventListener("keydown", (event) => {
  const overlay = document.querySelector("#careerReveal");
  if (!overlay || overlay.hidden || !overlay._careerMotion) return;
  if (overlay._careerMotion.selectedIndex !== null) {
    if (event.key === "Escape") closeCardDetail();
    if (event.key === "ArrowLeft") moveCardDetail(-1);
    if (event.key === "ArrowRight") moveCardDetail(1);
  }
});
