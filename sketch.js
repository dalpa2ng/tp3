let pet_name = "물개";
let myBodyColor = "#EBEBFF"; // 몸
let myShadowColor = "#D8D8F7"; // 몸 그림자
let currentAction = "normal";
// 'normal', 'eat', 'happy', 'angry', 'bath', 'sleep'

let actionStartTime = 0; // 액션이 시작된 시점의 시간을 저장
let displayDuration = 3000; // 액션 유지 시간 (3초)

let gameState = "intro"; // 게임 상태: intro(시작 화면) → story1(스토리1) → story2(스토리2) → game(게임 시작)
let checkStory3 = false;

// --- 사운드 변수 선언 ---
let bgm_intro, bgm_game_home, bgm_game_lab, bgm_game_sea, bgm_ending;
let currentBPM = null; 
let sfx_eat, sfx_bath, sfx_sleep;


// --- 이미지 미리 로드 ---
function preload() {
bg_home = loadImage("image/home.png");
bg_lab = loadImage("image/lab.png");
bg_sea = loadImage("image/sea.png");

bg_intro = loadImage("image/intro.jpg");
bg_story1 = loadImage("image/story1.jpg");
bg_story2 = loadImage("image/story2.jpg");

bg_story3 = loadImage("image/story3.jpg");
bg_story4 = loadImage("image/story4.jpg");
bg_story5 = loadImage("image/story5.jpg");
bg_story6 = loadImage("image/story6.jpg");
end = loadImage("image/credit.jpg");

// 사운드 폴더 파일 로드
soundFormats('mp3', 'wav');
bgm_intro = loadSound('sound/lab.mp3');
bgm_game_home = loadSound('sound/home.mp3');
bgm_game_lab = loadSound('sound/lab.mp3');
bgm_game_sea = loadSound('sound/sea.mp3');
bgm_ending = loadSound('sound/ending.mp3');

sfx_eat = loadSound('sound/eat.mp3');
sfx_bath = loadSound('sound/bath.mp3');
sfx_sleep = loadSound('sound/sleep.mp3');
}

// --- 초기 설정 ---
function setup() {
createCanvas(windowWidth, windowHeight);

// [웹캠 준비] 인트로 때부터 모델은 미리 로딩 시작 (멈춤 방지)
if (typeof setupFaceCam === 'function') {
  setupFaceCam();
}

// 게임 상태일 때만 날씨/카메라 초기화
if (gameState === "game") {
loadWeather();
setupFaceCam();
}
}

// --- 매 프레임마다 실행 ---
function draw() {
manageBGM();

if (level === 2 && checkStory3 === false) {
gameState = "story3"
checkStory3 = true;
}
// 현재 게임 상태에 따라 다른 화면 표시
if (gameState === "intro") {
drawIntro(); // 시작 화면
} else if (gameState === "story1") {
drawStory1(); // 스토리 1 화면
} else if (gameState === "story2") {
drawStory2(); // 스토리 2 화면
} else if (gameState === "game") {
drawGame(); // 실제 게임 화면
} else if (gameState === "story3") {
drawStory3();
} else if (gameState === "story4") {
drawStory4();
} else if (gameState === "story5") {
drawStory5();
} else if (gameState === "story6") {
drawStory6();
} else if (gameState === "end") {
drawcredit();
}
}

// 배경음악 자동 재생 
function manageBGM() {
  let targetBGM = null;

  if (gameState === "intro" || gameState === "story1" || gameState === "story2") {
    targetBGM = bgm_intro;
  } else if (gameState === "game") {
    if (currentBg === 'home') targetBGM = bgm_game_home;
    else if (currentBg === 'lab') targetBGM = bgm_game_lab;
    else if (currentBg === 'sea') targetBGM = bgm_game_sea;
  } else {
    targetBGM = bgm_ending; // story3 ~ story6
  }

  if (currentBPM !== targetBGM) {
    if (currentBPM && currentBPM.isPlaying()) {
      currentBPM.stop();
    }
    currentBPM = targetBGM;
    if (currentBPM) {
      currentBPM.loop();
    }

    if (currentBPM === bgm_game_lab) {
        bgm_game_lab.setVolume(0.2);
    }
  }
}

// 액션이 바뀔 때 효과음을 같이 재생해주는 함수
function changeActionWithSound(newAction) {
  currentAction = newAction;
  actionStartTime = millis();

  if (newAction === "eat" && sfx_eat) sfx_eat.play();
  else if (newAction === "bath" && sfx_bath) sfx_bath.play();
  else if (newAction === "sleep" && sfx_sleep) sfx_sleep.play();
}

// 구버전 changeAction 이름 호환용
function changeAction(newAction) {
  changeActionWithSound(newAction);
}

// --- 시작 화면 ---
function drawIntro() {
background("#FFF8F0");
image(bg_intro, 0, -height * 0.01, width, height * 1.01);

// 안내 문구
textSize(32);
fill("#8f9ffb");
text("클릭하여 시작하기", width - 280, height - 100);
// 깜빡이는 화살표 (1초마다 on/off)
if (frameCount % 60 < 30) {
fill("#8f9ffb");
textSize(24);
text("▼", width - 180, height - 60);
}
}
function drawStory1() {
background("#E8F4F8");
image(bg_story1, 0, -height * 0.08, width, height * 1.08);

// 깜빡이는 화살표
if (frameCount % 60 < 30) {
fill("#566bb8");
textSize(60);
text("▶", width - 100, height - 60);
}
}
function drawStory2() {
background("#00aaff");
image(bg_story2, 0, -height * 0.08, width, height * 1.08);

// 깜빡이는 화살표
if (frameCount % 60 < 30) {
fill("#566bb8");
textSize(60);
text("▶", width - 100, height - 60);
}
}
function drawStory3() {
background("#00aaff");
image(bg_story3, 0, -height * 0.08, width, height * 1.08);

// 깜빡이는 화살표
if (frameCount % 60 < 30) {
fill("#566bb8");
textSize(60);
text("▶", width - 100, height - 100);
}
}
function drawStory4() {
background("#00aaff");
image(bg_story4, 0, -height * 0.08, width, height * 1.08);
// 깜빡이는 화살표
if (frameCount % 60 < 30) {
fill("#566bb8");
textSize(60);
text("▶", width - 100, height - 100);
}
}

