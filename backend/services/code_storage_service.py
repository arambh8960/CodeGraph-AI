from database.mongo_db import (
    get_collection
)

from services.chunking_service import (
    create_chunks
)


async def save_code_files(
    repo_name,
    code_files
):

    collection = get_collection(
        "code_files"
    )

    documents = []

    for file in code_files:

        chunks = create_chunks(
            file["content"]
        )

        for index, chunk in enumerate(
            chunks
        ):

            documents.append(
                {
                    "repo_name": repo_name,
                    "file_path": file["file_path"],
                    "chunk_id": index,
                    "content": chunk
                }
            )

    if documents:

        await collection.insert_many(
            documents
        )

        print(
            "TOTAL CHUNKS SAVED =",
            len(documents)
        )