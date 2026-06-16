from database.chroma_db import client

client.delete_collection(
    "repository_chunks"
)

print(
    "COLLECTION DELETED"
)