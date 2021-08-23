import productModule from '~/store/product/productModule'

export default ({ store }, inject) => {
  const fetchProduct = async (handle) => {
    const namespace = `product/${handle}`
    if (!store.hasModule(namespace)) {
      store.registerModule(namespace, productModule(), {
        preserveState: !!store.state[namespace]
      })
    }
    return await store.dispatch(`${namespace}/fetchProduct`, handle)
  }

  const registerProduct = (handle) => {
    const namespace = `product/${handle}`
    if (!store.hasModule(namespace)) {
      store.registerModule(namespace, productModule(), {
        preserveState: !!store.state[namespace]
      })
    }
  }

  const deregisterProduct = (handle) => {
    const namespace = `product/${handle}`
    if (!store.hasModule(namespace)) {
      return
    }
    store.unregisterModule(namespace)
  }

  inject('fetchProduct', fetchProduct)
  inject('registerProduct', registerProduct)
  inject('deregisterProduct', deregisterProduct)
}
