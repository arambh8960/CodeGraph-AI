import os
import ast


def build_dependency_graph(repo_path):

    graph = {}

    for root, _, files in os.walk(repo_path):

        for file in files:

            if not file.endswith(".py"):
                continue

            file_path = os.path.join(
                root,
                file
            )

            try:

                with open(
                    file_path,
                    "r",
                    encoding="utf-8"
                ) as f:

                    tree = ast.parse(
                        f.read()
                    )

                imports = []

                for node in ast.walk(tree):

                    if isinstance(
                        node,
                        ast.ImportFrom
                    ):

                        if node.module:

                            imports.append(
                                node.module
                            )

                graph[
                    os.path.relpath(
                        file_path,
                        repo_path
                    )
                ] = imports

            except Exception:
                pass

    return graph