<template>
  <div v-loading="submitLoading">
    <!-- 加载动画 -->
    <el-row :gutter="20">
      <el-col :span="12" :offset="0">
        <el-form
          :model="formData"
          ref="formRef"
          :rules="slideRule"
          label-width="200px"
          :inline="false"
          size="default"
        >
          <!-- 轮播图地址 -->
          <el-upload
            ref="upload"
            :auto-upload="false"
            @change="toavatar"
            :show-file-list="false"
          >
            <template #trigger>
              <div
                style="
                  border: 1px dashed #000;
                  height: 250px;
                  width: 600px;
                  background-color: whitesmoke;
                  /* line-height: 60px; */
                  margin-top: 100px;
                "
              >
                <span
                  v-if="showPlus"
                  style="position: absolute; bottom: 110px; left: 230px"
                  >+ <br />
                  请上传轮播图</span
                >
                <img
                  v-else:
                  :src="avatarUrl"
                  alt="上传的图片"
                  style="width: 600px; height: 250px"
                />
              </div>
            </template>
          </el-upload>
          <!-- 轮播图次序 -->
          <el-form-item label="轮播图次序" prop="slideIndex">
            <el-input v-model="formData.slideIndex"></el-input>
          </el-form-item>
          <!-- 轮播图跳转地址 -->
          <el-form-item label="轮播图跳转地址" prop="targetUrl">
            <el-input v-model="formData.targetUrl"></el-input>
          </el-form-item>
          <el-form-item>
            <!-- 按钮组 -->
            <div
              style="width: 100%; display: flex; justify-content: flex-start"
            >
              <el-button
                type="primary"
                size="default"
                @click="submit"
                style="margin-right: 10px"
                >提交
              </el-button>
              <el-button
                type="primary"
                size="default"
                @click="handleClear"
                style="margin-right: 10px"
                >清空
              </el-button>
              <el-button type="primary" size="default" @click="exit"
                >退出
              </el-button>
            </div>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { slideRule } from '@/rules/slideRule';
import { Slide } from '@/typing/common';
import ActivityMap from '@/components/adminFrame/activityAdmin/addActivityMap.vue';
import ActivityEditor from '@/components/adminFrame/activityAdmin/activityEditor.vue';
import { computed } from 'vue';
import { ElMessage, FormInstance } from 'element-plus';
import {
  addSlideApi,
  editSlideApi,
  getSlideByIdApi,
} from '@/$http/apis/slideAdmin.api';
import { useRoute } from 'vue-router';
import { NULL } from 'sass';
import router from '@/router';
import { uploadApi } from '@/$http/apis/slideFile.api';

const route = useRoute();
const slideId: string | undefined = route.query['slide-id'] as string;
const maxIndex: number | undefined = route.query['slide-maxIndex'] as number;
const formRef = ref<FormInstance>();
const formData = ref<Partial<Slide>>({});
const avatarUrl1 = ref();
const avatarUrl = ref();
const showPlus = ref(true);

const toavatar = async (elfile) => {
  const res = await uploadApi(elfile.raw);
  // console.log(res);
  if (res.success == true) {
    // alert('更换头像成功！');
    // getUsermsg();
    avatarUrl.value = res.data;
    var text = '图片上传成功';
    var variable = avatarUrl.value;
    showPlus.value = false;
    // console.log(avatarUrl.value + '==>');
    // console.log(avatarUrl1.value);
    alert(text + '' + avatarUrl.value);
    // submit();
  }
};

const getSlideById = async (slideId: string) => {
  // 根据slideId获取活动信息
  const res = await getSlideByIdApi({ id: slideId });
  formData.value = res.data;
  showPlus.value = false;
  avatarUrl.value = formData.value.imgUrl;
};
if (slideId) {
  getSlideById(slideId);
}

const mode = computed(() => {
  // 根据formData的id判断是编辑模式还是添加模式
  if (formData.value.id) return 'edit';
  return 'add';
});

const handleClear = () => {
  //清空逻辑的代码
  avatarUrl.value = '';
  formData.value.slideIndex = 0;
  formData.value.targetUrl = '';
};

const exit = () => {
  //退出当前页面
  router.push('/admin/slide');
};

const submitLoading = ref(false);
const submit = async () => {
  // 提交表单
  submitLoading.value = true;
  try {
    await formRef.value?.validate();
    if (mode.value === 'add') {
      // 添加活动
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formData.value.imgUrl = avatarUrl.value;
      await addSlideApi(formData.value as any);
      ElMessage.success('添加成功');
    }
    if (mode.value === 'edit') {
      // 修改活动
      formData.value.imgUrl = avatarUrl.value;
      await editSlideApi(formData.value as any);
      ElMessage.success('修改成功');
    }
  } finally {
    avatarUrl.value = '';
    submitLoading.value = false;
  }
};
</script>

<style lang="scss" scoped></style>
