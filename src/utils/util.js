import storage from './storage'

export default {
  setData(key, value, cb) {
    storage.set({
      [key]: value
    }, () => {
      console.log( key + ' currently is ', value);
      cb && cb()
    });
  },

  getData(key, cb) {
    storage.get(key, (res) => {
      cb && cb(res)
    })
  },

  clearData(key, cb) {
    this.setData(key, null)
    cb && cb()
  },

  getItemIndex(arr, key, value) {
    let index = -1
    arr.forEach((item, i) => {
      if(item[key] === value) {
        index = i
      }
    })

    return index
  }
}