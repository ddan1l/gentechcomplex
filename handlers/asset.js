import fs from "node:fs"
import path from "node:path"

const MIME_TYPES = {
    default: 'application/octet-stream',
    html: 'text/html; charset=UTF-8',
    js: 'application/javascript; charset=UTF-8',
    css: 'text/css',
    png: 'image/png',
    jpg: 'image/jpg',
    gif: 'image/gif',
    webm: 'video/webm',
    ico: 'image/x-icon',
    svg: 'image/svg+xml',
    webmanifest: 'application/manifest+json',
};

const pagesFolder = path.join('dist', 'pages')

export function handleAsset(request, response) {
    const filePath = path.join(this.folder || pagesFolder, this.asset)

    fs.exists(filePath, (exists) => {
        if (exists) {
            const ext = path.extname(filePath).substring(1).toLowerCase();

            response.writeHead(200, {
                "Content-Type": MIME_TYPES[ext],
                "Cache-Control": 'public, max-age=31536000'
            });

            fs.createReadStream(filePath).pipe(response);
            return;
        }

        response.writeHead(404, {"Content-Type": "text/plain"});
        response.end("Not found");
    });
}