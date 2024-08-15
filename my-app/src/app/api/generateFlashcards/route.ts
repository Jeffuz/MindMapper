
export async function POST(request: Request) {
  const body = await request.json();

  if (!("subject" in body) || !("subjectTopic" in body)) {
    return Response.json({}, {status: 404, statusText: "Body Missing Values"})
  }

  // todo Generate OPEN AI responses

  return Response.json({body: [{
    cardQuestion: "What is powerhouse of the cell",
    cardAnswer: "Mitochondria",                                                      
  }, {
    cardQuestion: "what is a large organelle in the cytoplasm of eukaryotic cells that's made up of a network of sacs and tubules enclosed by a membrane?",
    cardAnswer: "Endoplasmic Reticulum",
  }]}, {status: 200});

}