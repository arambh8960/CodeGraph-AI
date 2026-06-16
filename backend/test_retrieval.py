import asyncio

from services.retrieval_service import (
    retrieve_relevant_files
)

from database.mongo_db import (
    connect_to_mongo,
    close_mongo_connection
)


async def main():

    await connect_to_mongo()

    results = await retrieve_relevant_files(
        "flask",
        "session authentication login"
    )

    print(
        "FILES FOUND =",
        len(results)
    )

    for file in results:

        print(
            file["file_path"],
            file["score"]
        )

    await close_mongo_connection()


asyncio.run(main())