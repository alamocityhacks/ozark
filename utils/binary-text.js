module.exports = (str) => {
    str = str.toString('ascii');
    return str.split(" ").map(function(elem) {
        return String.fromCharCode(parseInt(elem, 2));
    }).join("")
}