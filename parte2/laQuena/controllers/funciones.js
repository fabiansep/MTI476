

exports.responseType=function(req){


  if(req.originalUrl.match(/ *.xml*/))
    return 'xml'
  else if (req.originalUrl.match(/ *.json*/))
    return 'json'
  else if (req.originalUrl.match(/ *.html*/))
    return 'html'
  else if (req.headers.accept == '*/*')
    return 'json';
  else if(req.headers.accept.match(/ *xml*/))
    return 'xml'
  else if(req.headers.accept.match(/ *html*/))
    return 'html'



}
