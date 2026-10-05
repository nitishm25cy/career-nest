import { useCallback, useEffect, useMemo, useState } from "react";
import jobsData from "../data/jobs";

function useJobs() {
  const [jobs, setJobs] = useState([]);

  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [industry, setIndustry] = useState("");
  const [experience, setExperience] = useState("");
  const [type, setType] = useState("");
  const [salary, setSalary] = useState("");

  // Load jobs
  useEffect(() => {
    setJobs(jobsData);
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setKeyword("");
    setLocation("");
    setIndustry("");
    setExperience("");
    setType("");
    setSalary("");
  }, []);

  // Filter jobs
  const filteredJobs = useMemo(() => {
    return jobs.filter((job) => {

      const search = keyword.toLowerCase();

      const matchesKeyword =
        !search ||
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search) ||
        job.location.toLowerCase().includes(search);

      const matchesLocation =
        !location || job.location === location;

      const matchesIndustry =
        !industry || job.industry === industry;

      const matchesExperience =
        !experience || job.experience === experience;

      const matchesType =
        !type || job.type === type;

      return (
        matchesKeyword &&
        matchesLocation &&
        matchesIndustry &&
        matchesExperience &&
        matchesType
      );
    });
  }, [
    jobs,
    keyword,
    location,
    industry,
    experience,
    type,
    salary
  ]);

  // Matching jobs
  const matchingJobs = useMemo(() => {
    if (!keyword) {
      return [];
    }

    return jobs.filter((job) => {
      const search = keyword.toLowerCase();

      return (
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search) ||
        job.location.toLowerCase().includes(search)
      );
    });
  }, [jobs, keyword]);

  return {
    jobs,

    keyword,
    setKeyword,

    location,
    setLocation,

    industry,
    setIndustry,

    experience,
    setExperience,

    type,
    setType,

    salary,
    setSalary,

    filteredJobs,
    matchingJobs,

    clearFilters
  };
}

export default useJobs;