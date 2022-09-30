import { defineStore, type _DeepPartial } from "pinia"
import requestVk from "@/helpers/vkRequests"

interface Group {
  [key: string]: any
}
export const useStore = defineStore({
  id: "groupInfo",
  state: () => {
    return {
      currentTab: "/",
      hasGroup: false,
      hasFailed: false,
      name: "",
      password: "",
      group: {} as Group,
      warningMessage: ""
    }
  },
  getters: {
    getSubscribersCount: (state) => state.group.members_count,
    getGroupName: (state) => state.group.name || null,
    getGroupAvatar: (state) => state.group.photo_200,
    getGroupIsClosed: (state) => state.group.is_closed,
    getGroupDescription: (state) => state.group.description,
    getGroupUrl: (state) => `https://vk.com/${state.group.screen_name}`
  },
  actions: {
    updateGroup() {
      requestVk(this.name, this.password).then((groups) => {
        if (groups && groups.response) {
          this.$patch({
            group: groups.response[0]
          })
        }
      })
    },
    setGroup(groupID: string, groupPassword: string) {
      let tries = 1
      return new Promise((res) => {
        let interval = window.setInterval(() => {
          requestVk(groupID, groupPassword).then((groups) => {
            if (groups && groups.response) {
              this.$reset()
              this.$patch({
                hasGroup: true,
                name: groupID,
                password: groupPassword,
                group: groups.response[0],
                warningMessage: groups.response[0].hasOwnProperty("deactivated")
                  ? "warningMessage"
                  : "",
                currentTab: "subscribers"
              })
              window.clearInterval(interval)
              res(true)
            } else {
              tries++
              if (tries >= 5) {
                if (!this.hasGroup) this.$reset()
                window.clearInterval(interval)
                this.hasFailed = true
                setTimeout(() => {
                  this.hasFailed = false
                }, 3000)
              }
              res(false)
            }
          })
        }, 1000)
      })
    }
  }
})
