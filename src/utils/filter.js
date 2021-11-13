import { cities } from '@/assets/json/taiwan-zip-code.json'

export function filterCity(zip) {
  const { name } = cities.find(({ region }) =>
    region.find(({ code }) => code === +zip)
  )
  return name
}
