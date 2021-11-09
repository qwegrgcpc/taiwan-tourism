import { reactive } from 'vue'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '/tailwind.config'

const fullConfig = resolveConfig(tailwindConfig)

const getBreakpointValue = () => {
  return ['sm', 'md', 'lg', 'xl'].reduce((acc, cur) => {
    const { screens } = fullConfig.theme
    acc[cur] = +screens[cur].slice(0, screens[cur].indexOf('px'))
    return acc
  }, {})
}

const screens = getBreakpointValue()

const sm = (val) => val >= screens.sm && val <= screens.md
const md = (val) => val >= screens.md && val <= screens.lg
const lg = (val) => val >= screens.lg && val <= screens.xl
const xl = (val) => val >= screens.xl

const getBreakpoint = (w) => {
  if (sm(w)) return 'sm'
  else if (md(w)) return 'md'
  else if (lg(w)) return 'lg'
  else if (xl(w)) return 'xl'
  else return 'min'
}
const debounce = function (func, wait) {
  var timeout
  return () => {
    const later = function () {
      timeout = null
    }
    const callNow = !timeout
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
    if (callNow) func()
  }
}

const breakpoints = reactive({
  w: window.innerWidth,
  h: window.innerHeight,
  is: getBreakpoint(window.innerWidth),
  size: null
})

window.addEventListener(
  'resize',
  debounce(() => {
    breakpoints.w = window.innerWidth
    breakpoints.h = window.innerHeight
    breakpoints.is = getBreakpoint(window.innerWidth)
  }, 200),
  false
)

export default {
  install: (app) => {
    app.config.globalProperties.$breakpoint = {
      ...breakpoints,
      isSmaller(size) {
        if (size === 'min') return this.w < screens.sm
        if (size === 'md') return this.w < screens.md
        if (size === 'lg') return this.w < screens.lg
        if (size === 'xl') return this.w < screens.xl
        return false
      }
    }
  }
}
