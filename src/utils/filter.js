import { cities } from '@/assets/json/taiwan-zip-code.json'

export function filterCity(zipCode) {
  const { name } = cities.find(({ region }) =>
    region.find(({ code }) => code === +zipCode)
  )
  return name
}

export function filterArea(zipCode) {
  return cities.reduce((acc, { name, region }) => {
    const zip = region.find(({ code }) => code === +zipCode)?.name
    return zip ? `${name}${zip}` : acc
  }, '')
}
