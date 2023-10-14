import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notification-store', () => {
  const visiable = ref<boolean>(false);
  const userIds = ref<string[]>([]);
  const activityId = ref<string>('-1');
  const selectAllUser = ref<boolean>(false);
  const open = (
    sendUserIds: string[],
    selectAll: boolean,
    sendActivityId?: string
  ) => {
    activityId.value = sendActivityId === undefined ? '-1' : sendActivityId;
    userIds.value = sendUserIds;
    visiable.value = true;
    selectAllUser.value = selectAll;
  };
  const closeNotification = () => {
    visiable.value = false;
    userIds.value = [];
    activityId.value = '-1';
    selectAllUser.value = false;
  };
  return {
    visiable,
    userIds,
    activityId,
    selectAllUser,
    open,
    closeNotification,
  };
});
