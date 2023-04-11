const getDurationInMilliseconds = (start) => {
    const NS_PER_SEC = 1e9
    const NS_TO_MS = 1e6
    const diff = process.hrtime(start)
 
    return (diff[0] * NS_PER_SEC + diff[1]) / NS_TO_MS
 }
 
 const responceTime = ((req, res, next) => {
    console.log(`localhost:5013${req.originalUrl} [STARTED]`)
    const start = process.hrtime()
 
    res.on('finish', () => {            
        const durationInMilliseconds = getDurationInMilliseconds (start)
        console.log(`localhost:5013${req.originalUrl} [FINISHED] ${durationInMilliseconds.toLocaleString()} ms`)
    })
 
    res.on('close', () => {
        const durationInMilliseconds = getDurationInMilliseconds (start)
        console.log(`localhost:5013${req.originalUrl} [CLOSED] ${durationInMilliseconds.toLocaleString()} ms`)
    })
 
    next()
 })

 module.exports = {responceTime}