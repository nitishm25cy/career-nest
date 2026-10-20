import jobs from "../data/jobs";

describe("CareerNest job data", () => {
  test("contains job records with the required fields", () => {
    expect(jobs.length).toBeGreaterThan(0);
    jobs.forEach((job) => {
      expect(job).toEqual(expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        company: expect.any(String),
        location: expect.any(String),
        salary: expect.any(String),
        industry: expect.any(String),
        experience: expect.any(String),
        type: expect.any(String),
        description: expect.any(String),
        skills: expect.any(Array),
      }));
    });
  });

  test("job IDs are unique", () => {
    const ids = jobs.map((job) => job.id);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
