export default function (err, req, res) {
  const { status = 500, message = 'Server Error' } = err;

  return res
    .status(status)
    .json({ message });
}
