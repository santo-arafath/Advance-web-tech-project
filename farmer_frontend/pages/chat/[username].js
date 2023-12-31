// pages/chat/[username].js
import { useRouter } from "next/router";
import Chat from "../Chat";

function PrivateChat() {
  const router = useRouter();
  const { currentUsername, otherUsername } = router.query;

  if (!currentUsername || !otherUsername) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h1>
        Chat between {currentUsername} and {otherUsername}
      </h1>
      <Chat currentUsername={currentUsername} otherUsername={otherUsername} />
    </div>
  );
}

export default PrivateChat;