function drawStory5() {
background("#00aaff");
image(bg_story5, 0, -height * 0.08, width, height * 1.08);
// 깜빡이는 화살표
if (frameCount % 60 < 30) {
fill("#566bb8");
textSize(60);
text("▶", width - 100, height - 100);
}
}
function drawStory6() {
background("#00aaff");
image(bg_story6, 0, -height * 0.08, width, height * 1.08);
// 깜빡이는 화살표
if (frameCount % 60 < 30) {
fill("#566bb8");
textSize(60);
text("▶", width - 100, height - 100);
}
}
function drawcredit() {
background("#00aaff");
image(end, 0, -height * 0.08, width, height * 1.08);
}

// --- 실제 게임 화면 ---
function drawGame() {
// 배경 이미지 표시
if (currentBg === 'home') {
  if (bg_home) image(bg_home, 0, -height * 0.08, width, height * 1.08);
}
else if (currentBg === 'lab') {
  if (bg_lab) image(bg_lab, 0, -height * 0.11, width, height * 1.11);
}
else if (currentBg === 'sea') {
  if (bg_sea) image(bg_sea, 0, -height * 0.08, width, height * 1.08);
}

// home, lab 배경일 때만 창문 표시
if (currentBg === 'home' || currentBg === 'lab') drawWindow(250, 170, 250, 180);
// 웹캠 버튼 (다른 버튼들과 같은 라인)
drawFaceCamButton(530, height - 125, 120, 120);
// 웹캠이 켜져 있을 때만 미리보기 표시 (우측 하단)
if (faceCamActive) drawFaceCamPreview(width - 220, height - 170, 200, 150);


  applyFacialMoodToHappiness(); 
  applyWeatherToHappiness();

  
  if (millis() - actionStartTime >= displayDuration) {
    if (currentAction === "eat" && sfx_eat && sfx_eat.isPlaying()) sfx_eat.stop();
    if (currentAction === "bath" && sfx_bath && sfx_bath.isPlaying()) sfx_bath.stop();
    if (currentAction === "sleep" && sfx_sleep && sfx_sleep.isPlaying()) sfx_sleep.stop();
    
    currentAction = "normal";
  }

if (hunger >= 30 && happiness >= 30 && fatigue <= 145) {
if (currentAction === "normal") {
update(); 
normal_body();
} else if (currentAction === "eat") {
eat_body();
} else if (currentAction === "happy") {
happy_body();
} else if (currentAction === "angry") {
angry_body();
} else if (currentAction === "bath") {
bath_body();
} else if (currentAction === "sleep") {
sleep_body();
}
} else {
// 스탯이 임계값 이하일 때
if (sfx_eat && sfx_eat.isPlaying()) sfx_eat.stop();
if (sfx_bath && sfx_bath.isPlaying()) sfx_bath.stop();
if (sfx_sleep && sfx_sleep.isPlaying()) sfx_sleep.stop();

currentAction = "angry";
angry_body();
}

// 색상 변경 버튼
if (typeof drawPaletteButton === 'function') drawPaletteButton();
if (typeof showPalette !== 'undefined' && showPalette) { drawColorOptions(); }

// 배경 변경 버튼
if (typeof drawBgPaletteButton === 'function') drawBgPaletteButton();
if (typeof showBgPalette !== 'undefined' && showBgPalette) { drawBgOptions(); }

// 스탯 게이지 표시
condition_hunger();
condition_happiness();
condition_fatigue();
// 레벨업 시스템
level_up();
}


// --- 캐릭터 위치 업데이트 및 드래그 제어 ---
function update() {

if (!mouseIsPressed) {
isDragging = false;
}

// 1. 마우스로
if (isDragging) {
charX = mouseX - 200;
charX = constrain(charX, 50, width - 640);
return;
}

// 2. 평소
if (currentAction === "normal" && isMoving) {
charX += charSpeed * moveDirection;
if (charX >= width - 640) {
moveDirection = -1;
} else if (charX <= 50) {
moveDirection = 1;
}
}
}

// --- 표정에 따라 행복도 변화 ---
function applyFacialMoodToHappiness() {
if (facialMood === 'happy') {
happiness += 0.2; // 웃는 표정이면 행복도 증가
happiness = constrain(happiness, 0, 175);
} else if (facialMood === 'sad') {
happiness -= 0.1; // 슬픈 표정이면 행복도 감소
happiness = constrain(happiness, 0, 175);
}
}

// --- 날씨에 따라 행복도 변화 ---
function applyWeatherToHappiness() {
if (!weatherLoaded) return; // 날씨 데이터가 로드되지 않았으면 실행 안 함
if (weatherCondition === 'clear') {
happiness += 0.02; // 맑은 날씨면 행복도 증가
happiness = constrain(happiness, 0, 175);
} else if (weatherCondition === 'rain' || weatherCondition === 'snow') {
happiness -= 0.02; // 비/눈 오면 행복도 감소
happiness = constrain(happiness, 0, 175);
}
}