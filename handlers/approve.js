import querystring from "node:querystring"
import db from "../services/db.js";
import {handleAsset} from "./asset.js";

export const handleApprove = async (request, response) => {
    const params = querystring.parse(request.url.replace('/approve?', ''))

    if (!params?.uuid) {
        response.writeHead(404);
    } else {
        const applications = db().collection('applications')

        const application = await applications.findOne({uuid: params.uuid})

        if (!application) {
            response.writeHead(404, {"Content-Type": "text/plain"});
            response.end("Application Not found");
        } else {
            handleAsset.bind({asset: 'approve.html'})(request, response)
        }
    }
}