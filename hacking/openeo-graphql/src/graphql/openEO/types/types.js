export const openEOtypes = `
  type Capabilities {
    api: JSON
    services: JSON
    formats: CapabilityFormats
  }

  type CapabilityFormats {
    default: String
    formats: [String]
  }

  type Auth {
    user: String
    token: String
    isLoggedIn: Boolean
  }

  type Data {
    product_id: String,
    description: String,
    source: String
  }

  type Processes {
    process_id: String,
    description: String,
  }

  type User {
    processGraphs: JSON
    credits: Int
    jobs: [Job]
    services: [Service]
    files: [File]
  }

  type Service {
    service_id: String
    service_url: String
    service_type: String,
    service_args: JSON,
    job_id: String
  }

  type Job {
    job_id: String
    status: String
    submitted: String,
    updated: String,
    user_id: String,
    consumed_credits: Int
  }

  type File {
    name: String,
    size: Int
  }
`;