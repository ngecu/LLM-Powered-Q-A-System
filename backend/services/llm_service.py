import os
from openai import OpenAI

client = OpenAI(
    # This is the default and can be omitted
    # api_key=os.environ.get("OPENAI_API_KEY"),

    api_key="sk-abcdef1234567890abcdef1234567890abcdef12w",

)

async def get_llm_response(query: str) -> str:
    print("query ",query)
    prompt = f"""
    You are a helpful assistant. Please answer the following question clearly and structured:
    {query}
    """

    response = await client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )

    return response.choices[0].message.content
