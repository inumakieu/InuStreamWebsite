<template>
  <div>
    <header class="nav-bar">
      <ul class="left-side-nav">
        <li class="list-item active">Home</li>
        <li class="list-item">Series</li>
        <li class="list-item">My List</li>
      </ul>
      <div class="right-side-nav">
        <div class="search-wrapper">
          <div class="search">
            <svg style="padding-right: 12px;" width="16px" height="16px" xmlns="http://www.w3.org/2000/svg"
                 viewBox="0 0 512 512">
              <path fill="white"
                    d="M500.3 443.7l-119.7-119.7c27.22-40.41 40.65-90.9 33.46-144.7C401.8 87.79 326.8 13.32 235.2 1.723C99.01-15.51-15.51 99.01 1.724 235.2c11.6 91.64 86.08 166.7 177.6 178.9c53.8 7.189 104.3-6.236 144.7-33.46l119.7 119.7c15.62 15.62 40.95 15.62 56.57 0C515.9 484.7 515.9 459.3 500.3 443.7zM79.1 208c0-70.58 57.42-128 128-128s128 57.42 128 128c0 70.58-57.42 128-128 128S79.1 278.6 79.1 208z"/>
            </svg>
            <form @submit.stop.prevent="goToSearch">
              <input type="search" autocomplete="off" placeholder="Search..." ref="search" name="search"
                     id="search-field" v-model="animeName" v-on:input="searchAnime">
            </form>
          </div>
          <div class="searchSuggestions">
            <div ref="search_result" class="search-result" v-on:click="goToInfo(anime.id)"
                 v-for="anime in searchJson" v-bind:key="anime.id">
              <img class="anime-image-nav" :src="anime.image" alt="">
              <div class="result-text-nav">
                <h1 class="result-title-nav">
                  {{ anime.title.userPreferred }}
                </h1>
                <h2 class="result-date-nav">

                  {{ anime.releaseDate }}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <div class="avatar-wrapper">
          <div class="avatar" v-on:click="changeShowDropdown()"></div>
          <div class="dropdown-menu">
            <div class="main-dropdown selected">
              <ul>
                <div class="dropdown-item">
                  <div class="dropdown-left-wrapper">
                    <div class="left-icon" style="background-color: red"></div>
                    <li>LOGIN</li>
                  </div>
                </div>
                <div class="dropdown-item" v-on:click="changeSubmenu('settings')">
                  <div class="dropdown-left-wrapper">
                    <div class="left-icon">
                      <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 512 512">
                        <path fill="white"
                              d="M495.9 166.6C499.2 175.2 496.4 184.9 489.6 191.2L446.3 230.6C447.4 238.9 448 247.4 448 256C448 264.6 447.4 273.1 446.3 281.4L489.6 320.8C496.4 327.1 499.2 336.8 495.9 345.4C491.5 357.3 486.2 368.8 480.2 379.7L475.5 387.8C468.9 398.8 461.5 409.2 453.4 419.1C447.4 426.2 437.7 428.7 428.9 425.9L373.2 408.1C359.8 418.4 344.1 427 329.2 433.6L316.7 490.7C314.7 499.7 307.7 506.1 298.5 508.5C284.7 510.8 270.5 512 255.1 512C241.5 512 227.3 510.8 213.5 508.5C204.3 506.1 197.3 499.7 195.3 490.7L182.8 433.6C167 427 152.2 418.4 138.8 408.1L83.14 425.9C74.3 428.7 64.55 426.2 58.63 419.1C50.52 409.2 43.12 398.8 36.52 387.8L31.84 379.7C25.77 368.8 20.49 357.3 16.06 345.4C12.82 336.8 15.55 327.1 22.41 320.8L65.67 281.4C64.57 273.1 64 264.6 64 256C64 247.4 64.57 238.9 65.67 230.6L22.41 191.2C15.55 184.9 12.82 175.3 16.06 166.6C20.49 154.7 25.78 143.2 31.84 132.3L36.51 124.2C43.12 113.2 50.52 102.8 58.63 92.95C64.55 85.8 74.3 83.32 83.14 86.14L138.8 103.9C152.2 93.56 167 84.96 182.8 78.43L195.3 21.33C197.3 12.25 204.3 5.04 213.5 3.51C227.3 1.201 241.5 0 256 0C270.5 0 284.7 1.201 298.5 3.51C307.7 5.04 314.7 12.25 316.7 21.33L329.2 78.43C344.1 84.96 359.8 93.56 373.2 103.9L428.9 86.14C437.7 83.32 447.4 85.8 453.4 92.95C461.5 102.8 468.9 113.2 475.5 124.2L480.2 132.3C486.2 143.2 491.5 154.7 495.9 166.6V166.6zM256 336C300.2 336 336 300.2 336 255.1C336 211.8 300.2 175.1 256 175.1C211.8 175.1 176 211.8 176 255.1C176 300.2 211.8 336 256 336z"/>
                      </svg>
                    </div>
                    <li>Settings</li>
                  </div>
                  <div class="right-icon">
                    <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg"
                         viewBox="0 0 320 512">
                      <path fill="white"
                            d="M96 480c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L242.8 256L73.38 86.63c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l192 192c12.5 12.5 12.5 32.75 0 45.25l-192 192C112.4 476.9 104.2 480 96 480z"/>
                    </svg>
                  </div>
                </div>
                <div class="dropdown-item">
                  <div class="dropdown-left-wrapper">
                    <div class="left-icon">
                      <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 512 512">
                        <path fill="white"
                              d="M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256s256-114.6 256-256S397.4 0 256 0zM256 128c17.67 0 32 14.33 32 32c0 17.67-14.33 32-32 32S224 177.7 224 160C224 142.3 238.3 128 256 128zM296 384h-80C202.8 384 192 373.3 192 360s10.75-24 24-24h16v-64H224c-13.25 0-24-10.75-24-24S210.8 224 224 224h32c13.25 0 24 10.75 24 24v88h16c13.25 0 24 10.75 24 24S309.3 384 296 384z"/>
                      </svg>
                    </div>
                    <li>About</li>
                  </div>
                </div>
              </ul>
            </div>
            <div class="settings-dropdown">
              <ul>
                <div class="dropdown-item" v-on:click="changeSubmenu('main')">
                  <div class="dropdown-left-wrapper">
                    <div class="left-icon">
                      <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 320 512">
                        <path fill="white"
                              d="M224 480c-8.188 0-16.38-3.125-22.62-9.375l-192-192c-12.5-12.5-12.5-32.75 0-45.25l192-192c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l169.4 169.4c12.5 12.5 12.5 32.75 0 45.25C240.4 476.9 232.2 480 224 480z"/>
                      </svg>
                    </div>
                    <li>Back</li>
                  </div>
                </div>
                <div class="dropdown-item">
                  <div class="dropdown-left-wrapper">
                    <div class="left-icon">
                      <svg width="20px" height="20px" xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 576 512">
                        <path fill="white"
                              d="M384 112v288c0 26.51-21.49 48-48 48h-288c-26.51 0-48-21.49-48-48v-288c0-26.51 21.49-48 48-48h288C362.5 64 384 85.49 384 112zM576 127.5v256.9c0 25.5-29.17 40.39-50.39 25.79L416 334.7V177.3l109.6-75.56C546.9 87.13 576 102.1 576 127.5z"/>
                      </svg>
                    </div>
                    <li>Use 'Netflix' Player</li>

                  </div>
                  <label class="switch">
                    <input type="checkbox" v-model="videoPlayerDesign"
                           v-on:click="changeVideoPlayer(this)">
                    <span class="slider round"></span>
                  </label>
                </div>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    <div>
      <div v-if="featuredJson != null" class="featured-content">
        <div class="clipper">
          <div class="iframe-wrapper" v-if="featuredJson[selectedAnime].trailer.id != null">
            <iframe class="iframe-class"
                    :src="`https://www.youtube.com/embed/${featuredJson[selectedAnime].trailer.id}?autoplay=1&mute=1&loop=1&controls=0&rel=0&playlist=${featuredJson[selectedAnime].trailer.id}`"
                    frameborder="0"></iframe>
          </div>
          <div class="background-cover-wrapper" v-else>
            <img class="background-cover" :src="featuredJson[selectedAnime].cover" alt="">
          </div>
        </div>
        <div class="gradient"></div>
        <div class="featured-details">
          <h3 class="duration">{{ featuredJson[selectedAnime].duration }} min / Episode</h3>
          <h2 class="episode-count">Episodes: <span class="red-text">{{
              featuredJson[selectedAnime].totalEpisodes
            }}</span> - Status: <span class="red-text">{{ featuredJson[selectedAnime].status }}</span>
          </h2>
          <h1 class="title">{{ featuredJson[selectedAnime].title.userPreferred }}</h1>
          <p class="description-home" v-html="featuredJson[selectedAnime].description"></p>
        </div>
        <div class="featured-selector">
          <div class="featured-card" v-for="(featuredAnime, index) in featuredJson" :key="featuredAnime.id">
            <div class="featured-card-wrapper" v-on:click="changeFeaturedAnime(index)">
              <img class="featured-image" :src="featuredAnime.cover" alt="">
            </div>
          </div>
        </div>
      </div>

      <div style="height: 800px;width: 800px;color: red;">{{ slug }}</div>
      <div class="notify">
        <div class="-ad-banner-">
        </div>
      </div>
      <div class="pointer-interceptor">
        <div class="detectPopup">
          <div class="exclamation-wrapper">
            <svg width="57" height="57" viewBox="0 0 57 57" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30.5 15.9828C30.5 14.886 29.6063 14 28.5 14C27.3938 14 26.5 14.886 26.5 15.9828V27.0862C26.5 28.1829 27.3938 29.069 28.5 29.069C29.6063 29.069 30.5 28.1829 30.5 27.0862V15.9828ZM28.5 37C29.8813 37 31 35.8909 31 34.5216C31 33.1522 29.8813 32.0431 28.5 32.0431C27.1188 32.0431 26 33.1522 26 34.5216C26 35.8909 27.1188 37 28.5 37Z" fill="#DE2627"/>
              <path d="M26.7679 3C27.5377 1.66667 29.4623 1.66667 30.2321 3L51.4497 39.75C52.2195 41.0833 51.2572 42.75 49.7176 42.75H7.28238C5.74278 42.75 4.78053 41.0833 5.55033 39.75L26.7679 3Z" stroke="#DE2627" stroke-width="3"/>
            </svg>
          </div>
          <h1 class="popupTitle">Adblock Detected</h1>
          <h2 class="popupDescription">We have detected that you are using an Adblocker. We dont have any ads on this website, but Adblockers block many images used by the website, which results in a worse User Experience.
            <br/>If you want to see all images, please disable your Adblocker.
            <br/>♥ THX ♥</h2>
          <div class="bottom-popup-row">
            <div class="dont-show-again">
              <div class="show-again-checkbox" v-on:click="popupCheckbox()">
                <div class="svg-wrapper">
                  <svg width="8px" height="8px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="white" d="M470.6 105.4c12.5 12.5 12.5 32.8 0 45.3l-256 256c-12.5 12.5-32.8 12.5-45.3 0l-128-128c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L192 338.7 425.4 105.4c12.5-12.5 32.8-12.5 45.3 0z"/></svg>
                </div>
              </div>
              Don’t show this popup again.
            </div>
            <div class="understood-button" v-on:click="hidePopup()">
              Understood
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  transition: {
    name: 'home',
    mode: 'out-in'
  },
  data() {
    return {
      animeName: null,
      searchJson: null,
      magic_flag: false,
      showDropdown: false,
      currentDropdown: 'main',
      videoPlayerDesign: true,
      featuredJson: null,
      selectedAnime: 0,
      hidePopuponEnter: false,
    }
  },
  head() {
    return {
      title: "Inu's Stream",
      meta: [
        {name: 'description', content: 'Stream anime without any ads'}
      ],
    }

  },
  methods: {
    popupCheckbox() {
      this.hidePopuponEnter = !this.hidePopuponEnter;
      document.querySelector('.show-again-checkbox').classList.toggle('active')
      localStorage.setItem('hideBlockerPopup', this.hidePopuponEnter)
    },
    hidePopup() {
      document.querySelector('.pointer-interceptor').classList.remove('active')
    },
    changeFeaturedAnime(i) {
      document.querySelector('.featured-selector').children.item(i).classList.add('selected')
      document.querySelector('.featured-selector').children.item(this.selectedAnime).classList.remove('selected')
      this.selectedAnime = i;
    },
    handleScroll() {
      // Your scroll handling here
      console.log(window.scrollY)
      var nav_bar = document.documentElement.querySelector('.nav-bar');
      if (window.scrollY >= 150) {
        nav_bar.style.backgroundColor = 'black';

      } else {
        nav_bar.style.background = 'linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%)';
        nav_bar.style.backgroundColor = 'transparent';
      }
    },
    async searchAnime() {
      this.searchJson = await fetch('https://api.consumet.org/meta/anilist/' + this.animeName + '?provider=zoro').then(function (response) {
        // The response is a Response instance.
        // You parse the data into a useable format using `.json()`
        return response.json();
      }).then(function (data) {
        // `data` is the parsed version of the JSON returned from the above endpoint.
        //console.log(data)
        var results = data.results
        for (let index = 0; index < data.results.length; index++) {
          if (data.results[index].status === "Not yet aired") {
            results.splice(index, 1)
          }
        }
        //console.log(results)
        return results; // { "userId": 1, "id": 1, "title": "...", "body": "..." }
      });

      console.log(this.searchJson.length)

      if (this.searchJson != null && this.searchJson.length != 0) {
        document.querySelector('.searchSuggestions').classList.add('display')
      } else {
        document.querySelector('.searchSuggestions').classList.remove('display')
      }
    },
    async goToSearch() {
      await navigateTo('/search/' + this.$refs.search.value.toLowerCase().replaceAll(' ', '-'), {replace: false})
    },
    async goToInfo(id) {
      await navigateTo('/info/' + id, {replace: false})
    },
    changeSubmenu(nextSubmenu) {
      this.currentDropdown = nextSubmenu;
      var newHeight = '0px';
      switch (nextSubmenu) {
        case 'main':
          document.querySelector('.settings-dropdown').classList.remove('selected')
          document.querySelector('.main-dropdown').classList.add('selected')
          newHeight = (document.querySelector('.main-dropdown > ul').children.length * 60) + 'px';
          break
        case 'settings':
          document.querySelector('.main-dropdown').classList.remove('selected')
          document.querySelector('.settings-dropdown').classList.add('selected')
          newHeight = (document.querySelector('.settings-dropdown > ul').children.length * 60) + 'px';
          break
      }
      document.querySelector('.dropdown-menu').style.height = newHeight;
    },
    changeVideoPlayer(checkbox) {
      localStorage.setItem('netflixSetting', this.videoPlayerDesign)
      console.log('Checkbox value: ' + this.videoPlayerDesign)
    },
    changeShowDropdown() {
      if (this.showDropdown) {
        document.querySelector('.dropdown-menu').style.height = '0px'
        document.querySelector('.dropdown-menu').classList.remove('opened')
        this.showDropdown = false
      } else {
        document.querySelector('.dropdown-menu').style.height = (document.querySelector('.main-dropdown > ul').children.length * 60) + 'px';
        document.querySelector('.dropdown-menu').classList.add('opened')
        this.showDropdown = true
      }
    }
  },
  async mounted() {
    const password = document.querySelector('input[type="search"]');
    const searchSuggestions = document.querySelector('.searchSuggestions');
    const searchResult = document.querySelector('.search-result');
    const search = document.querySelector('.search');

    password.addEventListener('focus', (event) => {
      if (searchSuggestions) {
        searchSuggestions.style.overflowY = 'scroll';
      }
      //this.searchAnime()
    });

    const avatarWrapper = document.querySelector('.avatar-wrapper');

    document.addEventListener('click', (event) => {
      const isClickInside = avatarWrapper.contains(event.target);
      const isSearchSuggestionInside = searchSuggestions.contains(event.target);

      if (!isClickInside) {
        document.querySelector('.dropdown-menu').style.height = '0px'
        document.querySelector('.dropdown-menu').classList.remove('opened')
        this.showDropdown = false
      }

      if (!isSearchSuggestionInside) {
        console.log('NOT INSIDE')
        searchSuggestions.classList.remove('display')
      }
    })

    this.featuredJson = await fetch('https://api.consumet.org/meta/anilist/trending').then(function (response) {
      // The response is a Response instance.
      // You parse the data into a useable format using `.json()`
      return response.json();
    }).then(function (data) {
      return data.results; // { "userId": 1, "id": 1, "title": "...", "body": "..." }
    });

    let notifier = document.querySelector(".notify");
    if(localStorage.getItem('hideBlockerPopup') == null || localStorage.getItem('hideBlockerPopup') == undefined) {
      localStorage.setItem('hideBlockerPopup', false)
    }
    if (notifier) {
      if (notifier.style.width == "1px" || localStorage.getItem('hideBlockerPopup') == "true") {
        document.querySelector('.pointer-interceptor').classList.remove('active')
      } else if(localStorage.getItem('hideBlockerPopup') == "false"){
          document.querySelector('.pointer-interceptor').classList.add('active')
      }
    }

  },
  beforeMount() {
    window.addEventListener('scroll', this.handleScroll)
  },
  beforeDestroy() {
    window.removeEventListener('scroll', this.handleScroll)
  },
}
</script>

