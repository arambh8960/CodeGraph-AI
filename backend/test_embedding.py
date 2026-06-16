from services.embedding_service import (
    generate_embedding
)


vector = generate_embedding(
    "authentication login user"
)

print(
    "VECTOR SIZE =",
    len(vector)
)

print(
    vector[:10]
)