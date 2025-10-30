export default (pairs) => {
    if(!Array.isArray(pairs)) return [pairs.toLowerCase()+'@ticker']

    const channels = []
    for (const key in pairs) {
      channels.push(`${pairs[key]}@ticker`)
    }
    
    return channels
}