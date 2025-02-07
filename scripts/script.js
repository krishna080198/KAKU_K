new Vue({
  el: "#app",
  data() {
    return {
      audio: null,
      circleLeft: null,
      barWidth: null,
      duration: null,
      currentTime: null,
      isTimerPlaying: false,
      tracks: [
        {
          name: "Rahgira Mila Kabira Se ",
          artist: "Rahgir",
          cover: "https://png.pngtree.com/thumb_back/fw800/background/20231229/pngtree-wall-texture-effect-with-gold-grunge-image_15562110.jpg",
          source: "mp3/Rahgira Mila Kabira Se Rahgir New Song.mp3",
          url: "https://youtu.be/T1pTqbjAVQg?si=huvoCs7omOWnmTmA",
          favorited: false
        },
        {
          name: "Dil Jhoom ",
          artist: "Arjit Singh",
          cover: "https://i.pinimg.com/736x/a1/de/ea/a1deea0e1658c7fce5e34b4959c6734c.jpg",
          source: "mp3/dil jhoom.mp3",
          url: "https://youtu.be/HogFvhtY0Zc?si=VUl0QX4FNmzmdJJm",
          favorited: false
        },
        
        {
          name: "Devine",
          artist: "Krishna hazar",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/1.jpg",
          source: "mp3/Devine.mp3",
          url: "https://youtu.be/K6MhtQ1uREs?si=e3UtImtl4VuZjuUX",
          favorited: false
        },
        {
          name: "Chor",
          artist: "Justh",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/9.jpg",
          source: "mp3/Justh.mp3",
          url: "https://youtu.be/Gg48H-lrZHo?si=vkJJEXhmWQxNQbzu",
          favorited: false
        },
        {
          name: "A Playlist to Relax",
          artist: "Unknown",
          cover: "https://img.freepik.com/premium-photo/abstract-watercolor-background_196038-13158.jpg",
          source: "mp3/clam.mp3",
          url: "https://youtu.be/borBJreBaWY?si=mqp8xExFfB3iSd3R",
          favorited: true
        },
        {
          name: "Ek Pyar Ka Nagma Sanam",
          artist: "Sanam",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/2.jpg",
          source: "mp3/Ek Pyar Ka Nagma Sanam.mp3",
          url: "https://youtu.be/eVv8rcMEMuM?si=Lv5-86M6HhUXHB1I",
          favorited: false
        },
        {
          name: "Main Rahoon Ya Na Rahoon ",
          artist: "Nidhi Hegde",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/3.jpg",
          source: "mp3/main rahu ya na rahu.mp3",
          url: "https://youtu.be/Ld6geQ2K1VQ?si=C1ZuJjPs32AoKVCT",
          favorited: false
        },
        {
          name: "Rehbara",
          artist: "Vilen",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/4.jpg",
          source: "mp3/Rehbara.mp3",
          url: "https://youtu.be/ihM35SsV1U4?si=VkEBT-GPypRDrVCI",
          favorited: false
        },
        {
          name: "PHIR KABHI",
          artist: "Arijit Singh",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/5.jpg",
          source: "mp3/Phir kabhi.mp3",
          url: "https://youtu.be/qVHaXD7zHDQ?si=Lx33e7BKlQP0WPQg",
          favorited: true
        },
        {
          name: "Bawariya",
          artist: "Vilen",
          cover: "https://c.saavncdn.com/915/Bawariya-Hindi-2023-20231119053151-500x500.jpg",
          source: "mp3/Bawariya.mp3",
          url: "https://youtu.be/KpGPPoDHi-Q?si=-VJDCND9aRJcX-sa",
          favorited: false
        },
        {
          name: "Tu Hain Tho",
          artist: " Bunny & Sagar",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/7.jpg",
          source: "mp3/Tu Hain Toh.mp3",
          url: " Bunny & Sagar",
          favorited: false
        },
        {
          name: "Chitta ",
          artist: "Manan Bhardwaj ",
          cover: "https://raw.githubusercontent.com/muhammederdem/mini-player/master/img/8.jpg",
          source: "mp3/Chitta.mp3",
          url: "https://youtu.be/CJq1hGSO89A?si=SUGWPfzBd8REf4uy",
          favorited: false
        },
      ],
      currentTrack: null,
      currentTrackIndex: 0,
      transitionName: null
    };
  },
  methods: {
    play() {
      if (this.audio.paused) {
        this.audio.play();
        this.isTimerPlaying = true;
      } else {
        this.audio.pause();
        this.isTimerPlaying = false;
      }
    },
    generateTime() {
      let width = (100 / this.audio.duration) * this.audio.currentTime;
      this.barWidth = width + "%";
      this.circleLeft = width + "%";
      let durmin = Math.floor(this.audio.duration / 60);
      let dursec = Math.floor(this.audio.duration - durmin * 60);
      let curmin = Math.floor(this.audio.currentTime / 60);
      let cursec = Math.floor(this.audio.currentTime - curmin * 60);
      if (durmin < 10) {
        durmin = "0" + durmin;
      }
      if (dursec < 10) {
        dursec = "0" + dursec;
      }
      if (curmin < 10) {
        curmin = "0" + curmin;
      }
      if (cursec < 10) {
        cursec = "0" + cursec;
      }
      this.duration = durmin + ":" + dursec;
      this.currentTime = curmin + ":" + cursec;
    },
    updateBar(x) {
      let progress = this.$refs.progress;
      let maxduration = this.audio.duration;
      let position = x - progress.offsetLeft;
      let percentage = (100 * position) / progress.offsetWidth;
      if (percentage > 100) {
        percentage = 100;
      }
      if (percentage < 0) {
        percentage = 0;
      }
      this.barWidth = percentage + "%";
      this.circleLeft = percentage + "%";
      this.audio.currentTime = (maxduration * percentage) / 100;
      this.audio.play();
    },
    clickProgress(e) {
      this.isTimerPlaying = true;
      this.audio.pause();
      this.updateBar(e.pageX);
    },
    prevTrack() {
      this.transitionName = "scale-in";
      this.isShowCover = false;
      if (this.currentTrackIndex > 0) {
        this.currentTrackIndex--;
      } else {
        this.currentTrackIndex = this.tracks.length - 1;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    nextTrack() {
      this.transitionName = "scale-out";
      this.isShowCover = false;
      if (this.currentTrackIndex < this.tracks.length - 1) {
        this.currentTrackIndex++;
      } else {
        this.currentTrackIndex = 0;
      }
      this.currentTrack = this.tracks[this.currentTrackIndex];
      this.resetPlayer();
    },
    resetPlayer() {
      this.barWidth = 0;
      this.circleLeft = 0;
      this.audio.currentTime = 0;
      this.audio.src = this.currentTrack.source;
      setTimeout(() => {
        if(this.isTimerPlaying) {
          this.audio.play();
        } else {
          this.audio.pause();
        }
      }, 300);
    },
    favorite() {
      this.tracks[this.currentTrackIndex].favorited = !this.tracks[
        this.currentTrackIndex
      ].favorited;
    }
  },
  created() {
    let vm = this;
    this.currentTrack = this.tracks[0];
    this.audio = new Audio();
    this.audio.src = this.currentTrack.source;
    this.audio.ontimeupdate = function() {
      vm.generateTime();
    };
    this.audio.onloadedmetadata = function() {
      vm.generateTime();
    };
    this.audio.onended = function() {
      vm.nextTrack();
      this.isTimerPlaying = true;
    };

    // this is optional (for preload covers)
    for (let index = 0; index < this.tracks.length; index++) {
      const element = this.tracks[index];
      let link = document.createElement('link');
      link.rel = "prefetch";
      link.href = element.cover;
      link.as = "image"
      document.head.appendChild(link)
    }
  }
});
const slider = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0]);
  e.target.matches('.prev') && slider.append(items[items.ngth -1]);
}
document.addEventListener('click',activate,false);
const io = document.querySelector('.slider');

function activate(e) {
  const items = document.querySelectorAll('.item');
  e.target.matches('.next') && slider.append(items[0]);
  e.target.matches('.prev') && slider.append(items[items.ngth -1]);
}
document.addEventListener('click',activate,false);
document.addEventListener('DOMContentLoaded', () => {
  const toggleButton = document.querySelector('.theme-toggle');
  const body = document.body;

  toggleButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
  });
});