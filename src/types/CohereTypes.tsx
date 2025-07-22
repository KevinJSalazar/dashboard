import type { AssistantMessageResponse } from "cohere-ai/api";

export interface CohereResponse {
  id: string;
  message: AssistantMessageResponse;
  usage?: Usage | undefined;
}

export interface Usage {
  billed_units: Billedunits;
  tokens: Billedunits;
}

export interface Billedunits {
  input_tokens: number;
  output_tokens: number;
}

export interface Message {
  role: string;
  content: Content[];
}

export interface Content {
  type: string;
  text: string;
}