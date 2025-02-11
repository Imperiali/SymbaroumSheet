import type { Toast } from "$lib/types/toast";
import { writable } from "svelte/store";
import { storageService } from "$lib/services/storage";

const createToastStore = () => {

  const { subscribe, set, update } = writable<Array<Toast>>([]);

  return {
    subscribe,
    set: (toast: Array<Toast>) => {
      set(toast);
      storageService.saveToast(toast);
    },
    update: (fn: (toast: Array<Toast>) => Array<Toast>) => {
      update(toast => {
        const updated = fn(toast);
        storageService.saveToast(updated);
        return updated;
      });
    },
    // update: (toast: Array<Toast>) => {
    //   update(toasts => {
    //     const updated = toasts;
    //     storageService.saveToast(updated);
    //     return toast;
    //   });
    // },
    reset: () => {
      storageService.saveToast([]);
    },
    load: () => {
      const saved = storageService.loadToast();
      if (saved) {
        set(saved);
      }
    },
    delete: (toast: Toast) => {
      const saved = storageService.loadToast();
      if (saved == null) return;
      const updated = saved!.filter((t) => t.id != toast.id)
      storageService.saveToast(updated);
      return updated;
    },
    add: (toast: Toast) => {
      const saved = storageService.loadToast();
      if (saved == null) {
        storageService.saveToast([toast]);
        return;
      }
      const updated = [...saved, toast];
      storageService.saveToast(updated);
      return updated;
    }
  };
};

export const toasts = createToastStore();