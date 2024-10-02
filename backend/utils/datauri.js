import DataUriParser from "datauri/parser.js"

import path from "path";

const getDataUri = (file) => {
    const parser = new DataUriParser();

// this is i add
 // Check if file is defined and has required properties
 if (!file || !file.originalname || !file.buffer) {
    throw new Error('Invalid file object. Ensure the file is correctly uploaded.');
}
///

    const extName = path.extname(file.originalname).toString();
    return parser.format(extName, file.buffer);
}

export default getDataUri;