import os
from groq import Groq
from dotenv import load_dotenv

from services.retrieval_service import (
    retrieve_relevant_files
)
from services.architecture_service import (
    analyze_architecture
)

load_dotenv()

client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


async def ask_repository(
    question,
    repo_name,
    history
):
    architecture_context = ""
    architecture = {}

    is_architecture_question = any(
        keyword in question.lower()
        for keyword in [
            "architecture",
            "structure",
            "folder structure",
            "project structure",
            "repository architecture",
            "main folders",
            "folders",
            "backend organized",
            "frontend organized",
            "request flow",
            "data flow",
            "repository layout",
            "project layout",
            "how is the backend",
            "how is backend",
            "how does a request flow"
        ]
    )

    # ----------------------------
    # Retrieval Query
    # ----------------------------
    if is_architecture_question:
        retrieval_query = question
    else:
        user_questions = []
        for message in history:
            if message.role == "user":
                user_questions.append(
                    message.content
                )

        retrieval_query = "\n".join(
            user_questions[-1:]
        )
        retrieval_query += (
            "\n" + question
        )

    print("\nFINAL RETRIEVAL QUERY:\n")
    print(retrieval_query)

    # ----------------------------
    # Architecture Context
    # ----------------------------
    if is_architecture_question:
        repo_path = f"data/repositories/{repo_name}"
        architecture = analyze_architecture(repo_path)
        architecture_lines = []

        for folder, info in architecture.items():
            architecture_lines.append(
                f"{folder} ({info['file_count']} files)"
            )
            if info.get("sample_files"):
                architecture_lines.append(
                    f"Sample Files: {', '.join(info['sample_files'])}"
                )

        architecture_context = "\n".join(architecture_lines)

        print("\nARCHITECTURE CONTEXT:\n")
        print(architecture_context)

    # ----------------------------
    # Code Retrieval
    # ----------------------------
    files = []
    context = ""

    if not is_architecture_question:
        files = await retrieve_relevant_files(
            repo_name,
            retrieval_query
        )

        for file in files:
            context += f"""
FILE:
{file['file_path']}

CODE:
{file['content'][:1500]}
"""

    # ----------------------------
    # History
    # ----------------------------
    history_text = ""
    for message in history:
        history_text += (
            f"{message.role}: "
            f"{message.content}\n"
        )

    # ----------------------------
    # Architecture Prompt
    # ----------------------------
    if is_architecture_question:
        prompt = f"""
You are a senior software architect.

Repository Architecture:

{architecture_context}

Question:

{question}

IMPORTANT RULES:
- Use ONLY the architecture information provided.
- Do NOT invent functions.
- Do NOT invent APIs.
- Do NOT invent code.
- Explain folder responsibilities.
- Explain backend structure.
- Explain frontend structure if present.
- Explain request flow if possible.
- Keep answer simple.

Use EXACTLY this structure:

# Repository Overview

# Main Folders

# Backend Structure

# Frontend Structure

# Request Flow

# Summary

Answer:
"""

    # ----------------------------
    # Code Q&A Prompt
    # ----------------------------
    else:
        prompt = f"""
You are a senior software engineer helping a developer understand a repository.

Previous Conversation:

{history_text}

Repository Code:

{context}

Current Question:

{question}

IMPORTANT RULES:
- Answer ONLY using repository code.
- Mention exact file names.
- Mention important functions.
- Explain execution flow.
- Use simple language.
- Avoid repetition.

Use EXACTLY this structure:

# Direct Answer

# Relevant Files

# How It Works

# Execution Flow

# Important Functions

# Summary

Answer:
"""

    # ----------------------------
    # LLM Call
    # ----------------------------
    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.1
    )

    # ----------------------------
    # Sources
    # ----------------------------
    sources = []
    if not is_architecture_question:
        for file in files:
            if file["file_path"] not in sources:
                sources.append(file["file_path"])
            if len(sources) >= 3:
                break

    return {
        "answer": response.choices[0].message.content,
        "sources": sources
    }