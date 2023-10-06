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
import {
  getUserNameAndIdByActivityId,
  adminAddNoticifaction,
} from '@/$http/apis/authrization';
import { reactive } from 'vue';
import { AddNoticifaction } from '../../typing/common';
import type { MessageOptions } from 'element-plus';
import { ElMessage } from 'element-plus';
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
    selectAll: notificationStore.selectAllUser,
  });
  userInformations.value = res.data;
  // 如果选择了全选，那么将结果放在localStore里面，表示选中
  console.log('ee');
  if (notificationStore.selectAllUser === true) {
    console.log('ere');
    notificationStore.userIds = userInformations.value.map(
      (user) => user.userId
    );
  }
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
  //校验数据--------
  const validateNtf = await validateNotification();
  if (validateNtf === false) {
    console.log('1232');
    return;
  }
  const res = await adminAddNoticifaction(userNotification);
  if (res.success === true) {
    // 成功创建
    // 提示成功
    warnMessageDetail.value.type = 'success';
    warnMessageDetail.value.message = res.msg;
    ElMessage(warnMessageDetail.value);
    // 关闭弹窗
    notificationStore.visiable = false;
  }
  console.log(userNotification);
};
const validateNotification = async () => {
  if (userNotification.userIds.length === 0) {
    warnMessageDetail.value.type = 'error';
    warnMessageDetail.value.message = '通知的用户不能为空';
    ElMessage(warnMessageDetail.value);
    return false;
  }
  if (userNotification.detail === '') {
    warnMessageDetail.value.type = 'error';
    warnMessageDetail.value.message = '通知的内容不能为空';
    ElMessage(warnMessageDetail.value);
    return false;
  }
  if (userNotification.title === '') {
    warnMessageDetail.value.type = 'error';
    warnMessageDetail.value.message = '通知的标题不能为空';
    ElMessage(warnMessageDetail.value);
    return false;
  }
  return true;
};
//--------消息提示开始
const warnMessageDetail = ref<MessageOptions>({});
//--------消息提示结束
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
