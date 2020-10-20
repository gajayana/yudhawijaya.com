import Vue from 'vue'

Vue.prototype.$socialParser = (str) => {
  const accounts = str.split('||')

  return accounts.map((ob) => {
    const item = ob.split('|')
    return {
      icon: item[1].split(','),
      link: item[0]
    }
  })
}
