export default function (err, res, next) {
  const { status = 500, message = 'Server Error' } = err;
  res.status(status).json({ message });
  return next();
}
