from flask import Flask, request, jsonify, render_template
import os
import google.generativeai as genai
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import spacy
from flask_cors import CORS

app = Flask(__name__, template_folder="templates")
CORS(app)

# Load NLP model
nlp = spacy.load("en_core_web_sm")

# Configure Gemini AI API
api_key = os.getenv('GEMINI_API_KEY')
genai.configure(api_key=api_key)
model = genai.GenerativeModel("gemini-1.5-pro")

def generate(prompt):
    res = model.generate_content(prompt)
    return res.text.strip()

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact')
def contact():
    return '<h5> conatct me <h5/>'

@app.route('/generate_question', methods=['GET'])
def generate_question():
    topic = request.args.get('topic', 'general')
    question = generate(f"Generate a simple interview question on {topic}.")
    question = question.lstrip('*').lstrip('Question:').lstrip('*').strip()
    return jsonify({"question": question})

@app.route('/analyze_answer', methods=['POST'])
def analyze_answer():
    data = request.get_json()
    user_answer = data.get("answer")

    if user_answer is None or user_answer == "":
        return jsonify({"feedback":"Please type the answer and click submit."})
    elif len(user_answer) < 10:
        return jsonify({"feedback":"Please type the valid answer"})
    
    question = data.get('question')
    feedback = generate(f"Give one line feedback and rate this answer '{user_answer}' for the question '{question}'.")
    feedback = feedback.lstrip('*').lstrip('Feedback:').lstrip('*').strip()
    
    # Similarity check using TF-IDF
    # tfidf = TfidfVectorizer().fit_transform([user_answer, correct_answer])
    # tfidf_similarity = cosine_similarity(tfidf[0:1], tfidf[1:2]).flatten()[0]
    
    # # Generate feedback
    # feedback = "Good job!" if tfidf_similarity > 0.6 else "Try again."
    return jsonify({"feedback": feedback})

if __name__ == "__main__":
    app.run(debug=True)
