const sanityClient = require("@sanity/client");
const client = sanityClient({
  projectId: "bfsmrbin",
  dataset: "production",
  apiVersion: "2021-03-25",
  token:
    "skgAo7LHns2hrjuTT2KDMeqCxIo4rWNExaR8JGhpYeKDikAXBnIQzvMI6N2fhvTQr6M9UciwrIEmpnIFZFC26S5gSkE4F48n8rmwzaQrukUmSVAKan6ZBjmGD7K7HSeE6ng0FMk5vTxVLy4aiIx0xWvZawwfMpDFBiZvoP3P2tQsbT6qutPw",
  useCdn: true,
});

export default client;
