// TestReferralTally.tsx

import { useState } from "react";
import { supabase } from "../lib/supabase";

const TestReferralTally = () => {
  const [refCode, setRefCode] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [loadingRPC, setLoadingRPC] = useState(false);
  const [loadingEdge, setLoadingEdge] = useState(false);

  const [rpcFeedback, setRpcFeedback] = useState("");
  const [edgeFeedback, setEdgeFeedback] = useState("");

  const handleTally = async () => {
    setLoadingRPC(true);
    setRpcFeedback("");

    const { error } = await supabase.rpc("tally_affiliate_referral", {
      p_referral_code: refCode.trim(),
      p_new_user_name: name.trim(),
    });

    if (error) {
      setRpcFeedback(`❌ Error: ${error.message}`);
    } else {
      setRpcFeedback(`✅ Referral tally & email sent for: ${name}`);
    }

    setLoadingRPC(false);
  };

  const handleSendEmail = async () => {
    setLoadingEdge(true);
    setEdgeFeedback("");

    try {
      const response = await fetch(
        "https://fhyrxujanmopjkkszisd.supabase.co/functions/v1/dynamic-api",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.trim(),
            name: name.trim(),
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        setEdgeFeedback(`❌ Email error: ${result.message || "Unknown error"}`);
      } else {
        setEdgeFeedback(`✅ Test email sent to: ${email}`);
      }
    } catch (err: any) {
      setEdgeFeedback(`❌ Request failed: ${err.message}`);
    }

    setLoadingEdge(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full space-y-10">
        {/* RPC Tester */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Test Referral RPC</h2>

          <input
            type="text"
            placeholder="Enter referral code"
            value={refCode}
            onChange={(e) => setRefCode(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3"
          />

          <input
            type="text"
            placeholder="Enter referred user's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          />

          <button
            onClick={handleTally}
            disabled={loadingRPC || !refCode.trim() || !name.trim()}
            className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary/90 transition"
          >
            {loadingRPC ? "Testing..." : "Run Tally + Email (RPC)"}
          </button>

          {rpcFeedback && (
            <p className="mt-4 text-sm text-center text-gray-700">{rpcFeedback}</p>
          )}
        </div>

        <hr className="border-t border-gray-200" />

        {/* Edge Function Tester */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Test Email (Edge Function)</h2>

          <input
            type="email"
            placeholder="Enter affiliate email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-3"
          />

          <input
            type="text"
            placeholder="Enter referred user's name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4"
          />

          <button
            onClick={handleSendEmail}
            disabled={loadingEdge || !email.trim() || !name.trim()}
            className="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            {loadingEdge ? "Sending..." : "Send Test Email"}
          </button>

          {edgeFeedback && (
            <p className="mt-4 text-sm text-center text-gray-700">{edgeFeedback}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestReferralTally;
