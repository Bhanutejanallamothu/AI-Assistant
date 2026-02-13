'use server';
/**
 * @fileOverview A Genkit flow that generates a detailed solution checklist for field technicians.
 *
 * - generateTechnicianSolutionChecklist - A function that handles the generation of the solution checklist.
 * - TechnicianSolutionChecklistInput - The input type for the generateTechnicianSolutionChecklist function.
 * - TechnicianSolutionChecklistOutput - The return type for the generateTechnicianSolutionChecklist function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const TechnicianSolutionChecklistInputSchema = z.object({
  issueTitle: z.string().describe('The title of the support issue.'),
  issueDescription: z.string().describe('A detailed description of the customer\'s reported issue.'),
  aiSummary: z.string().describe('An AI-generated summary of the issue.'),
  aiSuggestedFix: z.string().describe('An AI-generated suggestion for a quick fix or initial troubleshooting step.'),
});
export type TechnicianSolutionChecklistInput = z.infer<typeof TechnicianSolutionChecklistInputSchema>;

const TechnicianSolutionChecklistOutputSchema = z.object({
  checklist: z.array(z.string()).describe('A detailed, step-by-step checklist for diagnosing and resolving the issue.'),
});
export type TechnicianSolutionChecklistOutput = z.infer<typeof TechnicianSolutionChecklistOutputSchema>;

export async function generateTechnicianSolutionChecklist(
  input: TechnicianSolutionChecklistInput
): Promise<TechnicianSolutionChecklistOutput> {
  return technicianSolutionChecklistFlow(input);
}

const technicianSolutionChecklistPrompt = ai.definePrompt({
  name: 'technicianSolutionChecklistPrompt',
  input: { schema: TechnicianSolutionChecklistInputSchema },
  output: { schema: TechnicianSolutionChecklistOutputSchema },
  prompt: `You are an expert field technician AI assistant. Your task is to generate a detailed, step-by-step solution checklist for a field technician based on the provided customer issue and prior AI analysis. The checklist should be actionable, clear, and comprehensive to guide the technician in diagnosing and resolving the problem efficiently on-site.

Customer Issue Title: {{{issueTitle}}}
Customer Issue Description: {{{issueDescription}}}
AI Summary of Issue: {{{aiSummary}}}
AI Suggested Initial Fix/Troubleshooting: {{{aiSuggestedFix}}}

Based on this information, provide a step-by-step solution checklist:
`,
});

const technicianSolutionChecklistFlow = ai.defineFlow(
  {
    name: 'technicianSolutionChecklistFlow',
    inputSchema: TechnicianSolutionChecklistInputSchema,
    outputSchema: TechnicianSolutionChecklistOutputSchema,
  },
  async (input) => {
    const { output } = await technicianSolutionChecklistPrompt(input);
    return output!;
  }
);
