const { getSchoolModel } = require("../lib/admindb");

exports.findOrCreate = async(data) => {
    const { rut, name, email, } = data;
    const schoolModel = await getSchoolModel();
    const doc = await schoolModel.findOneAndUpdate({ rut: rut }, { rut: rut, name: name, email: email });
    if (!doc) {
        const school = new schoolModel({ rut: rut, name: name, email: email });
        await school.save();
        return school;
    }
    return doc;
}