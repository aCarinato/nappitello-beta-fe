function APIError(props) {
  const { errorMsg, setIsError } = props;
  return (
    <>
      <h1>{errorMsg}</h1>
      <br></br>
      <h2
        style={{ textDecoration: 'underline', cursor: 'pointer' }}
        onClick={() => setIsError('')}
      >
        Riprova
      </h2>
    </>
  );
}

export default APIError;
