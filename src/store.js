import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state () {
    return {
      name : 'kim',
      age : 20,
      likes : 30,
      fristlikey : false,
      more : {},
    }
  },

  mutations : {

    setMore(state, data) {
      state.more = data
    },

    ChangedName(state) {
        state.name = 'park'
    },
    increase(state, payload) {
        state.age += payload
    },
    likey(state) {
      if (state.fristlikey == false) {
        state.likes++;
        state.fristlikey = true;
      } else {
        state.likes--;
        state.fristlikey = false;
      }
    }
  },
  actions : {
    getData (context) {
      axios.get(`https://codingapple1.github.io/vue/more0.json`)
      .then((a) => {
      context.commit('setMore', a.data)
      })
    },
  },
})

export default store;