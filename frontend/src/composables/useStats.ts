import { meeting } from '@/api/meeting'
import { computed, inject, Ref } from 'vue'

export function useStats() {
    const meeting = inject('meeting') as meeting
    const activeUser = inject('activeUser') as Ref<string>

    const getUserSlots = () => {
        const userIndex = meeting.availability.findIndex((a) => {
            return a.name === activeUser.value
        })

        // can't find user
        if (userIndex == -1) return []
        return meeting.availability[userIndex].slots
    }

    const getHourMinutes = (totalMinutes: number) => {
        const hours = Math.floor(totalMinutes / 60)
        const minutes = totalMinutes % 60
        return `${hours} hr ${minutes} min`
    }

    const totalAvailability = computed(() => {
        return getHourMinutes(getUserSlots().length * 15)
    })

    const longestMeeting = computed(() => {
        // longest continuous block of time ( using a reducer for fun)
        let previous
        let max = 0
        const longest = getUserSlots().reduce((acc, curr) => {
            if (acc == 0) {
                previous = curr
                return 1
            } else if (curr - previous == 1) {
                previous = curr
                return acc + 1
            } else {
                max = acc
                return max
            }
        }, 0)
        return getHourMinutes(longest * 15)
    })

    const overlapWithOthers = computed(() => {
        // make an array of all the slots
        const slots = meeting.availability.reduce((acc, curr) => {
            return acc.concat(...(curr.slots as any))
        }, []) as any
        // total slots that active user has in common
        const userSlots = getUserSlots()
        const overlap = slots.filter((slot) => {
            return userSlots.includes(slot)
        })
        // return perecentage of overlap to slots roudned to 2 decimal places
        const fraction = (overlap.length / slots.length) * 100
        return `${fraction.toFixed(2)}%`
    })

    return {
        totalAvailability,
        longestMeeting,
        overlapWithOthers
    }
}
