from flask import Blueprint, jsonify, request
from app.services import send_message_to_wellfound

main = Blueprint("main", __name__)

messages = []

@main.route("/")
def home():
    return jsonify({"message": "Welcome to the Flask Server!"})
    
@main.route("/messages", methods=["POST"])
def add_message():
    """Add a new message."""
    data = request.json
    content = data.get("content")
    cookie = data.get("cookie")

    if not content:
        return jsonify({"error": "Content required"}), 400
    if not cookie:
        return jsonify({"error": "Cookie required"}), 400

    print(f"New message content: {content}")

    success = send_message_to_wellfound(cookie, content)
    if not success:
        return jsonify({"error": "Failed to send message to Wellfound"}), 500

    message_id = len(messages)
    messages.append(content)
    return jsonify({"id": message_id, "content": content}), 201

