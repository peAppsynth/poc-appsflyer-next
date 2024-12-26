"use client";
import { useEffect, useState } from "react";
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
      }) => { clickURL: string }; // Assuming the response includes a `clickURL` property
    };
  }
}

export default function Home() {
  const [oneLinkURL, setOneLinkURL] = useState("");
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);

  useEffect(() => {
    const initializeSmartScript = () => {
      console.log("Initializing Smart Script...");
      if (window.AF_SMART_SCRIPT) {
        try {
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

          // Call the generateOneLinkURL function
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

          console.log("Generated result:", result);

          // Extract and set the clickURL
          if (result && result.clickURL) {
            setOneLinkURL(result.clickURL);
          } else {
            console.error("clickURL not found in the result:", result);
          }
        } catch (error) {
          console.error("Error generating URL:", error);
        }
      } else {
        console.log("AF_SMART_SCRIPT not available");
      }
    };

    if (isScriptLoaded) {
      initializeSmartScript();
    }
  }, [isScriptLoaded]);

  return (
    <main>
      <Script
        src="https://onelinksmartscript.appsflyer.com/onelink-smart-script-latest.js"
        strategy="afterInteractive"
        onLoad={() => {
          console.log("Script loaded successfully");
          setIsScriptLoaded(true);
        }}
        onError={(e) => {
          console.error("Script failed to load", e);
        }}
      />

      <div className="mt-4">
        <p>Script Loaded: {isScriptLoaded ? "Yes" : "No"}</p>
        <p>OneLink URL: {oneLinkURL || "Not generated yet"}</p>
      </div>

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