import { screen, render, fireEvent } from "@testing-library/vue"
// import "@testing-library/jest-dom"
//@ts-ignore
import LocaleSwitcher from "./LocaleSwitcher.vue"
import { createI18n } from "vue-i18n"
import messages from "../../locales/locale"

const i18n = createI18n({
  allowComposition: true,
  locale: "en",
  messages
})

test("render LocaleSwitcher", async () => {
  const options = {
    global: {
      plugins: [i18n]
    }
  }
  const { debug } = render(LocaleSwitcher, options)
  const input = (await screen.findByLabelText(
    "Locale switch"
  )) as HTMLInputElement
  debug()
  screen
  await fireEvent.click(input)
  expect(input.checked).toBe(false)
  expect(i18n.global.locale).toBe("ru")
  console.log(i18n.global.locale)
})
