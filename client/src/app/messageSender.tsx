"use client";
import React, { useState, FormEvent, useEffect } from "react";

interface ResponseData {
  id: number;
  content: string;
}

const MessageSender: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [cookie, setCookie] = useState<string>("");
  const [response, setResponse] = useState<ResponseData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [cookieEditable, setCookieEditable] = useState<boolean>(false); 

  useEffect(() => {
    const savedCookie = localStorage.getItem("cookie");
    if (savedCookie) {
      setCookie(savedCookie);
      setCookieEditable(false); 
    }
  }, []);

  const handleMessageChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  const handleCookieChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCookie(e.target.value);
  };

  const handleEditCookie = () => {
    setCookieEditable(true); 
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!message || !cookie) {
      setError("Both message and cookie are required");
      return;
    }

    setLoading(true);
    setError(null);

    const payload = {
      content: message,
      cookie: cookie,
    };

    try {
      const res = await fetch("http://localhost:5000/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }

      const data: ResponseData = await res.json();
      setResponse(data);
      setMessage(""); // Clear only the message
      // Leave the cookie state unchanged so it remains filled
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  };


  const handleSaveCookie = () => {
    if (cookie) {
      localStorage.setItem("cookie", cookie);
      setCookieEditable(false); 
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
          Send a Message
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              htmlFor="cookie"
              className="block text-lg font-medium text-gray-600"
            >
              Cookie:
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="cookie"
                value={cookie}
                onChange={handleCookieChange}
                placeholder="Enter cookie"
                className="w-full p-3 border border-gray-300 rounded-md text-lg"
                disabled={!cookieEditable}
              />
              {!cookieEditable ? (
                <button
                  type="button"
                  onClick={handleEditCookie}
                  className="ml-2 text-blue-500"
                >
                  Edit
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSaveCookie}
                  className="ml-2 text-green-500"
                >
                  Save
                </button>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="message"
              className="block text-lg font-medium text-gray-600"
            >
              Message:
            </label>
            <textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
              placeholder="Type your message here"
              className="w-full p-3 border border-gray-300 rounded-md text-lg min-h-[120px]"
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-200"
          >
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {response && (
          <div className="mt-4 p-4 bg-green-50 border-l-4 border-green-400">
            <p className="text-green-800">Message ID: {response.id}</p>
            <p className="text-green-800">Content: {response.content}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MessageSender;
