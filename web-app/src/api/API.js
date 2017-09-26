import request from 'superagent'

function ajax(params) {
  return new Promise(function(resolve, reject) {
    let r = request[params.verb](params.url)

    let sendAsJson = (['post', 'put'].indexOf(params.verb) > -1)
    if (sendAsJson) r = r.type('json')
    if (sendAsJson && params.data) r = r.send(params.data)
    else if (params.data) r = r.query(params.data)

    if (params.jwt) r = r.set('Authorization', 'JWT ' + params.jwt)

    if (params.headers) Object.keys(params.headers).forEach(function(key) {
      r = r.set(key, params.headers[key])
    })

    r.end(function(err, res) {
      if (err) reject(err)
      else resolve(res.body)
    })
  })
}

export default class API {

  constructor(path) {
    // should pull from config
    this.baseUrl = 'http://localhost:7001'
  }

  get(obj) {
		return ajax(Object.assign({ }, obj, { verb: 'get', url: this.baseUrl + obj.path }))
	}

  post(obj) {
    return ajax(Object.assign({}, obj, { verb: 'post', url: this.baseUrl + obj.path }))
  }

  put(obj) {
    return ajax(Object.assign({}, obj, { verb: 'put', url: this.baseUrl + obj.path }))
  }

  del(obj) {
    return ajax(Object.assign({}, obj, { verb: 'del', url: this.baseUrl + obj.path }))
  }
}
