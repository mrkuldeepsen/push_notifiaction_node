exports.handleError = function(res,err,status =400){
    res.status(status).json({error: true,message:err})
    return
}

exports.success = function(res,data,status =200){
    res.status(status).json({error: false,message:data})
    return
}