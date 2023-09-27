<template>
  <el-dialog
    title=""
    v-model="notificationStore.visiable"
    width="30%"
    @open="getUserIdsByActivityId"
  >
    <el-form label-width="80px" label-position="top" :inline="false">
      <el-form-item label="要发送用户的列表">
        <el-select
          class="user-select"
          v-model="notificationStore.userIds"
          multiple
          placeholder="请选择"
          style="width: 240px"
        >
          <el-option
            v-for="item in userInformations"
            :key="item.userId"
            :label="item.nameAndStuNo"
            :value="item.userId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="userNotification.title" />
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="userNotification.detail" :rows="2" type="textarea" />
      </el-form-item>
      <el-form-item label="通知时间">
        <el-date-picker
          v-model="date"
          :default-time="new Date()"
          type="datetime"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span>
        <el-button @click="notificationStore.visiable = false">取消</el-button>
        <el-button @click="addNotifucation" type="primary">创建</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useNotificationStore } from '@/stores/modules/notificationStore';
import { ref } from 'vue';
import { getUserNameAndIdByActivityId } from '@/$http/apis/authrization';
import { reactive } from 'vue';
import { AddNoticifaction } from '../../typing/common';
import { watch } from 'vue';
const notificationStore = useNotificationStore();

interface userBaseInfo {
  userId: string;
  nameAndStuNo: string;
}
// 获取用户列表
const userInformations = ref<userBaseInfo[]>([]);
const getUserIdsByActivityId = async () => {
  const res = await getUserNameAndIdByActivityId({
    activityId: notificationStore.activityId,
  });
  userInformations.value = res.data;
  console.log(userInformations.value);
};
// 添加通知的数据载体
const userNotification = reactive<AddNoticifaction>({
  userIds: [''],
  title: '',
  detail: '',
  sendTime: 0,
  activityId: '-1',
});
//点击确认添加通知的时候调用该方法
const addNotifucation = async () => {
  userNotification.userIds = notificationStore.userIds; //store里面的用户id就代表需要发送的用户列表，传给后端
  userNotification.activityId = notificationStore.activityId; //store里面的活动id，传给后端
  console.log(userNotification);
};
// 时间类型处理
const date = ref(new Date());
watch(
  () => date.value,
  (newVal) => {
    userNotification.sendTime = newVal.getTime();
  },
  {
    immediate: true,
  }
);
</script>
<style lang="scss" scoped>
.user-select {
  :deep(.el-select__tags) {
    align-items: flex-start;
    overflow: auto;
    height: 200px;
  }
}
</style>
