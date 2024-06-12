import { ref, onMounted, type Ref } from 'vue'
import { useTonConnectUI } from './useTonConnectUI'

interface useIsConnectionRestoredState {
  restored: Ref<boolean>;
}

export const useIsConnectionRestored = (): useIsConnectionRestoredState => {
  const restored = ref(false)
  const { tonConnectUI } = useTonConnectUI()

  onMounted(async () => {
    if (tonConnectUI != null) {
      await tonConnectUI.connectionRestored
      restored.value = true
    }
  })

  return { restored }
}