<style scoped>

.pointer-interceptor.active {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  z-index: 300;
  background-color: rgba(0, 0, 0, 0.8);
  opacity: 1;
  pointer-events: all;
  transition: 0.3s all ease;
}

.pointer-interceptor {
  opacity: 0;
  pointer-events: none;
  transition: 0.3s all ease;
}

.detectPopup {
  z-index: 340;
  position: fixed;
  left: calc(50vw - 280px);
  top: 80px;
  background-color: white;
  border-radius: 20px;
  width: 540px;
  height: 300px;
  -webkit-box-shadow: 0px 0px 20px 4px #000000;
  box-shadow: 0px 0px 20px 4px #000000;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}

.exclamation-wrapper {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: fit-content;
  aspect-ratio: 1/1;
  border-radius: 50%;
  background-color: #FFE0E4;
}

.popupTitle {
  font-weight: bold;
  font-size: 20px;
  color: black;
  margin-top: 8px;
}

.popupDescription {
  padding-left: 12px;
  padding-right: 12px;
  font-weight: 400;
  font-size: 15px;
  color: #686868;
  margin-top: 8px;
  text-align: center;
}

.bottom-popup-row {
  display: flex;
  height: 40px;
  width: 490px;
  justify-content: space-between;
  align-items: center;
}

.dont-show-again {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: 600;
  font-size: 10px;
  color: black;
}

.show-again-checkbox {
  background-color: #D9D9D9;
  border: none;
  width: 16px;
  aspect-ratio: 1/1;
  border-radius: 4px;
  margin-right: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.3s all ease;
}

.show-again-checkbox >.svg-wrapper {
  opacity: 0;
  transition: 0.3s all ease;
}

.show-again-checkbox.active > .svg-wrapper {
  opacity: 1;
  transition: 0.3s all ease;
}

.show-again-checkbox.active {
  background-color: #1f212b;
  border: none;
  width: 16px;
  aspect-ratio: 1/1;
  border-radius: 4px;
  margin-right: 8px;
  transition: 0.3s all ease;
}

.understood-button {
  padding: 8px 16px;
  border-radius: 8px;
  background-color: #DE2627;
  color: white;
  font-weight: bold;
  cursor: pointer;
}


.featured-selector {
  z-index: 100;
  display: flex;
  width: 600px;
  height: 320px;
  align-items: center;
  overflow-x: scroll;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  position: absolute;
  bottom: 120px;
  right: 50px;
}

.featured-card.selected {
  scroll-snap-align: start;
  width: 200px;
  height: 280px;
  margin-right: 30px;
  border-radius: 20px;
  transition: 0.4s all ease;
}

.featured-card {
  scroll-snap-align: start;
  position: relative;
  width: 160px;
  height: 220px;
  margin-right: 30px;
  border-radius: 20px;
  transition: 0.4s all ease;
}

.featured-card-wrapper {
  position: static;
  width: 160px;
  height: 220px;
  margin-right: 30px;
  border-radius: 20px;
}

.featured-image {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  object-fit: cover;
  object-position: center;
  overflow: hidden;
}


/* clears the 'X' from Internet Explorer */
input[type=search]::-ms-clear {
  display: none;
  width: 0;
  height: 0;
}

input[type=search]::-ms-reveal {
  display: none;
  width: 0;
  height: 0;
}

/* clears the 'X' from Chrome */
input[type="search"]::-webkit-search-decoration,
input[type="search"]::-webkit-search-cancel-button,
input[type="search"]::-webkit-search-results-button,
input[type="search"]::-webkit-search-results-decoration {
  display: none;
}


* {
  padding: 0;
  margin: 0;
}

html {
  font-family: 'Inter';
  color: white;
}

body {
  background-color: #16151A;
  overflow-x: hidden;
  margin: 0;
  padding: 0;
}

/* width */
::-webkit-scrollbar {
  width: 8px;
}

/* Track */
::-webkit-scrollbar-track {
  background: #1a1a19;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: #707179;
  border-radius: 4px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #707179;
  border-radius: 4px;
}


.nav-bar {
  position: fixed;
  width: 100vw;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0) 100%);
  height: 60px;
  display: flex;
  justify-content: space-between;
  z-index: 100;
  transition: 0.4s all ease;
}

