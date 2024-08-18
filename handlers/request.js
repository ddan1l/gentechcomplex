import path from "node:path"

import { handleApprove } from "./approve.js";
import { handleAsset } from "./asset.js";
import { handleSubmit } from "./submit.js";
import { handleWaiting } from "./waiting.js";
import { handlePay } from "./pay.js";


const handlers = {
    POST: {
        '/submit': handleSubmit
    },
    GET: {
        '/about': handleAsset.bind({ asset: 'about.html' }),
        '/personal-processing': handleAsset.bind({ asset: 'personal-processing.html' }),
        '/privacy-policy': handleAsset.bind({ asset: 'privacy-policy.html' }),
        '/public-offer': handleAsset.bind({ asset: 'public-offer.html' }),
        '/approve': handleApprove,
        '/waiting': handleWaiting,
        '/pay': handlePay,
        '/': handleAsset.bind({ asset: 'index.html' }),

    }
}

const handlerKeys = [...Object.keys(handlers.POST), ...Object.keys(handlers.GET)]


export const handleRequest = async (request, response) => {
    request.on('error', () => {
        response.statusCode = 400;
        response.end();
    });

    const handler = handlerKeys.find(key => request.url.startsWith(key))

    if (handlers[request.method] && request.url.startsWith('/assets')) {
        await handleAsset.bind({
            asset: request.url.split('/')[2],
            folder: path.join('dist', 'assets')
        })(request, response)

    } else if (handlers[request.method] && handler) {
        await handlers[request.method][handler](request, response)
    } else {
        response.statusCode = 404;
        response.end();
    }
}