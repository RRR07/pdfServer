// const { jsPDF } = require("jspdf");

// // Landscape export, 2×4 inches
// const doc = new jsPDF({
// //   orientation: "po",
// //   unit: "in",
// //   format: [2, 4]
// });

// doc.text("Hello world!",10,10);
// doc.save("a4.pdf");

const { jsPDF } = require("jspdf");

// Create a new jsPDF instance
const doc = new jsPDF();

// Define HTML content with various elements
const htmlContent = `
  <div class="container">
    <h1>Sleek Document</h1>
    <p>This is a sample HTML content designed to look sleek and stylish.</p>
    <p>Here's a link: <a href="https://www.example.com">Example Link</a></p>
    <img src="https://via.placeholder.com/300" alt="Example Image">
    <h2>List Example:</h2>
    <ul>
      <li>Item 1</li>
      <li>Item 2</li>
      <li>Item 3</li>
    </ul>
    <h2>Table Example:</h2>
    <table id="example-table">
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
  </div>
`;

// Add HTML content to the document
doc.html(htmlContent, {
  callback: function (doc) {
    // Save PDF to file
    doc.save("output.pdf");
  },
});

