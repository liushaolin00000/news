<template>
  <button class="button" text='text' @click= 'handleclick'>{{text}}</button>
</template>

<script>
export default {
  props: ["text"],
  methods: {
      handleclick(event){
          this.$emit('click',event)
      }
  }
};
</script>

<style scoped lang='less'>
.button {
  margin-top: 50px;
  width: 100%;
  height: 48/360 * 100vw;
  border-radius: 50px;
  background: #d81e06;
  font-size: 18/360 * 100vw;
  color: #fff;
}
</style>