// allow pasting พิมอันนี้ลงก่อนแล้วค่อยคัดลอกข้างล่างวาง


const minDelay = 60;
const maxDelay = 60;

const keyOverrides = {
  [String.fromCharCode(160)]: ' '
};

function getTargetCharacters() {
  const els = Array.from(document.querySelectorAll('.token span.token_unit'));
  const chrs = els
    .map(el => {
  
      if (el.firstChild?.classList?.contains('_enter')) {

        return '\n';
      }
      let text = el.textContent[0];
      return text;
    })
    .map(c => keyOverrides.hasOwnProperty(c) ? keyOverrides[c] : c); 
  return chrs;
}

function recordKey(chr) {

  window.core.record_keydown_time(chr);        
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function autoPlay(finish) {
  const chrs = getTargetCharacters();
  for (let i = 0; i < chrs.length - (!finish); ++i) {
    const c = chrs[i];
    recordKey(c);
 
    await sleep(Math.random() * (maxDelay - minDelay) + minDelay);
  }
}

autoPlay(true);