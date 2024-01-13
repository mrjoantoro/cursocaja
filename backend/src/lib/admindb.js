const User = require('../api/models/User');
const School = require('../api/models/School');
const { dbConnect } = require('../utils/dbConnection');
const config = require("../config");

const urlBase = config.db.urlBase;
const urlTenant = config.db.urlTenant;
const dbConnections = {};
let database;

const getDb = async () => {
    return database ? database : await dbConnect(urlBase);
};

const getTenantDB = async (tenant) => {
    const dbName = `tenant-${tenant}`;
    if (!dbConnections[dbName]) {
        const tenantUrlComplete = `${urlTenant}/${dbName}`;
        dbConnections[dbName] = await dbConnect(tenantUrlComplete);
    }
    return dbConnections[dbName];
};

exports.getSchoolModel = async () => {
    const adminDb = await getDb();
    return adminDb.model("School", School.schema);
};

exports.getUserModel = async (tenant) => {
    const tenantDb = await getTenantDB(tenant);
    return tenantDb.model("User", User.schema);
}