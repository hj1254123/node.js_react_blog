class HjRequest {
  constructor(instance) {
    this.instance = instance
  }
  request(config) {
    return this.instance.request(config)
  }
  get(url, config = {}) {
    return this.request({ ...config, url, method: 'get' })
  }
  post(url, data = {}, config = {}) {
    return this.request({ ...config, data, url, method: 'post' })
  }
  delete(url, data = {}, config = {}) {
    return this.request({ ...config, data, url, method: 'delete' })
  }
  put(url, data = {}, config = {}) {
    return this.request({ ...config, data, url, method: 'put' })
  }
}

export default HjRequest
