import React, { useState, useEffect, useRef } from "react";

const LikeButton = () => {
  const [likes, setLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [triggerAnimation, setTriggerAnimation] = useState(false);
  const [animateLikes, setAnimateLikes] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [wsConnected, setWsConnected] = useState(false);
  const wsRef = useRef<WebSocket | null>(null);

  // Get WebSocket URL from environment variable
  const getWebSocketUrl = () => {
    // Check if we're in browser and have the environment variable
    if (typeof window !== 'undefined' && import.meta.env.PUBLIC_WEBSOCKET_URL) {
      return import.meta.env.PUBLIC_WEBSOCKET_URL;
    }
    // Fallback to local development or default
    return 'wss://6wlyb2jxxi.execute-api.ap-south-2.amazonaws.com/production';
  };

  useEffect(() => {
    setIsClient(true);

    const storedIsLiked = localStorage.getItem("websiteIsLiked");
    if (storedIsLiked) {
      setIsLiked(storedIsLiked === "true");
    }

    // Initialize WebSocket connection
    const initWebSocket = () => {
      try {
        const wsUrl = getWebSocketUrl();
        console.log('Connecting to WebSocket:', wsUrl);
        
        wsRef.current = new WebSocket(wsUrl);
        
        wsRef.current.onopen = () => {
          console.log('WebSocket connected');
          setWsConnected(true);
          // Request current likes count
          wsRef.current?.send(JSON.stringify({ action: 'getLikes' }));
        };
        
        wsRef.current.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data);
            console.log('WebSocket message received:', data);
            
            if (data.action === 'getLikesResponse') {
              setLikes(data.likes || 0);
              setAnimateLikes(true);
              setTimeout(() => setAnimateLikes(false), 300);
            } else if (data.action === 'incrementLikesResponse') {
              if (data.success) {
                setLikes(data.likes || 0);
                setIsLiked(true);
                localStorage.setItem("websiteIsLiked", "true");
                triggerLikeAnimation();
              } else {
                console.error('Failed to increment likes:', data.error);
                // Fallback to local storage
                fallbackToLocalStorage();
              }
            }
          } catch (error) {
            console.error('Error parsing WebSocket message:', error);
          }
        };
        
        wsRef.current.onclose = () => {
          console.log('WebSocket disconnected');
          setWsConnected(false);
          // Try to reconnect after 3 seconds
          setTimeout(initWebSocket, 3000);
        };
        
        wsRef.current.onerror = (error) => {
          console.error('WebSocket error:', error);
          setWsConnected(false);
        };
        
      } catch (error) {
        console.error('Error initializing WebSocket:', error);
        // Fallback to local storage
        loadLikesFromLocalStorage();
      }
    };

    // Fallback function for local storage
    const loadLikesFromLocalStorage = () => {
      const storedLikes = localStorage.getItem("websiteLikes");
      if (storedLikes) {
        setLikes(parseInt(storedLikes) || 0);
      }
    };

    // Fallback function for incrementing likes
    const fallbackToLocalStorage = () => {
      const currentLikes = parseInt(localStorage.getItem("websiteLikes") || "0");
      const newLikes = currentLikes + 1;
      localStorage.setItem("websiteLikes", newLikes.toString());
      setLikes(newLikes);
      setIsLiked(true);
      localStorage.setItem("websiteIsLiked", "true");
      triggerLikeAnimation();
    };

    // Initialize WebSocket
    initWebSocket();

    // Cleanup on unmount
    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, []);

  const triggerLikeAnimation = () => {
    setTriggerAnimation(true);
    setTimeout(() => {
      setTriggerAnimation(false);
    }, 600);
  };

  const handleLike = async () => {
    if (isProcessing || isLiked) {
      triggerLikeAnimation();
      return;
    }

    try {
      setIsProcessing(true);
      
      // Use WebSocket if connected
      if (wsRef.current && wsConnected) {
        console.log('Sending incrementLikes via WebSocket');
        wsRef.current.send(JSON.stringify({ action: 'incrementLikes' }));
        return;
      }
      
      // Fallback to local storage if WebSocket not available
      console.log('WebSocket not available, using local storage fallback');
      const currentLikes = parseInt(localStorage.getItem("websiteLikes") || "0");
      const newLikes = currentLikes + 1;
      localStorage.setItem("websiteLikes", newLikes.toString());
      setLikes(newLikes);
      setIsLiked(true);
      localStorage.setItem("websiteIsLiked", "true");
      triggerLikeAnimation();
      
    } catch (error) {
      console.error("Error updating likes:", error);
      // Fallback to local storage on error
      const currentLikes = parseInt(localStorage.getItem("websiteLikes") || "0");
      const newLikes = currentLikes + 1;
      localStorage.setItem("websiteLikes", newLikes.toString());
      setLikes(newLikes);
      setIsLiked(true);
      localStorage.setItem("websiteIsLiked", "true");
      triggerLikeAnimation();
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isClient) return null;

  const borderColorClass = isLiked
    ? "border-[var(--sec)]"
    : "border-[var(--white-icon)]";

  const svgClasses = `
    w-6 h-6 transition-all duration-300 ease-in-out 
    ${isLiked ? "text-[var(--sec)] scale-110 fill-[var(--sec)]" : "text-[var(--white-icon)] group-hover:text-[var(--white)] group-hover:scale-105 fill-none"}
    ${triggerAnimation ? " animate-scale" : ""}
  `;

  return (
    <div className="flex items-center">
      <button
        onClick={handleLike}
        disabled={isProcessing}
        className={`
          group relative w-40 h-10 flex items-center justify-center p-3
          rounded-full transition-all duration-300 ease-in-out transform border-2 ${borderColorClass}
          ${!isLiked ? "md:hover:border-[var(--white)] hover:scale-105" : ""}
          ${triggerAnimation ? " animate-scale" : ""}
          ${isProcessing ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        `}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={isLiked ? "currentColor" : "none"}
          stroke={isLiked ? "none" : "currentColor"}
          strokeWidth="1.5"
          className={svgClasses}
        >
          <path d="M16.5 3C19.5376 3 22 5.5 22 9C22 16 14.5 20 12 21.5C9.5 20 2 16 2 9C2 5.5 4.5 3 7.5 3C9.35997 3 11 4 12 5C13 4 14.64 3 16.5 3ZM12.9339 18.6038C13.8155 18.0485 14.61 17.4955 15.3549 16.9029C18.3337 14.533 20 11.9435 20 9C20 6.64076 18.463 5 16.5 5C15.4241 5 14.2593 5.56911 13.4142 6.41421L12 7.82843L10.5858 6.41421C9.74068 5.56911 8.5759 5 7.5 5C5.55906 5 4 6.6565 4 9C4 11.9435 5.66627 14.533 8.64514 16.9029C9.39 17.4955 10.1845 18.0485 11.0661 18.6038C11.3646 18.7919 11.6611 18.9729 12 19.1752C12.3389 18.9729 12.6354 18.7919 12.9339 18.6038Z"></path>
        </svg>
        <span
          className={`
          text-sm pl-3 transition-all duration-300 ease-in-out ${animateLikes ? "animate-scale" : ""}
          text-[var(--white)] flex items-center gap-2
        `}
        >
          {likes} Likes
          {/* Connection status indicator */}
          <div className={`w-2 h-2 rounded-full ${
            wsConnected ? 'bg-green-500' : 'bg-red-500'
          } ${wsConnected ? 'animate-pulse' : ''}`} 
          title={wsConnected ? 'Connected to server' : 'Using local storage'} />
        </span>
      </button>
    </div>
  );
};

export default LikeButton;
