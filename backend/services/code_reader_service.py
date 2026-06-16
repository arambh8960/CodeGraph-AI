import os

ALLOWED_EXTENSIONS = (
    ".py",
    ".js",
    ".jsx",
    ".ts",
    ".tsx"
)


def extract_code_files(repo_path):

    code_files = []

    for root, dirs, files in os.walk(repo_path):

        dirs[:] = [
            d for d in dirs
            if d != ".git"
        ]

        for file in files:

            if file.endswith(
                ALLOWED_EXTENSIONS
            ):

                full_path = os.path.join(
                    root,
                    file
                )

                try:

                    with open(
                        full_path,
                        "r",
                        encoding="utf-8",
                        errors="ignore"
                    ) as f:

                        content = f.read()

                    code_files.append(
                        {
                            "file_path": os.path.relpath(
                                full_path,
                                repo_path
                            ),
                            "content": content
                        }
                    )

                except Exception:
                    pass

    return code_files