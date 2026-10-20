
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import JobCard from "../components/JobCard";

const mockJob = {
  id: 1,
  title: "Frontend Developer",
  company: "Tech Solutions",
  industry: "IT",
  location: "Coimbatore",
  type: "Full-time",
  salary: "₹4 LPA",
  experience: "Fresher",
};

describe("JobCard Component", () => {
  test("displays job details correctly", () => {
    render(
      <MemoryRouter>
        <JobCard job={mockJob} saved={false} onSave={() => {}} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: "Frontend Developer" })
    ).toBeInTheDocument();

    expect(screen.getByText("Tech Solutions")).toBeInTheDocument();
    expect(screen.getByText("IT")).toBeInTheDocument();
    expect(screen.getByText(/Coimbatore/)).toBeInTheDocument();
    expect(screen.getByText(/Full-time/)).toBeInTheDocument();
    expect(screen.getByText(/₹4 LPA/)).toBeInTheDocument();
    expect(screen.getByText(/Fresher/)).toBeInTheDocument();
  });

  test("shows Save job when the job is not saved", () => {
    render(
      <MemoryRouter>
        <JobCard job={mockJob} saved={false} onSave={() => {}} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: "Save job" })
    ).toBeInTheDocument();
  });

  test("calls onSave with the job ID when clicked", () => {
    const onSaveMock = jest.fn();

    render(
      <MemoryRouter>
        <JobCard job={mockJob} saved={false} onSave={onSaveMock} />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole("button", { name: "Save job" }));

    expect(onSaveMock).toHaveBeenCalledWith(1);
  });

  test("shows Remove saved job when the job is already saved", () => {
    render(
      <MemoryRouter>
        <JobCard job={mockJob} saved={true} onSave={() => {}} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("button", { name: "Remove saved job" })
    ).toBeInTheDocument();
  });

  test("links to the correct job details page", () => {
    render(
      <MemoryRouter>
        <JobCard job={mockJob} saved={false} onSave={() => {}} />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", { name: /View Details/ })
    ).toHaveAttribute("href", "/job/1");
  });
});
