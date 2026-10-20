import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";
import Loading from "../components/Loading";
import StatusBadge from "../components/StatusBadge";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import JobAlertCard from "../components/JobAlertCard";
import ApplicationCard from "../components/ApplicationCard";

describe("Reusable CareerNest components", () => {
  test("Button renders its label and responds to clicks", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Save profile</Button>);
    fireEvent.click(screen.getByRole("button", { name: "Save profile" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test("Input displays a label, value and validation error", () => {
    render(
      <Input label="Email" name="email" value="bad-email"
        onChange={() => {}} error="Enter a valid email address." />
    );
    expect(screen.getByLabelText("Email")).toHaveValue("bad-email");
    expect(screen.getByText("Enter a valid email address.")).toBeInTheDocument();
  });

  test("Loading displays its default message", () => {
    render(<Loading />);
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  test("Loading displays a custom message", () => {
    render(<Loading message="Loading jobs..." />);
    expect(screen.getByText("Loading jobs...")).toBeInTheDocument();
  });

  test("StatusBadge displays the status and matching class", () => {
    render(<StatusBadge status="Pending" />);
    expect(screen.getByText("Pending")).toHaveClass("status-badge", "status-pending");
  });

  test("SearchBar focuses the input and reports changed text", () => {
    const setKeyword = jest.fn();
    render(<SearchBar keyword="" setKeyword={setKeyword} />);
    const input = screen.getByPlaceholderText("Search job title, company or keyword...");
    expect(input).toHaveFocus();
    fireEvent.change(input, { target: { value: "Developer" } });
    expect(setKeyword).toHaveBeenCalledWith("Developer");
  });

  test("FilterPanel updates location and clears all filters", () => {
    const setLocation = jest.fn();
    const setIndustry = jest.fn();
    const setExperience = jest.fn();
    const setType = jest.fn();
    const setSalary = jest.fn();
    render(
      <FilterPanel location="Chennai" setLocation={setLocation}
        industry="Design" setIndustry={setIndustry}
        experience="Fresher" setExperience={setExperience}
        type="Full-time" setType={setType}
        salary="below-50000" setSalary={setSalary} />
    );
    fireEvent.change(screen.getByDisplayValue("Chennai"), { target: { value: "Bangalore" } });
    expect(setLocation).toHaveBeenCalledWith("Bangalore");
    fireEvent.click(screen.getByRole("button", { name: "Clear" }));
    expect(setLocation).toHaveBeenCalledWith("");
    expect(setIndustry).toHaveBeenCalledWith("");
    expect(setExperience).toHaveBeenCalledWith("");
    expect(setType).toHaveBeenCalledWith("");
    expect(setSalary).toHaveBeenCalledWith("");
  });

  test("JobAlertCard displays alert details and defaults", () => {
    const { rerender } = render(<JobAlertCard alert={{ keyword: "React", location: "Chennai", frequency: "Weekly" }} />);
    expect(screen.getByRole("heading", { name: "React" })).toBeInTheDocument();
    expect(screen.getByText("Location: Chennai")).toBeInTheDocument();
    expect(screen.getByText("Frequency: Weekly")).toBeInTheDocument();
    rerender(<JobAlertCard alert={{}} />);
    expect(screen.getByRole("heading", { name: "All Jobs" })).toBeInTheDocument();
    expect(screen.getByText("Location: Any location")).toBeInTheDocument();
    expect(screen.getByText("Frequency: Daily")).toBeInTheDocument();
  });

  test("ApplicationCard displays application details and withdraws by ID", () => {
    const onWithdraw = jest.fn();
    render(<ApplicationCard application={{
      id: 7, job: { company: "TechNova", title: "Frontend Developer", location: "Chennai" },
      appliedAt: "2026-10-01", status: "Pending"
    }} onWithdraw={onWithdraw} />);
    expect(screen.getByRole("heading", { name: "Frontend Developer" })).toBeInTheDocument();
    expect(screen.getByText("TechNova")).toBeInTheDocument();
    expect(screen.getByText("Chennai")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Withdraw" }));
    expect(onWithdraw).toHaveBeenCalledWith(7);
  });

  test("ApplicationCard hides Withdraw when no callback is provided", () => {
    render(<ApplicationCard application={{
      id: 8, job: { company: "DataSphere", title: "Data Analyst", location: "Pune" },
      appliedAt: "2026-10-01", status: "Submitted"
    }} />);
    expect(screen.queryByRole("button", { name: "Withdraw" })).not.toBeInTheDocument();
  });
});
