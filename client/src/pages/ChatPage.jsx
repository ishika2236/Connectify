import React, { useState, useContext } from "react";
import Sidebar from "../components/custom/Sidebar";
import ChatBox from "../components/custom/ChatBox";
import ContactsNew from "../components/custom/ContactsNew";
import { ChatContext } from "../context/ChatProvider";
import { Box } from "@chakra-ui/react";

const ChatPage = () => {
  const { user } = useContext(ChatContext);
  const [refreshContact, setRefreshContact] = useState(false);

  return (
    <div className="w-[100%] flex h-[100vh]">
      {/* Sidebar */}
      {user && <Sidebar />}

      {/* Main Content */}
      <Box
        display="grid"
        gridTemplateColumns="2fr 3fr"
        gridTemplateRows="1fr"
        w="100%"
        h="100%"
        gap="10px"
      >
        {/* Contacts Section */}
        {user && (
          <Box  h="100%" m={0} borderRadius="md" >
            <ContactsNew refreshContact={refreshContact} />
          </Box>
        )}

        {/* ChatBox Section */}
        {user && (
          <Box
            h="100%"
            borderRadius="md"
            p={0}
            m={0}
            flexGrow="1"
            display="flex"
            flexDirection="column"
          >
            <ChatBox
              refreshContact={refreshContact}
              setRefreshContact={setRefreshContact}
            />
          </Box>
        )}
      </Box>
    </div>
  );
};

export default ChatPage;
