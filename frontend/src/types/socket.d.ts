export interface ClientToServerEvents {
  join: (conversationId: string) => void;
  send_message: (data: {
    conversation_id: string;
    sender_id: string;
    text?: string;
    images?: string[];
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

  error_message: (msg: string) => void;
}
