
from flask import Flask, request, jsonify, send_from_directory
import sqlite3
import os

app = Flask(__name__, static_folder=".", static_url_path="")

def create_database():
    conn = sqlite3.connect("prepath.db")

    conn.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            email TEXT UNIQUE NOT NULL
        )
    """)

    conn.execute("""
        CREATE TABLE IF NOT EXISTS quiz_results (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            score INTEGER NOT NULL,
            total_questions INTEGER NOT NULL,
            percentage REAL NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    conn.close()


@app.route("/")
def home():
    return send_from_directory(".", "index.html")

@app.route("/database")
def database():
    create_database()
    return "SQLite database connected successfully!"

    
@app.route("/add-student")
def add_student():
    conn = sqlite3.connect("prepath.db")

    try:
        conn.execute(
            "INSERT INTO students (name, email) VALUES (?, ?)",
            ("Shubhi", "shubhi@example.com")
        )
        conn.commit()
        message = "Student added successfully!"
    except sqlite3.IntegrityError:
        message = "This student email already exists."

    conn.close()
    return message


@app.route("/students")
def show_students():
    conn = sqlite3.connect("prepath.db")
    cursor = conn.execute("SELECT id, name, email FROM students")
    students = cursor.fetchall()
    conn.close()

    return "<br>".join(
        f"ID: {s[0]}, Name: {s[1]}, Email: {s[2]}"
        for s in students
    ) or "No students found."

     
@app.route("/save-quiz-score", methods=["POST"])
def save_quiz_score():
    data = request.get_json(silent=True) or {}

    score = data.get("score")
    total = data.get("total")

    if (
        type(score) is not int
        or type(total) is not int
        or total <= 0
        or score < 0
        or score > total
    ):
        return jsonify({"error": "Invalid quiz score"}), 400

    percentage = round((score / total) * 100, 2)

    conn = sqlite3.connect("prepath.db")
    conn.execute(
        """INSERT INTO quiz_results
           (score, total_questions, percentage)
           VALUES (?, ?, ?)""",
        (score, total, percentage)
    )
    conn.commit()
    conn.close()

    return jsonify({
        "message": "Quiz score saved successfully!",
        "score": score,
        "total": total,
        "percentage": percentage
    })

@app.route("/quiz-history", methods=["GET"])
def quiz_history():
    conn = sqlite3.connect("prepath.db")

    conn.row_factory = sqlite3.Row

    rows = conn.execute("""
        SELECT id, score, total_questions, percentage, created_at
        FROM quiz_results
        ORDER BY id DESC
        LIMIT 10
    """).fetchall()

    conn.close()

    history = []

    for row in rows:
        history.append({
            "id": row["id"],
            "score": row["score"],
            "total": row["total_questions"],
            "percentage": row["percentage"],
            "date": row["created_at"]
        })

    return jsonify(history)


if __name__ == "__main__":
    create_database()
    app.run(debug=True)
