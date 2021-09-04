import { computed, ref } from 'vue';

export default function useWindows() {
    const showWindowFilter = ref(false);

    const updateWindows = () => {
        // Todo: calculate the windows
        showWindowFilter.value = false;
    };

    const windows = computed(() => {
        return [] as any;
    });
    return {
        showWindowFilter,
        updateWindows,
        windows,
    };
}