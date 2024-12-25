import { useCallback, useEffect, useRef, useState } from "react";
import ACTIONS from '../../Actions';
import { socketInit } from "../socket/index";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatProvider";

export const useWebRtc = (roomId) => {
  const [clients, setClients] = useState([]);
  const socketRef = useRef(null); 
  const localMediaStream = useRef(null);
  const peerConnections = useRef({});
  const audioElements = useRef({});
  const {user}= useContext(ChatContext);


  const addNewClient = useCallback((newClient, cb) => {
    console.log("newClient", newClient);

    socketRef.current.emit('join room',{roomId});
    if(clients  && newClient)
    {
        setClients((existingClients) => {
            if (!existingClients.find((client) => client._id == newClient._id)) {
              return [...existingClients, newClient];
            }
            return existingClients;
          });
          cb && cb();

    }
    
  }, []);

  const startCapture = useCallback(async () => {
    try {
      if (!localMediaStream.current) {
        localMediaStream.current = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        // console.log(user);
        
        addNewClient(user, () => {
          const localAudioElement = audioElements.current[user._id];
          if (localAudioElement) {
            localAudioElement.volume = 0;
            localAudioElement.srcObject = localMediaStream.current;
          }
        });
      }
    } catch (error) {
      console.error("Error capturing media:", error);
    }
  }, [user, addNewClient]);
  

  const provideMedia = useCallback(() => {
    return startCapture();
  }, [startCapture]);
  

  const handleNewPeer = useCallback(
    async ({ peerId, createOffer, user: remoteUser }) => {
      if (peerId in peerConnections.current) {
        return;
      }

      peerConnections.current[peerId] = new RTCPeerConnection({
        iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
      });

      peerConnections.current[peerId].onicecandidate = (event) => {
        if (event.candidate) {
          socketRef.current.emit(ACTIONS.RELAY_ICE, {
            peerId,
            iceCandidate: event.candidate,
          });
        }
      };

      peerConnections.current[peerId].ontrack = ({ streams: [remoteStream] }) => {
        addNewClient(remoteUser, () => {
          if (audioElements.current[remoteUser.id]) {
            audioElements.current[remoteUser.id].srcObject = remoteStream;
          } else {
            let settled = false;
            const interval = setInterval(() => {
              if (audioElements.current[remoteUser.id]) {
                audioElements.current[remoteUser.id].srcObject = remoteStream;
                settled = true;
              }
              if (settled) clearInterval(interval);
            }, 300);
          }
        });
      };

      localMediaStream.current.getTracks().forEach((track) => {
        peerConnections.current[peerId].addTrack(track, localMediaStream.current);
      });

      if (createOffer) {
        const offer = await peerConnections.current[peerId].createOffer();
        await peerConnections.current[peerId].setLocalDescription(offer);

        socketRef.current.emit(ACTIONS.RELAY_SDP, {
          peerId,
          sessionDescription: offer,
        });
      }
    },
    [addNewClient]
  );

  useEffect(() => {
    if (!socketRef.current) {
      socketRef.current = socketInit(); // Initialize the socket
    }
    const socket = socketRef.current;

    socket.on(ACTIONS.ADD_PEER, handleNewPeer);
    return () => {
      socket.off(ACTIONS.ADD_PEER);
    };
  }, [handleNewPeer]);

  useEffect(() => {
    const socket = socketRef.current;

    const handleIceCandidate = ({ peerId, iceCandidate }) => {
      if (peerConnections.current[peerId]) {
        peerConnections.current[peerId].addIceCandidate(iceCandidate);
      }
    };

    socket.on(ACTIONS.ICE_CANDIDATE, handleIceCandidate);
    return () => {
      socket.off(ACTIONS.ICE_CANDIDATE);
    };
  }, []);

  useEffect(() => {
    const socket = socketRef.current;

    const handleSessionDescription = async ({ peerId, sessionDescription }) => {
      if (peerConnections.current[peerId]) {
        const pc = peerConnections.current[peerId];
        await pc.setRemoteDescription(new RTCSessionDescription(sessionDescription));

        if (sessionDescription.type === "offer") {
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);

          socket.emit(ACTIONS.RELAY_SDP, {
            peerId,
            sessionDescription: answer,
          });
        }
      }
    };

    socket.on(ACTIONS.SESSION_DESCRIPTION, handleSessionDescription);
    return () => {
      socket.off(ACTIONS.SESSION_DESCRIPTION);
    };
  }, []);

  useEffect(() => {
    const socket = socketRef.current;

    const handleRemovePeer = ({ peerId, userId }) => {
      if (peerConnections.current[peerId]) {
        peerConnections.current[peerId].close();
      }

      delete peerConnections.current[peerId];
      delete audioElements.current[userId];

      setClients((list) => list.filter((client) => client.id !== userId));
    };

    socket.on(ACTIONS.REMOVE_PEER, handleRemovePeer);
    return () => {
      socket.off(ACTIONS.REMOVE_PEER);
    };
  }, []);

  useEffect(() => {
    const socket = socketRef.current;

    provideMedia().then(() => {
      socket.emit(ACTIONS.JOIN, { roomId, user });
    });

    return () => {
      localMediaStream.current?.getTracks().forEach((track) => track.stop());
      socket.emit(ACTIONS.LEAVE, { roomId });
      Object.values(peerConnections.current).forEach((pc) => pc.close());

      peerConnections.current = {};
      audioElements.current = {};
    };
  }, [roomId, provideMedia, user]);

  const setAudioRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  return { clients, provideMedia, setAudioRef, startCapture };
};
