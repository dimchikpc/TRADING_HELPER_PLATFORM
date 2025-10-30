export default (url, callbacks) => {

    const stream = new WebSocket(url)
    for (const event in callbacks) {
        stream.addEventListener(event, callbacks[event])
    }
    return stream
}