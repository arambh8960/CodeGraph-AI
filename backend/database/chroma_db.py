import chromadb


client = chromadb.PersistentClient(
    path="./chroma_db"
)#Ye local database create karega.


collection = client.get_or_create_collection(
    name="repository_chunks"
)