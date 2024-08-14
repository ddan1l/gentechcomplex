import querystring from "node:querystring"
import db from "../services/db.js";
import {handleAsset} from "./asset.js";

export const handleWaiting = async (request, response) => {
    const params = querystring.parse(request.url.replace('/waiting?', ''))
    const error = () => {
        response.writeHead(404);
        response.end("Application Not found")
    }

    if (!params?.uuid) {
        error()
    } else {
        try {

            const applications = db().collection('applications')

            const res = await applications.findOne({uuid: params.uuid})

            if (!res) {
                error()
            }

            handleAsset.bind({asset: 'waiting.html'})(request, response)
            
        } catch (e) {
            console.log(e)
            error()
        }
    }
}