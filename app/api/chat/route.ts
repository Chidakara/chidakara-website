export async function POST(req: Request) {

  const body = await req.json();

  const messages = body.messages || [];

  const latestMessage =
    messages[messages.length - 1]?.content || "";

  let response =
    "Chidakara specializes in AI automation, intelligent workflows, AI infrastructure, dashboards, and enterprise AI systems.";

  if (
    latestMessage.toLowerCase().includes("automation")
  ) {

    response =
      "We build AI automation systems for businesses including workflow automation, AI agents, and intelligent dashboards.";

  }

  if (
    latestMessage.toLowerCase().includes("website")
  ) {

    response =
      "Chidakara develops premium AI-powered websites and scalable SaaS platforms.";

  }

  return Response.json({
    message: response,
  });

}