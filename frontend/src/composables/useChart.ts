import {  onMounted, ref, toRefs, } from "vue";

export default function useChart({ availability, by_end_date })  {
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
        const groupAvailability = Array(end15MinBlock - start15MinBlock).fill(0);
        console.log(start15MinBlock, end15MinBlock)

        availability.forEach(user => {
            // console.log(user.slots)
           user.slots.forEach(slot => {
            //    console.log(slot);
                if (slot >= start15MinBlock && slot <= end15MinBlock) {
                    console.log("Valid Slot");
                }
                else {
                    console.log("invalid slot")
                }
           })
        })
        for (let i = 0; i < availability?.length; i++) {
            const individualAvailability = availability[i];
            for (let j = 0; j < individualAvailability.slots.length; j++) {
                const slot = individualAvailability.slots[j];
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
        console.log(by_end_date);
        const endDate = new Date(by_end_date.concat("T00:00:00.000Z"));

        console.log(today, endDate); // TODO: End date is returning -4 hours from the actual end date. Timezones :/ 

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
    

    return {
        chartData,
        initChartData,
    }
}


