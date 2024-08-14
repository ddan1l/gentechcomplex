import {MongoClient} from "mongodb"


const mongoClient = new MongoClient(process.env.MONGO_URL);
const dbName = process.env.MONGO_DB_NAME;

let db = null

export const dbConnect = async () => {
    try {
        await mongoClient.connect();
        db = mongoClient.db(dbName);
    } catch (e) {
        console.log(e)
    }
}

export const dbClose = () => {
    //mongoClient.close()
}

export default () => db