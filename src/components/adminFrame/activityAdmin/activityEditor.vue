<template>
  <div>
    <Toolbar
      style="border-bottom: 1px solid #ccc"
      :editor="editorRef"
      :defaultConfig="toolbarConfig"
      :mode="mode"
    />
    <Editor
      style="
        height: calc(100vh - 160px);
        overflow-y: hidden;
        border: 1px solid #ccc;
      "
      v-model="valueHtml"
      :defaultConfig="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<script lang="ts" setup>
import { onBeforeUnmount, ref, shallowRef } from 'vue';
import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
import { IToolbarConfig, IEditorConfig, IDomEditor } from '@wangeditor/editor';
import { watch } from 'vue';
import { uploadApi } from '@/$http/apis/file.api';

interface Props {
  modelValue?: string;
}
const props = defineProps<Props>();

const emits = defineEmits(['update:modelValue']);

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

const mode = ref('default');

// 内容 HTML
const valueHtml = ref(props.modelValue);
watch(
  () => props.modelValue,
  (val) => (valueHtml.value = val)
);

watch(
  () => valueHtml.value,
  (newVal) => {
    emits('update:modelValue', newVal);
  }
);

type InsertImgFn = (url: string, alt: string, href: string) => void;
type InsertVideoFn = (url: string, poster: string) => void;

const toolbarConfig: Partial<IToolbarConfig> = {};
const editorConfig: Partial<IEditorConfig> = {
  placeholder: '请输入内容...',
  MENU_CONF: {
    uploadImage: {
      async customUpload(file: File, insertFn: InsertImgFn) {
        const res = await uploadApi(file);
        insertFn(res.data, file.name, res.data);
      },
    },
    uploadVideo: {
      async customUpload(file: File, insertFn: InsertVideoFn) {
        const res = await uploadApi(file);
        insertFn(res.data, '');
      },
    },
  },
};

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor: IDomEditor) => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};
</script>

<style lang="scss" scoped></style>
