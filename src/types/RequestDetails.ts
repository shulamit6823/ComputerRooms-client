import type { messageType } from "./messageType";
import type { RequestStatus } from "./RequestStatus";

export type RequestDetails= {
    id: number;
    roomName: string;
    computerNumber: number | null;
    requestType: string;
    status:RequestStatus ;
    dueDate: string;
    createdAt: string;
    currentResponsibleName: string | null;
    teacherName: string;
    teacherEmail: string;
    description: string;
    messages: messageType[];
};