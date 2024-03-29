const fileInput = document.getElementById("fileUpload");
// const audio = document.getElementById("myAudio");
const Pause_btn = document.getElementById("Audio_pause");
const Time_text = document.getElementById("Audio_time");
const Audio_bar = document.getElementById("Audio_bar");
const Audio_bar_btn = document.getElementById("Audio_bar_button");
const Audio_sound = document.getElementById("Audio_sound");
const Sound_box = document.getElementById("Sound_box");
const Sound_volume = document.getElementById("Sound_volume");
const Sound_bar = document.getElementById("Sound_bar");
const Sound_bar_btn = document.getElementById("Sound_bar_button");
const Auth_btn = document.getElementById("Audio_auth_button");
const Auth = document.getElementById("Audio_auth");
const Auth_div = document.querySelectorAll(".auths");
// 파일 읽는 객체 블러오기
const fileReader = new FileReader();

//오디오 객체 불러오기
let MyAudio = new Audio();

// 음악을 멈추지 않았다 == false │ 음악이 멈췄다 == true
let pause = false;

// 마우스 이동을 시작했는가? (Drog&Drop)
let isDragging = false;

// 마우스 이동을 시작했는가? (Drog&Drop) (sound.ver)
let Sound_isDragging = false;

// 볼륨은 몇인가?
let volume = 30;

// 음악 파일 불러오기
const handleFiles = (e) => {
  const selectedFile = [...fileInput.files];
  if (selectedFile[0] !== undefined) {
    fileReader.readAsDataURL(selectedFile[0]);
  }

  fileReader.onload = function () {
    // audio.src = fileReader.result;
    pause = true;
    MyAudio.src = fileReader.result;
    MyAudio.addEventListener('loadedmetadata', () => Audio_start());
    Audio_bar_btn.style.backgroundColor = '#222';
    Pause_btn.style.filter = 'opacity(1) drop-shadow(0 0 0 #000)';
    Audio_sound.style.filter = 'opacity(1) drop-shadow(0 0 0 #000)';
    Audio_bar_btn.style.display = 'block';
    fileInput.blur();
  };
};

// 음악 시작(정지) 버튼 눌렀을 때
const pause_click = () => {
  if (MyAudio.paused) {
    if (MyAudio.src !== '') {
      Audio_start();
    }
    Pause_btn.innerText = "❚❚";
  } else {
    if (MyAudio.src !== '') {
      MyAudio.pause();
    }
    Pause_btn.innerText = "▶︎";
  }
}

const set_time = () => {
  let f_minute = Math.floor(MyAudio.currentTime / 60);
  let f_second = Math.floor(MyAudio.currentTime % 60);
  if (f_second < 10) {
    f_second = `0${f_second}`;
  }

  let b_minute = Math.floor(MyAudio.duration / 60);
  let b_second = Math.floor(MyAudio.duration % 60);
  if (b_second < 10) {
    b_second = `0${b_second}`;
  }

  Time_text.innerText = `${f_minute} : ${f_second} / ${b_minute} : ${b_second}`;
}

// 음악 시작
const Audio_start = () => {
  Pause_btn.innerText = "❚❚";
  MyAudio.play();
  pause = false;

  const Time_view = setInterval(() => {
    set_time();
    bar_set_time();

    if (pause || MyAudio.currentTime == MyAudio.duration) {
      clearInterval(Time_view);
      Pause_btn.innerText = "▶︎";
      pause = true;
    }
  }, 1000)
}

// 절대 좌표 구하는 함수(위쪽)
const getAbsoluteTop = (element) => {
  return window.pageYOffset + element.getBoundingClientRect().top;
}

// 절대 좌표 구하는 함수(왼쪽)
const getAbsoluteLeft = (element) => {
  return window.pageXOffset + element.getBoundingClientRect().left;
}


// 음악 재생 위치 결정하기(미완성)
const bar_set_time = () => {
  // const parentAbsoluteLeft = getAbsoluteLeft(Audio_bar); 
  // const AbsoluteLeft = getAbsoluteLeft(Audio_bar_btn);
  // // bar_btn의 현재 상대 좌표
  // const relativeLeft =  AbsoluteLeft - parentAbsoluteLeft;
  // const elementPercent = relativeLeft / 175 * 100;
  const percentTime = MyAudio.currentTime / MyAudio.duration * 100;
  Audio_bar_btn.style.marginLeft = `${percentTime / 100 * 130}px`;
}

// Audio_bar 클릭 위치를 재생 위s치로 변환
const bar_click = (e) => {
  if (isDragging && !MyAudio.paused) {
    MyAudio.pause();
    Pause_btn.innerText = "▶︎";
    pause = true;
  }
  let x = e.clientX;
  // bar_btn의 현재 상대 좌표
  const relativeLeft = x - parentAbsoluteLeft;
  MyAudio.currentTime = (relativeLeft - 10) / 130 * MyAudio.duration

  set_time();
  bar_set_time();
}

