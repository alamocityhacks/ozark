const shuffle = require('../utils/shuffle');
const btoa = require('btoa');
const convertbase = require('../utils/convertbase');

module.exports = (groupid, challenge) => {
    let id = groupid.replace(/[-_]/g, '');
    let lines = [];
    let lineNum = id.length * 100;
    let i = 0;
    while (i <= lineNum) {
        lines.push(
            shuffle(id.split(''))
                .map(element => btoa(element).replace(/==/, ''))
                .join('').split('')
                .map(element => convertbase(element, 16, 8) * ((Math.floor(Math.random() * 101)) - 1))
                .map(element => parseInt(element.toString().replace(/-/g, '')))
                .join(' ') + (i === lineNum ? '' : '\n')
        );
        i++
    }
    return lines.join('');
}