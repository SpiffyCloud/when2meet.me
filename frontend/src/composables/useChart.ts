import {  onMounted, Ref, ref, toRefs, watch, } from "vue";
import { availability } from "@/api/meeting"

export default function useChart(availability: Ref<availability[]>, by_end_date: Ref<string>, isAdjusting: Ref<boolean>)  {
    // Create a 2d array to represent a list of availabilities 
    const chartData = ref([] as any);



    const formatAMPMTime = (date: Date) => {
        let hours: number = date.getHours();
        let minutes: any = date.getMinutes();

        const ampm = hours > 12 ? 'PM' : 'AM';

        hours = hours % 12
        minutes = minutes < 10 ? "0" + minutes : minutes;
        return `${hours}:${minutes} ${ampm}`
    }

    const createChartData = (start15MinBlock, end15MinBlock) => {
        chartData.value = [];
        // create an array of 0s for each 15 min block
        const groupAvailability = Array(480).fill(0); // TODO FIX THIS

        availability.value.forEach(user => {
            // console.log(user.slots)
           user.slots.forEach(slot => {
            //    console.log(slot);
                if (slot >= start15MinBlock && slot <= end15MinBlock) {
                    groupAvailability[slot - start15MinBlock] += 1;
                }
                
           })
        })

       
        // createa series of data points from the group availability.value
        for (let y = 0; y < 96; y++) {
            const rawData = [] as any;
            for (let x = 0; x < 10; x++) {
                const data = groupAvailability[y + x * 96];
                const date = new Date((start15MinBlock + y + x * 96) * 15 * 60 * 1000);
                rawData.push({
                    x: `${date.getMonth() + 1}/${date.getDate()}`,
                    y: data,
                    slot: start15MinBlock + y + x * 96
                });
            }
            const day = new Date((start15MinBlock + y) * 15 * 60 * 1000);
            // get time in HH:MM AM format

            chartData.value.push({
                name: formatAMPMTime(day),
                data: rawData,
            });
        }
    }

    const initChartData = () => {
        // CHANGE TO REAL DATE
        const { today, endDate } = getStartAndEndDate()
        const start15MinBlock = get15MinuteBlock(today);
        const end15MinBlock = get15MinuteBlock(endDate);


        createChartData(start15MinBlock, end15MinBlock);
    };

    const getStartAndEndDate = () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const endDate = new Date(by_end_date.value.concat("T00:00:00.000Z"));


        // increase day by 1
        endDate.setDate(endDate.getDate() + 1);
        endDate.setHours(0, 0, 0, 0);


        return { 
            today, endDate
        }
    }

    const get15MinuteBlock = (date: Date) => {
        return date.getTime() / (15 * 60 * 1000);
    }



    onMounted(initChartData)

    watch(isAdjusting, () => {
        if (isAdjusting.value) {
            initChartData();
        }
    })
    

    return {
        chartData,
        initChartData,
    }
}


