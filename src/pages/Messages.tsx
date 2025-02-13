
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserAvatar } from "@/components/UserAvatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";
import { Conversation, Message } from "@/types/message";

// Données de test
const mockConversations: Conversation[] = [
  {
    id: "1",
    participantId: "2",
    participantName: "Alice Martin",
    participantAvatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    lastMessage: "Super concert hier soir !",
    lastMessageDate: "2024-02-20T10:30:00Z",
    unreadCount: 2
  },
  {
    id: "2",
    participantId: "3",
    participantName: "Thomas Dubois",
    participantAvatar: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7",
    lastMessage: "Tu as écouté le dernier album ?",
    lastMessageDate: "2024-02-19T15:45:00Z",
    unreadCount: 0
  }
];

const mockMessages: Message[] = [
  {
    id: "1",
    senderId: "2",
    receiverId: "1",
    content: "Super concert hier soir !",
    timestamp: "2024-02-20T10:30:00Z",
    read: true
  },
  {
    id: "2",
    senderId: "1",
    receiverId: "2",
    content: "Oui, c'était incroyable !",
    timestamp: "2024-02-20T10:31:00Z",
    read: true
  }
];

const Messages = () => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    // Logique d'envoi de message à implémenter
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Liste des conversations */}
      <div className="w-full md:w-80 border-r">
        <div className="p-4 border-b">
          <div className="flex items-center space-x-4">
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <h2 className="text-xl font-bold">Messages</h2>
          </div>
        </div>
        <ScrollArea className="h-[calc(100vh-73px)]">
          {mockConversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedConversation(conversation)}
              className={`w-full p-4 flex items-center space-x-4 hover:bg-accent transition-colors ${
                selectedConversation?.id === conversation.id ? "bg-accent" : ""
              }`}
            >
              <UserAvatar
                user={{
                  username: conversation.participantName,
                  avatarUrl: conversation.participantAvatar
                }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline">
                  <p className="font-medium truncate">{conversation.participantName}</p>
                  <span className="text-xs text-muted-foreground">
                    {new Date(conversation.lastMessageDate).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
              </div>
              {conversation.unreadCount > 0 && (
                <span className="bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {conversation.unreadCount}
                </span>
              )}
            </button>
          ))}
        </ScrollArea>
      </div>

      {/* Zone de conversation */}
      {selectedConversation ? (
        <div className="flex-1 flex flex-col">
          <div className="p-4 border-b">
            <div className="flex items-center space-x-4">
              <UserAvatar
                user={{
                  username: selectedConversation.participantName,
                  avatarUrl: selectedConversation.participantAvatar
                }}
              />
              <h2 className="font-medium">{selectedConversation.participantName}</h2>
            </div>
          </div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              {mockMessages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.senderId === "1" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[70%] rounded-lg p-3 ${
                      message.senderId === "1"
                        ? "bg-primary text-primary-foreground"
                        : "bg-accent"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p className="text-xs opacity-70 mt-1">
                      {new Date(message.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
          <div className="p-4 border-t">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex space-x-2"
            >
              <Input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Écrivez votre message..."
                className="flex-1"
              />
              <Button type="submit" size="icon">
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          Sélectionnez une conversation pour commencer à discuter
        </div>
      )}
    </div>
  );
};

export default Messages;
