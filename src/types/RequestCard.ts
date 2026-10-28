export interface RequestCard {
    id: number;
    roomName: string;
    computerNumber: string;
    requestType: string;
    description: string;
    status: string;
    dueDate: string;
    createdAt: string;
    currentResponsibleId: number | null;
    currentResponsibleName: string | null;
}