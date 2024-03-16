import { verifyProof } from "@semaphore-protocol/proof";

export async function POST(req: Request) {
  try {
    const { proof } = await req.json();

    console.log("Hangs after this");
    const isValid = await verifyProof(proof);

    console.log("This doesn't work", isValid);

    return Response.json({ isValid });
  } catch (error) {
    return Response.json({
      message: error,
    });
  }
}
