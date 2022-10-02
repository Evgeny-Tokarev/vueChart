import { Directive } from "vue"

export const vClickOutside = <Directive<HTMLElement, () => void>>{
  mounted(el, cb) {
    window.addEventListener("click", (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement
      if (!el.contains(target) && el !== target) cb.value()
      return target
    })
  }
}
