import request from '@/utils/request'

export function fetchScenicSpotAll(params) {
  return request({
    url: '/v2/Tourism/ScenicSpot',
    method: 'get',
    params
  })
}

export function fetchScenicSpot(city, params) {
  return request({
    url: `/v2/Tourism/ScenicSpot/${city}`,
    method: 'get',
    params
  })
}

export function fetchRestaurantAll(params) {
  return request({
    url: '/v2/Tourism/Restaurant',
    method: 'get',
    params
  })
}

export function fetchRestaurant(city, params) {
  return request({
    url: `/v2/Tourism/Restaurant/${city}`,
    method: 'get',
    params
  })
}

export function fetchHotelAll(params) {
  return request({
    url: '/v2/Tourism/Hotel',
    method: 'get',
    params
  })
}

export function fetchHotel(city, params) {
  return request({
    url: `/v2/Tourism/Hotel/${city}`,
    method: 'get',
    params
  })
}