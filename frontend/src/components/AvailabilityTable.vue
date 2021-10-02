<template>
  <div v-if="visible" class="page">
    <div class="heading p-p-3">
      <template v-if="!disabled">
        <i>Click & drag over the times that you are available</i>
        <Button label="Done" @click="onDone" />
      </template>
      <template v-else>
        <i>{{ header }}</i>
        <Button @click="onExit" label="Exit" />
      </template>
    </div>
    <div ref="table-wrapper" class="table-wrapper">
      <table tabindex="0" id="table" class="availability-table">
        <thead class="sticky-header">
          <tr>
            <th>
              <i class="pi pi-angle-double-up" />
            </th>
            <th v-for="(date, index) in dates" :key="index" class="header">
              {{ date }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(series, y) in chartData" :key="series.name">
            <td
              class="sticky-column"
              :data-time="series.name === '8:45 AM' ? 'start' : series.name"
            >
              {{ y % 2 == 0 ? series.name : null }}
            </td>
            <td
              class="noselect data"
              :class="{ selected: dataPoint.y > 0 }"
              v-for="(dataPoint, x) in series.data"
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
        </tbody>
        <!-- add a footer -->
        <tfoot class="sticky-footer">
          <tr>
            <td><i class="pi pi-angle-double-down" /></td>
            <td v-for="(date, index) in dates" :key="index" class="footer"></td>
          </tr>
        </tfoot>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
// Prime Vue Components
import Button from 'primevue/button'

// Composables
import useDrag from '@/composables/useDrag'
import useChart from '@/composables/useChart'
import usePostAvailability from '@/composables/usePostAvailability'

import { computed, inject, onMounted, toRefs, watch } from 'vue'
import { meeting } from '@/api/meeting'

export default {
  name: 'AvailabilityTable',
  components: {
    Button
  },
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
      if (visible) {
        const wrapper = document.querySelector('.table-wrapper')
        const start = document.querySelector('[data-time=start]') as HTMLElement
        wrapper?.scrollTo(0, start.offsetTop)
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
