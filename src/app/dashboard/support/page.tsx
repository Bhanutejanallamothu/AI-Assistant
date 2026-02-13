'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { AiChatPanel } from '@/components/tickets/ai-chat-panel';
import { LifeBuoy, MessageSquare, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';


const faqItems = [
  {
    question: 'How do I reset my password?',
    answer:
      'You can reset your password by going to the login page and clicking on the "Forgot your password?" link. You will receive an email with instructions on how to reset it.',
  },
  {
    question: 'How do I create a new support ticket?',
    answer:
      'You can create a new support ticket from your dashboard. Click on the "New Request" or "New Ticket" button, fill out the form with the details of your issue, and submit it.',
  },
  {
    question: 'What is the average response time?',
    answer:
      'Our average response time for new tickets is 2-4 business hours. Urgent requests are typically addressed within 1 hour.',
  },
  {
    question: 'How can I track the status of my ticket?',
    answer:
      'You can track the status of your submitted tickets from the "My Requests" or "All Tickets" page on your dashboard. You will also receive email notifications when the status changes.',
  },
];


export default function SupportPage() {
  const { toast } = useToast();

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: 'Message Sent',
      description: 'Our support team will get back to you shortly.',
    });
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="text-center">
        <LifeBuoy className="mx-auto h-12 w-12 text-primary" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight font-headline">Support Center</h1>
        <p className="mt-2 text-muted-foreground">
          We're here to help. Find answers to your questions or get in touch with our team.
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                  <AccordionTrigger>{item.question}</AccordionTrigger>
                  <AccordionContent>{item.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Contact Support
            </CardTitle>
            <CardDescription>
                Can't find what you're looking for? Send us a message.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleContactSubmit}>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your Name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="your@email.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="How can we help you?" />
              </div>
              <Button type="submit" className="w-full">Send Message</Button>
            </form>
          </CardContent>
        </Card>
      </div>
      
      <Card>
          <CardHeader>
              <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  AI Troubleshooting Assistant
              </CardTitle>
              <CardDescription>
                  Get instant help from our AI assistant for quick diagnostics.
              </CardDescription>
          </CardHeader>
          <CardContent>
              <AiChatPanel ticketId="support-chat" />
          </CardContent>
      </Card>
    </div>
  );
}
