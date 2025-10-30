import bn from 'bignumber.js'

export default (data, payload) => {
  let result = data
  const lastTime = result[result.length - 1]

  if( lastTime[0] ===  payload.data.k.t) {
    result[result.length - 1] = [
      payload.data.k.t,
      payload.data.k.o,
      payload.data.k.h,
      payload.data.k.l,
      payload.data.k.c,
      payload.data.k.v
    ].map(i => bn(i).toNumber())
  } else {
    result.push([
      payload.data.k.t,
      payload.data.k.o,
      payload.data.k.h,
      payload.data.k.l,
      payload.data.k.c,
      payload.data.k.v
    ].map(i => bn(i).toNumber()))
  }

  return result
}
