import bn from 'bignumber.js'

export default (response) => response.data.reduce((results, item) => {
  const n = item.map(i => bn(i).toNumber())
  results.push([n[0], n[1], n[2], n[3], n[4], n[5]])
  return results
}, [])
