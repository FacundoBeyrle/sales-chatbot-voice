import { assistantProfile } from "../assets/assitantProfile";

export const Ticket: React.FC = () => (
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
      <p className="mb-3">
        Your feedback helps improve PolicyBot. If this answer didn’t fully meet your needs, please open a ticket{" "}
        <a
          href="https://example.com/ticket"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          here
        </a>{" "}
        so a developer can review your request.
      </p>
    </div>
  </div>
);