import { ref, reactive, onMounted, Ref } from 'vue'

export default function useDrag(emit: any, isDisabled: Ref<boolean>) {
    const mousedown = ref(false)
    const isSelecting = ref(false)
    const startingBox = reactive({
        x: 0,
        y: 0
    })

    const scrollDirection = reactive({
        x: 0,
        y: 0
    })

    const setStartingBox = (td: any) => {
        startingBox.x = parseInt(td.dataset.x)
        startingBox.y = parseInt(td.dataset.y)
    }

    const startDragging = ({ target }) => {
        mousedown.value = true
        isSelecting.value = !target.classList.contains('selected')
        setStartingBox(target)
    }

    const endDragging = (e: any) => {
        mousedown.value = false
        const tds = document.querySelectorAll('#table td.active')
        tds.forEach((el: any) => {
            el.classList.remove('active')
            el.classList.add('selected')
        })
        // remove class selected from all tds with class non active
        const tds2 = document.querySelectorAll('#table td.non-active')
        tds2.forEach((el: any) => {
            el.classList.remove('non-active')
            el.classList.remove('selected')
        })
    }

    const handleDragging = (e: any) => {
        if (!mousedown.value || isDisabled.value) {
            return
        }
        const wrapper = document.querySelector('.table-wrapper')

        wrapper?.addEventListener('scroll', () => {
            setTimeout(() => {
                if (mousedown.value) {
                    wrapper?.scrollBy(scrollDirection.x, scrollDirection.y)
                }
            })
        })
        // e.preventDefault();

        const event = e.touches ? e.touches[0] : e

        // log sidebar wrapper scroll offset
        const eventTd = document.elementFromPoint(
            event.clientX,
            event.clientY
        ) as any
        if (window.innerWidth - event.clientX < 20) {
            scrollDirection.x = 1
            scrollDirection.y = 0
        } else if (event.clientX < 100) {
            scrollDirection.x = -1
            scrollDirection.y = 0
        } else if (eventTd.classList.contains('header')) {
            scrollDirection.x = 0
            scrollDirection.y = -1
        } else if (eventTd.classList.contains('footer')) {
            scrollDirection.x = 0
            scrollDirection.y = 1
        }

        wrapper!.scrollBy(scrollDirection.x, scrollDirection.y)
        e.preventDefault()

        // get all tds
        const tds = document.querySelectorAll('#table td.data')

        const eventX = parseInt(eventTd?.dataset.x)
        const eventY = parseInt(eventTd?.dataset.y)
        // return if eventX or eventY is NaN
        if (isNaN(eventX) || isNaN(eventY)) {
            return
        }
        // if td is inbetween starting.x and current.x as well as inbetween starting.y and current.y, select it
        tds.forEach((el: any) => {
            if (isInDragBox(el, eventX, eventY)) {
                toggleActive(el)
            } else {
                removeActive(el)
            }
        })
    }

    const isInDragBox = (el, eventX, eventY): boolean => {
        const x = parseInt(el.dataset.x)
        const y = parseInt(el.dataset.y)

        return (
            // condition 1: Dragging from left to right, top to bottom
            (x >= startingBox.x &&
                x <= eventX &&
                y <= startingBox.y &&
                y >= eventY) ||
            // condition 2: Dragging from left to right, bottom to top
            (x >= startingBox.x &&
                x <= eventX &&
                y >= startingBox.y &&
                y <= eventY) ||
            // condition 3: Dragging from right to left, top to bottom
            (x <= startingBox.x &&
                x >= eventX &&
                y <= startingBox.y &&
                y >= eventY) ||
            // condition 4: Dragging from right to left, bottom to top
            (x <= startingBox.x &&
                x >= eventX &&
                y >= startingBox.y &&
                y <= eventY)
        )
    }

    const toggleActive = (el) => {
        if (isSelecting.value) {
            el.classList.add('active')
        } else {
            el.classList.add('non-active')
        }
    }

    const removeActive = (el) => {
        el.classList.remove('active')
        el.classList.remove('non-active')
    }

    return {
        startDragging,
        endDragging,
        handleDragging
    }
}
