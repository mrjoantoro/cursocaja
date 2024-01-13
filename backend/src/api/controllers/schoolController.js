const schoolService = require("../../services/schoolService");

exports.create = async (req, res) => {
    try {
        const data = req.body;
        const school = await schoolService.findOrCreate(data);
        res.status(200).json(school);
    } catch (error) {
        res.status(500).json(error.message);
    }
}