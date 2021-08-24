<template>
    <div>
        <Toast />
        <div class="action-buttons" v-if="selecting">
            <Button
                icon="pi pi-minus"
                class="p-button-rounded p-button-danger p-mx-2"
                @click="deselectCells"
            />
            <Button
                icon="pi pi-plus"
                class="p-button-rounded p-mx-2 p-button-success"
                @click="selectCells"
            />
        </div>
        <table tabindex="0" id="table" class="availability-table">
            <thead class="sticky-header">
                <tr>
                    <td>
                        <i class="pi pi-angle-double-up" />
                    </td>
                    <td v-for="(date, index) in dates" :key="index">
                        {{ date }}
                    </td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(series, y) in chartData" :key="series.name">
                    <td>{{ parseInt(y) % 2 == 0 ? series.name : null }}</td>
                    <td
                        class="noselect"
                        :class="{ active: activeTds.indexOf(`${x} ${y}`) > -1 }"
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
                        @touchmove="selectDate($event, { x, y })"
                        v-touch:hold="longtapHandler"
                        v-touch:release="releaseHandler"
                        @click="handleClick"
                    ></td>
                </tr>
            </tbody>
            <!-- add a footer -->
            <tfoot class="sticky-footer">
                <tr>
                    <td><i class="pi pi-angle-double-down" /></td>
                    <td colspan="5">
                        <Button
                            icon="pi pi-chevron-left"
                            class="p-button-rounded p-button-text white-text"
                            style="float: left"
                            @click="$emit('getPrev')"
                            :label="prevWeekLabel"
                        />
                        <Button
                            icon="pi pi-chevron-right"
                            iconPos="right"
                            class="p-button-rounded p-button-text white-text"
                            :label="nextWeekLabel"
                            @click="$emit('getNext')"
                            style="float: right"
                        />
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import Toast from "primevue/toast";
import { computed, ref, toRefs } from "vue";
import { useToast } from "primevue/usetoast";

export default {
    name: "AvailabilityTable",
    components: {
        Button,
        Toast,
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
        const dragging = ref(false);
        const toast = useToast();
        const selecting = ref(false);

        const selectDate = (e: any, dataPoint: any) => {
            if (!dragging.value) {
                return;
            }
            e.preventDefault();
            const td = document.elementFromPoint(
                e.touches[0].clientX,
                e.touches[0].clientY
            ) as any;
            if (td === lastTd.value) return;
            lastTd.value = td;

            td.classList.add("selected");
            td.classList.remove("active");

            // check if any td is selected
            const selectedTds = document.querySelectorAll(".selected");
            if (selectedTds.length == 0) {
                selecting.value = false;
            }

            // create a draggable box around the selected td
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

        const longtapHandler = (e: any) => {
            dragging.value = true;
            selecting.value = true;

            e.target.classList.toggle("selected");
            e.target.classList.remove("active");
        };

        const releaseHandler = (_) => {
            dragging.value = false;
        };

        const handleClick = (_) => {
            toast.add({
                severity: "info",
                summary: "",
                detail: "Hold and drag cells to select them",
                life: 2000,
            });
        };

        const activeTds = ref([] as any);
        const selectCells = (_) => {
            // selecting.value = false;
            const selectedTds = document.querySelectorAll(".selected");
            // add class active to all selectedTds
            selectedTds.forEach((td) => {
                // if td not already active, add to activeTds
                if (activeTds.value.indexOf(td.id) == -1) {
                    activeTds.value.push(td.id);
                }
            });
            selecting.value = false;
        };

        const deselectCells = (_) => {
            // deselect all selectedTds
            const selectedTds = document.querySelectorAll(".selected");
            selectedTds.forEach((td) => {
                // remove class active from all selectedTds
                td.classList.remove("active");
                // remove from activeTds
                const index = activeTds.value.indexOf(td.id);
                if (index > -1) {
                    activeTds.value.splice(index, 1);
                }
            });
            selecting.value = false;
        };

        return {
            focusIntoView,
            nextWeekLabel,
            prevWeekLabel,
            dates,
            selectDate,
            longtapHandler,
            releaseHandler,
            handleClick,
            selecting,
            selectCells,
            deselectCells,
            activeTds,
        };
    },
};
</script>

<style>
div {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}

.action-buttons {
    position: fixed;
    width: 100%;
    z-index: 1;
    top: 0;
    height: 4rem;
    align-items: center;
    right: 5rem;
    display: flex;
    justify-content: flex-end;
}
.availability-table {
    border-collapse: collapse;
    width: 100%;
    position: relative;
}
.availability-table thead td,
.availability-table tfoot td,
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

thead td {
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
    /* green border */
    border: 5px solid var(--green-600) !important;
}
.active {
    /* green background */
    background-color: var(--green-600) !important;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
    box-shadow: none !important;
}
</style>
