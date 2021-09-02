<template>
    <div>
        <Toast />

        <table tabindex="0" id="table" class="availability-table">
            <thead class="sticky-header">
                <tr>
                    <th>
                        <i class="pi pi-angle-double-up" />
                    </th>
                    <th v-for="(date, index) in dates" :key="index">
                        {{ date }}
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(series, y) in chartData" :key="series.name">
                    <td class="sticky-column">
                        {{ parseInt(y) % 2 == 0 ? series.name : null }}
                    </td>
                    <td
                        class="noselect"
                        v-for="(dataPoint, x) in series.data"
                        :key="{ x, y }"
                        :id="`${x} ${y}`"
                        @mousemove="selectDate"
                        @mousedown="handleMouseDown"
                        @mouseup="handleMouseUp"
                        @click="handleClick"
                        @touchstart="handleTouchStart"
                        @touchend="handleTouchEnd"
                        @touchmove="selectDate"
                    ></td>
                </tr>
            </tbody>
            <!-- add a footer -->
            <tfoot class="sticky-footer">
                <tr>
                    <td><i class="pi pi-angle-double-down" /></td>
                    <td v-for="(date, index) in dates" :key="index"></td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script lang="ts">
import Button from "primevue/button";
import Toast from "primevue/toast";
import { computed, ref, reactive, toRefs } from "vue";

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

        const scrollDirection = reactive({
            x: 0,
            y: 0,
        });

        const selectDate = (e: any) => {
            if (!mousedown.value) {
                return;
            }
            const sidebarWrapper = document.querySelector(".p-sidebar-content");

            sidebarWrapper?.addEventListener("scroll", () => {
                setTimeout(() => {
                    if (mousedown.value) {
                        sidebarWrapper?.scrollBy(
                            scrollDirection.x,
                            scrollDirection.y
                        );
                    }
                });
            });
            // e.preventDefault();

            const event = e.touches ? e.touches[0] : e;

            // log sidebar wrapper scroll offset

            if (window.innerWidth - event.clientX < 20) {
                scrollDirection.x = 50;
                scrollDirection.y = 0;
            } else if (event.clientX < 100) {
                scrollDirection.x = -50;
                scrollDirection.y = 0;
            } else if (event.clientY < 100) {
                scrollDirection.x = 0;
                scrollDirection.y = -50;
            } else if (event.clientY > window.innerHeight - 64) {
                scrollDirection.x = 0;
                scrollDirection.y = 50;
            }

            sidebarWrapper!.scrollBy(scrollDirection.x, scrollDirection.y);
            e.preventDefault();

            // TODO: Figure out how to get box selection working with the internal scroll
            console.log(event.clientX, event.clientY);
            console.log(startingBox.top, startingBox.left);
            const scrollLeft = sidebarWrapper!.scrollLeft;
            const scrollTop = sidebarWrapper!.scrollTop;

            // get all tds
            const tds = document.querySelectorAll("#table td");
            // if td is inbetween starting.x and current.x as well as inbetween starting.y and current.y, select it
            tds.forEach((el: any) => {
                const box = el.getBoundingClientRect();
                // log the boxes scroll offset
                // if el.clientX is in between e.clientX and startingPos.x
                if (
                    (box.left <= event.clientX &&
                        box.left >= startingBox.left - scrollLeft &&
                        box.top <= event.clientY &&
                        box.top >= startingBox.top - scrollTop) ||
                    (box.left <= event.clientX &&
                        box.left >= startingBox.left - scrollLeft &&
                        box.bottom >= event.clientY &&
                        box.bottom <= startingBox.bottom - scrollTop) ||
                    (box.right >= event.clientX &&
                        box.right <= startingBox.right - scrollLeft &&
                        box.top <= event.clientY &&
                        box.top >= startingBox.top - scrollTop) ||
                    (box.right >= event.clientX &&
                        box.right <= startingBox.right - scrollLeft &&
                        box.bottom >= event.clientY &&
                        box.bottom <= startingBox.bottom - scrollTop)
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

        const dates = computed(() => {
            return chartData.value[0].data.map((dataPoint) => dataPoint.x);
        });

        const handleTouchStart = (e: any) => {
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
.availability-table thead th,
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

thead th {
    padding: 0.5rem;
}

.availability-table tbody td {
    height: 1.25rem;
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
    border: none !important;
}

.p-tabview .p-tabview-nav li .p-tabview-nav-link:not(.p-disabled):focus {
    box-shadow: none !important;
}

tfoot td {
    height: 2rem;
}

tr td:first-child {
    position: sticky;
    left: 0;
    width: 4rem;
}
</style>
