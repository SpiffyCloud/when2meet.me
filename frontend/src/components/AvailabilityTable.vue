<template>
    <div v-if="visible" class="page">
        <div class="table-banner">
            <template v-if="!disabled">
                <em class="assistive"
                    >Click & drag over the times that you are available</em
                >
                <button class="button" @click="onDone">Done</button>
            </template>
            <template v-else>
                <em class="assistive">{{ header }}</em>
                <button class="button" @click="onExit">Exit</button>
            </template>
        </div>
        <div class="table-wrapper">
            <table tabindex="0" id="table">
                <tbody>
                    <tr class="table-header">
                        <td></td>
                        <td
                            v-for="(date, index) in dates"
                            class="column"
                            :key="index"
                        >
                            <span class="assistive"
                                >{{ date.month }} <br />
                                {{ date.day }} <br
                            /></span>
                            <span class="label">
                                {{ date.weekDay }}
                            </span>
                        </td>
                    </tr>
                    <tr></tr>
                    <template
                        v-for="(series, y) in chartData"
                        :key="series.name"
                    >
                        <tr v-if="y % 4 === 0">
                            <td
                                @touchend="endDragging"
                                @mouseup="endDragging"
                                class="divider"
                                colspan="100%"
                            ></td>
                        </tr>
                        <tr>
                            <td
                                :id="series.name"
                                :data-time="
                                    series.name === '8:45 AM'
                                        ? 'start'
                                        : series.name
                                "
                                :class="{
                                    label: y % 4 === 0
                                }"
                                class="name"
                            >
                                <span
                                    :class="{
                                        'assistive-small':
                                            y % 2 === 0 && y % 4 !== 0
                                    }"
                                    class="name-label"
                                    >{{ getRowName(series.name, y) }}</span
                                >
                            </td>
                            <td
                                class="noselect data"
                                :class="{ selected: dataPoint.y > 0 }"
                                v-for="(dataPoint, x) in series.data"
                                :style="{
                                    opacity: !disabled
                                        ? 1
                                        : getCellOpacity(dataPoint)
                                }"
                                :key="{ x, y }"
                                :data-x="x"
                                :data-y="y"
                                :data-slot="dataPoint.slot"
                                @click="onClick"
                                @mousemove="handleDragging"
                                @touchmove="handleDragging"
                                @touchstart="startDragging"
                                @mousedown="startDragging"
                                @touchend="endDragging"
                                @mouseup="endDragging"
                            ></td>
                        </tr>
                    </template>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script lang="ts">
// Composables
import useDrag from '@/composables/useDrag'
import useChart from '@/composables/useChart'
import usePostAvailability from '@/composables/usePostAvailability'

import { computed, inject, toRefs, watch } from 'vue'
import { meeting } from '@/api/meeting'

export default {
    name: 'AvailabilityTable',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
        user: {
            type: String
        }
    },
    emits: ['submit-availability', 'exit', 'update:visible'],
    setup(props: any, { emit }) {
        const { disabled } = toRefs(props)
        const { submitAvailability } = usePostAvailability()

        const updateMeeting = inject('updateMeeting') as (
            updatedMeeting: meeting
        ) => void

        const onClick = (e: any) => {
            if (disabled.value) return
            e.target.classList.toggle('selected')
        }
        const onDone = async () => {
            emit('update:visible', false)

            const slots = Array.from(
                document.querySelectorAll('#table td.selected')
            ).map((el: any) => {
                return el.dataset.slot
            })
            const updatedMeeting = (await submitAvailability(slots)) as meeting
            if (updatedMeeting) {
                updateMeeting(updatedMeeting)
            }
        }

        const onExit = () => {
            emit('update:visible', false)
        }

        const header = computed(() => {
            if (props.user === 'All') {
                return 'Viewing all availability'
            } else {
                return `Viewing availability for ${props.user}`
            }
        })

        const { visible } = toRefs(props)
        watch(visible, () => {
            if (visible.value) {
                setTimeout(() => {
                    const start = document.getElementById(
                        '8:15 AM'
                    ) as HTMLElement
                    window.scrollTo(0, start.offsetTop - 1)
                }, 0)
            }
        })

        return {
            onClick,
            onDone,
            onExit,
            header,
            ...useDrag(emit, disabled),
            ...useChart()
        }
    }
}
</script>

<style scoped>
div {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.page {
    position: absolute;
    width: 100%;
    top: 0;
    left: 0;
    background: var(--primary);
    scrollbar-width: none;
}

.table-wrapper {
    height: 100%;
    top: 6rem;
    position: relative;
}

.table-banner {
    height: 6rem;
    width: 100%;
    display: flex;
    padding: 1rem;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 3;
    background-color: var(--primary);
}

.column {
    background-color: var(--primary);
}

.table-header {
    position: sticky;
    top: 6rem;
    background-color: var(--primary);
    z-index: 2;
}
.button {
    width: auto;
    margin: 0;
    height: 3rem;
    padding-inline: 1rem;
}
.assistive-small {
    font-size: 1rem;
    font-weight: bold;
    opacity: 0.5;
    vertical-align: bottom;
}
.label {
    font-size: 1rem;
    font-weight: bold;
    text-align: center;
    vertical-align: bottom;
}

table {
    border-spacing: 2px;
    width: 100%;
    position: relative;
}

td.data {
    background-color: gray;
    opacity: 0.5;
    min-width: 3.5rem;
    height: 1.5rem;
}

.column {
    text-align: center;
}

td.name {
    display: table-cell;
    vertical-align: top;
    text-align: center;
    max-width: 6rem;

    z-index: 1;
    position: sticky;
    left: 0;
    background-color: var(--primary);
}

td.selected,
td.active {
    background-color: var(--secondary);
    opacity: 1;
}

td.non-active {
    background-color: grey;
    opacity: 1;
}

td.divider {
    height: 0.5rem;
}
.name-label {
    position: relative;
    top: -1rem;
}
</style>
