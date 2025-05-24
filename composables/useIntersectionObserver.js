import { onUnmounted } from 'vue'

export const useIntersectionObserver = () => {
  let observer
  const observedElements = new Set()

  const observe = (element, callback, options = { threshold: 0.3 }) => {
    // Não observar novamente se já foi observado
    if (observedElements.has(element)) return
    
    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          observedElements.add(element)
          callback(entry)
        }
      })
    }, options)

    observer.observe(element)
    return observer
  }

  const unobserve = (element) => {
    if (observer && element) {
      observer.unobserve(element)
    }
  }

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })

  return { observe, unobserve }
}