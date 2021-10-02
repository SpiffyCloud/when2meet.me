import { meeting } from '@/api/meeting'
import { computed, inject, onMounted, provide, reactive, ref, watch } from 'vue'

export default function useWindows() {
    const meeting = inject('meeting') as meeting
    const windows = ref([] as any)

    const urgencyOptions = ['Soonest', 'Latest']

    const durationOptions = [
        { label: '15 minutes', value: 0 },
        { label: '30 minutes', value: 1 },
        { label: '45 minutes', value: 2 },
        { label: '1 hour', value: 3 },
        { label: '1 hour 15 minutes', value: 4 },
        { label: '1 hour 30 minutes', value: 5 },
        { label: '1 hour 45 minutes', value: 6 },
        { label: '2 hours', value: 7 }
    ]

    const availableOptions = computed(() => {
        return Array.from(
            { length: meeting.availability.length },
            (v, i) => `${i + 1}`
        )
    })

    const filters = reactive({
        urgency: 'Soonest', // Soonest
        duration: 0, // 1 hour
        available: meeting.availability.length
    })
    provide('filters', filters)

    const combinations = (arr: any[]) => {
        const res = arr.map((a) => [a])
        for (let i = 0; i < arr.length; i++) {
            for (let j = i + 1; j < arr.length; j++) {
                for (let k = 0; k < arr.length; k++) {
                    res.push([arr[i], ...arr.slice(j, j + k)])
                }
            }
        }
        return res
    }

    const updateWindows = () => {
        const slots = meeting.availability.map((a) =>
            Array.from(a.slots).sort((a, b) => a - b)
        )
        const combos = combinations(slots)
        const filteredCombos = combos.filter((c) => {
            return c.length >= filters.available
        })

        const allWindows = filteredCombos.map((combo) => {
            const intersections = intersectMany(...combo)
            const continuousIntervals = getContinuousIntervals(
                intersections,
                combo.length
            ) as any
            const newWindows = continuousIntervals?.filter(
                (i) => i.windowLength > filters.duration
            )

            if (newWindows) {
                if (filters.urgency === 'Soonest') {
                    newWindows.sort((a, b) => a.start - b.start)
                } else {
                    newWindows.sort((a, b) => b.start - a.start)
                }
            }
            return newWindows
        })
        const flattened = allWindows.flat()
        // sort flatted by numOfPeople  from highest to lowest
        flattened.sort((a, b) => b.numOfPeople - a.numOfPeople)
        windows.value = [...flattened.slice(0, 3)]
    }

    watch(filters, () => {
        updateWindows()
    })

    const updateFilter = (filter: string, { value }) => {
        filters[filter] = value
    }
    provide('updateFilter', updateFilter)

    watch(meeting, () => {
        filters.available = meeting.availability.length
        updateWindows()
    })

    const showWindowFilter = ref(false)

    const updateWindowFilter = (show: boolean) => {
        showWindowFilter.value = show
    }
    provide('updateWindowFilter', updateWindowFilter)

    // window calculations
    const intersection = (arr1: any[], arr2: any[]) => {
        return arr1.filter((item) => arr2.includes(item))
    }
    const intersectMany = (...arrs) => {
        let res = arrs[0]?.slice()
        for (const arr of arrs) {
            res = intersection(res, arr)
        }
        return res
    }

    const getContinuousIntervals = (arr: any[], numOfPeople: number) => {
        if (!arr) return
        const res = [] as any
        let windowLength = 1
        let start = arr[0]
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] - arr[i - 1] > 1) {
                res.push({
                    start,
                    numOfPeople,
                    windowLength
                })
                start = arr[i]
                windowLength = 0
            } else {
                windowLength++
            }
        }
        return res
    }

    onMounted(updateWindows)

    return {
        windows,
        showWindowFilter,
        updateWindowFilter,
        urgencyOptions,
        durationOptions,
        availableOptions
    }
}
