const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 md:p-12">

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Contact
        </h1>

        <p className="text-gray-700 mb-8 leading-relaxed">
          I’m always open to discussions around projects, internships, full-time
          opportunities, or technical feedback. If you’re reviewing this platform
          or would like to connect professionally, feel free to reach out.
        </p>

        {/* Contact Card */}
        <div className="space-y-6">

          <InfoRow label="Name">
            Madhav Kaushik
          </InfoRow>

          <InfoRow label="Email">
            <a
              href="mailto:mk3164070@gmail.com"
              className="text-blue-600 hover:underline"
            >
              mk3164070@gmail.com
            </a>
          </InfoRow>

          <InfoRow label="GitHub">
            <a
              href="https://github.com/Madhav01-Tech"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              github.com/Madhav01-Tech
            </a>
          </InfoRow>

          <InfoRow label="LinkedIn">
            <a
              href="https://www.linkedin.com/in/madhav-kaushik-388a122b3"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              linkedin.com/in/madhav-kaushik
            </a>
          </InfoRow>

        </div>

        {/* Note for recruiters */}
        <div className="mt-10 bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
          <h2 className="text-lg font-semibold text-blue-900 mb-2">
            For Recruiters & Hiring Teams
          </h2>
          <p className="text-blue-900">
            This project is actively maintained and reflects my approach to
            real-world software development. I value clarity, responsibility,
            and continuous learning, and I’m always open to constructive feedback
            or professional conversations.
          </p>
        </div>

        <footer className="mt-12 text-center text-sm text-gray-500">
          Built with intention, transparency, and an engineering-first mindset.
        </footer>

      </div>
    </div>
  );
};

const InfoRow = ({ label, children }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-6">
    <span className="w-32 font-medium text-gray-900">
      {label}
    </span>
    <span className="text-gray-700">
      {children}
    </span>
  </div>
);

export default Contact;
