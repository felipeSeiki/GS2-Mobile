export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  category: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary?: string;
  description: string;
  requirements: string[];
  benefits: string[];
  postedAt: Date;
}

export interface Application {
  id: string;
  jobId: string;
  candidateId: string;
  appliedAt: Date;
  status: 'pending' | 'reviewing' | 'approved' | 'rejected';
  job: Job;
}