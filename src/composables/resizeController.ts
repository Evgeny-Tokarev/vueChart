import { onMounted, onUnmounted, ref } from "vue"

export function getWidth(timeout = 100) {
  const width = ref(0)
  onMounted(() => {
    width.value = document.documentElement.clientWidth
    window.addEventListener("resize", checkWidth, { passive: true })
  })
  let widthTimeOut: ReturnType<typeof setTimeout>

  function checkWidth() {
    if (widthTimeOut) clearTimeout(widthTimeOut)
    widthTimeOut = setTimeout(() => {
      width.value = document.documentElement.clientWidth
    }, timeout)
  }

  onUnmounted(() => {
    window.removeEventListener("resize", checkWidth)
  })
  return width
}
