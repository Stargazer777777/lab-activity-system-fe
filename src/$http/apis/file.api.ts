import { JavaHttpTool } from '..';

export const uploadApi = (file: File) => {
  const formData = new FormData();
  formData.append('file', file);
  return JavaHttpTool.send({
    method: 'POST',
    url: '/file/upload',
    data: formData,
  });
};
