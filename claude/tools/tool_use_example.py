import anthropic
import json

client = anthropic.Anthropic()

tools = [
    {
        "name": "get_weather",
        "description": "指定した都市の現在の天気を取得する",
        "input_schema": {
            "type": "object",
            "properties": {
                "city": {
                    "type": "string",
                    "description": "都市名 (例: Tokyo)"
                }
            },
            "required": ["city"]
        }
    }
]

def get_weather(city: str) -> str:
    # 実際はAPIを呼ぶ。ここはダミー実装
    return f"{city}の天気: 晴れ、気温22度"

response = client.messages.create(
    model="claude-sonnet-4-6",
    max_tokens=1024,
    tools=tools,
    messages=[
        {"role": "user", "content": "東京の天気を教えて"}
    ]
)

# ツール呼び出しがあれば実行して結果を返す
if response.stop_reason == "tool_use":
    tool_use = next(b for b in response.content if b.type == "tool_use")
    tool_result = get_weather(**tool_use.input)

    final_response = client.messages.create(
        model="claude-sonnet-4-6",
        max_tokens=1024,
        tools=tools,
        messages=[
            {"role": "user", "content": "東京の天気を教えて"},
            {"role": "assistant", "content": response.content},
            {
                "role": "user",
                "content": [
                    {
                        "type": "tool_result",
                        "tool_use_id": tool_use.id,
                        "content": tool_result
                    }
                ]
            }
        ]
    )
    print(final_response.content[0].text)
