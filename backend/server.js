
import express from "express";
import cors from "cors";

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Show API requests and CRUD operations in the terminal
app.use((req, res, next) => {
  const startTime = Date.now();

  console.log(`\n[API REQUEST] ${req.method} ${req.originalUrl}`);

  if (["POST", "PUT", "PATCH", "DELETE"].includes(req.method)) {
    console.log(`[CRUD OPERATION] ${req.method}`);

    if (["POST", "PUT", "PATCH"].includes(req.method)) {
      console.log("[REQUEST DATA]", req.body);
    }
  }

  res.on("finish", () => {
    console.log(
      `[API RESPONSE] ${req.method} ${req.originalUrl} | Status: ${res.statusCode} | ${Date.now() - startTime}ms`
    );
  });

  next();
});

// Temporary in-memory data
let applications = [];
let alerts = [];
let savedJobs = [];

// Sample jobs
const jobs = [
  {
    id: "1",
    title: "Frontend Developer",
    company: "Tech Solutions",
    location: "Remote",
    salary: "$60,000",
    industry: "Software",
    experience: "0–2 Years",
    type: "Full-time",
    description: "Build responsive websites using React."
  },
  {
    id: "2",
    title: "UI/UX Designer",
    company: "Creative Studio",
    location: "Chennai",
    salary: "$45,000",
    industry: "Design",
    experience: "1–3 Years",
    type: "Full-time",
    description: "Design user-friendly digital experiences."
  },
  {
    id: "3",
    title: "Data Analyst",
    company: "DataWorks",
    location: "Remote",
    salary: "$75,000",
    industry: "Data",
    experience: "2–4 Years",
    type: "Full-time",
    description: "Analyze data and prepare useful reports."
  }
];

// Home route
app.get("/", (req, res) => {
  res.json({ message: "CareerNest backend is running!" });
});

// ================= JOBS =================

// GET all jobs
app.get("/api/jobs", (req, res) => {
  console.log("[GET SUCCESS] Jobs retrieved");
  res.json(jobs);
});

// GET one job
app.get("/api/jobs/:id", (req, res) => {
  const job = jobs.find((item) => item.id === req.params.id);

  if (!job) {
    return res.status(404).json({ message: "Job not found" });
  }

  console.log("[GET SUCCESS] Job retrieved:", job.id);
  res.json(job);
});

// ================= APPLICATIONS =================

// GET all applications
app.get("/api/applications", (req, res) => {
  console.log("[GET SUCCESS] Applications retrieved:", applications.length);
  res.json(applications);
});


app.post("/api/applications", (req, res) => {
  const { jobId, job, applicant } = req.body;

  // Read applicant details from the nested object
  const name = applicant?.name;
  const email = applicant?.email;

  // Validate required fields
  if (
    typeof name !== "string" ||
    !name.trim() ||
    typeof email !== "string" ||
    !email.trim() ||
    !jobId
  ) {
    return res.status(400).json({
      message: "Applicant name, email, and job ID are required."
    });
  }

  // Check whether the job exists
  const selectedJob = jobs.find(
    (item) => item.id === String(jobId)
  );

  if (!selectedJob) {
    return res.status(404).json({
      message: "The selected job was not found."
    });
  }

  // Create application
  const application = {
    id: String(Date.now()),
    jobId: String(jobId),
    job: selectedJob,
    applicant: {
      ...applicant,
      name: name.trim(),
      email: email.trim()
    },
    applicantName: name.trim(),
    email: email.trim(),
    status: "Submitted",
    createdAt: new Date().toISOString()
  };

  applications.push(application);

  console.log("[POST SUCCESS] Application created:", application);

  res.status(201).json(application);
});


// UPDATE application
app.patch("/api/applications/:id", (req, res) => {
  const index = applications.findIndex(
    (item) => item.id === req.params.id
  );

  if (index === -1) {
    return res.status(404).json({
      message: "Application not found"
    });
  }

  applications[index] = {
    ...applications[index],
    ...req.body,
    id: applications[index].id
  };

  console.log(
    "[PATCH SUCCESS] Application updated:",
    applications[index]
  );

  res.json(applications[index]);
});

// DELETE / withdraw application
app.delete("/api/applications/:id", (req, res) => {
  const previousCount = applications.length;

  applications = applications.filter(
    (item) => item.id !== req.params.id
  );

  if (applications.length === previousCount) {
    return res.status(404).json({
      message: "Application not found"
    });
  }

  console.log(
    "[DELETE SUCCESS] Application withdrawn:",
    req.params.id
  );

  res.json({
    message: "Application withdrawn successfully"
  });
});

// ================= JOB ALERTS =================

// GET alerts
app.get("/api/alerts", (req, res) => {
  console.log("[GET SUCCESS] Job alerts retrieved:", alerts.length);
  res.json(alerts);
});

// CREATE alert
app.post("/api/alerts", (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({
      message: "Alert information is required."
    });
  }

  const alert = {
    id: String(Date.now()),
    ...req.body,
    createdAt: new Date().toISOString()
  };

  alerts.push(alert);

  console.log("[POST SUCCESS] Job alert created:", alert);
  res.status(201).json(alert);
});

// DELETE alert
app.delete("/api/alerts/:id", (req, res) => {
  const previousCount = alerts.length;

  alerts = alerts.filter((item) => item.id !== req.params.id);

  if (alerts.length === previousCount) {
    return res.status(404).json({
      message: "Job alert not found"
    });
  }

  console.log("[DELETE SUCCESS] Job alert deleted:", req.params.id);
  res.json({ message: "Job alert deleted successfully" });
});

// ================= SAVED JOBS =================

// GET saved jobs
app.get("/api/saved-jobs", (req, res) => {
  console.log("[GET SUCCESS] Saved jobs retrieved:", savedJobs.length);
  res.json(savedJobs);
});

// SAVE a job
app.post("/api/saved-jobs", (req, res) => {
  const { jobId } = req.body;

  if (!jobId) {
    return res.status(400).json({
      message: "Job ID is required."
    });
  }

  const job = jobs.find((item) => item.id === String(jobId));

  if (!job) {
    return res.status(404).json({ message: "Job not found." });
  }

  const alreadySaved = savedJobs.some(
    (item) => String(item.id) === String(jobId)
  );

  if (alreadySaved) {
    return res.json(savedJobs);
  }

  savedJobs.push(job);

  console.log("[POST SUCCESS] Job saved:", job.id);
  res.status(201).json(savedJobs);
});

// REMOVE a saved job
app.delete("/api/saved-jobs/:id", (req, res) => {
  const previousCount = savedJobs.length;

  savedJobs = savedJobs.filter(
    (item) => String(item.id) !== String(req.params.id)
  );

  if (savedJobs.length === previousCount) {
    return res.status(404).json({
      message: "Saved job not found."
    });
  }

  console.log("[DELETE SUCCESS] Saved job removed:", req.params.id);
  res.json({ message: "Saved job removed successfully." });
});

// Start server
app.listen(PORT, () => {
  console.log(`CareerNest backend running at http://localhost:${PORT}`);
});
