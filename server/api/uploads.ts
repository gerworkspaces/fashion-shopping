import { readMultipartFormData, getQuery } from 'h3';
import { defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
    const formData = await readMultipartFormData(event);
    const file = formData?.find((field) => field.type === 'file');

    if (!file) {
        return { error: 'No file uploaded' };
    }

    const storage = useStorage();
    const saved = await storage.setItemRaw(`/uploads/${file.filename}`, file.data);

    return {
        message: 'File uploaded',
        url: `/uploads/${file.filename}`
    };
});
