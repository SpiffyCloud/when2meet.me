<template>
    <div>
        <Toast />

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
                        v-for="(dataPoint, x) in series.data"
                        :key="{ x, y }"
                        :id="`${x} ${y}`"
                        @mousemove="selectDate"
                        @mousedown="handleMouseDown"
                        @mouseup="handleMouseUp"
                        @touchstart="handleTouchStart"
                        @touchend="handleTouchEnd"
                        @touchmove="selectDate"
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
import { computed, ref, reactive, toRefs } from "vue";
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
        const mousedown = ref(false);

        const selectDate = (e: any) => {
            if (!mousedown.value) {
                return;
            }

            e.preventDefault();

            const event = e.touches ? e.touches[0] : e;

            // get all tds
            const tds = document.querySelectorAll("#table td");
            // if td is inbetween starting.x and current.x as well as inbetween starting.y and current.y, select it
            tds.forEach((el: any) => {
                const box = el.getBoundingClientRect();
                // if el.clientX is in between e.clientX and startingPos.x
                if (
                    (box.left <= event.clientX &&
                        box.left >= startingBox.left &&
                        box.top <= event.clientY &&
                        box.top >= startingBox.top) ||
                    (box.left <= event.clientX &&
                        box.left >= startingBox.left &&
                        box.bottom >= event.clientY &&
                        box.bottom <= startingBox.bottom) ||
                    (box.right >= event.clientX &&
                        box.right <= startingBox.right &&
                        box.top <= event.clientY &&
                        box.top >= startingBox.top) ||
                    (box.right >= event.clientX &&
                        box.right <= startingBox.right &&
                        box.bottom >= event.clientY &&
                        box.bottom <= startingBox.bottom)
                ) {
                    if (selecting.value) {
                        el.classList.add("non-active");
                    } else {
                        el.classList.add("active");
                    }
                } else {
                    el.classList.remove("active");
                    el.classList.remove("non-active");
                }
            });
        };

        const handleClick = (e: any) => {
            e.target.classList.toggle("selected");
        };

        const selecting = ref(false);
        const startingBox = reactive({
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
        });

        const setStartingBox = (td: any) => {
            const box = td.getBoundingClientRect();
            startingBox.top = box.top;
            startingBox.bottom = box.bottom;
            startingBox.right = box.right;
            startingBox.left = box.left;
        };
        const handleMouseDown = (e: any) => {
            mousedown.value = true;
            selecting.value = e.target.classList.contains("selected");
            const td = document.elementFromPoint(e.clientX, e.clientY) as any;
            setStartingBox(td);
        };

        const handleMouseUp = (e: any) => {
            mousedown.value = false;
            // add class "selected" to all tds with class "active"
            const tds = document.querySelectorAll("#table td.active");
            tds.forEach((el: any) => {
                el.classList.remove("active");
                el.classList.add("selected");
            });
            // remove class selected from all tds with class non active
            const tds2 = document.querySelectorAll("#table td.non-active");
            tds2.forEach((el: any) => {
                el.classList.remove("non-active");
                el.classList.remove("selected");
            });
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

        const handleTouchStart = (e: any) => {
            e.preventDefault();
            mousedown.value = true;
            selecting.value = e.target.classList.contains("selected");
            const td = document.elementFromPoint(
                e.touches[0].clientX,
                e.touches[0].clientY
            ) as any;
            setStartingBox(td);
        };

        const handleTouchEnd = (e: any) => {
            mousedown.value = false;
            const tds = document.querySelectorAll("#table td.active");
            tds.forEach((el: any) => {
                el.classList.remove("active");
                el.classList.add("selected");
            });
            // remove class selected from all tds with class non active
            const tds2 = document.querySelectorAll("#table td.non-active");
            tds2.forEach((el: any) => {
                el.classList.remove("non-active");
                el.classList.remove("selected");
            });
        };

        return {
            focusIntoView,
            nextWeekLabel,
            prevWeekLabel,
            dates,
            selectDate,
            mousedown,
            handleMouseDown,
            handleMouseUp,
            handleClick,
            handleTouchStart,
            handleTouchEnd,
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

.active {
    /* green background */
    background-color: var(--green-600) !important;
}

.selected {
    /* blue background */
    background-color: var(--green-600) !important;
}

.non-active {
    /* gray background */
    background-color: white !important;
    border: 5px solid green;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
    box-shadow: none !important;
}
</style>
