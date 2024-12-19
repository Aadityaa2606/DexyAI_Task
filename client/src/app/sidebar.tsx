'use client';
import React from "react";

const Sidebar: React.FC = () => {
  const handleOpenLoginPage = () => {
    window.open("https://welfound.com/login", "_blank");
  };

  const handleOpenConsoleAndLogCookie = () => {
    alert("Please open your browser console (F12 or right-click -> Inspect -> Console), and run the following code:\n\nconsole.log(document.cookie);");
  };

  return (
    <div className="flex flex-col w-80 bg-gray-800 text-white h-full p-4 ml-5 rounded-md">
      <h2 className="text-xl font-semibold mb-4">Instructions</h2>
      <p className="mb-4">
        To get the cookie for Wellfound:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>1. Click the &quot;Go to Wellfound Login&quot; button to log in to your account.</li>
        <li>2. After logging in, open your browser console (press F12 or right-click -&gt; Inspect -&gt; Console).</li>
        <li>3. In the console, run the following command to log the cookie:</li>
        <pre className="bg-gray-700 p-2 rounded text-sm">console.log(document.cookie);</pre>
        <li>4. Copy the cookie value printed in the console and paste it in the &quot;Cookie&quot; field on this page.</li>
      </ul>
      <button
        onClick={handleOpenLoginPage}
        className="bg-blue-500 text-white py-2 px-4 rounded-md mb-2"
      >
        Go to Wellfound Login
      </button>
      <button
        onClick={handleOpenConsoleAndLogCookie}
        className="bg-green-500 text-white py-2 px-4 rounded-md"
      >
        Open Console and Log Cookie
      </button>
    </div>
  );
};

export default Sidebar;
