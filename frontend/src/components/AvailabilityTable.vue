<template>
    <div class="heading p-p-3">
        <template v-if="!disabled">
            <i>Click & drag over the times that you are available</i>
            <Button label="Done" @click="handleDoneButton" />
        </template>
        <template v-else>
            <i>{{ user }}</i>
             <Button label="Exit" />
        </template>
    </div>
    <div ref="table-wrapper" class="table-wrapper">
        <table tabindex="0" id="table" class="availability-table">
            <thead class="sticky-header">
                <tr>
                    <th>
                        <i class="pi pi-angle-double-up" />
                    </th>
                    <th
                        v-for="(date, index) in dates"
                        :key="index"
                        class="header"
                    >
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
                        class="noselect data"
                        :class="{ selected: dataPoint.y > 0 }"
                        v-for="(dataPoint, x) in series.data"
                        :key="{ x, y }"
                        :data-x="x"
                        :data-y="y"
                        :data-slot="dataPoint.slot"
                        @click="handleClick"
                        @mousemove="handleDragging"
                        @touchmove="handleDragging"
                        @touchstart="startDragging"
                        @mousedown="startDragging"
                        @touchend="endDragging"
                        @mouseup="endDragging"
                    ></td>
                </tr>
            </tbody>
            <!-- add a footer -->
            <tfoot class="sticky-footer">
                <tr>
                    <td><i class="pi pi-angle-double-down" /></td>
                    <td
                        v-for="(date, index) in dates"
                        :key="index"
                        class="footer"
                    ></td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script lang="ts">
// Prime Vue Components
import Button from "primevue/button";

// Composables
import useDrag from "@/composables/useDrag";

import { computed, toRefs } from "vue";

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
        user: {
            type: String,
        }
    },
    emits: ["submit-availability"],
    setup(props: any, { emit }) {
        const { chartData } = toRefs(props);
        const dates = computed(() => {
            return chartData.value.length > 0
                ? chartData.value[0].data.map((dataPoint) => dataPoint.x)
                : [];
        });

        const { disabled } = toRefs(props);

        const handleClick = (e: any) => {
            if (disabled.value) return;
            e.target.classList.toggle("selected");
        };

        return {
            dates,
            handleClick,
            ...useDrag(emit, disabled),
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

.heading {
    display: flex;
    align-items: center;
    height: 4rem;
}
.table-wrapper {
    height: 100%;
    width: 100vw;
    overflow-y: scroll;
    overflow-x: scroll;
    background-color: var(--green-600);
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
    height: 25px;
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
