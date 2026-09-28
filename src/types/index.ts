export interface UploadedFile {
    filename: string,
    originalName: string,
    size: number,
    uploadedAt: Date
}

export interface UploadResponse {
    success: boolean,
    file?: UploadedFile,
    error?: string
}

export interface Skill {
    name: string,
    category: string
}

export interface Project {
    title: string
    description: string
    skills: string[]
}

export interface Experience {
    companyName: string
    position: string
    description: string 
    startDate?: Date
    endDate?: Date
    skills: string[]
}

export interface ResumeData {
    skills: Skill[]
    projects: Project[]
    experiences: Experience[]
}