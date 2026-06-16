
from database.chroma_db import collection
from services.embedding_service import generate_embedding


async def retrieve_relevant_files(repo_name, question):

    question_embedding = generate_embedding(question)

    results = collection.query(
        query_embeddings=[question_embedding],
        n_results=15,
        where={
            "repo_name": repo_name
        }
    )

    documents = results["documents"][0]
    metadatas = results["metadatas"][0]
    distances = results["distances"][0]

    ranked_chunks = []

    for doc, metadata, distance in zip(
        documents,
        metadatas,
        distances
    ):

        file_path = metadata["file_path"].lower()

        adjusted_score = distance

        # Penalize test files
        if (
            "test" in file_path
            or "/tests/" in file_path
            or "spec" in file_path
        ):
            adjusted_score += 1.0

        # Penalize generated/static files
        if (
            "swagger-ui" in file_path
            or "bundle.js" in file_path
            or ".min.js" in file_path
            or "/dist/" in file_path
            or "/build/" in file_path
        ):
            adjusted_score += 1.0

        # Boost important backend files
        if "/services/" in file_path:
            adjusted_score -= 0.4

        if "/routes/" in file_path:
            adjusted_score -= 0.4

        if "/routers/" in file_path:
            adjusted_score -= 0.4

        if "/controllers/" in file_path:
            adjusted_score -= 0.4

        if "/api/" in file_path:
            adjusted_score -= 0.3

        if "/auth/" in file_path:
            adjusted_score -= 0.3

        if "/models/" in file_path:
            adjusted_score -= 0.2

        if "/core/" in file_path:
            adjusted_score -= 0.2

        ranked_chunks.append(
            {
                "file_path": metadata["file_path"],
                "content": doc,
                "score": adjusted_score
            }
        )

    ranked_chunks.sort(
        key=lambda x: x["score"]
    )

    print("\nRERANKED CHUNKS:\n")

    for chunk in ranked_chunks[:8]:

        print(
            chunk["file_path"],
            "=>",
            round(chunk["score"], 4)
        )

    return ranked_chunks[:8]

