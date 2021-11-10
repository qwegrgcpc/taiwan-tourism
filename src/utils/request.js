import axios from 'axios'
import jsSHA from 'jssha'

function getAuthorizationHeader() {
  let AppID = process.env.VUE_APP_API_ID
  let AppKey = process.env.VUE_APP_API_KEY

  let GMTString = new Date().toGMTString()
  let ShaObj = new jsSHA('SHA-1', 'TEXT')
  ShaObj.setHMACKey(AppKey, 'TEXT')
  ShaObj.update('x-date: ' + GMTString)
  let HMAC = ShaObj.getHMAC('B64')
  let Authorization =
    'hmac username="' +
    AppID +
    '", algorithm="hmac-sha1", headers="x-date", signature="' +
    HMAC +
    '"'
  return { Authorization: Authorization, 'X-Date': GMTString }
}

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 30000,
  headers: getAuthorizationHeader(),
  withCredentials: true,
  params: {
    $format: 'JSON'
  }
})

export default request
