export interface ClientToServerEvents {
  join: ({
    conversation_id,
    userId,
  }: {
    conversation_id: string;
    userId: string;
  }) => void;
  send_message: (data: {
    conversation_id: string;
    sender_id: string;
    text?: string;
    images?: string[];
  }) => void;
  remove_user: ({
    conversation_id,
    userId,
  }: {
    conversation_id: string;
    userId: string;
  }) => void;
}

export interface ServerToClientEvents {
  receive_message: (message: {
    _id: string;
    conversation_id: string;
    sender: string;
    text?: string;
    images?: string[];
    createdAt: string;
  }) => void;
  online_users: (users: string[]) => void;
  error_message: (msg: string) => void;
}
