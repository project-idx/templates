import json
import os

from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from flask import Flask, jsonify, request, send_file, send_from_directory

# 🔥 FILL THIS OUT FIRST! 🔥
# Get your Gemini API key by:
# - Selecting "Add Gemini API" in the "Project IDX" panel in the sidebar
# - Or by visiting https://g.co/ai/idxGetGeminiKey
os.environ["GOOGLE_API_KEY"] = "TODO"; 

app = Flask(__name__)


@app.route("/")
def index():
    return send_file('web/index.html')


@app.route("/api/generate", methods=["POST"])
def generate_api():
    if request.method == "POST":
        if os.environ["GOOGLE_API_KEY"] == 'TODO':
            return jsonify({ "error": '''
                To get started, get an API key at
                https://g.co/ai/idxGetGeminiKey and enter it in
                main.py
                '''.replace('\n', '') })
        try:
            req_body = request.get_json()
            content = req_body.get("contents")
            model = ChatGoogleGenerativeAI(model=req_body.get("model"))
            message = HumanMessage(
                content=content
            )
            response = model.stream([message])
            def stream():
                for chunk in response:
                    yield 'data: %s\n\n' % json.dumps({ "text": chunk.content })

            return stream(), {'Content-Type': 'text/event-stream'}

        except Exception as e:
            return jsonify({ "error": str(e) })


@app.route('/<path:path>')
def serve_static(path):
    return send_from_directory('web', path)


if __name__ == "__main__":
    app.run(port=int(os.environ.get('PORT', 80)))