.left-side-nav {
  display: flex;
  height: 60px;
  width: 300px;
  justify-content: space-between;
  padding-left: 120px;
  align-items: center;
  list-style: none;
}

.list-item {
  font-weight: normal;
  opacity: 0.7;
}

.list-item.active {
  font-weight: bold;
  opacity: 1;
}

.right-side-nav {
  width: 500px;
  padding-right: 120px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}

.search-result {
  display: flex;
  padding: 20px;
}


.result-data-nav {
  display: flex;
  flex-direction: row;
  margin-bottom: 30px;
  align-items: center;
}

.anime-image-nav {
  width: 60px;
  height: 90px;
  border-radius: 6px;
  margin-right: 12px;
  cursor: pointer;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.result-text-nav {
  display: flex;
  flex-direction: column;
}

.result-title-nav {
  font-size: 14px;
  cursor: pointer;
  margin-top: 10px;
  margin-bottom: 6px;
}

.result-date-nav {
  color: #999999;
  font-size: 12px;
}

/* The switch - the box around the slider */
.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-right: 20px;
}

/* Hide default HTML checkbox */
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

/* The slider */
.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 20px;
  width: 20px;
  left: 4px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
}

input:checked + .slider {
  background-color: #1c0d58;
}

input:focus + .slider {
  box-shadow: 0 0 1px #1c0d58;
}

