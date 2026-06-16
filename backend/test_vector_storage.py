from services.vector_storage_service import (
    save_embeddings
)

chunks = [
    {
        "file_path": "auth.py",
        "content": """
def login():
    pass
"""
    },
    {
        "file_path": "user.py",
        "content": """
def get_user():
    pass
"""
    }
]

save_embeddings(
    "test_repo",
    chunks
)