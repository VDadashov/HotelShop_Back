export declare enum ResourceType {
    IMAGE = "image",
    VIDEO = "video",
    RAW = "raw"
}
export declare class DeleteFileDto {
    publicId: string;
    resourceType?: ResourceType;
}
