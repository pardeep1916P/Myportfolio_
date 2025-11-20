import React, { useState } from "react";

const CategoryIcons = {
  "Cloud & DevOps": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-70"
    >
      <path d="M6 14a4 4 0 0 1 3.7-3.99A5 5 0 0 1 18 9a4 4 0 0 1 1 7.874V17H7a3 3 0 0 1-1-5.83V11a4 4 0 0 0 0 8h12a4 4 0 0 0 0-8 5 5 0 0 0-9.8-1.2A4 4 0 0 0 6 14Z"></path>
    </svg>
  ),
  "Serverless & Data": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-70"
    >
      <path d="M12 2c4.418 0 8 1.79 8 4v12c0 2.21-3.582 4-8 4s-8-1.79-8-4V6c0-2.21 3.582-4 8-4Zm0 2C8.686 4 6 5.12 6 6.5S8.686 9 12 9s6-1.12 6-2.5S15.314 4 12 4Zm6 6.25C17.325 11.16 14.884 12 12 12s-5.325-.84-6-1.75V15.5C6 16.88 8.686 18 12 18s6-1.12 6-2.5V10.25Z"></path>
    </svg>
  ),
  "Networking & Security": (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6 text-[var(--sec)] opacity-70"
    >
      <path d="M12 2l7 4v6c0 5-3.5 9-7 10-3.5-1-7-5-7-10V6l7-4Zm0 4.3L7 7.9V12c0 3.37 2.24 6.47 5 7.62 2.76-1.15 5-4.25 5-7.62V7.9l-5-1.6ZM6 20h12v2H6v-2Z" />
    </svg>
  ),
};

const SkillsList = () => {
  const [openItem, setOpenItem] = useState<string | null>(null);

  const skills = {
    "Cloud & DevOps": [
      "AWS: Cognito, API Gateway, Lambda, S3, DynamoDB",
      "Containerization with Docker & orchestration using Kubernetes",
      "CI/CD pipelines with GitHub Actions",
      "Infrastructure as Code (Terraform/Bicep basics)",
    ],
    "Serverless & Data": [
      "Design serverless backends and event-driven workflows",
      "Authentication, authorization, and secure storage",
      "Real-time features and WebSockets",
      "Cost, logging, and monitoring best practices",
    ],
    "Networking & Security": [
      "VPC design, subnets, routing, and security groups",
      "API security: Cognito, JWTs, rate limiting",
      "Monitoring, logging, and alerting (CloudWatch)",
      "Backup, lifecycle, and cost governance",
    ],
  } as const;

  const toggleItem = (item: string) => {
    setOpenItem(openItem === item ? null : item);
  };

  return (
    <div className="text-left pt-3 md:pt-9">
      <h3 className="text-[var(--white)] text-3xl md:text-4xl font-semibold md:mb-6">
        What I do?
      </h3>
      <ul className="space-y-4 mt-4 text-lg">
        {Object.entries(skills).map(([category, items]) => (
          <li key={category} className="w-full">
            <div
              onClick={() => toggleItem(category)}
              className="md:w-[400px] w-full bg-[#1414149c] rounded-2xl text-left hover:bg-opacity-80 transition-all border border-[var(--white-icon-tr)] cursor-pointer overflow-hidden"
            >
              <div className="flex items-center gap-3 p-4">
                {CategoryIcons[category as keyof typeof CategoryIcons]}
                <div className="flex items-center gap-2 flex-grow justify-between">
                  <div className="min-w-0 max-w-[200px] md:max-w-none overflow-hidden">
                    <span className="block truncate text-[var(--white)] text-lg select-none">
                      {category}
                    </span>
                  </div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className={`w-6 h-6 text-[var(--white)] transform transition-transform flex-shrink-0 ${openItem === category ? "rotate-180" : ""
                      }`}
                  >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                  </svg>
                </div>
              </div>

              <div
                className={`transition-all duration-300 px-4 ${openItem === category
                  ? "max-h-[500px] pb-4 opacity-100"
                  : "max-h-0 opacity-0"
                  }`}
              >
                <ul className="space-y-2 text-[var(--white-icon)] text-sm">
                  {items.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="pl-1">•</span>
                      <li className="pl-3">{item}</li>
                    </div>
                  ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SkillsList;
