import ezFetch from 'ez-fetch'
const baseURL = 'https://servilink.herokuapp.com'
const getServicesUrl = `${baseURL}/service`
const getUserUrl = `${baseURL}/auth`
const getLoginUrl = `${baseURL}/auth/login`
const getAutoLoginUrl = `${baseURL}/auth/autologin`
const getCategoriesUrl = `${baseURL}/category`

export default {
  getServices () {
    return ezFetch.get(getServicesUrl)
  },
  getCategories () {
    return ezFetch.get(getCategoriesUrl, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
  },
  postCategories (mCategory) {
    return ezFetch.post(getCategoriesUrl, mCategory, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
  },
  getService (id) {
    return ezFetch.get(`${getServicesUrl}/${id}`)
  },
  createService (service) {
    return ezFetch.post(`${getServicesUrl}`, service,
      {
        headers: {
          Authorization: `Bearer ${localStorage.token}`
        }
      })
  },
  createUser (user) {
    return ezFetch.post(`${getUserUrl}`, user)
  },
  loginUser (credentials) {
    return ezFetch.post(`${getLoginUrl}`, credentials)
  },
  getUser (id) {
    return ezFetch.get(`${getUserUrl}/${id}`)
  },
  updateService (field, id) {
    return ezFetch.patch(`${getServicesUrl}/${id}`, field, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
  },
  autoLogIn (field) {
    return ezFetch.post(`${getAutoLoginUrl}`, field, {
      headers: {
        Authorization: `Bearer ${localStorage.token}`
      }
    })
  }
}
