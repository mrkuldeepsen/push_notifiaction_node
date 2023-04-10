self.addEventListener('push', event => {
  const data = event.data.json();
      console.log(data)
      var notificationOptions = {
        body: data.text,
        icon: data.image,
        data: { url:data.url }, 
        actions: [{action: "open_url", title: "Read Now"}]
      };
    self.registration.showNotification(data.title,notificationOptions );
});
self.addEventListener('notificationclick', function(event) {

  switch(event.action){
    case 'open_url':
    clients.openWindow(event.notification.data.url); 
    break;
    case 'any_other_action':
    clients.openWindow("https://www.amazon.com/Colgate-Advanced-Whitening-Toothpaste-Sparkling/dp/B082F1QH7S/ref=sr_1_4?crid=28OUV93LS6JBT&keywords=toothpaste+buy+1+get+2&qid=1680241998&sprefix=tooth+pest+buy+1+get+2%2Caps%2C367&sr=8-4");
    break;
  }
}
, false); 