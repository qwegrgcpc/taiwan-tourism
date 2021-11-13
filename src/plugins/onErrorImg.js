import errorImg from '@/assets/images/empty.svg'

export default {
  install: (app) => {
    app.directive('src', (el, binding) => {
      if (binding.value) {
        const img = new Image()
        img.src = binding.value
        
        img.onload = () => {
          el.src = binding.value
        }
        img.onerror = () => {
          el.src = errorImg
          el.style.border = '1px solid'
          el.style.borderColor = '#E1E1E1'
        }
      }
    })
  }
}
