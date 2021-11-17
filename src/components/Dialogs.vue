<template>
  <div class="dialogs">
    <div class="card">
      <div class="content">是否要刪除此{{ type }}?</div>
      <div class="btn_area">
        <button class="btn mr-4" @click="$emit('result', false)">取消</button>
        <button
          class="btn bg-j-blue-200 text-white"
          @click="$emit('result', true)"
        >
          確定
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["type"],
  emits: ["result"],
};
</script>

<style scoped>
.dialogs {
  @apply fixed top-0 left-0 z-50 w-screen h-screen flex justify-center items-center bg-black bg-opacity-75;
}
.card {
  @apply text-lg w-72 h-36 bg-white rounded-2xl flex flex-col justify-center items-center;
}
.content {
  @apply font-bold;
}
.btn_area {
  @apply flex mt-4;
}
.btn {
  @apply border rounded-full py-1 px-4;
}

@screen lg {
  .card {
    @apply w-96 h-48;
  }
}
</style>
