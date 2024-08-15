export async function POST(request: Request) {
  const body = request.json()

  // todo Check if body has email then add to database
  if(!("email" in body)) {
    return Response.json({}, {status: 404, statusText: "Body Missing Field"});
  }

  return Response.json({test: "hello"}, {status: 200});
}