// 볼륨 이미지 변경
const set_volume = () => {
  if (volume == 0) {
    Audio_sound.src = './sound_off.png';
  } else {
    Audio_sound.src = './sound_on.png';
  }
}

const bar_set_sound = () => {
  MyAudio.volume = volume / 100;
  Sound_volume.innerText = volume;
  Sound_bar_btn.style.marginLeft = `${volume / 100 * 55}px`;
  set_volume();
}

const sound_bar_click = (e) => {
  const parentAbsoluteLeft = getAbsoluteLeft(Sound_bar);
  let x = e.clientX;
  // bar_btn의 현재 상대 좌표
  const relativeLeft = x - parentAbsoluteLeft;
  volume = Math.round(relativeLeft / 62.5 * 100);
  if (volume > 100) {
    volume = 100;
  } else if (volume < 0) {
    volume = 0;
  }
  bar_set_sound();
}

// sound_box 나타내기
const sound_click = () => {
  fixed_sound();
  if (Sound_box.style.transform == 'scale(0)') {
    Sound_box.style.transform = 'scale(1)';
  } else {
    Sound_box.style.transform = 'scale(0)';
  }
}

// sound_box 위치 설정
const fixed_sound = () => {
  const parentAbsoluteLeft = getAbsoluteLeft(Audio_sound);
  const parentAbsoluteTop = getAbsoluteTop(Audio_sound);
  Sound_box.style.left = `${parentAbsoluteLeft - 130}px`;
  Sound_box.style.top = `${parentAbsoluteTop}px`;
}

const fixed_auth = () => {
  const parentAbsoluteLeft = getAbsoluteLeft(Auth_btn);
  const parentAbsoluteTop = getAbsoluteTop(Auth_btn);
  Auth.style.left = `${parentAbsoluteLeft - 100}px`;
  Auth.style.top = `${parentAbsoluteTop - (Auth_div.length * 40) - 5}px`;
}

// 초기 볼륨 설정
bar_set_sound();

// Audio_sound를 클릭했읋 때
Audio_sound.addEventListener('click', () => {
  if (MyAudio.src !== '') {
    sound_click();
  }
});

// Audio_sound가 이미 클릭되어 있는 상태에서 다른 것을 클릭했을 때
document.addEventListener('click', (e) => {
  let id = e.target.id;
  let Class = e.target.className;
  if (Sound_box.style.transform == 'scale(1)' && id !== 'Audio_sound' && id !== 'Sound_box' && id !== 'Sound_volume' && id !== 'Sound_bar' && id !== 'Sound_bar_button') {
    sound_click();
  }
  if (id !== 'Audio_auth_button' && id !== 'Audio_auth' && Class !== 'auths' && Class !== 'auth_img' && Class !== 'auth_text') {
    Auth.style.transform = 'scale(0)';
  }
});

// 스페이스 눌렀을때 음악 정지 및 시작
document.addEventListener("keydown", (e) => {
  if (MyAudio.src !== '' && e.key == ' ')
    pause_click();
})

// 초기 기본 시작(정지) 버튼 설정
Pause_btn.innerText = "▶︎";
Pause_btn.addEventListener("click", () => {
  if (MyAudio.src !== '') {
    pause_click();
  }
});

// 초기 기본 초 설정
Time_text.innerText = '0 : 00 / 0 : 00';

// audio_bar의 절대위치
const parentAbsoluteLeft = getAbsoluteLeft(Audio_bar);

// audio_bar를 클릭했을 때
Audio_bar.addEventListener("click", (event) => {
  if (MyAudio.src !== '') {
    bar_click(event);
  }
});
// Audio_bar_btn && Sound_bar_btn 드래그 앤 드롭
Audio_bar_btn.addEventListener('mousedown', () => { isDragging = true; });
Sound_bar_btn.addEventListener('mousedown', () => { Sound_isDragging = true; });
document.addEventListener('mousemove', (event) => {
  if (isDragging) {
    bar_click(event);
  }
  if (Sound_isDragging) {
    sound_bar_click(event);
  }
});
document.addEventListener('mouseup', () => {
  if (isDragging && pause) {
    Audio_start();
  }
  isDragging = false;
  Sound_isDragging = false;
});

// Sound_bar를 클릭했을 때
Sound_bar.addEventListener("click", (event) => {
  if (MyAudio.src !== '') {
    sound_bar_click(event);
  }
});

Auth_btn.addEventListener('click', () => {
  fixed_auth();
  Auth.style.transform = 'scale(1)';
})

// 음악 파일 불러오기
fileInput.addEventListener("change", handleFiles);