// Hooks added here have a bridge allowing communication between the BEX Content Script and the Quasar Application.
// More info: https://quasar.dev/quasar-cli/developing-browser-extensions/content-hooks

import { bexContent } from 'quasar/wrappers'

export default bexContent(( bridge ) => {
  console.log('[bex]: loading');
  //bridge.send('storage.set', { key: 'bright', value: 0.7 });
  bridge.on('dd.log', ({ data, respond }) => {
    console.log(`[BEX] ${data.message}`, data.data);
    respond();
  })


  const html = document.querySelector('html');
  if (html != null){
    html.style.filter = 'brightness(0.7)';
    chrome.storage.local.get('bright', (items) => {
      // Group the values up into an array to take advantage of the bridge's chunk splitting.
      html.style.filter = `brightness(${items})`;
    });
    bridge.on('dd.update', ({data, respond}) => {
      console.log('bright', data.bright)
      html.style.filter = `brightness(${data.bright})`;
      respond();
    });
  }
  
})
