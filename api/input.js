var getInput = require('../utils/getinput');

module.exports = async (req, res) => {
    if (req.query.groupid && req.query.challenge) {
        const {
            query: {groupid, challenge}
        } = req
        const input = await getInput(groupid, parseInt(challenge));
        res.json({
            status: 200,
            message: `Here's your input`,
            req: req.query,
            res: {
                input: input
            },
        });
    } else {
        res.json({
            status: 400,
            message: `Malformed request.`,
            req: req.query,
        });
    }
}