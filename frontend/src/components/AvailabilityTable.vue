<template>
    <table tabindex="0" id="table" class="availability-table">
        <thead class="sticky-header">
            <tr>
                <td class="sticky-header"></td>
                <td
                    class="sticky-header"
                    v-for="(date, index) in dates"
                    :key="index"
                >
                    {{ date }}
                </td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(series, y) in chartData" :key="series.name">
                <td>{{ parseInt(y) % 2 == 0 ? series.name : null }}</td>
                <td
                    v-for="(dataPoint, x) in series.data"
                    :key="{ x, y }"
                    :id="`${x} ${y}`"
                    :style="
                        dataPoint.y > 0
                            ? {
                                  backgroundColor: `var(--green-${dataPoint.y}00)`,
                              }
                            : 'white'
                    "
                    @click="initSelectedDate"
                    @touchmove="selectDate($event, { x, y })"
                ></td>
            </tr>
        </tbody>
        <!-- add a footer -->
        <tfoot class="sticky-footer">
            <tr>
                <td colspan="6">
                    <Button
                        icon="pi pi-chevron-left"
                        class="p-button-rounded p-button-text white-text p-my-2"
                        style="float: left"
                        @click="$emit('getPrev')"
                        :label="prevWeekLabel"
                    />
                    <Button
                        icon="pi pi-chevron-right"
                        iconPos="right"
                        class="p-button-rounded p-button-text white-text p-my-2"
                        :label="nextWeekLabel"
                        @click="$emit('getNext')"
                        style="float: right"
                    />
                </td>
            </tr>
        </tfoot>
    </table>
</template>

<script lang="ts">
import Button from "primevue/button";
import { computed, ref, toRefs } from "vue";

export default {
    name: "AvailabilityTable",
    components: {
        Button,
    },
    props: {
        chartData: {
            type: Object,
            required: true,
        },
        disabled: {
            type: Boolean,
            default: false,
        },
    },
    emits: ["getNext", "getPrev"],
    setup(props: any, context: any) {
        const lastTd = ref(null);
        const selectDate = (e: any, dataPoint: any) => {
            // if (!e.target.classList.contains("selected")) {
            //     return;
            // }
            e.preventDefault();
            const td = document.elementFromPoint(
                e.touches[0].clientX,
                e.touches[0].clientY
            ) as any;
            if (td === lastTd.value) return;
            lastTd.value = td;

            if (e.target.classList.contains("selected")) {
                td.classList.add("selected");
            } else {
                td.classList.remove("selected");
            }

            // create a draggable box around the selected td
        };

        const initSelectedDate = (e: any) => {
            console.log(e);
            e.target.classList.toggle("selected");
            e.stopPropagation();
        };
        const { chartData } = toRefs(props);
        const focusIntoView = (event) => {
            // const heading = document.querySelector("#table") as HTMLElement;
            event.target.scrollIntoView();
        };

        const dates = computed(() => {
            return chartData.value[0].data.map((dataPoint) => dataPoint.x);
        });

        const nextWeekLabel = computed((): string => {
            // get last date of dates
            const lastDate = dates.value[dates.value.length - 1];
            // get one day after last date
            const tomorrow = new Date(lastDate);
            tomorrow.setDate(tomorrow.getDate() + 1);
            const day = tomorrow.getDate();
            const month = tomorrow.getMonth() + 1;
            const nextWeekStart = `${month}/${day}`;

            // get 5 days from tomorow's date as mm/dd
            const nextWeekEnd = new Date(tomorrow);
            nextWeekEnd.setDate(nextWeekEnd.getDate() + 4);
            const dayEnd = nextWeekEnd.getDate();
            const monthEnd = nextWeekEnd.getMonth() + 1;
            const nextWeekEndLabel = `${monthEnd}/${dayEnd}`;

            return `${nextWeekStart}-${nextWeekEndLabel}`;
        });

        const prevWeekLabel = computed(() => {
            // get first date of this week
            const firstDate = dates.value[0];
            // get 5 days before first date
            const prevWeek = new Date(firstDate);
            prevWeek.setDate(prevWeek.getDate() - 5);
            // format as mm/dd
            const prevWeekFormatted = `${
                prevWeek.getMonth() + 1
            }/${prevWeek.getDate()}`;
            // get yesterday's date as mm/dd
            const lastDate = new Date(firstDate);
            lastDate.setDate(lastDate.getDate() - 1);
            const lastDateFormatted = `${
                lastDate.getMonth() + 1
            }/${lastDate.getDate()}`;
            return `${prevWeekFormatted}-${lastDateFormatted}`;
        });

        return {
            focusIntoView,
            nextWeekLabel,
            prevWeekLabel,
            dates,
            selectDate,
            initSelectedDate,
        };
    },
};
</script>

<style>
.availability-table {
    border-collapse: collapse;
    width: 100%;
    position: relative;
}
.availability-table thead td.sticky-header,
.availability-table tbody tr td:first-child {
    background-color: var(--green-600);
    color: whitesmoke;
    font-weight: bold;
    text-align: center;
    border: none;
    opacity: 1;
    z-index: 1;
    white-space: nowrap;
}

td.sticky-header {
    padding: 0.5rem;
}

.availability-table td {
    height: 1.25rem;
    width: 2.5rem;
}

.availability-table tbody td {
    color: white;
    background-color: white;
    text-align: center;
    border: 1px solid black;
}

.sticky-header {
    position: sticky;
    top: 0;
    background-color: var(--green-600);
}

.sticky-footer {
    position: sticky;
    bottom: 0;
    background-color: var(--green-600);
}

.white-text {
    color: white !important;
}

.selected {
    background-color: var(--green-600) !important;
}
</style>
