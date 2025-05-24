export const useIntersectionObserver = () => {
  const observer = ref(null)
  const observedElements = ref([])

  const initObserver = (options) => {
    observer.value = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target
          target.classList.add('animate-in')
          observer.value.unobserve(target)
        }
      })
    }, options)
  }

  const observe = (element) => {
    if (element && observer.value) {
      observedElements.value.push(element)
      observer.value.observe(element)
    }
  }

  const disconnect = () => {
    if (observer.value) {
      observer.value.disconnect()
    }
  }

  onUnmounted(disconnect)

  return {
    initObserver,
    observe,
    disconnect
  }
} 