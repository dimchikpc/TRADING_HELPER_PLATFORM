export default (pairs, interval) => {
    if(!Array.isArray(pairs)) return [pairs.toLowerCase()+`@kline_${interval}`]

    const channels = []
    for (const key in pairs) {
      channels.push(`${pairs[key].toLowerCase()}@kline_${interval}`)
    }
    
    return channels
}