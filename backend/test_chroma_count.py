from database.chroma_db import (
    collection
)

print(
    "TOTAL RECORDS =",
    collection.count()
)