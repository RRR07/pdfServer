const fs = require("fs");
const pdf = require("html-pdf");

// Read resume data from JSON file
const resumeData = JSON.parse(fs.readFileSync("resume.json", "utf8"));

// Generate HTML content dynamically
const generateHtml = (resumeData) => {
  let html = `
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
        letter-spacing: 1px;
      }
      .container {
        width: 80%;
        margin: 0 auto;
      }
      h1, h2 {
        color: #333;
        margin-bottom: 20px;
      }
      p {
        margin-bottom: 10px;
      }
      .section {
        margin-bottom: 30px;
      }
      .section h2 {
        border-bottom: 2px solid #333;
      }
      .experience-item {
        margin-bottom: 20px;
      }
      .experience-item h3 {
        color: #333;
        margin-bottom: 5px;
      }
      .experience-item p {
        margin-bottom: 5px;
      }
      .skills {
        margin-top: 10px;
      }
      .skills ul {
        list-style-type: none;
        padding: 0;
        margin: 0;
      }
      .skills li {
        display: inline-block;
        background-color: #f2f2f2;
        padding: 5px 10px;
        margin-right: 10px;
        border-radius: 5px;
      }
      .contact-info a {
        text-decoration: none;
        color: #007bff;
      }
    </style>
    <div class="container">
      <header class="section">
        <h1>${resumeData.name}</h1>
        <p>${resumeData.title}</p>
        <p class="contact-info">Email: ${resumeData.email} | Phone: ${resumeData.phone} | 
        Address: ${resumeData.address} | LinkedIn: <a href="${resumeData.linkedin}" target="_blank">${resumeData.linkedin}</a> | 
        GitHub: <a href="${resumeData.github}" target="_blank">${resumeData.github}</a></p>
      </header>

      <section class="section">
        <h2>Summary</h2>
        <p>${resumeData.summary}</p>
      </section>

      <section class="section">
        <h2>Education</h2>
      `;

  resumeData.education.forEach((edu) => {
    html += `
        <div class="experience-item">
          <h3>${edu.degree}</h3>
          <p>${edu.institution}, ${edu.location}, ${edu.duration}</p>
        </div>
      `;
  });

  html += `</section><section class="section"><h2>Experience</h2>`;

  resumeData.experience.forEach((exp) => {
    html += `
        <div class="experience-item">
          <h3>${exp.title}</h3>
          <p>${exp.company}, ${exp.location}, ${exp.duration}</p>
          <p>${exp.description}</p>
        </div>
      `;
  });

  html += `</section><section class="section"><h2>Skills</h2><div class="skills"><ul>`;

  resumeData.skills.forEach((skill) => {
    html += `<li>${skill}</li>`;
  });

  html += `</ul></div></section></div>`;

  return html;
};

// Generate HTML content
const htmlContent = generateHtml(resumeData);

// Define options for PDF generation
const options = {
  format: "Letter", // or 'A4' etc.
  border: {
    top: "0.3in",
    right: "0.3in",
    bottom: "0.3in",
    left: "0.3in",
  },
};

// Generate PDF from HTML content
pdf.create(htmlContent, options).toFile("./resume.pdf", function (err, res) {
  if (err) return console.log(err);
  console.log(res);
});
