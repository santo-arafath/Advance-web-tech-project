// components/ChatList.js (a component that lists potential chat partners)
import Link from "next/link";

function ChatList() {
  return (
    <div>
      <Link
        href="/chat/[username]"
        as="/chat/Alice?currentUsername=Alice&otherUsername=Bob"
      >
        Chat with Bob
      </Link>
      <Link
        href="/chat/[username]"
        as="/chat/Bob?currentUsername=Bob&otherUsername=Alice"
      >
        Chat with Alice
      </Link>
    </div>
  );
}

export default ChatList;
