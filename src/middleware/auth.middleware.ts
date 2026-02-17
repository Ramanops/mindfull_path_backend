import * as jwt from 'jsonwebtoken';

export function authMiddleware(req, res, next) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send('Unauthorized');

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = { id: decoded.sub };
    next();
  } catch {
    res.status(401).send('Invalid token');
  }
}