const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Terms & Conditions
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Last Updated: <span className="italic">20-01-2026</span>
        </p>

        <p className="text-gray-700 mb-8 leading-relaxed">
          Welcome to <span className="font-semibold">web Application</span> — 
          a thoughtfully engineered job portal built as a{" "}
          <span className="font-semibold">real-world, production-oriented project</span>.
          This platform is independently designed and developed to demonstrate practical
          problem-solving, clean system design, and ethical use of technology in recruitment.
        </p>

        {/* Section */}
        <Section title="Why This Platform Exists">
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Solve real hiring problems using modern web technologies</li>
            <li>Design systems with focus on scalability, security, and data flow</li>
            <li>Learn by building — every feature reflects hands-on development</li>
          </ul>
          <p className="mt-3 text-gray-700">
            This is an <strong>independent project</strong> and is not affiliated with any
            government body or commercial recruitment agency.
          </p>
        </Section>

        <Section title="Intended Users">
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Job seekers looking for genuine opportunities</li>
            <li>Employers and startups seeking a focused hiring flow</li>
            <li>Recruiters and engineers reviewing system design</li>
          </ul>
          <p className="mt-3 text-gray-700">
            Users must be 18 years or older and provide truthful information.
          </p>
        </Section>

        <Section title="Account Responsibility & Trust">
          <p className="text-gray-700">
            Each account represents a real user or organization. You are responsible
            for all activity performed using your credentials. Trust is a core
            principle of this platform.
          </p>
        </Section>

        <Section title="Ethical Use Policy">
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>No fake jobs, scams, or misleading content</li>
            <li>No impersonation of individuals or organizations</li>
            <li>No abuse of APIs, security, or system resources</li>
            <li>No scraping or automation without permission</li>
          </ul>
          <p className="mt-3 italic text-gray-600">
            Good systems are protected systems — integrity matters more than volume.
          </p>
        </Section>

        <Section title="Job Listings & Applications">
          <p className="text-gray-700">
            Hiring decisions are made solely by employers. This platform does not
            guarantee interviews or employment. Users should independently verify
            opportunities.
          </p>
        </Section>

        <Section title="Content & Data Philosophy">
          <p className="text-gray-700">
            Users retain ownership of their data. Information is used strictly
            for platform functionality.{" "}
            <strong>No resumes or personal data are sold or monetized.</strong>
          </p>
        </Section>

        <Section title="Platform Evolution">
          <p className="text-gray-700">
            This platform is actively evolving. Features may change, and brief
            maintenance windows may occur. User feedback directly shapes future
            improvements.
          </p>
        </Section>

        <Section title="Enforcement & Moderation">
          <p className="text-gray-700">
            Accounts may be suspended or removed if they violate these terms,
            compromise trust, or introduce legal or security risks.
          </p>
        </Section>

        <Section title="Limitation of Liability">
          <p className="text-gray-700">
            This platform functions as a technology layer, not a hiring authority.
            We are not responsible for hiring outcomes or disputes.
          </p>
        </Section>

        <Section title="Governing Law">
          <p className="text-gray-700">
            These terms are governed by the laws of India.
          </p>
        </Section>

        {/* Highlight box */}
        <div className="mt-10 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">
            A Note to Reviewers & Recruiters
          </h3>
          <p className="text-blue-900">
            This project reflects an engineering-first mindset — focusing on
            real-world architecture, user trust, and production-ready thinking.
            You are viewing not just an app, but how the developer approaches
            problem-solving.
          </p>
        </div>

        <div className="mt-10 text-gray-700">
          <p>
            <strong>Contact:</strong><br />
            Email: mk3164070@gmail.com
          </p>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500">
          By using this platform, you acknowledge that this is an independently
          built system and agree to engage with it responsibly and professionally.
        </footer>

      </div>
    </div>
  );
};

const Section = ({ title, children }) => (
  <section className="mb-8">
    <h2 className="text-xl font-semibold text-gray-900 mb-2">
      {title}
    </h2>
    {children}
  </section>
);

export default Terms;
