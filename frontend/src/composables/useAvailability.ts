import {  ref, watch, onMounted, } from "vue";

export default function useAvailability(meeting: any)  {
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
        const groupAvailability = [] as any;
        for (let i = start15MinBlock; i < end15MinBlock; i++) {
            groupAvailability.push(0);
        }
        const availabilites = meeting.value.availability;
        for (let i = 0; i < availabilites?.length; i++) {
            const availability = availabilites[i];
            for (let j = 0; j < availability.slots.length; j++) {
                const slot = availability.slots[j];
                if (slot >= start15MinBlock && slot <= end15MinBlock) {
                    groupAvailability[slot - start15MinBlock] += 1;
                }
            }
        }
        // createa series of data points from the group availability
        for (let y = 0; y < 96; y++) {
            const rawData = [] as any;
            for (let x = 0; x < 10; x++) {
                const data = groupAvailability[y + x * 96];
                const date = new Date((start15MinBlock + y + x * 96) * 15 * 60 * 1000);
                rawData.push({
                    x: `${date.getMonth() + 1}/${date.getDate()}`,
                    y: data,
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
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const start15MinBlock = today.getTime() / (15 * 60 * 1000);
        const end15MinBlock = start15MinBlock + 480;
        createChartData(start15MinBlock, end15MinBlock);

      
    };

    const updateChartData = (startDate: Date, endDate: Date) => {
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        const start15MinBlock = startDate.getTime() / (15 * 60 * 1000);
        const end15MinBlock = endDate.getTime() / (15 * 60 * 1000);
        createChartData(start15MinBlock, end15MinBlock);
    };
    

    return {
        chartData,
        updateChartData,
        initChartData,
    }
}


