<template>
  <div class="header">
    <ul class="header-button-left">
      <li @click = "goBack">Cancel</li>
    </ul>
    <ul class="header-button-right">
      <li v-if="step == 0" @click="writeAndUpload">Write</li>
      <li v-if = "step == 1" @click = "step++" >Next</li>
      <li v-if = "step == 2" @click = "publish" >Upload</li>
    </ul>
    <img src="./assets/logo.svg" class="logo" />
  </div>

  <Container 
    :instadata="instadata" 
    :step="step" 
    :image="image" 
    @write="comments = $event" 
  />
  
  <!-- <div class="mypage-btn-container">
    <button @click="goToMyPage" class="mypage-btn">MyPage</button>
  </div> -->

  <div class="footer" v-if = "step == 0">
    <ul class="footer-button-plus">
      <input @change = "upload" accept = "image/*" type="file" id="file" class="inputfile" />
      <label class="input-plus" @click = "more">+</label>
    </ul>
    <div class="bottom">
      <ul class="Bottom-button-right">
    <li v-if="step == 0" @click="goToMyPage">MyPage</li>
    </ul>
    </div>
  </div>

</template>

<script>
import Container from './components/Container.vue';
import Postdata from './assets/Postdata.js';
import axios from 'axios';

export default {
  name: "App",
  data () {
    return {
      step : 0,
      instadata : Postdata,
      더보기 : 0,
      image : '',
      comments : "",
      선택한필터 : '',
    }
  },
  mounted() {
    this.emitter.on ('박스클릭함', (a)=>{
      this.선택한필터 = a
    })
  },
  components: {
    Container : Container,
  },
  methods : {
    publish() {
      var my_post = {
        name: "John Doe",
        userImage: "https://picsum.photos/100?random=4",
        postImage: this.image,
        likes: 20,
        date: "Apr 20",
        liked: false,
        content: this.comments,
        filter: this.선택한필터
      };
      this.instadata.unshift(my_post);
      this.step = 0;
    },
    more () {
      axios.get(`https://codingapple1.github.io/vue/more${this.더보기}.json`)
      .then( result => {
        this.instadata.push(result.data);
        this.더보기++;
      })
    },
    upload(e) {
      let 파일 = e.target.files;
      if (파일.length > 0) {
        let url = URL.createObjectURL(파일[0]);
        this.image = url;
        this.step++;
      }
    },
    writeAndUpload() {
      document.getElementById('file').click();
    },
    goBack() {
    if (this.step === 3) {
      this.step = 0; 
      this.image = ''; 
      this.comments = '';
    }
    else if (this.step > 0) {
      this.step--;
    }
  },
    goToMyPage() {
    this.step = 3;
  }
  }
};
</script>

<style>

body {
  margin: 0;
}
ul {
  padding: 5px;
  list-style-type: none;
}
.logo {
  width: 22px;
  margin: auto;
  display: block;
  position: absolute;
  left: 0;
  right: 0;
  top: 13px;
}
.header {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}
.header-button-left {
  color: skyblue;
  float: left;
  width: 50px;
  padding-left: 20px;
  cursor: pointer;
  margin-top: 10px;
}
.header-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.footer {
  width: 100%;
  position: sticky;
  bottom: 0;
  padding-bottom: 10px;
  background-color: white;
}
.footer-button-plus {
  width: 80px;
  margin: auto;
  text-align: center;
  cursor: pointer;
  font-size: 24px;
  padding-top: 12px;
}

.bottom {
  width: 100%;
  height: 40px;
  background-color: white;
  padding-bottom: 8px;
  position: sticky;
  top: 0;
}

.Bottom-button-right {
  color: skyblue;
  float: right;
  width: 50px;
  cursor: pointer;
  margin-top: 10px;
}
.sample-box {
  width: 100%;
  height: 600px;
  background-color: bisque;
}
.inputfile {
  display: none;
}
.input-plus {
  cursor: pointer;
}
#app {
  box-sizing: border-box;
  font-family: "consolas";
  margin-top: 60px;
  width: 100%;
  max-width: 460px;
  margin: auto;
  position: relative;
  border-right: 1px solid #eee;
  border-left: 1px solid #eee;
}

.mypage-btn-container {
  position: fixed;
  right: 20px;
  bottom: 20px;
}

.mypage-btn {
  width: 80px;
  height: 40px;
  border: none;
  border-radius: 5px;
  background-color: skyblue;
  color: white;
  font-weight: bold;
  cursor: pointer;
}
</style>
