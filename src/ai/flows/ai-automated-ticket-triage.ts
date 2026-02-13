'use server';
/**
 * @fileOverview An AI agent for automated technical support ticket triage.
 *
 * - triageSupportTicket - A function that handles the automated ticket triage process.
 * - TicketTriageInput - The input type for the triageSupportTicket function.
 * - TicketTriageOutput - The return type for the triageSupportTicket function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const TicketTriageInputSchema = z.object({
  issueTitle: z.string().describe('The title of the support issue.'),
  issueDescription: z.string().describe('A detailed description of the support issue.'),
});
export type TicketTriageInput = z.infer<typeof TicketTriageInputSchema>;

const TicketCategorySchema = z.enum([
  'Software',
  'Hardware',
  'Network',
  'Account',
  'Installation',
  'Performance',
  'Security',
  'Billing',
  'Other'
]).describe('The category of the support issue. Choose from predefined categories.');

const TicketPrioritySchema = z.enum([
  'Low',
  'Medium',
  'High',
  'Urgent'
]).describe('The priority level of the support issue. Choose from predefined levels.');

const TicketTriageOutputSchema = z.object({
  category: TicketCategorySchema,
  priority: TicketPrioritySchema,
  summary: z.string().describe('A concise summary of the reported issue.'),
  troubleshootingSteps: z.array(z.string()).describe('A list of initial troubleshooting steps to resolve the issue.'),
});
export type TicketTriageOutput = z.infer<typeof TicketTriageOutputSchema>;

export async function triageSupportTicket(input: TicketTriageInput): Promise<TicketTriageOutput> {
  return aiAutomatedTicketTriageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'triageSupportTicketPrompt',
  input: {schema: TicketTriageInputSchema},
  output: {schema: TicketTriageOutputSchema},
  prompt: `You are an intelligent AI assistant specialized in technical support and field service ticket triage.\nYour task is to analyze a customer's support request, categorize it, assign a priority, summarize the problem, and suggest initial troubleshooting steps.\n\nCarefully read the issue title and description provided by the customer.\n\nIssue Title: {{{issueTitle}}}\nIssue Description: {{{issueDescription}}}\n\nBased on the information above, provide the following:\n1.  **Category**: Assign one of the following categories: ${TicketCategorySchema.options.map(o => `'${o}'`).join(', ')}.\n2.  **Priority**: Assign one of the following priority levels: ${TicketPrioritySchema.options.map(o => `'${o}'`).join(', ')}.\n3.  **Summary**: Create a concise, one or two-sentence summary of the core problem.\n4.  **Troubleshooting Steps**: List 3-5 initial, actionable troubleshooting steps that a customer or support agent can follow.\n\nEnsure your output strictly adheres to the JSON schema provided.`,
});

const aiAutomatedTicketTriageFlow = ai.defineFlow(
  {
    name: 'aiAutomatedTicketTriageFlow',
    inputSchema: TicketTriageInputSchema,
    outputSchema: TicketTriageOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('Failed to triage support ticket: No output from AI.');
    }
    return output;
  }
);
