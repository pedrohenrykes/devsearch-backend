module.exports = function parseStringToArray(arrayToString) {
    return arrayToString.split(',').map(tech => tech.trim());
}