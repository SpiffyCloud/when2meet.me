<template>
    <div class="p-mt-5">
        <BestWindows />
        <Responders />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

// Internal Components
import BestWindows from "@/components/BestWindows.vue";
import Responders from "@/components/Responders.vue";

export default defineComponent({
    name: "AllAvailability",
    components: {
        BestWindows,
        Responders,
    },
    setup() {
        return {};
    },
});
</script>
