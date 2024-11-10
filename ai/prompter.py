import json
import os

from dotenv import load_dotenv
from groq import Groq

# Loading .env variables
load_dotenv()
GROQ_API_KEY = os.getenv("GROQ_API_KEY")


def prompter(promt: str) -> dict:
    client = Groq()
    completion = client.chat.completions.create(
        model="llama-3.1-70b-versatile",
        messages=[
            {
                "role": "system",
                "content": 'You are AntFlow AI (made by Harsh, Prakhar, Saurabh, and Yash) that assists with breaking down projects into manageable tasks for efficient project management. Given a project description, analyze the requirements and generate a breakdown of tasks, assign appropriate deadlines, and determine the technical skills required to complete each task.\n\nRespond in JSON format as follows:\n\n{\n  "project": "Project name or description",\n  "tasks": [\n    {\n      "task_id": unique integer ID of the task,\n      "task_name": "Brief name of the task",\n      "task_description": "Detailed description of what the task entails",\n      "estimated_time": "Estimated time to complete the task in number of days",\n      "dependencies": ["List of any task_ids this task depends on"],\n      "required_skills": ["List of technical skills needed for the task, chosen from the predefined skills list. DO NOT generate any new skill terms"]\n    },\n    ...\n  ]\n}\n\nIf the input cannot be structured as specified above, return an empty JSON object: `{}`.\n\n### Predefined Skills List:\n[\n  "Project Management",\n  "Requirement Gathering",\n  "Stakeholder Communication",\n  "Python",\n  "JavaScript",\n  "TypeScript",\n  "C#",\n  "Go",\n  "Machine Learning",\n  "Natural Language Processing",\n  "Data Analysis",\n  "Backend Development",\n  "Frontend Development",\n  "API Integration",\n  "Database Management",\n  "UI/UX Design",\n  "Testing & QA",\n  "DevOps",\n  "Cloud Infrastructure",\n  "AGILE Methodologies",\n  "Version Control (Git)",\n  "Technical Writing",\n  "Documentation",\n  "Team Coordination",\n  "Communication Skills"\n]\n\nGenerate a structured JSON response with task details based on the project description.\n',
            },
            {
                "role": "user",
                "content": f"### Project Description:\n{promt}",
            },
        ],
        temperature=1,
        max_tokens=1024,
        top_p=1,
        stream=False,
        response_format={"type": "json_object"},
        stop=None,
    )

    try:
        return json.loads(completion.choices[0].message.content)
    except:
        return prompter(promt)


# Testing the prompter function
# with open("out.json", "w") as f:
#     output = prompter(
#         "Create a website that allows users to create, read, update, and delete notes. The website should have a user authentication system, and each user should only be able to view, edit, and delete their own notes. The website should have a clean and intuitive user interface, and it should be responsive and mobile-friendly. The website should be built using Python and Django, and it should use a PostgreSQL database to store user data. The website should also have a RESTful API that allows users to interact with the notes data. The API should have endpoints for creating, reading, updating, and deleting notes, as well as endpoints for user authentication. The website should be deployed on a cloud platform such as Heroku or AWS."
#     )
#     f.write(json.dumps(output, indent=4))
