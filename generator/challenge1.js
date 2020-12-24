module.exports = (groupid, challenge) => {
    return (groupid + challenge + '\n').repeat(27)
}