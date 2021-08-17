<template>
        <table class="availability-table p-shadow-5">
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
                <tr v-for="series in chartData" :key="series.name">
                    <td>{{ series.name }}</td>
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

<script>

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
        }
    },
    setup() {
        return {}
    }
}
</script>