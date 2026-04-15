import { postData } from "./api-service";

export class UploadService {
    uploadFile(data: any) {
        return postData("/upload-file", data);
    }
}