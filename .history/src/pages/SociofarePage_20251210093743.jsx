
const SociofarePage = () => {
  const [sociofare, setSociofare] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    api.getPageContent('sociofare').then((data) => {
      setSociofare(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-800">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-0 bg-white">
      <PageHeader title={sociofare?.title || 'Sociofare'} subtitle={sociofare?.subtitle || 'Celebrating social impact leaders'} />
      <div className="py-16 md:py-20">
        <div className="max-w-5xl mx-auto px-6">
          {(sociofare?.sections || []).map((section, idx) => (
            <div key={idx} className="prose max-w-none text-gray-700 leading-relaxed mb-16 text-justify bg-white rounded-2xl p-8 shadow-sm border" style={{ borderColor: COLORS.PRIMARY_PALE }}>
              <h3 className="text-2xl font-bold mb-2" style={{ color: COLORS.PRIMARY }}>{section.title}</h3>
              <div className="space-y-4 text-lg">
                {(section.paragraphs || []).map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SociofarePage;
