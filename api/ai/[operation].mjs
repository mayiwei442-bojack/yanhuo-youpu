import { createAiService } from "../../src/server/ai-service.mjs";

const aiService = createAiService(process.env);

export const config = {
  maxDuration: 60
};

export default async function handler(request, response) {
  const queryOperation = Array.isArray(request.query?.operation)
    ? request.query.operation[0]
    : request.query?.operation;
  const pathOperation = new URL(request.url || "/", "https://yanhuo-youpu.invalid").pathname
    .split("/")
    .filter(Boolean)
    .at(-1);
  return aiService.handleRoute(request, response, queryOperation || pathOperation || "");
}
