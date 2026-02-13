'use client';

import * as React from 'react';
import { Bot, Paperclip, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { ScrollArea } from '../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { cn } from '@/lib/utils';
import { users } from '@/lib/data';

interface AiChatPanelProps {
  ticketId: string;
}

const initialMessages = [
    {
        id: '1',
        sender: { id: 'bot', name: 'AI Assistant', avatar: ''},
        content: 'Hello. I’m your support assistant. Please describe your issue, and I will help diagnose and guide you.',
        isBot: true,
        timestamp: new Date().toISOString()
    }
]

export function AiChatPanel({ ticketId }: AiChatPanelProps) {
  const [messages, setMessages] = React.useState(initialMessages);
  const [input, setInput] = React.useState('');
  const currentUser = users.find(u => u.role === 'Customer')!;


  const handleSend = () => {
    if (input.trim() === '') return;
    const newMessage = {
      id: String(messages.length + 1),
      sender: {id: currentUser.id, name: currentUser.name, avatar: currentUser.avatar},
      content: input,
      isBot: false,
      timestamp: new Date().toISOString()
    };
    setMessages([...messages, newMessage]);
    setInput('');
    // Simulate AI response
    setTimeout(() => {
        const aiResponse = {
            id: String(messages.length + 2),
            sender: { id: 'bot', name: 'AI Assistant', avatar: ''},
            content: 'Thank you for providing more details. Have you tried restarting your device? This often resolves common issues.',
            isBot: true,
            timestamp: new Date().toISOString()
        };
        setMessages(prev => [...prev, aiResponse]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-[60vh]">
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-3',
                !message.isBot && 'flex-row-reverse'
              )}
            >
              <Avatar className="h-8 w-8">
                {message.isBot ? (
                    <AvatarFallback><Bot className="h-5 w-5"/></AvatarFallback>
                ) : (
                    <>
                        <AvatarImage src={message.sender.avatar} />
                        <AvatarFallback>{message.sender.name.charAt(0)}</AvatarFallback>
                    </>
                )}
              </Avatar>
              <div
                className={cn(
                  'rounded-lg p-3 text-sm',
                  message.isBot
                    ? 'bg-muted'
                    : 'bg-primary text-primary-foreground'
                )}
              >
                <p>{message.content}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <div className="border-t p-4">
        <div className="relative">
          <Textarea
            placeholder="Describe your problem..."
            className="pr-16"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
            <Button type="button" size="icon" variant="ghost">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Button type="submit" size="icon" onClick={handleSend}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
