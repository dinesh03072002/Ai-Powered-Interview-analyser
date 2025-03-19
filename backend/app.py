from flask import Flask, request, jsonify, render_template, session
import os
import google.generativeai as genai
from flask_cors import CORS

app = Flask(__name__, template_folder="templates")
CORS(app)


app.secret_key = "supersecretkey"


api_key_question = os.getenv('GEMINI_API_KEY_QUESTION')
api_key_answer = os.getenv('GEMINI_API_KEY_ANSWER')

if not api_key_question or not api_key_answer:
    raise ValueError("One or both Gemini API keys are missing from environment variables.")

def create_model(api_key):
    genai.configure(api_key=api_key)  
    return genai.GenerativeModel("gemini-1.5-pro", generation_config={
        "temperature": 0.5, 
        "top_p": 1, 
        "top_k": 1, 
        "max_output_tokens": 50 
    })


model_question = create_model(api_key_question)
model_answer = create_model(api_key_answer)

def generate_question(prompt):
    res = model_question.generate_content(prompt)
    return res.text.strip()

def analyze_answer(prompt):
    res = model_answer.generate_content(prompt)
    return res.text.strip()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/generate_question', methods=['GET'])
def generate_question_api():
    topic = request.args.get('topic', 'general')

    7
    if "asked_questions" not in session:
        session["asked_questions"] = []

   
    for _ in range(5):  
        question = generate_question(
            f"Generate a commonly asked technical interview question related to {topic}. "
            f"The question should be simple and fundamental, like: "
            f"'What are the key features of Java?' or 'What is the difference between SQL and NoSQL databases?'. "
            f"Do not provide definitions or explanations, just the question."
        )

        if question not in session["asked_questions"]:
            session["asked_questions"].append(question)  
            session.modified = True
            return jsonify({"question": question.strip()})

    return jsonify({"question": "No new unique questions available at the moment. Try a different topic."})

@app.route('/analyze_answer', methods=['POST'])
def analyze_answer_api():
    data = request.get_json()
    user_answer = data.get("answer", "").strip()
    question = data.get("question", "").strip()

    if not user_answer:
        return jsonify({"feedback": "Please type the answer and click submit."})
    elif len(user_answer) < 10:
        return jsonify({"feedback": "Please type a valid answer."})

    feedback = analyze_answer(
        f"Provide a one-line feedback and a score (out of 10) for this answer: '{user_answer}' for the question: '{question}'."
    )
    return jsonify({"feedback": feedback.strip()})

if __name__ == "__main__":
    app.run(debug=True)
