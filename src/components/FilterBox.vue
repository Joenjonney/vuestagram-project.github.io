<template>
  <div @click = "fire" :class = "filter" class = "filter-item" :style = "`background-image : url(${image})`">
    <slot :msg = "msg"></slot>
  </div> 
</template>

<script>
export default {
  name : 'filterbox',
  methods : {
    fire () {
      this.emitter.emit('박스클릭함' , this.filter)
    }
  },
  data () {
    return {msg : 'hello'
    }
  },
  props : {
    image : String,
    filter : String,
  }
}
</script>

<style>

.filter-item {
  width: 100px;
  height: 100px;
  margin: 10px 10px 10px auto;
  padding: 8px;
  display: inline-block;
  color : white;
  background-size: cover;
  background-position : center;
}
</style>