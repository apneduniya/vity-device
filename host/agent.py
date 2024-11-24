import asyncio
from composio_crewai import ComposioToolSet, App
from langchain_openai import ChatOpenAI
from crewai import Agent, Task, Crew
import dotenv


dotenv.load_dotenv()

async def agent(task: str, expected_output: str = "Get the ouput/result of the task after completion") -> str:
    llm = ChatOpenAI(
        model="gpt-4o",
    )
    composio_toolset = ComposioToolSet()
    tools = composio_toolset.get_tools(apps=[App.ANTHROPIC])

    # Define agent
    crewai_agent = Agent(
        role="Computer Agent",
        goal="""You take actions on computer using the current device APIs""",
        backstory=(
            "You are AI agent that is responsible for taking actions on computer "
            "on users behalf. You need to take action on computer using current device APIs"
        ),
        verbose=True,
        tools=tools,
        llm=llm,
    )

    task = Task(
        description=task,
        agent=crewai_agent,
        expected_output=expected_output,
    )

    my_crew = Crew(agents=[crewai_agent], tasks=[task], verbose=True)

    result = await my_crew.kickoff_async()
    print(result)
    return result


async def main():
    result = await agent("Search samsung t7 1tb external ssd so that I can order it", "Search results for samsung t7 1tb external ssd")
    print(result)

if __name__ == "__main__":
    asyncio.run(main())  # Run the async main function in an event loop
