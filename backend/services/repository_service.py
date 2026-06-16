import os
import shutil
from git import Repo

from services.repository_summary_service import (
    generate_repository_summary
)
from services.ai_summary_service import (
    generate_ai_summary
)
from services.code_reader_service import (
    extract_code_files
)


def extract_repo_name(
    repo_url: str
):

    clean_url = repo_url.split("?")[0]

    return clean_url.rstrip(
        "/"
    ).split("/")[-1]


def detect_tech_stack(repo_path):

    technologies = set()

    for root, dirs, files in os.walk(
        repo_path
    ):

        if "package.json" in files:
            technologies.add(
                "Node.js"
            )

        if "requirements.txt" in files:
            technologies.add(
                "Python"
            )

        if "pom.xml" in files:
            technologies.add(
                "Java"
            )

        if "Cargo.toml" in files:
            technologies.add(
                "Rust"
            )

        if "go.mod" in files:
            technologies.add(
                "Go"
            )

        for file in files:

            if file.endswith(".jsx"):
                technologies.add(
                    "React"
                )

            if file.endswith(".tsx"):
                technologies.add(
                    "React"
                )
                technologies.add(
                    "TypeScript"
                )

            if file.endswith(".ts"):
                technologies.add(
                    "TypeScript"
                )

            if file.endswith(".py"):
                technologies.add(
                    "Python"
                )

            if file.endswith(".java"):
                technologies.add(
                    "Java"
                )

            if file.endswith(".go"):
                technologies.add(
                    "Go"
                )

            if file.endswith(".rs"):
                technologies.add(
                    "Rust"
                )

    return list(
        technologies
    )


def generate_repository_tree(
    repo_path
):

    tree = []

    for root, dirs, files in os.walk(
        repo_path
    ):

        dirs[:] = [
            d for d in dirs
            if d != ".git"
        ]

        relative_path = os.path.relpath(
            root,
            repo_path
        )

        if relative_path != ".":

            tree.append(
                relative_path + "/"
            )

        for file in files:

            if relative_path == ".":

                file_path = file

            else:

                file_path = os.path.join(
                    relative_path,
                    file
                )

            tree.append(
                file_path
            )

        if len(tree) >= 100:
            break

    return tree


def get_repository_stats(
    repo_path
):

    file_count = 0
    folder_count = 0

    for root, dirs, files in os.walk(
        repo_path
    ):

        folder_count += len(
            dirs
        )

        file_count += len(
            files
        )

    return (
        file_count,
        folder_count
    )


def clone_repository(
    repo_url: str
):

    # Remove query parameters
    repo_url = repo_url.split(
        "?"
    )[0]

    print(
        "INSIDE SERVICE =",
        repr(repo_url)
    )

    repo_name = extract_repo_name(
        repo_url
    )

    # Store repositories outside root repo folder
    base_dir = "data/repositories"

    os.makedirs(
        base_dir,
        exist_ok=True
    )

    repo_path = os.path.join(
        base_dir,
        repo_name
    )

    if os.path.exists(
        repo_path
    ):

        shutil.rmtree(
            repo_path
        )

    print(
        "BEFORE CLONE"
    )

    Repo.clone_from(
        repo_url,
        repo_path,
        depth=1
    )

    print(
        "AFTER CLONE"
    )

    file_count, folder_count = (
        get_repository_stats(
            repo_path
        )
    )

    technologies = (
        detect_tech_stack(
            repo_path
        )
    )

    tree = generate_repository_tree(
        repo_path
    )

    code_files = extract_code_files(
        repo_path
    )

    readme_content = (
        generate_repository_summary(
            repo_path
        )
    )

    ai_summary = generate_ai_summary(
        readme_content
    )

    return {
        "repo_name": repo_name,
        "repo_path": repo_path,
        "file_count": file_count,
        "folder_count": folder_count,
        "technologies": technologies,
        "tree": tree,
        "summary": ai_summary,
        "code_files": code_files
    }