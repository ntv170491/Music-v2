// Input
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = "F8_PLAYER";

// GET element
const player = $(".player");
const cd = $(".cd");
const heading = $("header h2");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const progress = $("#progress");
const prevBtn = $(".btn-prev");
const nextBtn = $(".btn-next");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const playlist = $(".playlist");
const waves = document.getElementById("waves");
const bg_image = document.querySelector(".bg-image .bg");
// Execute
const app = {
  currentIndex: 0,
  isPlaying: false,
  isRandom: false,
  isRepeat: false,
  // config: {},
  config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},
  setConfig: function (key, value) {
    this.config[key] = value;
    localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config));
  },
  // playlist
  songs: [
    {
      name: "Ai thật lòng thương em",
      path: "./assets/musics/ai-that-long-thuong-em.mp3",
      image: "./assets/img/image-1.jpg",
      singer: "Lý Tuấn Kiệt",
    },
    {
      name: "Bao giờ kết hôn",
      path: "./assets/musics/bao-gio-ket-hon.mp3",
      image: "./assets/img/image-2.jpg",
      singer: "Lý Tuấn Kiệt",
    },
    {
      name: "Bắt cóc con tim",
      path: "./assets/musics/bat-coc-con-tim.mp3",
      image: "./assets/img/image-3.jpg",
      singer: "Lou Hoàng",
    },
    {
      name: "Có phúc cùng hưởng có hoạ cùng chia",
      path: "./assets/musics/co-phuc-cung-huong-co-hoa-cung-chia.mp3",
      image: "./assets/img/image-4.jpg",
      singer: "Lý Tuấn Kiệt",
    },
    {
      name: "Duyên tình mình lỡ",
      path: "./assets/musics/duyen-tinh-minh-lo.mp3",
      image: "./assets/img/image-5.jpg",
      singer: "Hoàng Lan",
    },
    {
      name: "Hãy để anh yên",
      path: "./assets/musics/hay-de-anh-yen.mp3",
      image: "./assets/img/image-6.jpg",
      singer: "Nhật Phong",
    },
    {
      name: "Hoa điêu thuyền",
      path: "./assets/musics/hoa-dieu-thuyen.mp3",
      image: "./assets/img/image-7.jpg",
      singer: "Hầu Ca",
    },
    {
      name: "Không yêu sẽ không đau lòng",
      path: "./assets/musics/khong-yeu-se-khong-dau-long.mp3",
      image: "./assets/img/image-8.jpg",
      singer: "Minh Vương M4U",
    },
    {
      name: "Khuất lối",
      path: "./assets/musics/khuat-loi.mp3",
      image: "./assets/img/image-9.jpg",
      singer: "H-Kray",
    },
    {
      name: "Lạc vào trong mơ",
      path: "./assets/musics/lac-vao-trong-mo.mp3",
      image: "./assets/img/image-10.jpg",
      singer: "SimonC, WUY",
    },
    {
      name: "Nếu em đi",
      path: "./assets/musics/neu-em-di.mp3",
      image: "./assets/img/image-11.jpg",
      singer: "Quang Vinh",
    },
    {
      name: "Ngày mai em đi mất",
      path: "./assets/musics/ngay-mai-em-di-mat.mp3",
      image: "./assets/img/image-12.jpg",
      singer: "Khải Đăng",
    },
    {
      name: "Người thay thế em",
      path: "./assets/musics/nguoi-thay-the-em.mp3",
      image: "./assets/img/image-1.jpg",
      singer: "Hoàng Lan",
    },
    {
      name: "To all of you",
      path: "./assets/musics/to-all-of-you.mp3",
      image: "./assets/img/image-2.jpg",
      singer: "Nam Em",
    },
    {
      name: "Vì sao thế",
      path: "./assets/musics/vi-sao-the.mp3",
      image: "./assets/img/image-3.jpg",
      singer: "Khải Đăng",
    },
    {
      name: "Vũ trụ trong anh",
      path: "./assets/musics/vu-tru-trong-anh.mp3",
      image: "./assets/img/image-4.jpg",
      singer: "Hoàng Lan",
    },
  ],
  render: function () {
    const htmls = this.songs.map((song, index) => {
      return `
        <div class="song ${index === this.currentIndex ? "active" : ""}"
        data-index="${index}">💖
          <div class="thumb" style="background-image: url('${song.image}')">
          </div>
          <div class="body">
            <h3 class="title">${song.name}</h3>
            <p class="author">${song.singer}</p>
          </div>
          <div class="option">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      `;
    });
    playlist.innerHTML = htmls.join("");
  },
  defineProperties: function () {
    Object.defineProperty(this, "currentSong", {
      get: function () {
        return this.songs[this.currentIndex];
      },
    });
  },
  handleEvents: function () {
    const _this = this;
    const cd = $(".cd");
    const cdWidth = cd.offsetWidth;
    //Rotate CD
    const cdThumbAnimate = cdThumb.animate([{ transform: "rotate(360deg)" }], {
      duration: 40000, // 40s
      iterations: Infinity,
    });
    cdThumbAnimate.pause();
    // scroll CD
    document.onscroll = function () {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const newCDWidth = cdWidth - scrollTop;
      cd.style.width = newCDWidth > 0 ? newCDWidth + "px" : 0;
      cd.style.opacity = newCDWidth / cdWidth;
    };
    // click btn Play
    playBtn.onclick = function () {
      if (_this.isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
    };
    audio.onplay = function () {
      _this.isPlaying = true;
      player.classList.add("playing");
      // rotate CD
      cdThumbAnimate.play();
      waves.classList.remove("card__waves-disable");
      waves.classList.add("card__waves-active");
    };
    audio.onpause = function () {
      _this.isPlaying = false;
      player.classList.remove("playing");
      cdThumbAnimate.pause();
      waves.classList.remove("card__waves-active");
      waves.classList.add("card__waves-disable");
    };
    // PROCESS
    audio.ontimeupdate = function () {
      if (audio.duration) {
        const progressPercent = Math.floor(
          (audio.currentTime / audio.duration) * 100
        );
        progress.value = progressPercent;
      }
    };
    progress.onchange = function (e) {
      const seekTime = (audio.duration / 100) * e.target.value;
      audio.currentTime = seekTime;
    };
    nextBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.nextSong();
      }
      audio.play();
      _this.render();
      // _this.scrollToActiveSong();
    };
    prevBtn.onclick = function () {
      if (_this.isRandom) {
        _this.playRandomSong();
      } else {
        _this.prevSong();
      }
      audio.play();
      _this.render();
    };
    // status: on/off random
    randomBtn.onclick = function (e) {
      _this.isRandom = !_this.isRandom;
      _this.setConfig("isRandom", _this.isRandom);
      randomBtn.classList.toggle("active", _this.isRandom);
    };
    // Ended Song
    audio.onended = function () {
      if (_this.isRepeat) {
        audio.play();
      } else {
        nextBtn.click();
      }
    };
    // Repeat song : on / off repeat
    repeatBtn.onclick = function () {
      _this.isRepeat = !_this.isRepeat;
      _this.setConfig("isRepeat", _this.isRepeat);
      repeatBtn.classList.toggle("active", _this.isRepeat);
    };
    // playlist
    playlist.onclick = function (e) {
      const songNode = e.target.closest(".song:not(.active)");
        if (songNode) {
          _this.currentIndex = Number.parseInt(songNode.dataset.index);
          _this.loadCurrentSong();
          audio.play();
          _this.render();
        }
      }
  },
  scrollToActiveSong: function () {
    setTimeout(() => {
      $(".song.active").scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 300);
  },
  loadCurrentSong: function () {
    heading.textContent = this.currentSong.name;
    cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`;
    audio.src = this.currentSong.path;
    bg_image.src = this.currentSong.image;
  },
  loadConfig: function () {
    this.isRandom = this.config.isRandom;
    this.isRepeat = this.config.isRepeat;
  },
  nextSong: function () {
    this.currentIndex++;
    if (this.currentIndex > this.songs.length) {
      this.currentIndex = 0;
    }
    this.loadCurrentSong();
  },
  prevSong: function () {
    this.currentIndex--;
    if (this.currentIndex <= 0) {
      this.currentIndex = this.songs.length - 1;
    }
    this.loadCurrentSong();
  },
  playRandomSong: function () {
    let newIndex;
    do {
      newIndex = Math.floor(Math.random() * this.songs.length);
    } while (newIndex === this.currentIndex);
    this.currentIndex = newIndex;
    this.loadCurrentSong();
  },
  start: function () {
    this.loadConfig();
    this.defineProperties();
    this.handleEvents();
    this.loadCurrentSong();
    this.render();
    // initialize from localStorage.setItem
    randomBtn.classList.toggle("active", this.isRandom);
    repeatBtn.classList.toggle("active", this.isRepeat);
  },
};
// Run - Output
app.start();
