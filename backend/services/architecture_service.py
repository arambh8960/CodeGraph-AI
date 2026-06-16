import os


def analyze_architecture(repo_path):

    architecture = {}

    ignore_dirs = [
        ".git",
        "node_modules",
        "__pycache__",
        "dist",
        "build",
        ".next",
        "venv"
    ]

    for root, dirs, files in os.walk(repo_path):

        dirs[:] = [
            d for d in dirs
            if d not in ignore_dirs
        ]

        relative = os.path.relpath(
            root,
            repo_path
        )

        if relative == ".":
            continue

        architecture[relative] = {
            "file_count": len(files),
            "sample_files": files[:3]
        }

    return architecture