"use client";

import { Identity } from "@semaphore-protocol/identity";
import { Group } from "@semaphore-protocol/group";
import { generateProof, verifyProof } from "@semaphore-protocol/proof";

function useZkProof() {
  async function generate() {
    const identity = new Identity();

    const group = new Group([identity.commitment]);

    const message = "Hello world";
    const scope = "Semaphore";

    const proof = await generateProof(identity, group, message, scope, 12);

    console.log("This works:", await verifyProof(proof));
    return proof;
  }

  return { generate };
}
export function ZkProof() {
  const { generate } = useZkProof();
  return (
    <button
      onClick={async () => {
        const proof = await generate();

        await fetch("/api", {
          method: "POST",
          body: JSON.stringify({ proof }),
          headers: { "content-type": "application/json" },
        });
      }}
    >
      Send proof
    </button>
  );
}
