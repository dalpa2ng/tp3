function mousePressed() {
  if (getAudioContext().state !== 'running') {
    getAudioContext().resume();
  }

  // 인트로 및 엔딩
  if (gameState === "intro") {
    gameState = "story1";
  } else if (gameState === "story1") {
    gameState = "story2";
  } else if (gameState === "story2") {
    gameState = "game";
    loadWeather();
    setupFaceCam();
  } else if (gameState === "story3") {
    gameState = "story4";
  } else if (gameState === "story4") {
    gameState = "story5";
  } else if (gameState === "story5") {
    gameState = "story6";
  } else if (gameState === "story6") {
    gameState = "end";
  }

  // 캐릭터 움직임
  if (gameState === "game") {
    if (mouseY < height - 130) {
      let d = dist(mouseX, mouseY, charX + 200, height / 2);
      
      if (d < 80) {
        isDragging = true;
        changeAction("normal"); 
      }
    }
  }

  // 웹캠
  if (typeof isFaceCamButtonClicked === 'function' && isFaceCamButtonClicked(530, height - 125, 120, 120)) {
      buttonPressed_facecam = true;
      pressTime_facecam = millis();

      if (!faceCamActive) {
        if (typeof startFaceCam === 'function') startFaceCam(); // 진짜로 캠 켜기
      } else {
        if (typeof stopFaceCam === 'function') stopFaceCam();   // 진짜로 캠 끄기
      }
    }
  

  // -------------------------------------------------------------
  // 1. 색상 변경
  // -------------------------------------------------------------
  if (typeof checkPaletteClick === 'function') {
    checkPaletteClick();
  }
  
   // -------------------------------------------------------------
  // 2. 배경 변경
  // -------------------------------------------------------------
 if (typeof checkBgClick === 'function') {
    checkBgClick();
  }
  
  // -------------------------------------------------------------
  // 1. 먹이주기
  // -------------------------------------------------------------
  if (mouseX >= 10 && mouseX <= 130 && mouseY >= height - 130 && mouseY <= height - 10) {
    if (millis() - lastClickedTime_hunger >= cooldownTime_hunger) {
      buttonPressed_hunger = true;
      pressTime_hunger = millis();

      hunger += 50;
      hunger = constrain(hunger, 0, 175);
      experience += 70;
      experience = constrain(experience, 0, 70);
 
      changeActionWithSound("eat");
      lastClickedTime_hunger = millis(); 
    }
  }

  // -------------------------------------------------------------
  // 2. 말풍선 (행복도)
  // -------------------------------------------------------------
  if (mouseX >= 140 && mouseX <= 260 && mouseY >= height - 130 && mouseY <= height - 10) {
    if (millis() - lastClickedTime_happiness >= cooldownTime_happiness) {
      let key_interaction;
      key_interaction = prompt("이름을 불러주세요!");
      if (key_interaction === pet_name) {
        buttonPressed_happiness = true;
        pressTime_happiness = millis();
        console.log("좋아하네요");

        happiness += 50;
        happiness = constrain(happiness, 0, 175);
        experience += 5;
        experience = constrain(experience, 0, 70);

        currentAction = "happy";
        actionStartTime = millis(); 
        lastClickedTime_happiness = millis(); 
      }
    }
  }

  // -------------------------------------------------------------
  // 3. 씻기기
  // -------------------------------------------------------------
  if (mouseX >= 250 && mouseX <= 370 && mouseY >= height - 130 && mouseY <= height - 10) {
    if (millis() - lastClickedTime_fatigue1 >= cooldownTime_fatigue1) {
      buttonPressed_fatigue1 = true;
      pressTime_fatigue1 = millis();

      fatigue -= 50;
      fatigue = constrain(fatigue, 0, 175);
      experience += 5;
      experience = constrain(experience, 0, 70);

      changeActionWithSound("bath");
      lastClickedTime_fatigue1 = millis(); 
    }
  }

  // -------------------------------------------------------------
  // 4. 재우기
  // -------------------------------------------------------------
  if (mouseX >= 380 && mouseX <= 500 && mouseY >= height - 130 && mouseY <= height - 10) {
    if (millis() - lastClickedTime_fatigue2 >= cooldownTime_fatigue2) {
      buttonPressed_fatigue2 = true;
      pressTime_fatigue2 = millis();

      fatigue -= 50;
      fatigue = constrain(fatigue, 0, 175);
      experience += 5;
      experience = constrain(experience, 0, 70);
      
      changeActionWithSound("sleep");
      lastClickedTime_fatigue2 = millis(); 
    }
  }
}