import { reactive, computed } from 'vue'
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '/tailwind.config'

const fullConfig = resolveConfig(tailwindConfig)

const screens = ['sm', 'md', 'lg', 'xl'].reduce((acc, cur) => {
  const { screens } = fullConfig.theme
  acc[cur] = +screens[cur].slice(0, screens[cur].indexOf('px'))
  return acc
}, {})

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
  is: getBreakpoint(window.innerWidth)
})

const getWidth = computed(() => breakpoints.w)
const getHeight = computed(() => breakpoints.h)
const is = computed(() => breakpoints.is)

window.addEventListener(
  'resize',
  debounce(() => {
    breakpoints.w = window.innerWidth
    breakpoints.h = window.innerHeight
    breakpoints.is = getBreakpoint(window.innerWidth)
  }),
  false
)

export default {
  install: (app) => {
    app.config.globalProperties.$breakpoint = {
      getWidth,
      getHeight,
      is,
      isSmaller(size) {
        if (size === 'min') return getWidth.value < screens.sm
        if (size === 'md') return getWidth.value < screens.md
        if (size === 'lg') return getWidth.value < screens.lg
        if (size === 'xl') return getWidth.value < screens.xl
        return false
      }
    }
  }
}
