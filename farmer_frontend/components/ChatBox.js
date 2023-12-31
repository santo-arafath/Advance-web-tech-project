import { Card } from "flowbite-react";
import { useState } from "react";
export default function ChatBox() {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:8080/api/predictchat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      const updatedConversation = [
        ...conversation,
        { user: message, bot: data.answer },
      ];

      if (updatedConversation.length > 3) {
        updatedConversation.splice(0, 2);
      }

      setConversation(updatedConversation);

      setMessage("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="fixed bottom-10 right-10 z-10 w-1/4 rounded-lg bg-red-500 dark:bg-gray-900">
      <Card>
        <div className="mb-4 flex items-center justify-between">
          <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
            Chat with Planty
          </h5>
        </div>

        <div className="flow-root">
          <ul className="divide-y divide-gray-200 dark:divide-gray-700">
            <div className="conversation">
              {conversation.map((entry, index) => (
                <li key={index}>
                  <p className="right-0 ml-24 w-3/4 rounded-lg bg-blue-600 p-2">
                    {entry.user}
                  </p>
                  <p className="right-0 m-5 w-3/4 rounded-lg bg-gray-200 p-2">
                    {entry.bot}
                  </p>
                </li>
              ))}
            </div>
          </ul>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type="text"
              name="message"
              value={message}
              onChange={handleMessageChange}
              class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            />
            <button
              type="submit"
              class="absolute bottom-2.5 right-2.5 rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Submit
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}
