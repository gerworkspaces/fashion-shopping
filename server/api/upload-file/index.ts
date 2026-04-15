// import multer from 'multer';
// import { readMultipartFormData, H3Event } from 'h3';

// const upload = multer({ dest: 'public/uploads/' });

// export default defineEventHandler(async (event: H3Event) => {
//   const formData = await readMultipartFormData(event);
//   const file = formData?.find(f => f.type === 'file');

//   if (!file) {
//     return { error: 'No file uploaded' };
//   }

//   const filePath = `/uploads/${file.filename}`;
//   return { message: 'Upload success', path: filePath };
// });

export default defineEventHandler(async (event) => {
    const { files } = await readBody<{ files: File[] }>(event);

    for (const file of files) {
        await storeFileLocally(file, file.name, "/images");
    }

    return "success!";
});

interface File {
    name: string;
    content: string;
}
