import 'dotenv/config'
import {createServer} from "node:http"

import {handleRequest} from "./handlers/request.js";
import {dbClose, dbConnect} from "./services/db.js";

const port = process.env.PORT

async function main() {
    await dbConnect()

    const app = createServer(handleRequest).listen(port)

    console.log(`Server started at http://localhost:${app.address().port}`)
}

main()
    .catch(console.error)
    .finally(dbClose);
