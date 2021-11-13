import errorImg from '@/assets/images/empty.svg'

export default {
  install: (app) => {
    app.directive('src', (el, binding) => {
      el.style.opacity = 0
      if (binding.value) {
        const img = new Image()
        img.src = binding.value
        
        img.onload = () => {
          el.src = binding.value
          el.style.opacity = 1
        }
        img.onerror = () => {
          el.src = errorImg
          el.style.opacity = 1
          el.style.border = '1px solid'
          el.style.borderColor = '#E1E1E1'
        }
      }
    })
  }
}
