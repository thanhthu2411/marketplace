interface UploadedFile {
    filename: string,
    originalName: string,
    size: string,
    uploadedAt: Date
}

interface UploadResponse {
    success: boolean,
    file: string,
    error: string
}