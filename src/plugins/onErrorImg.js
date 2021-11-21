import errorImg from '@/assets/images/empty.svg'

function setErrorImg(el) {
  el.src = errorImg
  el.style.border = '1px solid'
  el.style.borderColor = '#E1E1E1'
}

function setErrorBgImg(el) {
  el.style.backgroundImage = `url(${errorImg})`
  el.style.backgroundPosition = 'center'
  el.style.backgroundSize = 'contain'
  el.style.backgroundRepeat = 'no-repeat'
}

export default {
  install: (app) => {
    app.directive('src', (el, binding) => {
      if (binding.value) {
        const img = new Image()
        img.src = binding.value

        img.onload = () => {
          el.src = binding.value
        }
        img.onerror = () => setErrorImg(el)
      }

      if (!binding.value) {
        setErrorImg(el)
      }
    })

    app.directive('bg-src', (el, binding) => {
      if (binding.value) {
        const img = new Image()
        img.src = binding.value

        img.onload = () => {
          el.style.backgroundImage = `url(${binding.value})`
        }
        img.onerror = () => setErrorBgImg(el)
      }

      if (!binding.value) {
        setErrorBgImg(el)
      }
    })
  }
}
