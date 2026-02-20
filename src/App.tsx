import { useState, useEffect } from "react";

function App() {
  const [documents, setDocuments] = useState([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;


  async function loadDocuments() {
    console.log("Effect running: fetching documents...");

    try {
      const res = await fetch(`${API_URL}/api/documents`);
      console.log("Fetch response:", res);

      const data = await res.json();
      console.log("Fetched data:", data);

      setDocuments(data);
      console.log("State updated");
    } catch (err) {
      console.error("Fetch error:", err);
    }


   }

  useEffect( () => {
   

   loadDocuments();
  },[]);

async function handleAsk() {
 /* if (!selectedDocumentId) {
    alert("Please select a document first.");
    return;
  }*/
  if (!question.trim()) {
    alert("Please enter a question.");
    return;
  }

  setAnswer("Thinking...");

  try {
    const res = await fetch(`${API_URL}/api/ask`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        documentId: selectedDocumentId,
        question: question,
      }),
    });

    const data = await res.json();
    setAnswer(data.answer);
  } catch (err) {
    setAnswer("Error contacting backend.");
  }
}

async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
  const file = e.target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch(`${API_URL}/api/upload`, {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    console.log("Upload response:", data);

    // Refresh document list
    loadDocuments();
  } catch (err) {
    console.error("Upload error:", err);
  }
}



  return (
    <div className="container-fluid p-4">
      <div className="row">

        {/* LEFT SIDEBAR */}
        <div className="col-3 border-end">
          <h4>Documents</h4>

          {/* Upload */}
          <input
            type="file"
            className="form-control mb-3"
            onChange={handleUpload}
            
          />

          {/* Document List */}
          <ul className="list-group">
            {documents.map((doc: any) => (
              <li
                key={doc.id}
                className={`list-group-item ${selectedDocumentId === doc.id ? "active" : ""}`}
                onClick={() => setSelectedDocumentId(doc.id)}
                style={{ cursor: "pointer" }}
              >
                {doc.fileName}
              </li>
            ))}
          </ul>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-9">
          <h4>Ask a Question</h4>

          <textarea
            className="form-control mb-3"
            rows={3}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask something about the selected document..."
          />

          <button className="btn btn-primary mb-3" onClick={handleAsk}>
            Ask
          </button>

          <h5>Answer</h5>
          <div className="border rounded p-3" style={{ minHeight: "150px" }}>
            {answer}
          </div>
        </div>

      </div>
    </div>
  );
}


export default App;