'use server';
/**
 * @fileOverview An AI assistant flow for customers to troubleshoot their issues.
 *
 * - customerAiTroubleshootingChat - A function that handles the AI troubleshooting chat process.
 * - CustomerAiTroubleshootingChatInput - The input type for the customerAiTroubleshootingChat function.
 * - CustomerAiTroubleshootingChatOutput - The return type for the customerAiTroubleshootingChat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CustomerAiTroubleshootingChatInputSchema = z.object({
  message: z.string().describe('The current message from the customer.'),
  chatHistory: z
    .array(
      z.object({
        role: z.enum(['user', 'model']).describe('The role of the message sender (user or model).'),
        content: z.string().describe('The content of the message.'),
      })
    )
    .optional()
    .describe('Optional: Previous messages in the conversation to maintain context.'),
});
export type CustomerAiTroubleshootingChatInput = z.infer<
  typeof CustomerAiTroubleshootingChatInputSchema
>;

const CustomerAiTroubleshootingChatOutputSchema = z.object({
  response: z.string().describe('The AI assistant\'s response.'),
});
export type CustomerAiTroubleshootingChatOutput = z.infer<
  typeof CustomerAiTroubleshootingChatOutputSchema
>;

export async function customerAiTroubleshootingChat(
  input: CustomerAiTroubleshootingChatInput
): Promise<CustomerAiTroubleshootingChatOutput> {
  return customerAiTroubleshootingChatFlow(input);
}

const prompt = ai.definePrompt({
  name: 'customerAiTroubleshootingChatPrompt',
  input: {schema: CustomerAiTroubleshootingChatInputSchema},
  output: {schema: CustomerAiTroubleshootingChatOutputSchema},
  prompt: `You are an intelligent AI Assistant for tech support and field service. Your goal is to help customers troubleshoot their issues.
Understand the user's problem, ask clarifying questions if needed, and suggest step-by-step troubleshooting solutions.
Keep your responses concise and to the point. If you need more information, ask clarifying questions.

{{#if chatHistory}}
  {{#each chatHistory}}
    {{#if (eq role "user")}}User: {{content}}
    {{else}}AI Assistant: {{content}}
    {{/if}}
  {{/each}}
{{/if}}

User: {{{message}}}
AI Assistant:`,
});

const customerAiTroubleshootingChatFlow = ai.defineFlow(
  {
    name: 'customerAiTroubleshootingChatFlow',
    inputSchema: CustomerAiTroubleshootingChatInputSchema,
    outputSchema: CustomerAiTroubleshootingChatOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
