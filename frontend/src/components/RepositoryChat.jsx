
import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { useRepository } from '../context/RepositoryContext'

const RepositoryChat = ({ repoName, persistedMessages = [] }) => {

  const { addChatMessage, activeRepo } = useRepository()

  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState(persistedMessages || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // sync when activeRepo updates (e.g., imported from storage)
    if (activeRepo && activeRepo.chatMessages) {
      setMessages(activeRepo.chatMessages)
    }
  }, [activeRepo])

  const askQuestion = async () => {

    if (!question.trim() || loading) {
      return;
    }

    const userQuestion = question;

    const userMsg = { role: "user", content: userQuestion }
    setMessages(prev => [...prev, userMsg]);
    addChatMessage(userMsg)

    setQuestion("");
    setLoading(true);

    try {

      const response = await axios.post(
        "http://localhost:8000/api/chat/ask",
        {
          question: userQuestion,
          repo_name: repoName,
          history: messages.slice(-6)
        }
      );

      const assistantMsg = { role: "assistant", content: response.data.answer, sources: response.data.sources || [] }
      setMessages(prev => [...prev, assistantMsg]);
      addChatMessage(assistantMsg)

    } catch (error) {

      const errMsg = { role: "assistant", content: "❌ Error generating answer. Please try again." }
      setMessages(prev => [...prev, errMsg]);
      addChatMessage(errMsg)

    } finally {

      setLoading(false);

    }
  };

  const handleKeyDown = (e) => {

    if (e.key === "Enter") {
      askQuestion();
    }

  };

  return (
    <div className="glass-card p-6 mt-6">

      <h2 className="text-xl font-bold text-white mb-4">
        Ask Repository
      </h2>

      <input
        type="text"
        placeholder="Ask anything about this repository..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        onKeyDown={handleKeyDown}
        className="input-field"
      />

      <button
        onClick={askQuestion}
        disabled={loading}
        className="btn-primary mt-4"
      >
        {loading
          ? "Thinking..."
          : "Ask"}
      </button>

      <div className="mt-6 space-y-4">

        {messages.map((message, index) => (

          <div
            key={index}
            className={`p-4 rounded-lg ${
              message.role === "user"
                ? "bg-blue-600 text-white"
                : "bg-gray-800 text-white"
            }`}
          >

            <strong>
              {message.role === "user" ? "You" : "Reporyx AI"}:
            </strong>

            {message.role === "user" ? (

              <p className="mt-2 whitespace-pre-wrap">
                {message.content}
              </p>

            ) : (

              <div className="mt-3 prose prose-invert max-w-none">

                <ReactMarkdown>
                  {message.content}
                </ReactMarkdown>

              </div>

            )}

            {message.role === "assistant" &&
              message.sources &&
              message.sources.length > 0 && (

              <div className="mt-4 border-t border-white/10 pt-3">

                <p className="text-xs text-gray-400 mb-2">
                  Sources
                </p>

                {message.sources.map(
                  (source, idx) => (
                    <div
                      key={idx}
                      className="text-sm text-blue-300"
                    >
                      📄 {source}
                    </div>
                  )
                )}

              </div>

            )}

          </div>

        ))}

      </div>

    </div>
  );
};

export default RepositoryChat;

