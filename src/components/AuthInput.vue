<template>
  <input
    class="input"
    :value="value"
    :placeholder="placeholder"
    @input="handleInput"
    :class="{
      success:status==='success',
      error:status==='error'
  }"
    @change="handlechange"
  />
</template>

<script>
export default {
  data() {
    return {
      status: ""
    };
  },
  props: ["placeholder", "rule", "name", "errormessage", "value"],
  methods: {
    handleInput(event) {
      var value = event.target.value;
      this.$emit("input", value);

      if (this.rule.test(value)) {
        this.status = "success";
      } else {
        this.status = "error";
      }
    },
    handlechange() {
      if (this.status === "error") {
        if (this.errormessage) {
          this.$toast.fail(this.errormessage);
        }
      }
    }
  }
};
</script>

<style scoped lang='less'>
.input {
  width: 100%;
  height: 26/360 * 100vw;
  background: #fff;
  border: none;
  border: 2px #666 solid;
  margin-top: 30px;
}
.success {
  border: 2px solid green;
}
.error {
  border: 2px solid red;
}
</style>