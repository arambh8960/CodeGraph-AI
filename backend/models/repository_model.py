from pydantic import BaseModel
from typing import List


class RepositoryRequest(BaseModel):
    repo_url: str


class RepositoryResponse(BaseModel):
    status: str
    repo_name: str
    file_count: int
    folder_count: int
    technologies: List[str]
    tree: List[str]
    summary: str
    message: str