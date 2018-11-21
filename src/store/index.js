import Vue from 'vue'
import Vuex from 'vuex'
import API from '../components/lib/api'
import * as firebase from 'firebase'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loading: false,
    error: null,
    loadedServices: [],
    user: null,
    account: null,
    userId: null,
    userService: null
  },
  mutations: {
    cambio(){
      return
    },
    setUserService (state, payload) {
      state.userService = payload
    },
    setUserId (state, payload) {
      state.userId = payload
    },
    setAccount (state, payload) {
      state.account = payload
    },
    setLoading (state, payload) {
      state.loading = payload
    },
    setLoadedServices (state, payload) {
      state.loadedServices = payload
    },
    createService (state, payload) {
      state.loadedServices.push(payload)
    },
    setError (state, payload) {
      state.error = payload
    },
    clearError (state) {
      state.error = null
    },
    setUser (state, payload) {
      state.user = payload
    }
  },
  actions: {
    getUserService ({commit}, id) {
      console.log(id)
      API.getService(id)
      .then(result => {
        console.log(result)
        return API.getUser(result.items.userId)
      })
      .then((result) => {
        console.log(result)
        commit('setUserService', result.items)
      })
      .catch((err) => {
        console.log(err)
      })
    },
    getAccount ({commit, getters}) {
      let id = getters.userId
      console.log(id)
      API.getUser(id)
      .then((data) => {
        const account = data.items
        console.log(`Mi data ->${data}`)
        commit('setAccount', account)
      })
      .catch(err => {
        console.log(err)
      })
    },
    clearError ({commit}) {
      commit('clearError')
    },
    autoSignIn ({commit}) {
      const something = {
        some: 'thing'
      }
      API.autoLogIn(something)
      .then(result => {
        commit('setUserId', result.items._id)
      })
      .catch(err => {
        console.log(err)
      })
      commit('setUser', localStorage.token)
    },
    createService ({commit, getters}, payload) {
      commit('setLoading', true)
      commit('clearError')
      const newService = {
        title: payload.title,
        description: payload.description,
        price: payload.price,
        position: payload.position
      }
      let id
      let urlOriginal
      if (payload.imageHttp.length >= 2083) {
        const filename = payload.urlToImage.name
        const ext = filename.slice(filename.lastIndexOf('.'))
        firebase.storage().ref('services/' + id + '.' + ext).put(payload.urlToImage)
        .then((fileData) => {
          var storage = firebase.storage()
          return storage.ref(fileData.metadata.fullPath).getDownloadURL()
        })
        .then((url) => {
          urlOriginal = url
          const reallynewService = {
            ...newService,
            urlToImage: urlOriginal
          }
          return API.createService(reallynewService)
        })
        .then((result) => {
          console.log(result)
          console.log(`1-> ${getters.loadedServices.length}`)
          commit('createService', {
            ...newService,
            urlToImage: urlOriginal
          })
          console.log(`2-> ${getters.loadedServices.length}`)
          commit('setLoading', false)
        })
        .catch((err) => {
          const newError = new Error('Please updaload another image with lower quality')
          console.log(err)
          commit('setError', newError.message)
          commit('setLoading', false)
        })
      } else {
        console.log(payload.imageHttp)
        const reallynewService = {
          ...newService,
          urlToImage: payload.imageHttp
        }
        API.createService(reallynewService)
        .then((result) => {
          console.log(result)
          commit('createService', reallynewService)
          commit('setLoading', false)
        })
        .catch((err) => {
          const newError = new Error('Please updaload another image with lower quality')
          console.log(err)
          commit('setError', newError.message)
          commit('setLoading', false)
        })
      }
    },
    loadServices ({commit}) {
      commit('setLoading', true)
      API.getServices()
      .then(result => {
        const services = result.items
        commit('setLoadedServices', services)
        commit('setLoading', false)
      })
      .catch((err) => {
        console.log(err)
        commit('setLoading', false)
      })
    },
    signUserUp ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      API.createUser(payload)
      .then((result) => {
        const token = result.item.token
        localStorage.token = token
        commit('setUser', token)
        commit('setLoading', false)
      })
      .catch((err) => {
        console.log(err.error.message)
        commit('setError', err.error.message)
        commit('setLoading', false)
      })
    },
    logout ({commit}) {
      localStorage.removeItem('token')
      commit('setUser', null)
    },
    signUserIn ({commit}, payload) {
      commit('setLoading', true)
      commit('clearError')
      API.loginUser(payload)
        .then(
          result => {
            console.log(result)
            const token = result.token
            const userid = result._id
            commit('setUserId', userid)
            localStorage.token = token
            commit('setLoading', false)
            commit('setUser', token)
          }
        )
        .catch(
          error => {
            commit('setLoading', false)
            commit('setError', error.error.message)
            console.log(error.error.message)
          }
        )
    }
  },
  getters: {
    loadedServices (state) {
      return state.loadedServices
    },
    loadedService (state) {
      return (serviceId) => {
        return state.loadedServices.find((service) => {
          return service._id === serviceId
        })
      }
    },
    featuredServices (state, getters) {
      return getters.loadedServices.slice(0, 5)
    },
    loading (state) {
      return state.loading
    },
    error (state) {
      return state.error
    },
    user (state) {
      return state.user
    },
    userId (state) {
      return state.userId
    },
    account (state) {
      return state.account
    },
    userService (state) {
      return state.userService
    }

  }
})
