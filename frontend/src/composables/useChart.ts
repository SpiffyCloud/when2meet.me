import { ref, watch, computed, inject, onMounted, Ref, provide } from 'vue'
import { meeting } from '@/api/meeting'

export default function useChart() {
    // Create a 2d array to represent a list of availabilities
    const chartData = ref([] as any)
    const tableUser = inject('tableUser') as Ref<string>
    const meeting = inject('meeting') as meeting

    const getRowName = (time: string, index: number) => {
        // if time is 12:00 AM return midnight
        if (time === '12:00 AM') {
            return 'Midnight'
        }
        // // else if time includes 30 return the time
        if (time.includes('30')) {
            return time.split(' ')[0]
        }
        // // else if time includes 00 return the hour + AM/PM
        if (time.includes('00')) {
            return `${time.split(':')[0]} ${time.split(' ')[1]}`
        }
    }

    const getCellOpacity = (data: any) => {
        const numOfPeople = meeting.availability.length
        if (data.y > 0) {
            return data.y / numOfPeople
        }
    }

    watch(tableUser, () => {
        if (tableUser.value) {
            initChartData()
        }
    })
    watch(meeting, () => {
        if (meeting.meeting_id) {
            initChartData()
        }
    })

    const createChartData = (start15MinBlock, end15MinBlock) => {
        chartData.value = []
        // create an array of 0s for each 15 min block
        const groupAvailability = Array(end15MinBlock - start15MinBlock).fill(0)
        meeting.availability.forEach((user) => {
            if (tableUser.value === 'All' || user.name === tableUser.value) {
                user.slots.forEach((slot) => {
                    if (slot >= start15MinBlock && slot <= end15MinBlock) {
                        groupAvailability[slot - start15MinBlock] += 1
                    }
                })
            }
        })

        // createa series of data points from the group availability.value
        const { endDate } = getStartAndEndDate()
        const days = dateDiffInDays(new Date(), endDate)
        for (let y = 0; y < 96; y++) {
            const rawData = [] as any
            for (let x = 0; x < days; x++) {
                const data = groupAvailability[y + x * 96]
                const date = new Date(
                    (start15MinBlock + y + x * 96) * 15 * 60 * 1000
                )
                rawData.push({
                    x: date,
                    y: data,
                    slot: start15MinBlock + y + x * 96
                })
            }
            const day = new Date((start15MinBlock + y) * 15 * 60 * 1000)

            chartData.value.push({
                name: day.toLocaleString('en-us', {
                    hour: 'numeric',
                    minute: 'numeric'
                }),

                data: rawData
            })
        }
    }

    const monthDateDay = (date: Date) => {
        const month = date.toLocaleString('en-us', { month: 'short' })
        const day = date.getDate()
        const weekDay = date.toLocaleString('en-us', { weekday: 'short' })
        return {
            month,
            day,
            weekDay
        }
    }

    const dates = computed(() => {
        return chartData.value.length > 0
            ? chartData.value[0].data.map((dataPoint) =>
                  monthDateDay(dataPoint.x)
              )
            : []
    })

    const initChartData = () => {
        const { today, endDate } = getStartAndEndDate()
        const start15MinBlock = get15MinuteBlock(today)
        const end15MinBlock = get15MinuteBlock(endDate)
        if (!isNaN(end15MinBlock)) {
            createChartData(start15MinBlock, end15MinBlock)
        }
    }

    const getStartAndEndDate = () => {
        const today = new Date()
        today.setHours(0, 0, 0, 0)
        const formattedDate = meeting.by_end_date
            .concat('T00:00:00')
            .replace(/-/g, '/')
            .replace(/T.+/, '')
        const endDate = new Date(formattedDate)
        endDate.setDate(endDate.getDate() + 1)

        return {
            today,
            endDate
        }
    }

    const get15MinuteBlock = (date: Date) => {
        return date.getTime() / (15 * 60 * 1000)
    }

    const _MS_PER_DAY = 1000 * 60 * 60 * 24

    const dateDiffInDays = (a, b) => {
        const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())
        const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate())

        return Math.floor((utc2 - utc1) / _MS_PER_DAY)
    }

    onMounted(async () => {
        if (chartData.value.length === 0) {
            initChartData()
        }
    })

    return {
        chartData,
        dates,
        initChartData,
        getRowName,
        getCellOpacity
    }
}
