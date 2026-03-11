import { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import api from "@/api/axios-api";

export default function QAPanel({
  documentId,
  onAsk,
}: {
  documentId: string | null;
  onAsk?: (question: string) => void;
}) {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    try {
      setLoading(true);

      const res = await api.post("/ask", {
        documentId, // may be null
        question,
      });

      setAnswer(res.data.answer || "No answer returned.");
      onAsk?.(question);
    } catch (err) {
      console.error("Ask failed", err);
      setAnswer("Error asking question.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* ASK SECTION */}
      <div>
        <h2 className="text-xl font-semibold m-0">Ask a Question</h2>

        <div className="join w-full mt-2">
          <input
            type="text"
            placeholder="Ask anything…"
            className="input input-bordered join-item w-full"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            disabled={loading}
          />

          <button
            type="button"
            className="btn btn-primary join-item"
            onClick={handleAsk}
            disabled={!question.trim() || loading}
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "Ask"
            )}
          </button>
        </div>
      </div>

      {/* ANSWER SECTION */}
      <div>
        <h2 className="text-xl font-semibold m-0">Answer</h2>

        <div className="border border-base-300 rounded-lg bg-base-100 w-full min-h-40 max-h-96 mt-2 p-4 overflow-y-auto">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            className="prose max-w-none"
          >
            {answer || "No answer yet."}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
