export type messageType={
    id: number,
    createdAt: string,
    authorName: string,
    authorRole: "Teacher" | "Responsible",
    description: string,
    visibility: "Public" | "Internal"
}