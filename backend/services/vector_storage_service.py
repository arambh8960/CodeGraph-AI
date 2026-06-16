from database.chroma_db import (
    collection
)

from services.embedding_service import (
    generate_embedding
)

from services.chunking_service import (
    create_chunks
)


def save_embeddings(
    repo_name,
    code_files
):

    ids = []
    documents = []
    embeddings = []
    metadatas = []

    vector_count = 0

    for file in code_files:

        chunks = create_chunks(
            file["content"]
        )

        for chunk_index, chunk in enumerate(
            chunks
        ):

            chunk_id = (
                f"{repo_name}_"
                f"{file['file_path']}_"
                f"{chunk_index}"
            )

            embedding = generate_embedding(
                chunk
            )

            ids.append(
                chunk_id
            )

            documents.append(
                chunk
            )

            embeddings.append(
                embedding
            )

            metadatas.append(
                {
                    "repo_name": repo_name,
                    "file_path": file[
                        "file_path"
                    ],
                    "chunk_id": chunk_index
                }
            )

            vector_count += 1

    collection.add(
        ids=ids,
        documents=documents,
        embeddings=embeddings,
        metadatas=metadatas
    )

    print(
        "TOTAL VECTORS SAVED =",
        vector_count
    )