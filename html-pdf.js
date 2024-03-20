// const axios = require("axios");
// const pdf = require("html-pdf");

// async function generatePDFfromURL(url, outputPath) {
//   try {
//     const response = await axios.get(url);
//     const htmlContent = response.data;
//     pdf.create(htmlContent).toFile(outputPath, (err, res) => {
//       if (err) return console.log(err);
//       console.log("PDF generated successfully:", res);
//     });
//   } catch (error) {
//     console.error("Error fetching URL:", error);
//   }
// }

// // Usage
// generatePDFfromURL("https://google.com", "google.pdf");

const pdf = require("html-pdf");

// Define HTML content with various elements
const htmlContent = `
  <h1>Hello, World!</h1>
  <p>This is a sample HTML content to demonstrate conversion to PDF using html-pdf.</p>
  <p>Here's a link: <a href="https://www.example.com">Example Link</a></p>
  <img src="https://www.example.com/image.jpg" alt="Example Image" width="200" height="150">
  <h2>List Example:</h2>
  <ul>
    <li>Item 1</li>
    <li>Item 2</li>
    <li>Item 3</li>
  </ul>
  <h2>Table Example:</h2>
  <table border="1" cellpadding="5" cellspacing="0">
    <thead>
      <tr>
        <th>Name</th>
        <th>Age</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>John</td>
        <td>30</td>
      </tr>
      <tr>
        <td>Jane</td>
        <td>25</td>
      </tr>
    </tbody>
  </table>
`;

// Define options for PDF generation
const options = {
  format: "Letter", // or 'A4' etc.
  border: {
    top: "1in",
    right: "1in",
    bottom: "1in",
    left: "1in",
  },
};

// Generate PDF from HTML content
pdf.create(htmlContent, options).toFile("./output.pdf", function (err, res) {
  if (err) return console.log(err);
  console.log(res);
});
