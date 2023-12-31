import FooterWithSocialMediaIcons from "@/layouts/FooterWithSocialMediaIcons";
import NavbarWithSearchInputAndDropdown from "@/layouts/NavbarWithSearchInputAndDropdown";
import MemberSidebar from "../../components/MemberSidebar";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [conversation, setConversation] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  useEffect(() => {
    fetchdata();
  }, []);
  const fetchdata = async () => {
    try {
      const response = await axios.get("http://localhost:3000/member/getchat", {
        withCredentials: true,
      });
      setReceivedMessages(response.data);
      console.log(receivedMessages);
      setMessage("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/member/chat",
        { message: message },
        {
          withCredentials: true,
        },
      );

      const data = response.data;

      setConversation(data.message);

      setMessage("");
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div>
      <NavbarWithSearchInputAndDropdown />
      <div className="flex min-h-screen">
        <MemberSidebar />
        <div className="z-10 w-[75vw] rounded-lg  dark:bg-gray-900">
          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Chat with Vet
              </h5>
            </div>

            <div className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {receivedMessages.map((chat) => (
                  <div>
                    <div key={chat.id}>
                      {chat.senderName}: {chat.message}
                    </div>
                  </div>
                ))}
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

          <Card>
            <div className="mb-4 flex items-center justify-between">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                Chat with Expert
              </h5>
            </div>

            {/* <div className="flow-root">
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {receivedMessages.map((chat) => (
                  <div>
                    <div key={chat.id}>
                      {chat.senderName}: {chat.message}
                    </div>
                  </div>
                ))}
              </ul>
            </div> */}
            <form onSubmit={handleSubmit}>
              <div className="relative">
                <input
                  type="text"
                  name="message"
                  //value={message}
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
      </div>
      <FooterWithSocialMediaIcons />
    </div>
  );
};

export default Chat;
