import { client, assistant } from "../utils/openai";
import { getLatestMessage } from "../utils/get-message";

export default defineEventHandler(async (event) => {
  const threadID = getCookie(event, "thread-id");

  if (!threadID) {
    return;
  }

  const queryParams = getQuery(event);

  await client.beta.threads.messages.create(threadID, {
    role: "user",
    content: queryParams.message?.toString() ?? "",
  });

  const run = await client.beta.threads.runs.create(threadID, {
    assistant_id: assistant,

  });

  return await getLatestMessage(threadID, run.id);
});