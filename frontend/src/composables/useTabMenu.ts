import { ref } from "vue";

export default function useTabMenu() {
    const active = ref(0);
    const items = ref([
      {
        label: "All Availability",
      },
      {
        label: "My Availability",
      },
    ]);

    const handleTabChange = async ({ index }) => {
      if (index === 1) {
        const tabs = await document.querySelector("#tabs"); // it says it has no effect but it does ¯\_(ツ)_/¯
        tabs?.scrollIntoView({ behavior: "smooth" });
      } else {
        window.scroll({ top: 0, behavior: "smooth" });
      }
    };

    return {
      active,
      items,
      handleTabChange,
    };
}