<template>
        <table tabindex="0"  class="availability-table " :onfocus="focusIntoView">
            <thead class="sticky-header">
                <tr>
                    <td class="sticky-header"></td>
                    <td class="sticky-header">1/1</td>
                    <td class="sticky-header">1/2</td>
                    <td class="sticky-header">1/3</td>
                    <td class="sticky-header">1/4</td>
                    <td class="sticky-header">1/5</td>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(series, index) in chartData" :key="series.name">
                    <td>{{ index % 2 == 0 ? series.name : null }}</td>
                    <td
                        v-for="(dataPoint, index) in series.data"
                        :key="index"
                        :style="
                            dataPoint.y > 0
                                ? {
                                      backgroundColor: `var(--green-${dataPoint.y}00)`,
                                  }
                                : 'white'
                        "
                    >
                        {{ dataPoint.y }}
                    </td>
                </tr>
            </tbody>
        </table>

</template>

<script lang="ts">

export default {
    name: "AvailabilityTable",
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
    setup(props: any, context: any) {
        const focusIntoView = () => {
            const heading = document.querySelector('#group') as HTMLElement
            heading.scrollIntoView();

        }
    
        return {
            focusIntoView
        }
    }
}
</script>

<style>
.availability-table {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 1.5rem;
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
</style>