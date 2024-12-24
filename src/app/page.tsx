// import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import Script from "next/script";

declare global {
  interface Window {
    AF_SMART_SCRIPT?: {
      generateOneLinkURL: (config: {
        oneLinkURL: string;
        webReferrer: string;
        afParameters: {
          mediaSource: { keys: string[]; defaultValue: string };
          googleClickIdKey: string;
          afCustom: { paramKey: string; keys: string[]; defaultValue?: string }[];
          channel: { keys: string[] };
          afSub2: { keys: string[] };
        };
      }) => string;
    };
  }
}

export default function Home() {
  const [oneLinkURL, setOneLinkURL] = useState("");

  useEffect(() => {
    const initializeSmartScript = () => {
      if (window.AF_SMART_SCRIPT) {
        const oneLinkURL = "https://scbamfundclick-uat.onelink.me/kCUh";
        const webReferrer = "af_sub3";
        const mediaSource = { keys: ["utm_source"], defaultValue: "none" };
        const googleClickIdKey = "af_sub1";
        const utm_medium = {
          paramKey: "utm_medium",
          keys: ["utm_medium"],
          defaultValue: "none",
        };
        const channel = { keys: ["gad_source"] };
        const af_dp = {
          paramKey: "af_dp",
          keys: ["fallback_url"],
          defaultValue: "scbamfundclick%3A%2F%2Fapp%3Fpage%3DfundInfo%26fundCode%3DSCBS%2526P500",
        };
        const afSub2 = { keys: ["fbclid"] };
        const custom_ss_ui = { paramKey: "af_ss_ui", keys: ["af_ss_ui"], defaultValue: "true" };

        // Generate the OneLink URL
        const result = window.AF_SMART_SCRIPT.generateOneLinkURL({
          oneLinkURL: oneLinkURL,
          webReferrer: webReferrer,
          afParameters: {
            mediaSource: mediaSource,
            googleClickIdKey: googleClickIdKey,
            afCustom: [utm_medium, af_dp, custom_ss_ui],
            channel: channel,
            afSub2: afSub2,
          },
        });

        setOneLinkURL(result); // Save the generated URL to state
      }
    };

    if (typeof window.AF_SMART_SCRIPT !== "undefined") {
      initializeSmartScript();
    } else {
      window.addEventListener("AF_SMART_SCRIPT_LOADED", initializeSmartScript);
    }
  }, []);

  return (
    <main>
      {/* Load the Smart Script */}
      <Script
        src="https://onelinksmartscript.appsflyer.com/onelink-smart-script-latest.js"
        strategy="lazyOnload"
        onLoad={() => {
          console.log("Appsflyer Smart Script loaded!");
        }}
      />
      
      <h1>Welcome to My Next.js Website</h1>
      <p>Next.js makes building web applications easy!</p>
      {oneLinkURL ? (
        <a
          href={oneLinkURL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          Go to Download Page
        </a>
      ) : (
        <p>Generating link...</p>
      )}
    </main>
  );
}
