import { assistantProfile } from "../assets/assitantProfile";

export const EndMessage: React.FC<{ onEmailClick?: () => void }> = ({ onEmailClick }) => {
  const body = `Hi there!

Your employee created a policy form for you to sign.
Please sign the attached document and proceed with the next steps in the process.

Thank you!`;

  const mailtoLink = `mailto:supervisor@bmw.com?subject=${encodeURIComponent(
    "Policy form for you to sign"
  )}&body=${encodeURIComponent(body)}`;

  return (
    <div className="flex flex-col items-start mt-4">
      <div className="flex items-center mb-2">
        <img
          src={assistantProfile.image}
          alt="Assistant"
          className="w-14 h-14 rounded-full mr-4"
        />
        <p className="text-center">{assistantProfile.name}</p>
      </div>
      <div className="bg-gray-100 border-gray-300 border-2 rounded-lg p-2 mr-20 w-full">
        <p>
          This is your code to continue the survey: <b>MYBMWCAR</b>
        </p>
        <div className="mt-3">
          <a
            href={mailtoLink}
            className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => onEmailClick?.()}
          >
            Email us for help
          </a>
        </div>
      </div>
    </div>
  );
};