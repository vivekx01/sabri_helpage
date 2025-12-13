module.exports = {
  pages: [
    {
      slug: 'home',
      name: 'Homepage',
      requiredKeys: ['hero', 'stats', 'causes', 'news', 'footer']
    },
    { slug: 'about', name: 'About', requiredKeys: ['hero','mission','team','footer'] },
    { slug: 'causes', name: 'Causes', requiredKeys: ['hero','grid','cta','footer'] },
    { slug: 'csr', name: 'CSR', requiredKeys: ['hero','overview','process','cta','footer'] },
    { slug: 'sociofare', name: 'SocioFare', requiredKeys: ['hero','programs','steps','cta','footer'] },
    { slug: 'publications', name: 'Publications', requiredKeys: ['hero','list','cta','footer'] },
    { slug: 'contact', name: 'Contact', requiredKeys: ['hero','form','details','footer'] },
  ]
};
