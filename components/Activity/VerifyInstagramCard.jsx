import React, { useState, useEffect } from "react";

const VerifyInstagramCard = ({ user }) => {
  const [instagramId, setInstagramId] = useState("");
  const [emojiString, setEmojiString] = useState("");
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState("");

  // Function to generate random emojis
  const generateRandomEmojis = (length = 5) => {
    const emojis = ["🔥", "✨", "🌟", "💎", "🎉", "🚀", "💖", "🌈", "⚡", "🪐"];
    return Array.from({ length }, () => emojis[Math.floor(Math.random() * emojis.length)]).join("");
  };

  // Check if the emoji string is in localStorage
  const getStoredEmojiString = () => {
    const storedEmoji = localStorage.getItem("emojiString");
    return storedEmoji ? storedEmoji : generateRandomEmojis(5);
  };

  // Set emoji string in localStorage
  const storeEmojiString = (emoji) => {
    localStorage.setItem("emojiString", emoji);
  };

  // Handle Instagram ID submission
  const handleVerify = async () => {
    setLoading(true);
    setError("");
    setVerified(false);

    if (!instagramId) {
      setError("Please enter your Instagram ID.");
      setLoading(false);
      return;
    }

    const newEmojiString = emojiString;

    try {
      const response = await fetch(`/api/scrape?username=${encodeURIComponent(instagramId)}`);
      const data = await response.json();
        console.log(data);
        
      if (data.success && data.bio1.includes(newEmojiString)) {
        console.log(data);

        // Firestore Integration (uncomment and configure Firestore)
        // await setDoc(doc(collection(db, "verifiedInstagram"), user.uid), {
        //   instagramId,
        //   emojiString: newEmojiString,
        //   verifiedAt: new Date().toISOString(),
        // });

        setVerified(true);
      } else {
        setError("Verification failed. Ensure the emoji string is in your bio.");
      }
    } catch (err) {
      setError("An error occurred during verification. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // On component mount, check for emoji string in localStorage
  useEffect(() => {
    const storedEmoji = getStoredEmojiString();
    setEmojiString(storedEmoji);
  }, []);

  // Regenerate emoji string and store it in localStorage
  const regenerateEmojis = () => {
    const newEmojiString = generateRandomEmojis(5);
    setEmojiString(newEmojiString);
    storeEmojiString(newEmojiString);
    setVerified(false);
    setError("");
  };

  return (
    <div className="md:w-[250px] w-[150px] cursor-pointer snap-center bg-white rounded-lg shadow-lg text-black border gradient-borderr">
      <div className="p-4">
        <h2 className="urbanist-800 md:text-lg text-base">Verify Instagram</h2>
        <p className="urbanist-500 text-sm mt-2">
          Link your Instagram account to Earnr by adding the emoji string to your bio for verification.
        </p>
        {!verified ? (
          <div className="mt-4">
            <input
              type="text"
              value={instagramId}
              onChange={(e) => setInstagramId(e.target.value)}
              placeholder="Enter Instagram ID"
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {emojiString && (
              <p className="mt-2 text-sm">
                Add this emoji string to your bio: <span className="font-bold">{emojiString}</span>
              </p>
            )}
            <button
              onClick={handleVerify}
              disabled={loading}
              className="mt-3 px-4 py-2 w-full bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loading ? "Verifying..." : "Verify"}
            </button>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
            <button
              onClick={regenerateEmojis}
              className="mt-3 px-4 py-2 w-full bg-gray-200 text-black rounded-md hover:bg-gray-300"
            >
              Regenerate Emoji String
            </button>
          </div>
        ) : (
          <p className="mt-4 text-green-500 text-sm">
            Instagram verified successfully!
          </p>
        )}
      </div>
    </div>
  );
};

export default VerifyInstagramCard;