input:checked + .slider:before {
  -webkit-transform: translateX(23px);
  -ms-transform: translateX(23px);
  transform: translateX(23px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}

.avatar-wrapper {
  width: 50px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.dropdown-menu {
  position: absolute;
  display: flex;
  width: 320px;
  height: 0px;
  min-width: 320px;
  transform: translate(-60%, 20px);
  transition: 0.4s all ease;
  overflow: hidden;
}

.dropdown-menu.opened {
  display: flex;
  width: 320px;
  min-width: 320px;
  height: auto;
  border-radius: 14px;
  background-color: black;
  position: absolute;
  transform: translate(-60%, 30px);
  transition: 0.4s all ease;
  overflow: hidden;
}

.main-dropdown.selected {
  width: 320px;
  min-width: 320px;
  transform: translateX(0%);
  transition: 0.4s all ease;
}

.main-dropdown {
  width: 320px;
  transform: translateX(-100%);
  transition: 0.4s all ease;
}

.settings-dropdown {
  width: 320px;
  min-width: 320px;
  transform: translateX(0%);
  transition: 0.4s all ease;
}

.settings-dropdown.selected {
  width: 320px;
  min-width: 320px;
  transform: translateX(-68%);
  transition: 0.4s all ease;
}

.left-icon {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: rgb(66, 66, 66);
  margin: 0px 20px;
}

.right-icon {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin: 0px 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: transparent;
  border-radius: 14px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s all ease;
}

ul {
  list-style: none;
}

.dropdown-item:hover {
  background-color: #0c0b11;
}

.dropdown-left-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}


.search {
  height: 40px;
  padding: 0 20px;
  border-radius: 20px;
  background-color: #16151A;
  display: flex;
  align-items: center;
  justify-content: center;
}

#search-field {
  width: 80px;
  color: white;
  background-color: transparent;
  height: 40px;
  outline: none;
  border: none;
  transition: 0.3s all ease;
}

