from dotenv import load_dotenv
load_dotenv()

from groq import Groq
import os


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_ai_summary(readme_content):

    prompt = f"""
You are a Principal Software Engineer, Software Architect,
and Developer Onboarding Expert.

Your goal is to help a new developer understand a GitHub repository
as quickly as possible.

Analyze the repository README and generate a professional
Developer Onboarding Report.

Return the response in EXACTLY this format:

# PROJECT OVERVIEW
Explain:
- What problem this project solves
- Why it exists
- Who would use it

# TECH STACK
- Main languages
- Frameworks
- Libraries
- Tools

# CORE FEATURES
- Feature 1
- Feature 2
- Feature 3
- Feature 4
- Feature 5

# HOW IT WORKS
Explain the workflow in simple steps.

# REPOSITORY STRUCTURE INSIGHTS
Mention important files, folders, modules, or components if identifiable.

# DEVELOPER ONBOARDING GUIDE
For a new developer:

1. Where should they start?
2. Which files are likely most important?
3. What concepts should they understand first?

# POTENTIAL USE CASES
List real-world use cases.

# COMPLEXITY ASSESSMENT

Difficulty Level:
(Beginner / Intermediate / Advanced)

Reason:
Explain why.

Additional Rules:
- Use concise and professional language.
- Think like a senior engineer onboarding a new team member.
- Never mention "based on the README".
- Never mention that information was provided by the user.
- Use bullet points whenever possible.
- If some information is missing, infer carefully from available details.
- Keep the report practical and useful.

README CONTENT:

{readme_content}
"""

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.2
    )

    return response.choices[0].message.content