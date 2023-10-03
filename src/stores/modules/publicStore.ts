import { defineStore } from 'pinia';

export enum ActivityStatus {
  'all',
  'notStart',
  'inProgress',
  'end',
}

export const usePublicStore = defineStore('public-store', () => {
  return {};
});
