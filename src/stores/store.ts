import { defineStore } from "pinia";
import makeRequest from "@/components/vkRequests";

interface State {
  [key: string]: any;
}
export const useStore = defineStore({
  id: "groupInfo",
  state: () => {
    return {
      group: {} as State,
    };
  },
  getters: {
    getSubscribersCount: (state) => state.group.members_count,
    getGroupName: (state) => state.group.name,
    getGroupAvatar: (state) => state.group.photo_200,
    getGroupIsClosed: (state) => state.group.is_closed,
    getGroupDescription: (state) => state.group.description,
    getGroupUrl: (state) => `https://vk.com/${state.group.screen_name}`,
  },
  actions: {
    setGroup(groupID: string) {
      let tries = 1;
      let interval = window.setInterval(() => {
        console.log(`${tries}-s try`);
        makeRequest(groupID).then((groups) => {
          if (groups && groups.response) {
            this.$patch({
              group: groups.response[0],
            });
            window.clearInterval(interval);
          } else {
            tries++;
            if (tries > 10) {
              window.clearInterval(interval);
            }
          }
        });
      }, 1000);
    },
  },
});
