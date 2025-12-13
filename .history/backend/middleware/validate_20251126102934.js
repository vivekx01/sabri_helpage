// Simple validation middleware for required fields
module.exports = function(required = []){
  return (req, res, next) => {
    const missing = [];
    for(const field of required){
      if(req.body[field] === undefined || req.body[field] === null || req.body[field] === '') missing.push(field);
    }
    if(missing.length) return res.status(400).json({ error: 'Missing required fields', missing });
    next();
  }
};
