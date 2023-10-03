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

const toolbarConfig: Partial<IToolbarConfig> = {};
const editorConfig: Partial<IEditorConfig> = { placeholder: '请输入内容...' };

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
