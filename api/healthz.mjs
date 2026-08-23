import { createAiService } from "../src/server/ai-service.mjs";

const aiService = createAiService(process.env);

export default function handler(request, response) {
  return aiService.handleHealth(request, response);
}
