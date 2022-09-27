import { Timestamp } from "firebase/firestore";

export default interface ChatMessageI {
    id?: string;
    userEmail:string|undefined;
    time:Timestamp | undefined;
    message:string|undefined;
}
