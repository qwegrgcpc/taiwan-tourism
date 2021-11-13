<template>
  <div>
    <div class="schedule">
      <input class="schedule_name" type="text" />
      <ul class="flex border-b">
        <li>DAY</li>
        <li class="-mb-px mr-1">
          <button
            class="
              bg-white
              inline-block
              border-l border-t border-r
              rounded-t
              py-2
              px-4
              text-blue-700
              font-semibold
            "
            href="#"
          >
            Active
          </button>
        </li>
        <li class="mr-1">
          <button
            class="
              bg-white
              inline-block
              py-2
              px-4
              text-blue-500
              hover:text-blue-800
              font-semibold
            "
            href="#"
          >
            Tab
          </button>
        </li>
        <li class="mr-1">
          <button
            class="
              bg-white
              inline-block
              py-2
              px-4
              text-blue-500
              hover:text-blue-800
              font-semibold
            "
            href="#"
          >
            Tab
          </button>
        </li>
        <li class="mr-1">
          <button
            class="bg-white inline-block py-2 px-4 text-gray-400 font-semibold"
            href="#"
          >
            Tab
          </button>
        </li>
      </ul>
    </div>
    <div class="favorite_area"></div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.schedule {
  @apply bg-j-black-25;
}
</style>
