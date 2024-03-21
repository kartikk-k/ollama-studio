type Model = {
    id: string;
    name: string;
    modelFile: string;
  };
  
  type Thread = {
    id: string;
    title: string;
    createdAt: Date;
  };
  
  type Chat = {
    id: string;
    chatId: string; // chatId is the id of the chat (collection of interactions)
    model: string;
    question: string;
    response: string;
    createdAt: Date;
    responseTime: number;
    starred: boolean;
  };