import os


def generate_repository_summary(repo_path):

    readme_files = [
        "README.md",
        "README.MD",
        "readme.md",
        "README"
    ]

    for file_name in readme_files:

        readme_path = os.path.join(
            repo_path,
            file_name
        )

        if os.path.exists(readme_path):

            with open(
                readme_path,
                "r",
                encoding="utf-8",
                errors="ignore"
            ) as file:

                content = file.read()

            return content[:2000]

    return "README file not found"