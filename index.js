const express = require("express");
const pdf = require("html-pdf");

const app = express();
const port = 3000;

// Middleware to parse JSON body
app.use(express.json());

// Function to generate HTML content for resume
const generateHtml = (resumeData) => {
  let html = `
    <style>
      body {
        font-family: Arial, sans-serif;
        line-height: 1.6;
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

// Endpoint to generate and return resume PDF
app.post("/generate-resume", (req, res) => {
  // Get resume data from request body
  const resumeData = req.body;

  // Generate HTML content for resume
  const htmlContent = generateHtml(resumeData);

  // Generate PDF from HTML content
  pdf.create(htmlContent).toStream((err, stream) => {
    if (err) {
      console.error(err);
      res.status(500).send("Error generating PDF");
      return;
    }

    // Set response headers for PDF
    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${resumeData.name.split()[0]}_resume.pdf"`
    );

    // Pipe the PDF stream to the response
    stream.pipe(res);
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
