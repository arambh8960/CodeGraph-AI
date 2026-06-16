"""
Chunking Service

Splits source code files into
line-based chunks for RAG retrieval.
"""


def create_chunks(
    content,
    chunk_size=100
):
    """
    Split code into chunks of N lines.

    Example:

    250 lines file
    ↓

    Chunk 1 = lines 1-100
    Chunk 2 = lines 101-200
    Chunk 3 = lines 201-250
    """

    if not content:
        return []

    lines = content.splitlines()

    chunks = []

    for i in range(
        0,
        len(lines),
        chunk_size
    ):

        chunk_lines = lines[
            i:i + chunk_size
        ]

        chunk = "\n".join(
            chunk_lines
        )

        chunks.append(
            chunk
        )

    return chunks