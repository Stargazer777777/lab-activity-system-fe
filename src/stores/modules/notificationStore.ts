import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useNotificationStore = defineStore('notification-store', () => {
  const visiable = ref<boolean>(false);
  const userIds = ref<string[]>([]);
  const activityId = ref<string>('-1');
  const openNotificationWithActivity = (
    sendActivityId: string,
    sendUserIds: string[]
  ) => {
    activityId.value = sendActivityId;
    userIds.value = sendUserIds;
    visiable.value = true;
  };
  const openNotification = (sendUserIds: string[]) => {
    userIds.value = sendUserIds;
    visiable.value = true;
  };
  const closeNotification = () => {
    visiable.value = false;
  };
  return {
    visiable,
    userIds,
    activityId,
    openNotification,
    openNotificationWithActivity,
    closeNotification,
  };
});
