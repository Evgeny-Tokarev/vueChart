import { screen, render } from "@testing-library/vue"
//@ts-ignore
import Button from "./Button.vue"

test("render Button", () => {
  const options = {
    slots: {
      default: "Test button"
    }
  }
  const { debug } = render(Button, options)
  debug()
  screen.getByText(/Test/)
})
