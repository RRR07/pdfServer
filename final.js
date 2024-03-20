const fs = require("fs");
const pdf = require("html-pdf");

// Read the HTML content from the file
const htmlContent = fs.readFileSync("template.html", "utf8");

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
