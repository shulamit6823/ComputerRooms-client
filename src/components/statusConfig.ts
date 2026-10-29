import type { RequestStatus } from "../types/RequestStatus";

const statusConfig: Record<RequestStatus, { label: string; bg: string; fg: string }> = {
    Pending: { label: 'ממתינה לטיפול', bg: '#fdecea', fg: '#c62828' },
    InProgress: { label: 'בטיפול', bg: '#fff3e0', fg: '#e65100' },
    Finished: { label: 'הסתיימה', bg: '#e8f5e9', fg: '#2e7d32' },
};
export default statusConfig