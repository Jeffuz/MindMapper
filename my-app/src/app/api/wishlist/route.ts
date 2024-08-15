export async function POST(request: Request) {
  const body = request.json()

  // todo Check if body has email then add to database
  
  return Response.json({test: "hello"});
}