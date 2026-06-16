from fastapi import APIRouter, HTTPException

from models.repository_model import (
    RepositoryRequest,
    RepositoryResponse
)

from services.repository_service import (
    clone_repository
)

from services.repository_db_service import (
    save_repository_analysis,
    get_repository_by_url
)
from services.code_storage_service import (
    save_code_files
)
from services.vector_storage_service import (
    save_embeddings
)

router = APIRouter(
    prefix="/api/repository",
    tags=["Repository"]
)


@router.post(
    "/analyze",
    response_model=RepositoryResponse
)
async def analyze_repository(
    repository: RepositoryRequest
):

    if not repository.repo_url.strip():
        raise HTTPException(
            status_code=400,
            detail="Repository URL is required"
        )

    print("REPO URL =", repository.repo_url)

    # Check if already analyzed
    existing_repo = await get_repository_by_url(
        repository.repo_url
    )

    if existing_repo:

        print("LOADED FROM DATABASE")

        return {
            "status": "success",
            "repo_name": existing_repo["repo_name"],
            "file_count": existing_repo["file_count"],
            "folder_count": existing_repo["folder_count"],
            "technologies": existing_repo["technologies"],
            "tree": existing_repo["tree"],
            "summary": existing_repo["summary"],
            "message": "Repository loaded from database"
        }

    # Analyze repository
    result = clone_repository(
        repository.repo_url
    )
    print(
    "TOTAL CODE FILES =",
    len(result["code_files"])
)

    # Save to MongoDB
    await save_repository_analysis(
        {
            "repo_url": repository.repo_url,
            "repo_name": result["repo_name"],
            "file_count": result["file_count"],
            "folder_count": result["folder_count"],
            "technologies": result["technologies"],
            "tree": result["tree"],
            "summary": result["summary"]
        }
    )
    await save_code_files(
    result["repo_name"],
    result["code_files"]
)
    save_embeddings(
    result["repo_name"],
    result["code_files"]
)

    print("SAVED TO DATABASE")

    return {
        "status": "success",
        "repo_name": result["repo_name"],
        "file_count": result["file_count"],
        "folder_count": result["folder_count"],
        "technologies": result["technologies"],
        "tree": result["tree"],
        "summary": result["summary"],
        "message": "Repository analyzed successfully"
    }
   