#search-field:focus {
  width: 200px;
}

.search-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}


.searchSuggestions {
  width: 320px;
  height: 0px;
}

.searchSuggestions.display {
  height: 180px;
  width: 300px;
  top: 54px;
  border-radius: 12px;
  position: absolute;
  background-color: #16151A;
  overflow-y: scroll;
  transition: 0.3s all ease;
}

.avatar {
  position: absolute;
  width: 40px;
  margin-left: 20px;
  top: 10px;
  aspect-ratio: 1;
  border-radius: 20px;
  background-color: red;
}

.featured-content {
  place-items: center;
  width: calc(100vw - 8px);
  height: 700px;
  overflow: hidden;
}

.clipper {
  position: absolute;
  width: calc(100vw - 8px);
  height: 700px;
  overflow: hidden;
}

.iframe-wrapper {
  width: calc(100vw - 8px);
  aspect-ratio: 16/9;
  overflow: hidden;
}

.iframe-class {
  width: 300%;
  height: 100%;
  margin-left: -100%;
}

.background-cover-wrapper {
  width: calc(100vw - 8px);
  aspect-ratio: 16/9;
  overflow: hidden;
}

.background-cover {
  width: calc(100vw - 8px);
  aspect-ratio: 16/9;
  -webkit-filter: blur(5px);
  -moz-filter: blur(5px);
  -o-filter: blur(5px);
  -ms-filter: blur(5px);
  filter: blur(5px);
  object-fit: cover;
  object-position: center;
}

.gradient {
  width: calc(100vw - 8px);
  height: 700px;
  position: absolute;
  background: linear-gradient(180deg, rgba(22, 21, 26, 0) 0%, rgba(22, 21, 26, 0.9) 72.92%, #16151A 100%);
}

.featured-details {
  width: 600px;
  height: 700px;
  position: absolute;
  padding-left: 120px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

h3 {
  font-size: 16px;
  font-weight: normal;
  padding-bottom: 8px;
}

h2 {
  font-size: 20px;
  font-weight: 400;
  padding-bottom: 8px;
}

.title {
  font-size: 52px;
  padding-bottom: 20px;
  width: 800px;
}

.description-home {
  font-size: 16px;
  font-weight: 600;
  width: 40vw;
}

.red-text {
  color: #DC1623;
  font-weight: bold;
}
</style>