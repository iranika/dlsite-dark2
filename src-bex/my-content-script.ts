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
    chrome.storage.local.get('bright', (items) => {
      // Group the values up into an array to take advantage of the bridge's chunk splitting.
      if (!items['bright']){
        html.style.filter = 'brightness(0.9)';
        return;
      }
      html.style.filter = `brightness(${items})`;
    });
    bridge.on('dd.update', ({data, respond}) => {
      console.log('bright', data.bright)
      html.style.filter = `brightness(${data.bright})`;
      respond();
    });

    chrome.storage.local.get('gift_button', (item) => {
      if (!item['gift_button'] || item['gift_button'] == false) return;

      if (location.href.includes('/work/')){
        const boxElm = document.querySelector('#work_buy_btn'); //ボタンの表示位置
        const hasWork = document.querySelector('#work_buy_btn > p.work_stream > a'); //購入済み判定

        if (hasWork && boxElm){
          const workId = location.href.replace(/.*\//, '').replace(/\.html.*$/, '');

          boxElm.innerHTML += `
        <div class="work_favorite">
          <a href="https://www.dlsite.com/home/mypage/buy/dlgift/product/=/product_id/${workId}/" class="btn_gift">
            ギフト券を購入
          </a>
        </div>
        `
        }
      }
    })
  }

})
