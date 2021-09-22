import { availability } from '@/api/meeting';
import { computed, ref } from 'vue';

export default function useWindows(availability: availability[], defaults: any) {

    const showWindowFilter = ref(false);

    const updateWindows = () => {
        // Todo: calculate the windows
        showWindowFilter.value = false;
    };

    const intersection = (arr1: any[], arr2: any[]) => {
       return arr1.filter(item => arr2.includes(item));
    };
    const intersectMany = (...arrs) => {
       let res = arrs[0]?.slice();
       for(const arr of arrs){
          res = intersection(res, arr);
       }
       return res;
    };

    const getContinuousIntervals = (arr: any[]) => {
        if (!arr) return;
        const res = [] as any;
        let windowLength = 1;
        let start = arr[0];
        for(let i = 1; i < arr.length; i++){
            if(arr[i] - arr[i - 1] > 1){
                res.push({
                    start,
                    windowLength
                })
                start = arr[i];
                windowLength = 0;
            }
            else {
                windowLength++;
            }
        }
        return res;
    }

    const windows = computed(() => {
        const slots = availability.map(a => Array.from(a.slots).sort((a, b) => a - b));
        const intersections = intersectMany(...slots);
        const continuousIntervals = getContinuousIntervals(intersections);
        const windows = continuousIntervals?.filter(i => i.windowLength >= defaults.value.duration);
        return windows || [];

    });
    return {
        showWindowFilter,
        updateWindows,
        windows,
    };
}