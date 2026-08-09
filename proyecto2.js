const palette = document.getElementById('palette');
const generateBtn = document.getElementById('generate');
const paletteType = document.getElementById('paletteType');

function hslToHex(h, s, l){
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2*l - 1)) * s;
    const x = c * (1 - Math.abs((h / 60) % 2 - 1));
    const m = l - c/2;

    let r=0, g=0, b=0;

    if(h < 60){ r=c; g=x; }
    else if(h < 120){ r=x; g=c; }
    else if(h < 180){ g=c; b=x; }
    else if(h < 240){ g=x; b=c; }
    else if(h < 300){ r=x; b=c; }
    else { r=c; b=x; }

    r = Math.round((r+m)*255);
    g = Math.round((g+m)*255);
    b = Math.round((b+m)*255);

    return '#' + [r,g,b]
      .map(v => v.toString(16).padStart(2,'0'))
      .join('')
      .toUpperCase();
}

function createPalette(colors){
    palette.innerHTML = '';

    colors.forEach(color => {
        const box = document.createElement('div');
        box.className = 'color-box';
        box.style.background = color;
        box.textContent = color;

        box.addEventListener('click', ()=>{
            navigator.clipboard.writeText(color);
            alert('Color copiado: ' + color);
        });

        palette.appendChild(box);
    });
}

function generatePalette(){
    const type = paletteType.value;
    const baseHue = Math.floor(Math.random() * 360);
    let colors = [];

    switch(type){

        case 'monocromatica':
            colors = [
                hslToHex(baseHue,70,20),
                hslToHex(baseHue,70,35),
                hslToHex(baseHue,70,50),
                hslToHex(baseHue,70,65),
                hslToHex(baseHue,70,80)
            ];
            break;

        case 'analoga':
            colors = [
                hslToHex((baseHue-40+360)%360,70,50),
                hslToHex((baseHue-20+360)%360,70,50),
                hslToHex(baseHue,70,50),
                hslToHex((baseHue+20)%360,70,50),
                hslToHex((baseHue+40)%360,70,50)
            ];
            break;

        case 'complementaria':
            colors = [
                hslToHex(baseHue,70,40),
                hslToHex(baseHue,70,60),
                hslToHex((baseHue+180)%360,70,40),
                hslToHex((baseHue+180)%360,70,60),
                hslToHex(baseHue,30,85)
            ];
            break;

        case 'triadica':
            colors = [
                hslToHex(baseHue,70,50),
                hslToHex((baseHue+120)%360,70,50),
                hslToHex((baseHue+240)%360,70,50),
                hslToHex(baseHue,40,70),
                hslToHex((baseHue+120)%360,40,70)
            ];
            break;
    }

    createPalette(colors);
}

generateBtn.addEventListener('click', generatePalette);
paletteType.addEventListener('change', generatePalette);

generatePalette();