from database.mongo_db import get_collection


async def save_repository_analysis(data):

    collection = get_collection(
        "repositories"
    )

    await collection.insert_one(data)


async def get_repository_by_url(
    repo_url
):

    collection = get_collection(
        "repositories"
    )

    return await collection.find_one(
        {
            "repo_url": repo_url
        }
    )