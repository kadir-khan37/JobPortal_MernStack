const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">

        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          About the Developer
        </h1>

        <p className="text-gray-700 leading-relaxed mb-6">
          Hi, I’m <span className="font-semibold">MADHAV KAUSHIK</span>, a developer who
          believes that the best way to learn technology is to build real systems.
          This job portal is not a demo or template-based project — it is a
          hands-on attempt to design, develop, and iterate on a real-world product.
        </p>

        <p className="text-gray-700 leading-relaxed mb-8">
          I focus on writing clean, maintainable code, understanding system behavior,
          and thinking beyond features — including scalability, security, and user trust.
          Every part of this platform reflects decisions made while learning how
          production-grade applications actually work.
        </p>

        {/* Section */}
        <Section title="What This Project Represents">
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Practical full-stack development with real constraints</li>
            <li>Clear separation of frontend, backend, and data responsibilities</li>
            <li>Authentication, authorization, and role-based flows</li>
            <li>Ethical handling of user data and platform trust</li>
          </ul>
        </Section>

        <Section title="How I Approach Development">
          <p className="text-gray-700">
            I approach development with an engineering-first mindset. I try to
            understand <em>why</em> a feature exists before writing code, and
            <em> how </em> it will behave as the system grows. I value clarity,
            documentation, and incremental improvement over rushed complexity.
          </p>
        </Section>

        <Section title="Who This Platform Is For">
          <p className="text-gray-700">
            This platform is built for job seekers, employers, and reviewers who
            value simplicity, transparency, and thoughtful design. It is also
            intentionally built to be readable and reviewable by engineers and
            recruiters evaluating how the system is structured.
          </p>
        </Section>

        {/* Highlight Box */}
        <div className="mt-10 bg-gray-100 border-l-4 border-gray-900 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            A Note to Recruiters & Hiring Teams
          </h3>
          <p className="text-gray-800">
            If you’re reviewing this project, you’re not just seeing a job portal —
            you’re seeing how I think about systems, users, and responsibility.
            I’m actively learning, building, and improving with the goal of working
            on real-world software that matters.
          </p>
        </div>

        <div className="mt-10 text-gray-700">
          <p>
            <strong>Tech Stack Used:</strong><br />
            React, Tailwind CSS, Node.js, Express, MongoDB (MERN)
          </p>
        </div>

        <div className="mt-6 text-gray-700">
          <p>
            <strong>Contact:</strong><br />
            Email: mk3164070@gmail.com<br />
            GitHub: https://github.com/Madhav01-Tech
          </p>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500">
          Built with curiosity, discipline, and a focus on real-world engineering.
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

export default About;
