import { render } from "@testing-library/vue"
import Button from "./Button.vue"

test("render Button", () => {
  const { debug } = render(Button)
  debug()
})
